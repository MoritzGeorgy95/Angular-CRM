import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {
    this.fetchNews(this.url); // No need to return the Observable here
  }

  placeholderImageUrl: string = 'assets/img/placeholdernoimg.png';
  apikey = '64f93eae2402d94f840b30f2b22c15ee';
  category = 'general';
  url =
    'https://gnews.io/api/v4/top-headlines?category=' +
    this.category +
    '&lang=en&country=us&max=10&apikey=' +
    this.apikey;

  private newsSubject = new BehaviorSubject<any>(null);
  news$ = this.newsSubject.asObservable();

  private errorSubject = new BehaviorSubject<boolean>(false);
  error$ = this.errorSubject.asObservable();

  fetchNews(url: string): void {
    fetch(url)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error('Newsfeed blocked by provider!');
        }
      })
      .then((data) => {
        this.newsSubject.next(data);
        this.errorSubject.next(false); // Reset error flag on successful response
      })
      .catch((error) => {
        this.errorSubject.next(true); // Set error flag on error
      });
  }

  replaceImg(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.placeholderImageUrl;
  }
}
