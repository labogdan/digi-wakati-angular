import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartDataService } from '../cart-data.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  product: any = {};
  cartId = '';

  constructor(private http: HttpClient, private data: CartDataService) { }

  ngOnInit() {
    this.fetchProducts();
    this.data.currentCartId.subscribe(cartId => this.cartId = cartId);
  }

  createCart() {
    this.http.post<{ guid: string }>(
      `${environment.hybrisServerUrl}/wakati/users/anonymous/carts`,
      {}
    ).subscribe(responseData => {
      console.log(responseData);
      this.cartId = responseData.guid;
      this.data.changeCartId(responseData.guid);
      this.addToCart();
    });
  }

  updateCart() {
    // https://{{hybrisServerUrl}}/kaowebservices/v2/{{site}}/users/anonymous/carts/{{cartId}}/entries
  }

  addToCart() {
    if (!this.cartId || this.cartId ===  '') {
      console.log('need to make a new cart');
      this.createCart();
    } else {
      console.log('use existing cart');
      this.http.post(
        `${environment.hybrisServerUrl}/wakati/users/anonymous/carts/${this.cartId}/entries`,
        {
            product: {
            code: 2647500,
            quantity: 1
          }
        }
      ).subscribe(responseData => {
        console.log(responseData);
        this.data.changeVisibility(true);
        this.data.changeProduct(responseData);
        // this.data.changeTotalPrice(responseData.totalPrice.value);
        // this.data.changeTotalPrice(responseData);
      });
    }
  }

  private fetchProducts() {
    this.http
      .get<{ name: string, basePrice: string, description: string }>
        (`${environment.hybrisServerUrl}/wakati/products/2647500?categoryCode=conditioner`)
      .subscribe(responseData => {
        console.log(responseData);
        this.product = {};
        this.product.name = responseData.name;
        this.product.basePrice = responseData.basePrice;
        this.product.description = responseData.description;
      });
  }


}
