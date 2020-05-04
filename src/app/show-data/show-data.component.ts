import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowsService } from '../services/shows.service';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.scss']
})
export class ShowDataComponent implements OnInit {

  constructor(private route: ActivatedRoute, private showsService: ShowsService, private router: Router) { }
  show:any;
  cast:any = [];
  episodes:any = [];
  showNumber: string;

  ngOnInit() {
    this.showNumber = this.route.snapshot.paramMap.get("id")
    this.showsService.getShowDetails(this.showNumber).subscribe(show => {
      console.log(show);
      this.show = show;
      this.cast = show._embedded.cast;
      this.episodes = show._embedded.episodes;
      console.log(this.cast);
    })
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}
