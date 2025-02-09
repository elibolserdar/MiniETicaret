import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  //message(message: string, messageType: MessageType, position: AlertPosition, delay: number = 3, dismissOthers: boolean = false){
  message(message: string, options: Partial<AlertifyOptions>){
    alertify.set('notifier','delay', options.delay);
    alertify.set('notifier','position', options.position);
    const msj = alertify[options.messageType](message);

    if(options.dismissOthers){
      msj.dismissOthers();
    }
  }

  dismissAll(){
    alertify.dismissAll();
  }
}

export class AlertifyOptions{
  messageType: AlertifyMessageType = AlertifyMessageType.Message;
  position: AlertPosition = AlertPosition.BottomLeft;
  delay: number = 3;
  dismissOthers: boolean = false;
}

export enum AlertifyMessageType {
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum AlertPosition {
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomCenter = "bottom-center",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left"
}