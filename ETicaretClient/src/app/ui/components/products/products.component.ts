import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent{
  constructor(spinner: NgxSpinnerService, private httpClinetService: HttpClientService) { 
    super(spinner)
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);

    //Test GET
    this.httpClinetService.get<Product[]>({
      controller: "products"
    }).subscribe(data => console.log(`${data[0].name} -> ${data[0].price} TL`));


    ////Test POST
    // this.httpClinetService.post({
    //   controller: "products"
    // }, {
    //   name: "Kalem",
    //   stock: 100,
    //   price: 15
    // }).subscribe();

    // this.httpClinetService.post({
    //   controller: "products"
    // }, {
    //   name: "Silgi",
    //   stock: 10,
    //   price: 2.5
    // }).subscribe();


    ////Test PUT
    // this.httpClinetService.put({
    //   controller: "products"
    // }, {
    //   id: "12fc01e4-f163-4307-bd2f-d1d66ac1d769",
    //   name: "Renkli Kalem",
    //   stock: 1590
    // }).subscribe();


    ////Test DELETE
    // this.httpClinetService.delete({
    //   controller: "products"
    // }, "bf8b86c9-a27c-4cc5-b4e6-bb2d8cd04d8f")
    // .subscribe();

    // this.httpClinetService.get({
    //   // baseUrl: "https://jsonplaceholder.typicode.com/",
    //   // controller: "albums"
    //   fullEndpoint: "https://jsonplaceholder.typicode.com/albums"
    // }).subscribe(data => console.log(data));
  }
}
