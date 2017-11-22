import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  item = {
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
            (userItem) => {
              this.user.username = userItem['username'];
              this.item.item_name = userItem['item']['item_name'];
              this.item.added_by = userItem['item']['added_by'],
              this.item.description = userItem['item']['description'],
              this.item.quantity = Number(userItem['item']['quantity'])
            }
          )
        }
      );
   }

  ngOnInit() {
  }

}
