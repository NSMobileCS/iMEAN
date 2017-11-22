import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {

  newItem = {
    question: '',
    description: '',
    added_by: ''
  }

  user = { "username": 'anon'};

  constructor(
    private _dataservice: DataService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this._route.paramMap.subscribe(
      (params) => this.user.username = params.get('user')
    )
  }

  ngOnInit() {
  }

  addFormSend(){
    this.newItem.added_by = this.user.username;
    this._dataservice.addNewItem(this.newItem);
    this._router.navigateByUrl('/items');
  }

}
