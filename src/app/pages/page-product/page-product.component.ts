import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from 'src/app/shared/services/provider.service';
import { IProduct } from 'src/app/shared/models/global.models';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-page-product',
  templateUrl: './page-product.component.html',
  styleUrls: ['./page-product.component.css']
})
export class PageProductComponent implements OnInit {

  private _success = new Subject<string>();
  productID: number = null;
  productDetail: IProduct = null;
  alertText = null;

  constructor(private route: ActivatedRoute, private provider: ProviderService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productID = Number(params.get('productId'));
      this.getProduct();
    });
    
    this._success.subscribe((message) => this.alertText = message);
    this._success.pipe(
      debounceTime(1500)
    ).subscribe(() => this.alertText = null);
  }

  getProduct() {    
    if (this.productID) {
      this.provider.getProduct(this.productID).then( res => {
        this.productDetail = res;
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
