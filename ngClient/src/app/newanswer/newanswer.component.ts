import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-newanswer',
  templateUrl: './newanswer.component.html',
  styleUrls: ['./newanswer.component.css']
})


export class NewanswerComponent implements OnInit {

  question = '';
  newAnswer = {
    answer: '',
    answered_by: ''
  }

  user = { "username": 'anon'};


  constructor(
    private _dataservice: DataService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this._route.params.subscribe(
      (params) => {
        this.user.username = params.get('user');
        this.question = params.get('id');
      }
    )
  }

  ngOnInit() {
  }

  submitAnswer(){
    this.newAnswer.answered_by = this.user.username;
    this._dataservice.addNewAnswer(this.question, this.newAnswer);
    this._router.navigateByUrl("/items");
  }

}
