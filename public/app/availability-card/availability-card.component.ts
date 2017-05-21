// Vendor
import { Component, OnInit, EventEmitter } from '@angular/core';
import { CalendarEvent, CalendarEventResponse } from 'novo-elements';
// App
import { colors, getNewEvent } from '../shared/utils/utils';
import { AvailabilityCardService } from './availability-card.service';

@Component({
  selector: 'app-availability-card',
  templateUrl: './availability-card.component.html',
  styleUrls: ['./availability-card.component.scss']
})
export class AvailabilityCardComponent implements OnInit {
    refresher: EventEmitter<any> = new EventEmitter();
    viewDate: Date = new Date();
    events: CalendarEvent[] = [];

    constructor(private availability: AvailabilityCardService) {}

    ngOnInit() {
        this.availability.getCandidateAvailability().subscribe((events: CalendarEvent[]) => {
            console.log('events', events);
            this.events = events;
        });
    }

    toggleAvailable(event) {
        let evt: CalendarEvent;
        if (!event.day.events.length) {
            evt = getNewEvent( event.day.date, colors.green, CalendarEventResponse.Accepted);
            this.events.push(evt);
            this.availability.add(evt);
        } else {
            evt = event.day.events[0];
            switch (evt.response) {
                case CalendarEventResponse.Accepted:
                    evt.response = CalendarEventResponse.Rejected;
                    this.availability.update(evt);
                    break;
                case CalendarEventResponse.Rejected:
                    this.events.splice(this.events.indexOf(evt), 1);
                    this.availability.remove(evt);
                    break;
                default:
                    break;
            }
        }
        this.refresher.emit(evt);
    }

}
