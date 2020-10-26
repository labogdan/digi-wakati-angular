import { Component, OnInit } from '@angular/core';
import { CartDataService } from '../cart-data.service';
import { HttpClient } from '@angular/common/http';
import {normalizeExtraEntryPoints} from '@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs';
import {environment} from '../../environments/environment';
// import {ProductListComponent} from '../product-list/product-list.component';


@Component({
  selector: 'app-side-cart',
  templateUrl: './side-cart.component.html',
  styleUrls: ['./side-cart.component.css']
})
export class SideCartComponent implements OnInit {

  visibility: boolean;
  product: any = {};
  cartId = '';

  toggleVisibility() {
    this.visibility = !this.visibility;
  }

  deleteCart() {
    this.http.delete<{ guid: string }>(
      `${environment.hybrisServerUrl}/wakati/users/anonymous/carts/${this.cartId}`,
      {}
    ).subscribe(responseData => {
      console.log(responseData);
      this.data.changeCartId('');
      this.product = {
        entries: [
          {
            quantity: 0,
            totalPrice: {
              value: 0
            }
          }
        ]
      };
    });
  }

  createCart() {
    this.http.post<{ guid: string }>(
      `${environment.hybrisServerUrl}/wakati/users/anonymous/carts`,
      {}
    ).subscribe(responseData => {
      console.log(responseData);
    });
  }

  updateCart(quantity) {
    const qty = quantity || this.product.entries[0].quantity;
    console.log(qty);
    this.http.patch(
      `${environment.hybrisServerUrl}/wakati/users/anonymous/carts/${this.cartId}/entries/0`,
      {
        product: {
          code: 2647500
        },
        quantity: qty
      }
    ).subscribe(responseData => {
      console.log(responseData);
      this.product = responseData;
    });
  }

  constructor(private http: HttpClient, private data: CartDataService, /*private comp: ProductListComponent*/) { }

  ngOnInit() {
    this.data.currentVisibility.subscribe(visibility => this.visibility = visibility);
    this.data.currentProduct.subscribe(product => this.product = product);
    // this.data.currentTotalPrice.subscribe(totalPrice => this.totalPrice = totalPrice);
    this.data.currentCartId.subscribe(cartId => this.cartId = cartId);
  }

}
