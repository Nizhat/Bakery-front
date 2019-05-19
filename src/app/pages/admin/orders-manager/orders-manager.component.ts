import { Component, OnInit } from '@angular/core';
import { IOrder, IBasket } from 'src/app/shared/models/global.models';
import { ProviderService } from 'src/app/shared/services/provider.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orders-manager',
  templateUrl: './orders-manager.component.html',
  styleUrls: ['./orders-manager.component.css']
})
export class OrdersManagerComponent implements OnInit {

  orderBaskets: IBasket [] = [];
  orders: IOrder [] = [];

  constructor(private provider: ProviderService, private _modalService: NgbModal) {
  }

  ngOnInit() {
    this.provider.getOrderBaskets().then(res => {
      this.orderBaskets = res;
    });

    this.provider.getOrders().then(res => {
      this.orders = res;
    });
  }

  deleteOrder(item: IOrder) {    
    this.baskets = this.orderBaskets.filter(r => r.OrderId === item.Id);
    if(this.baskets.length > 0) {
      this.baskets.map(r => {
        this.provider.deleteOrderBasket(r).then(res => {
          if(r.Id == this.baskets[this.baskets.length-1].Id) {
            this.provider.deleteOrder(item);
          }
        });
      });
    }else {      
      this.provider.deleteOrder(item);
    }
  }

  updateOrder() {}

  baskets: IBasket [] = [];

  openModal(content, item) {
    this.baskets = this.orderBaskets.filter(r => r.OrderId === item.Id);
    this._modalService.open(content, { size: 'lg' });    
  }
}
