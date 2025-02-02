import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: any, errorCallBack?: any) {
    this.httpClientService.post({
      controller: "products"
    }, product)
      .subscribe({
        next: (result) => {
          if (successCallBack) successCallBack();
        },
        error: (errorResponse: HttpErrorResponse) => {
          let message = "Bilinmeyen bir hata oluştu.";
      
          if (errorResponse.error?.errors) {
              const errors = errorResponse.error.errors;
              message = Object.keys(errors)
                  .map(key => `<b>${key}:</b> ${errors[key].join(", ")}`)
                  .join("<br>");
          }
      
          if (errorCallBack) errorCallBack(message);
      },
        complete: () => {
          console.log("İstek tamamlandı.");
        }
      });
  }
}
