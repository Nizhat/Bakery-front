import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PageProductsService extends BaseService{

  constructor(http: HttpClient) {
    super(http)
  }

  getAllProducts() {    
    const url = 'api/Products1';
    return this.get(url, {});
  }

  getCategoryProducts(category: string) {
    const url = 'api/Products1/GetProductsByCategory';
    return this.get(url, {category: category});
  }
}
