import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { Timestamp } from 'firebase/firestore';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  isSameDay,
  isSameMonth,
} from 'date-fns';

import { UsersService } from '../users.service';

import { Observable, Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { doc, updateDoc } from 'firebase/firestore';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar-component',
  templateUrl: './calendar-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar-component.component.scss'],
})
export class CalendarComponentComponent implements OnDestroy {
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  events$: Observable<any>;

  activeDayIsOpen: boolean = true;

  /**
   * Constructs a new instance of the CalendarComponentComponent.
   * @param usersService The UsersService used to retrieve and store calendar events.
   */
  constructor(private usersService: UsersService) {
    this.events$ = this.usersService.events;
    this.events$.subscribe((events) => {
      this.events = events[0].events.map((event: any) => ({
        ...event,
        start: event.start.toDate(),
        end: event.end.toDate(),
      }));
    });
  }

  /**
   * Stores the calendar events in the database before destroying the component.
   */
  ngOnDestroy(): void {
    this.storeEvents();
    this.usersService.getAll();
  }

  async storeEvents() {
    let docRef = doc(this.usersService.collection, 'events');
    await updateDoc(docRef, { events: this.events });
  }

  /**
   * Handles the click event on a calendar day.
   * @param date The selected date.
   * @param events The events associated with the selected date.
   */
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  /**
   * Handles the event time changes in the calendar.
   * @param event The modified event.
   * @param newStart The new start time of the event.
   * @param newEnd The new end time of the event.
   */
  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }

  handleEvent(action: string, event: CalendarEvent): void {}

  /**
   * Adds a new event to the calendar.
   */
  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['blue'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  /**
   * Deletes an event from the calendar.
   * @param eventToDelete The event to delete.
   */
  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  /**
   * Sets the current view of the calendar.
   * @param view The view to set.
   */
  setView(view: CalendarView) {
    this.view = view;
  }

  /**
   * Closes the open month view day.
   */
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
