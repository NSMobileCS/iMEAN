import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Route } from '@angular/router/src/config';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';

  constructor(
    private _dataservice: DataService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  login(){
    if (this.username.length > 1) {
      this._dataservice.login(
        [this.username],
        (resp) => this._router.navigateByUrl('/items')
      );
    }
  }
}
