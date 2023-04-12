import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  users: any;
  formattedDate: string;
  cityName: string;
  temperature: number;

  ngOnInit() {
    this.usersService.getAll();
    this.users = this.usersService.users;
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

  async getPos(position: any) {

    let locationUrl = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=x6YRAVajQSGgAIVNUX20e8lbKyOwot7A&q=${position.coords.latitude}%2C${position.coords.longitude}`;
    let locationResponse = await fetch(locationUrl);
    let locationData = await locationResponse.json();
    this.cityName = locationData.LocalizedName;
    

    let weatherUrl= `http://dataservice.accuweather.com/currentconditions/v1/${locationData.Key}?apikey=x6YRAVajQSGgAIVNUX20e8lbKyOwot7A`
    let weatherResponse= await fetch(weatherUrl);
    let weatherData= await weatherResponse.json();
    this.temperature= weatherData[0].Temperature.Metric.Value;
    console.log(weatherData);
  }

  rejectPos(error: any) {
    console.log(error.message);
  }
}
