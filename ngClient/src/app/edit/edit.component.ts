import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  item: any = {
    item_name: '',
    added_by: '',
    description: '',
    quantity: 0,
  };

  user = { "username": 'anon'};


  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _dataservice: DataService
  ) {
      this._route.paramMap.subscribe(
        (params) => {
          this._dataservice.specItem(
            params.get('id'),
            (item) => this.item = item
          )
        }
      );
      this._dataservice.login(
        [],
        (name) => this.user.username = name
      )
   }

  ngOnInit() {
  }

}
