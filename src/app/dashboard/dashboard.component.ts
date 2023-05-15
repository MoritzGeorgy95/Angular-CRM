import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { UsersService } from '../users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCalendarComponent } from '../dialog-calendar/dialog-calendar.component';
import { Observable } from 'rxjs';
import { DialogNotepadComponent } from '../dialog-notepad/dialog-notepad.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChildren('widget') widgetElements: QueryList<ElementRef>;

  formattedDate: string;
  cityName: string;
  temperature: number;
  weatherIcon: number;
  notes$: Observable<any>;
  notes: Array<any>;
  events$: Observable<any>;
  events: Array<any>;
  dragging: boolean = false;
  noGeo: boolean = false;

  /**
   * @param usersService The UsersService is injected to access client data and perform CRUD operations.
   * @param dialog The MatDialog service is injected to open pre-styled material design dialogs.
   */

  constructor(public usersService: UsersService, private dialog: MatDialog) {
    this.notes$ = this.usersService.notes;
    this.notes$.subscribe((notes) => {
      this.notes = notes;
    });

    this.events$ = this.usersService.events;
    this.events$.subscribe((events) => {
      if (events.length > 0 && events[0].events) {
        this.events = events[0].events.filter((event: any) => {
          const today = new Date();
          return event.start.toDate().toDateString() === today.toDateString();
        });
      } else {
        this.events = [];
      }
    });
  }

  /**
   * Get gelocation, current date/time & current weather to then be displayed within dashboard widgets.
   */
  ngOnInit() {
    this.getCurrentDate();
    this.getCurrentWeather();
  }

  /**
   * Gets the current date and time, and formats it as a string.
   */
  getCurrentDate() {
    const date = new Date();
    this.formattedDate = date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
    setTimeout(() => {
      this.getCurrentDate();
    }, 60000);
  }

  /**
   * Retrieves the current weather using geolocation.
   * If the weather data is available in local storage, it is used; otherwise, an API request is made.
   */
  async getCurrentWeather() {
    let cachedWeather = localStorage.getItem('weather');
    if (cachedWeather) {
      this.temperature = JSON.parse(cachedWeather).temperature;
      this.cityName = JSON.parse(cachedWeather).cityName;
      this.weatherIcon = JSON.parse(cachedWeather).weatherIcon;
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => this.getPos(position),
      (error) => {
        this.rejectPos(error);
        this.noGeo = true;
      }
    );
  }

  /**
   *Retrieves the current position coordinates and uses them to fetch location and weather data.
   * @param position The object containing the coordinates (latitude and longitude).
   */

  async getPos(position: any) {
    let locationUrl = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=x6YRAVajQSGgAIVNUX20e8lbKyOwot7A&q=${position.coords.latitude}%2C${position.coords.longitude}`;
    let locationResponse = await fetch(locationUrl);
    let locationData = await locationResponse.json();
    this.cityName = locationData.LocalizedName;

    let weatherUrl = `https://dataservice.accuweather.com/currentconditions/v1/${locationData.Key}?apikey=x6YRAVajQSGgAIVNUX20e8lbKyOwot7A`;
    let weatherResponse = await fetch(weatherUrl);
    let weatherData = await weatherResponse.json();
    this.temperature = weatherData[0].Temperature.Metric.Value;
    this.weatherIcon = weatherData[0].WeatherIcon;

    // Store data in local storage
    const dataToCache = {
      cityName: this.cityName,
      temperature: this.temperature,
      weatherIcon: this.weatherIcon,
    };
    localStorage.setItem('weather', JSON.stringify(dataToCache));
  }

  rejectPos(error: any) {
    alert(error.message);
  }

  /**
   * Get widget positions after being dragged in order to prevent widgets from overlapping.
   */
  /**
   *
   * @param event dragging event
   */

  getWidgetFinalPos(event: any) {
    //get positional data for currently dragged widget
    const draggedWidget = event.source.element.nativeElement;
    const draggedWidgetRect = draggedWidget.getBoundingClientRect();

    this.widgetElements.forEach((widget) => {
      if (widget.nativeElement !== draggedWidget) {
        const targetWidgetRect = widget.nativeElement.getBoundingClientRect();

        if (this.widgetOverlaps(draggedWidgetRect, targetWidgetRect)) {
          event.source._dragRef.reset();
        }
      }
    });
  }

  widgetOverlaps(draggedWidgetRect: any, targetWidgetRect: any) {
    return (
      draggedWidgetRect.right > targetWidgetRect.left &&
      draggedWidgetRect.left < targetWidgetRect.right &&
      draggedWidgetRect.bottom > targetWidgetRect.top &&
      draggedWidgetRect.top < targetWidgetRect.bottom
    );
  }

  /**
   * Logic to open calendar & notepad dialogs.
   */

  openCalendarViewDialog() {
    if (!this.dragging) {
      this.dialog.open(DialogCalendarComponent, {
        panelClass: 'custom-modalbox',
      });
    } else {
      this.dragging = false;
    }
  }

  openNotepadDialog(data: any) {
    if (!this.dragging) {
      const dialogRef = this.dialog.open(DialogNotepadComponent, {
        panelClass: 'notepad-box',
        data: { data },
      });

      dialogRef.afterClosed().subscribe((data) => {
        this.notes$ = data;
      });
    } else {
      this.dragging = false;
    }
  }
}
