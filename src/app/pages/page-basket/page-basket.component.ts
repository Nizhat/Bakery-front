import { Component, OnInit } from '@angular/core';
import {IBasket, IOrder} from '../../shared/models/global.models';
import { ProviderService } from 'src/app/shared/services/provider.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-page-basket',
  templateUrl: './page-basket.component.html',
  styleUrls: ['./page-basket.component.css']
})
export class PageBasketComponent implements OnInit {

  totalPrice: number = 0;
  basketItems: IBasket [] = [];
  errorMessage = '';
  order: IOrder = null;
  orderInfo: boolean = false;
  basketProducts: IBasket [] = [];

  constructor(private provider: ProviderService, private _modalService: NgbModal) {
    this.order = {
      Id: null,
      UserFirstName: null,
      UserLastName: null, 
      UserEmail: null,
      UserPhone: null,
      Address: null,
      TotalPrice: 0
    }
  }

  ngOnInit() {
    this.basketItems = this.provider.basketItems;
    this.calculateTotalPrice();
  }

  deleteFromBasket(item: IBasket) {    
    this.provider.deleteProductFromBasket(item.Id);
  } 

  changedProductCount(item: IBasket) {
    item.TotalPrice = item.Count * item.Price;
    this.calculateTotalPrice();
  } 

  calculateTotalPrice() {    
    this.basketItems.map( r => {
      this.totalPrice += r.TotalPrice;
    });
  }

  openModal(content) {
    this._modalService.open(content, { size: 'lg' });
  }

  confirmOrder() {
    this.order.TotalPrice = this.totalPrice;
    this.basketProducts = this.basketItems;
    this.provider.addOrder(this.order).then( res => {
      this.basketProducts.map( r => {
        r.Order = res;
        r.OrderId = res.Id;
        this.provider.addOrderBasket(r);
      });
    });
    this._modalService.dismissAll();
    this.cleanOrders();
    this.orderInfo = true;
  }

  cleanOrders() {
    this.provider.cleanBasket();
    this.basketItems = [];
    this.totalPrice = 0;
  }
}
