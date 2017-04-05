import { CalendarEvent, CalendarEventResponse } from 'novo-elements';

export const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  green: {
    primary: '#8CC152',
    secondary: '#37BC9B'
  }
};

export function getNewEvent(date, color, type): CalendarEvent {
    const evt: CalendarEvent = {
        title: 'Has custom class',
        color: color,
        start: date,
        response: type
    };
    return evt;
}