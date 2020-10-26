import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {

  private visibilitySource = new BehaviorSubject(false);
  private productSource = new BehaviorSubject({});
  private cartIdSource = new BehaviorSubject('');

  currentVisibility = this.visibilitySource.asObservable();
  currentProduct = this.productSource.asObservable();
  currentCartId = this.cartIdSource.asObservable();

  constructor() { }

  changeVisibility(visible: boolean) {
    this.visibilitySource.next(visible);
  }

  changeProduct(product: {}) {
    this.productSource.next(product);
  }

  changeCartId(cartId: string) {
    this.cartIdSource.next(cartId);
  }

}
