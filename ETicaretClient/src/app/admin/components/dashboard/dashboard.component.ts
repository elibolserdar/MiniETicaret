import { Component, OnInit } from '@angular/core';
import { AlertifyService, AlertPosition, MessageType } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor(private alertify: AlertifyService) {}

  ngOnInit(): void {
  }

  m(){
    this.alertify.message("Merhaba", {
      messageType: MessageType.Success, 
      position: AlertPosition.TopRight, 
      delay: 10});
  }

  d(){
    this.alertify.dismissAll();
  }
}
