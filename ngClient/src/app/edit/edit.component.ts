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
    answers: [{'answer': 'none', 'posted_by': 'none', 'votes': 0, '_id': '0000'}]
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
          this.q_id = params.get('id'),
          this._dataservice.specItem(
            this.q_id,
            (userItem) => {
              this.user.username = userItem['username'];
              if (userItem['q']['question'] && userItem['q']['question'].length > 0) {
                this.Q.question = userItem['q']['question'];
              }
              if (userItem['q']['description'] && userItem['q']['description'].length > 0){
                this.Q.description = userItem['q']['description'];
              }
              if (userItem['answers'] && userItem['answers'].length > 0) {
                this.Q.answers = userItem['answers'];
              }
            }
          )
        }
      );
   }

  upVote(ansID){
    this._dataservice.sendUpVote(ansID);
  }

  ngOnInit() {
  }

}
