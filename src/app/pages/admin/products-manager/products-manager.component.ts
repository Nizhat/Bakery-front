import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct } from 'src/app/shared/models/global.models';
import { PageProductsService } from '../../page-products/page-products.service';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from 'src/app/shared/services/provider.service';
import { debounceTime } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products-manager',
  templateUrl: './products-manager.component.html',
  styleUrls: ['./products-manager.component.css']
})
export class ProductsManagerComponent implements OnInit {

  private _success = new Subject<string>();
  alertText = null;
  products: IProduct [] = [];
  editableProduct: IProduct = null;

  collectionSize: number;
  pageSize: number = 6;
  page: number = 1;

  constructor(private service: PageProductsService, 
    private route: ActivatedRoute, 
    private provider: ProviderService,
    private _modalService: NgbModal) {
      this.editableProduct = { ID: null, Title: null, Category: null, Description: null, ImageSrc: null, Price: null};
    }

  ngOnInit() {
    this.service.getAllProducts().then( res => {
      this.products = res;
      this.collectionSize = this.products.length;
    });
    
    this._success.subscribe((message) => this.alertText = message);
    this._success.pipe(
      debounceTime(1500)
    ).subscribe(() => this.alertText = null);
  }

  getImage(img: string) {
    return '../../../assets/images/'+img;
  }

  deleteProduct(item: IProduct) {
    this.provider.deleteProduct(item);
    this._success.next(this.alertText);
  }
  
  openModal(content, item: IProduct) {
    if(item) {
      this.editableProduct.ID = item.ID;
      this.editableProduct.Category = item.Category;
      this.editableProduct.Title = item.Title;
      this.editableProduct.Description = item.Description;
      this.editableProduct.Price = item.Price;
      this.editableProduct.ImageSrc = item.ImageSrc;
    }
    this._modalService.open(content, { size: 'lg' });
  }

  addProduct() {
    let split = this.editableProduct.ImageSrc.split("\\");
    this.editableProduct.ImageSrc = split[split.length-1];
    if(this.editableProduct.ID !== null) {
      this.provider.updateProduct(this.editableProduct);
      let findP = this.products.find(r => r.ID == this.editableProduct.ID);
      findP = this.editableProduct;
    }else {
      this.provider.addProduct(this.editableProduct);
    }
    this._modalService.dismissAll();
    this.clearProduct();
  }

  clearProduct() {
    this.editableProduct.ID = null;
    this.editableProduct.Category = null;
    this.editableProduct.Title = null;
    this.editableProduct.Description = null;
    this.editableProduct.Price = null;
    this.editableProduct.ImageSrc = null;
  }

  uploadMedia(event) {
    if(event) {
      this.editableProduct.ImageSrc = event.target.value;
    }
  }
}
