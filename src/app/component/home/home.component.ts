import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showFlag =  {
    profile: true,
   };
   menuName: any = '';
  constructor(private router: Router) {
    if (
      this.router.url.includes('profile')
    ) {
      this.menuName = 'Dashboard';
    }
  }

  ngOnInit(): void {
  }

}
