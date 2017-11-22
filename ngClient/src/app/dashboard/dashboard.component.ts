import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Data } from '@angular/router/src/config';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: object = { "username": 'anon'}

  itemList: object[] = [];

  constructor(
    private _dataservice: DataService,
    private _router: Router
  ) {
    this._dataservice.allItems(
      (itemResp) => {
        console.log(`dashboard component dataservice itemResp: ${itemResp}`)
        this.user['username'] = itemResp['username'];
        this.itemList = itemResp['items'];
      }
    )
  }

  userLogout(){
    this._dataservice.logout(
      (res) => this._router.navigateByUrl('/')
    )
  }

  ngOnInit() {
  }

}
