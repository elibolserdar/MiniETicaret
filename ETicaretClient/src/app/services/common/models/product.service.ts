import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
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

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number; products: List_Product[] }> {
    const promiseData: Promise<{ totalCount: number; products: List_Product[] }> = this.httpClientService.get<{ totalCount: number; products: List_Product[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }
}