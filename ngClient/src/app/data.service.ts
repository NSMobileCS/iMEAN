import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class DataService {

  constructor(private _http: HttpClient) { }


  login(name, callback){
    if (name.length < 1){
      this._http.get('/login').subscribe(
        (userObject) => callback(userObject['username'])
      )
    }
    else {
      this._http.post('/login', {username: name[0]}).subscribe(
        (res) => callback(res)
      )
    }
  }

  logout(callback){
    this._http.post('/logout', {action: "logout"}).subscribe(
      (res) => callback(res)
    )
  }

  allItems(callback){
    this._http.get('/items').subscribe(
      (items) => callback(items)
    )
  }

  specItem(id, callback){
    this._http.get(`/items/${id}`).subscribe(
      (userItem) => {
        console.log(userItem);
        callback(userItem)
      }
    )
  }

  addNewItem(item){
    this._http.post('/items/new', item).subscribe(
      (res) => console.log(`data service addNewItem posted response ${res}`)
    )
  }

  addNewAnswer(qID, answer){
    console.log(`data service add answer: answer: ${answer}`);
    this._http.post(`/items/${qID}`, answer).subscribe(
      (res) => console.log(res)
    )
  }

  sendUpVote(answID){
    this._http.get(`/vote/${answID}`).subscribe(
      (res) => console.log(res)
    )
  }

  deleteItem(id){
    this._http.post(`/items/${id}/destroy`, {'action': 'delete'}).subscribe(
    )
  }

}

