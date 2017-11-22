import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  Q = {
    question: '',
    description: '',
    answers: [{'answer': 'none', 'posted_by': 'none', 'votes': 0}]
  };

  q_id = '';

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
              this.Q.question = userItem['question']['question'];
              this.Q.description = userItem['question']['description'];
              this.Q.answers = userItem['question']['answers'];
            }
          )
        }
      );
   }



  ngOnInit() {
  }

}
