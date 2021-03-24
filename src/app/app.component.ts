import { Component } from '@angular/core';
import { Appointment } from './appointment.type';
import { CalService } from './cal.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {




  constructor(private _data: CalService) {
    this._data.getAllEvents().subscribe(
      (data:Appointment[])=>{
        this.appointments=data;
      });
    }
  isNew = null;
  appointmentDetail: Appointment;
  appointments: Appointment[]= [];

  onRequestNewAppointment(e: Appointment): void {
    this.isNew = true;
    this.appointmentDetail = e;
  }

  onRequestUpdateAppointment(e: Appointment): void {
    this.isNew = false;
    this.appointmentDetail = e;
  }

  onCloseAppointmentDetail(): void {
    this.appointmentDetail = null;
    this.isNew = null;
  }

  onAdd(appointment: Appointment): void {

    this.appointments = [...this.appointments, { id: new Date().getTime().toString(), ...appointment }];
    this.onCloseAppointmentDetail();
    this._data.addEvent({ id: new Date().getTime().toString(), ...appointment }).subscribe(
      (x:any)=>{
         if(x.affectedValue==1){
          this.appointments.push(appointment);
         }}
          );
}


  onUpdate(appointment: Appointment): void {

    this.appointments = this.appointments.map(a => a.id === appointment.id ? { ...a, ...appointment } : a);
    this.onCloseAppointmentDetail();
    // console.log( JSON.stringify(this.appointments));

    this._data.editEvent({...appointment } ).subscribe(
      (x:any)=>{
        if(x.affectedValue==1){
          // this.appointments.push(appointment);
      }}
      );
  }
  onAppointmentUpdated(appointment: Appointment): void {
    this.onUpdate(appointment);
  }

  onDelete(appointment: Appointment): void {
  this.appointments = this.appointments.map(a => a.id === appointment.id ? { ...a, ...appointment } : a);
    this.onCloseAppointmentDetail();
      this._data.deleteEvent({...appointment}).subscribe((x:any)=>{
      this.appointments.splice(this.appointments.indexOf(appointment),1);
      if(x.affectedValue==1){
        window.location.reload();
    }
       });
}
}
