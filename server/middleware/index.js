// Vendor
const express = require('express');

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
    middleware.get(['/email/notification'], (request, response) => {
        // TODO: Implement this
        response.send({
            success: true
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

    // Interested Email
    middleware.get(['/email/callback/interested'], (request, response) => {
        // TODO: Implement this
        response.send({
            success: true
        });
    });
    
    // Not-Interested Email
    middleware.get(['/email/callback/not-interested'], (request, response) => {
        // TODO: Implement this
        response.send({
            success: true
        });
    });

    return middleware;
};
