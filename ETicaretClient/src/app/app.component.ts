import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'ETicaretClient';
  constructor(private toastrService: CustomToastrService){
    // toastrService.message("Merhaba", "Serdar", {messageType: ToastrMessageType.Info, position: ToastrPosition.TopCenter});
  }
}

// $.get("https://localhost:7253/api/Products", data => {
//   console.log(data);
// })

// $(document).ready(() => {
//   console.log("hi")
// })
