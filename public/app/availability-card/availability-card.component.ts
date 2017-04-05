import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventResponse } from 'novo-elements';
import { colors, getNewEvent } from '../shared/utils/utils';

@Component({
  selector: 'app-availability-card',
  templateUrl: './availability-card.component.html',
  styleUrls: ['./availability-card.component.scss']
})
export class AvailabilityCardComponent implements OnInit {
    viewDate: Date = new Date();
    events: CalendarEvent[] = [{
        title: 'Has custom class',
        color: colors.red,
        start: new Date(),
        response: CalendarEventResponse.Rejected
    }];

    constructor() { }

    ngOnInit() {
    }

    dayClicked(event) {
        const evt: CalendarEvent = getNewEvent( event.day.date, colors.blue, CalendarEventResponse.Maybe );
        event.day.events.push(evt);
    }

    toggleAvailable(event) {
        let evt: CalendarEvent;
        if (!event.day.events.length) {
            evt = getNewEvent( event.day.date, colors.green, CalendarEventResponse.Accepted);
            event.day.events.push(evt);
        } else {
            evt = event.day.events[0];
            switch (evt.response) {
                case CalendarEventResponse.Accepted:
                    evt.response = CalendarEventResponse.Rejected;
                    break;
                case CalendarEventResponse.Rejected:
                    event.day.events = [];
                    break;
                default:
                    break;
            }
        }
    }

}
