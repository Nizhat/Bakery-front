import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BaseConstructorService } from './base-constructor.service';
import { environment } from '../../../environments/environment';
import { IUser, IProduct, IBasket, IOrder} from '../models/global.models';

@Injectable()
export class ProviderService extends BaseConstructorService {

  apiUrl = environment.apiUrlConstructor;
  basket: IProduct [] = [];
  basketItems: IBasket [] = [];

  constructor(http: HttpClient) {
    super(http);
  }
  /*
   * Get All Users
   * */
  addProductToBasket(item: IProduct) {
    if (this.basket.find(r => r.ID == item.ID)) {
      return {alert: "danger", message:"Продукт уже имеется в корзине"};
    } else {
      this.basket.push(item);
      this.basketItems.push(
        {Id: item.ID, Title: item.Title, Price: item.Price, Count: 1, TotalPrice: item.Price}
      );
      return {alert: "success", message: "Успешно добавлено"};
    }
  }

  deleteProductFromBasket(id: number) {
    const index: number = this.basket.findIndex(r => r.ID == id);
    if (index !== -1) {
      this.basket.splice(index, 1);
      this.basketItems.splice(index, 1);
    }    
  }

  cleanBasket() {
    this.basket = [];
    this.basketItems = [];
  }

  getProduct(id: number) {
    const url = 'api/Products1/GetProduct';
    return this.get(url, { ID: id });    
  } 

  getRandomThreeProduct() {
    const url = 'api/Products1/GetRandomThreeProducts';
    return this.get(url, { });
  }

  addProduct(item: IProduct) {
    const url = 'api/Products1/PostProduct';
    delete(item.ID);
    return this.post(url, item);
  }

  deleteProduct(item: IProduct) {
    const url = 'api/Products1/DeleteProduct?id=';
    return this.delet(url + item.ID, {});
  }

  updateProduct(item: IProduct) {    
    const url = 'api/Products1/PutProduct';
    return this.post(url, {id: item.ID, product: item});
  }

  getOrders() {
    const url = 'api/Orders';
    return this.get(url, { });
  }

  addOrder(order: IOrder) {
    const url = 'api/Orders/PostOrder';
    delete(order.Id);
    return this.post(url, order);
  }

  deleteOrder(order: IOrder) {
    const url = 'api/Orders/DeleteOrder?id=';
    return this.delet(url + order.Id, {});
  }

  getOrderBaskets() {
    const url = 'api/OrderBaskets';
    return this.get(url, { });
  }

  addOrderBasket(basket: IBasket) {
    const url = 'api/OrderBaskets/PostOrderBasket';
    return this.post(url, basket);
  }

  deleteOrderBasket(basket: IBasket) {
    const url = 'api/OrderBaskets/DeleteOrderBasket?id=';
    return this.delet(url + basket.Id, {});
  }

}
