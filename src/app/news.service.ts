import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor() {
    this.news$ = this.fetchNews(this.url);
  }

  apikey = 'be88d8f24f023305a408f362c621a428';
  category = 'general';
  url =
    'https://gnews.io/api/v4/top-headlines?category=' +
    this.category +
    '&lang=en&country=us&max=10&apikey=' +
    this.apikey;
  news$: Observable<any>;
  error: boolean = false;

  fetchNews(url: string): Observable<any> {
    return new Observable((observer) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            this.error = true;
            throw new Error('Newsfeed blocked by provider!');
          }
          return response.json();
        })
        .then((data) => {
          observer.next(data);
          observer.complete();
          this.error = false;
        });
    });
  }
}
