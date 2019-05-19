import { Component, OnInit, Input } from '@angular/core';
import { PageProductsService } from './page-products.service';
import { IProduct } from 'src/app/shared/models/global.models';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from 'src/app/shared/services/provider.service';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-page-products',
  templateUrl: './page-products.component.html',
  styleUrls: ['./page-products.component.css']
})
export class PageProductsComponent implements OnInit {
  
  private _success = new Subject<string>();
  alertText = null;
  category: string = null;
  products: IProduct [] = [];

  collectionSize: number;
  pageSize: number = 6;
  page: number = 1;

  constructor(private service: PageProductsService, private route: ActivatedRoute, private provider: ProviderService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category');
      this.getCategoryProducts();
    });
    
    this._success.subscribe((message) => this.alertText = message);
    this._success.pipe(
      debounceTime(1500)
    ).subscribe(() => this.alertText = null);
  }

  getCategoryProducts() {    
    if (this.category == 'all') {
      this.service.getAllProducts().then( res => {
        this.products = res;
        this.collectionSize = this.products.length;
      });
    } else {
      this.service.getCategoryProducts(this.category).then( res => {
        this.products = res;
        this.collectionSize = this.products.length;
      });
    }
  }

  getImage(img: string) {
    return '../../../assets/images/'+img;
  }
  
  addToBasket(item: IProduct) {
    this.alertText = this.provider.addProductToBasket(item);
    this._success.next(this.alertText);
  }
}
