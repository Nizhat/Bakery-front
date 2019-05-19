import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/shared/services/provider.service';
import { IProduct } from 'src/app/shared/models/global.models';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.css']
})
export class PageMainComponent implements OnInit {

  private _success = new Subject<string>();
  alertText = null;
  products: IProduct [] = [];
  constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.provider.getRandomThreeProduct().then( res => {
      this.products = res;
    });
    
    this._success.subscribe((message) => this.alertText = message);
    this._success.pipe(
      debounceTime(1500)
    ).subscribe(() => this.alertText = null);
  }

  getImage(img: string) {
    return '../../../assets/images/'+img;
  }
  
  addToBasket(item: IProduct) {
    this.alertText = this.provider.addProductToBasket(item);
    this._success.next(this.alertText);
  }

}
