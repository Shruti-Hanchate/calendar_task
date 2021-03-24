import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Appointment } from './appointment.type';
@Injectable({
  providedIn: 'root'
})
export class CalService {
  search:any;
  url: string='http://localhost:3000/event/';


  constructor(private _http:HttpClient) { }
  getAllEvents(){
    return this._http.get(this.url);
  }

  deleteEvent(item:Appointment){
    let head= new HttpHeaders().set('Content-Type', 'application/JSON');
    return this._http.delete(this.url+item.id,{headers:head});
  }
  addEvent(item:Appointment){
    let head= new HttpHeaders().set('Content-Type', 'application/JSON');
    let body=JSON.stringify(item);
    return this._http.post(this.url,body,{headers:head});
  }
  editEvent(item:Appointment){
    let head= new HttpHeaders().set('Content-Type', 'application/JSON');
    let body=JSON.stringify(item);
    return this._http.put(this.url+item.id,body,{headers:head});
  }


}


