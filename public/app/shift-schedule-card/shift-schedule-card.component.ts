// Vendor
import { Component, OnInit, EventEmitter } from '@angular/core';
import { CalendarEvent, CalendarEventResponse } from 'novo-elements';
// App
import { colors, getNewEvent } from '../shared/utils/utils';
import { ShiftScheduleCardService } from './shift-schedule-card.service';

@Component({
  selector: 'app-shift-schedule-card',
  templateUrl: './shift-schedule-card.component.html',
  styleUrls: ['./shift-schedule-card.component.scss']
})
export class ShiftScheduleCardComponent implements OnInit {
  refresher: EventEmitter<any> = new EventEmitter();
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  constructor(private shifts: ShiftScheduleCardService) { }

  ngOnInit() {
    this.shifts.getShiftsNeeded().subscribe((events: CalendarEvent[]) => {
      this.events = events;
    });
  }

  addShift(event) {
    const evt: CalendarEvent = getNewEvent(event.day.date, colors.blue, CalendarEventResponse.Maybe);
    this.events.push(evt);
    this.shifts.add(evt);
  }

  removeShift(event) {
    this.events.splice(event.day.events.indexOf(event.event), 1);
    this.shifts.remove(event.event);
    // this.refresher.emit(event.event);
  }

  saveEvent() {
    // get http
    // save to JobOrderCustomObjectInstance1 field.
    /*Shift Needed
    text1: name
    text2: type
    text3: status
    date1: DateOfEvent
    jobOrder: id
    */
  }
}
