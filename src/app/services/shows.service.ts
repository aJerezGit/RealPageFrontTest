import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://api.tvmaze.com/'

  getShows(): Observable<any> {
    return this.http.get(this.baseUrl+'shows?page=1');
  }

  getShowsByPage(page: number): Observable<any> {
    return this.http.get(this.baseUrl+'shows?page='+page);
  }

  getShowsFiltered(labelToFilter, textToFilter): Observable<any> {
    var prefix = '';
    if(labelToFilter == "keyword") {
      prefix = 'q'
    }
    const url = `${this.baseUrl}search/shows?${prefix}=${textToFilter}`;
    return this.http.get(url);
  }

  getShowsSchedule(country: string, date: string): Observable<any> {
    const url = `${this.baseUrl}schedule?country=${country}&date=${date}`;
    return this.http.get(url);
  }

  getShowDetails(showNumber: string): Observable<any> {
    const url = `${this.baseUrl}shows/${showNumber}?embed[]=episodes&embed[]=cast`;
    return this.http.get(url);
  }

}
