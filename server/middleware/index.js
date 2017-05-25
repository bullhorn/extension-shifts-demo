// Vendor
const express = require('express');
const Mailgun = require('mailgun-js');
const path = require('path')
const soap = require('soap');
const Email = require('email-templates').EmailTemplate
const dateFormat = require('dateformat');
const encrypter = require('object-encrypter');
const engine = encrypter('Engage2017', {
    ttl: true
});

module.exports = function routes() {
    const middleware = new express.Router();

    // Custom Workflow Icons
    middleware.get(['/workflow/num-shifts-needed'], (request, response) => {
        // TODO: Implement this
        response.send({
            total: 7,
            color: '#00ff00',
            click: null
        });
    });

    // Emails for automatch

    // Notification Email
    middleware.post(['/email/notification'], (request, response) => {
        //Your api key, from Mailgun’s Control Panel
        var api_key = 'key-ab3c9a7d2377cdc5fead800ed50a7d4a';
        //Your domain, from the Mailgun Control Panel
        var domain = 'sandbox0f809a15c1974f458706eae5ead543d1.mailgun.org';
        //Your sending email address
        var from_who = 'noreply@automatch.com';
        //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
        var mailgun = new Mailgun({
            apiKey: api_key,
            domain: domain
        });
        var templateDir = path.join(__dirname, '..', 'templates', 'notification')
        var template = new Email(templateDir);
        var data = (request.body.data || {}).data;
        console.log('D', data);
        data.id = request.body.changedEntityId;
        data.dateOfShift = dateFormat(new Date(Number(data.customText5)), "dddd, mmmm dS");
        data.hash = encodeURIComponent(engine.encrypt(data, 172800000));
        template.render(data)
            .then(function (email) {
                console.log(email.html)
                var data = {
                    //Specify email data
                    from: from_who,
                    //The email to contact
                    to: 'bvkimball@gmail.com',
                    //Subject and text data
                    subject: 'Hello from Mailgun',
                    html: email.html
                }

                //Invokes the method to send emails given the above data with the helper library
                mailgun.messages().send(data, function (err, body) {
                    //If there is an error, render the error page
                    if (err) {
                        console.log("got an error: ", err);
                        response.send({
                            success: false
                        });
                    }
                    //Else we can greet    and leave
                    else {
                        //Here "submitted.jade" is the view file for this landing page
                        //We pass the variable "email" from the url parameter in an object rendered by Jade
                        // TODO: Implement this
                        response.send({
                            success: true
                        });
                    }
                });
            });
    });

    // Confirmation Email
    middleware.get(['/email/confirmation'], (request, response) => {
        // TODO: Implement this
        response.send({
            success: true
        });
    });

    // Callbacks for notification email
    function findAndUpdateJobSubmission(id, status) {
        return new Promise((resolve, reject) => {
            const url = 'http://localhost:3000/local_wsdl.xml';
            const options = {
                trace: 1
            };
            const credentials = {
                username: 'docsamson',
                password: '_bu11h0rn_',
                apiKey: '021888E9-CF73-79A0-605F56BCB0E3AC55'
            };
            soap.createClient(url, options, function (err, client) {
                let service = client.ApiService.ApiServicePort;
                service.startSession(credentials, function (err, result) {
                    const query = {
                        attributes: {
                            'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                            'xmlns:xs': 'http://www.w3.org/2001/XMLSchema'
                        },
                        session: result.return.session,
                        entityName: 'JobSubmission',
                        id: {
                            attributes: {
                                'xsi:type': 'xs:int'
                            },
                            $value: id
                        }
                    }
                    client.find(query, function (err, found) {
                        let submission = found.return.dto;
                        console.log(submission);
                        submission.status = status;
                        const packet = {
                            attributes: {
                                'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                                'xmlns:xs': 'http://www.w3.org/2001/XMLSchema',
                                'xmlns:ns4': "http://job.entity.bullhorn.com/"
                            },
                            session: result.return.session,
                            dto: submission
                        }
                        client.save(packet, function (err, saved) {
                            resolve(saved);
                        });
                    });
                });
            });
        });
    }
    // Interested Email
    middleware.get(['/email/callback/interested'], (request, response) => {
        let obj = engine.decrypt(request.query.hash);
        findAndUpdateJobSubmission(obj.id, 'Interested').then((saved) => {
            response.send(saved);
        });
    });

    // Not-Interested Email
    middleware.get(['/email/callback/not-interested'], (request, response) => {
        let obj = engine.decrypt(request.query.hash);
        findAndUpdateJobSubmission(obj.id, 'Not Interested').then((saved) => {
            response.send(saved);
        });
    });

    // Callbacks for workflow item

    // Interested Email
    middleware.get(['/workflow/interested'], (request, response) => {
        // TODO: Implement this
        response.header('Access-Control-Allow-Origin', request.get('origin'));
        response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        response.header('Access-Control-Allow-Credentials', 'true');
        response.send({
            total: 1,
            route: ['./activity', {
                section: 'tasks'
            }]
        });
    });

    return middleware;
};
