import { Component, OnInit } from '@angular/core';
import { ShowsService } from '../services/shows.service';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss']
})
export class ShowsComponent implements OnInit {
  shows:any = [];
  pages: number = 1;
  constructor(private showService: ShowsService, private router: Router) { }

  ngOnInit() {
    this.showService.getShows().subscribe((data: {}) => {
      this.shows = data;
    })
  }

  private getShows(page: number) {
    this.shows = [];
    this.showService.getShowsByPage(page)
      .subscribe((data: {}) => {
        this.shows = data;
      })
  }

  formatResponse(data): void {
    if(!data[0].show) {
      this.shows = data;
    }
    else {
      var nObj = [];
      data.map(function(obj)  {
        nObj.push(obj.show);
      })
      this.shows = nObj;
    }
  }

  updateCharacters(dataEvent) {
    this.formatResponse(dataEvent);
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  goForward() {
    this.pages += 1;
    this.getShows(this.pages)
  }

  goBack() {
    if(this.pages <= 1) { 
      this.pages = 1;
    }
    else{ 
      this.pages -= 1
      this.getShows(this.pages)
    }
  }

}
