import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public tabSelected: string = "home";
  constructor(
    private $router: Router
  ) { }

  public selectTab(tab){
    this.tabSelected  = tab;
    if(tab === 'home')
      this.$router.navigate(['home']);
    else if(tab === 'chart')
      this.$router.navigate(['chart']);
    else if(tab === 'grid')
      this.$router.navigate(['grid']);
    else if(tab === 'users')
      this.$router.navigate(['users']);
  }

  ngOnInit() {
    this.tabSelected =  window.location.pathname.slice(1);
  }

}
