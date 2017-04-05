import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventResponse } from 'novo-elements';
import { colors, getNewEvent } from '../shared/utils/utils';

@Component({
  selector: 'app-shift-schedule-card',
  templateUrl: './shift-schedule-card.component.html',
  styleUrls: ['./shift-schedule-card.component.scss']
})
export class ShiftScheduleCardComponent implements OnInit {
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

  addShift(event) {
      const evt: CalendarEvent = getNewEvent( event.day.date, colors.blue, CalendarEventResponse.Maybe);
      event.day.events.push(evt);
  }

  removeShift(event) {
      event.day.events.splice(event.day.events.indexOf(event.event), 1);
  }
}
