import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent {
  constructor(public newsService: NewsService) {}

  openTab(url: string) {
    window.open(url);
  }
}
