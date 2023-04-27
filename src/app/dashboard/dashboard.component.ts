import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { UsersService } from '../users.service';
import {
  addDoc,
  onSnapshot,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddWidgetComponent } from '../dialog-add-widget/dialog-add-widget.component';
import { DialogCalendarComponent } from '../dialog-calendar/dialog-calendar.component';
import { Observable, of } from 'rxjs';
import { DialogNotepadComponent } from '../dialog-notepad/dialog-notepad.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public usersService: UsersService, private dialog: MatDialog) {
    this.notes = this.usersService.notes;
  }

  @ViewChildren('widget') widgetElements: QueryList<ElementRef>;

  formattedDate: string;
  cityName: string;
  temperature: number;
  weatherIcon: number;
  notes: Array<any> = [];
  dragging:boolean= false;


  ngOnInit() {
    this.getCurrentDate();
    this.getCurrentWeather();
  }

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

  async getCurrentWeather() {
    let cachedWeather = localStorage.getItem('weather');
    if (cachedWeather) {
      this.temperature = JSON.parse(cachedWeather).temperature;
      this.cityName = JSON.parse(cachedWeather).cityName;
      this.weatherIcon = JSON.parse(cachedWeather).weatherIcon;
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.getPos(position);
          },
          (error) => {
            this.rejectPos(error);
          }
        );
      }
    }
   
  }

  async getPos(position: any) {
    let locationUrl = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=x6YRAVajQSGgAIVNUX20e8lbKyOwot7A&q=${position.coords.latitude}%2C${position.coords.longitude}`;
    let locationResponse = await fetch(locationUrl);
    let locationData = await locationResponse.json();
    this.cityName = locationData.LocalizedName;

    let weatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationData.Key}?apikey=x6YRAVajQSGgAIVNUX20e8lbKyOwot7A`;
    let weatherResponse = await fetch(weatherUrl);
    let weatherData = await weatherResponse.json();
    this.temperature = weatherData[0].Temperature.Metric.Value;
    this.weatherIcon = weatherData[0].WeatherIcon;

    // Store data in cache
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

  getWidgetFinalPos(event: any) {
    //get positional data for currently dragged widget
    const draggedWidget = event.source.element.nativeElement;
    const draggedWidgetRect = draggedWidget.getBoundingClientRect();

    this.widgetElements.forEach((widget) => {
      if (widget.nativeElement !== draggedWidget) {
        const targetWidgetRect = widget.nativeElement.getBoundingClientRect();

        if (
          draggedWidgetRect.right > targetWidgetRect.left &&
          draggedWidgetRect.left < targetWidgetRect.right &&
          draggedWidgetRect.bottom > targetWidgetRect.top &&
          draggedWidgetRect.top < targetWidgetRect.bottom
        ) {
          event.source._dragRef.reset();
        }
      }
    });
  
  }

  openCalendarViewDialog() {
    if(!this.dragging) {
      this.dialog.open(DialogCalendarComponent, {
        panelClass: 'custom-modalbox',
      });
    } 
    else {
      this.dragging= false;
    }
    
  }

  openNotepadDialog(data: any) {
    if (!this.dragging) {
      const dialogRef = this.dialog.open(DialogNotepadComponent, {
        panelClass: 'notepad-box',
        data: { data },
      });
  
      dialogRef.afterClosed().subscribe((data) => {
        this.notes = data;
      });
    }

    else {
      this.dragging= false;
    }
    
  }
}
