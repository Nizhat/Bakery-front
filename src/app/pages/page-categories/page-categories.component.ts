import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-categories',
  templateUrl: './page-categories.component.html',
  styleUrls: ['./page-categories.component.css']
})
export class PageCategoriesComponent implements OnInit {

  category: string = null;
  categories = [
      {id: 1, name: "Хлеб", def: "hleb", image: `../assets/images/image10.jpg`},
      {id: 2, name: "Пицца", def: "pizza", image: `../assets/images/image18.jpg`},
      {id: 3, name: "Торт", def: "tort", image: `../assets/images/image19.jpg`},
      {id: 4, name: "Пирог", def: "pirog", image: `../assets/images/image20.jpg`}];
  constructor() { }

  ngOnInit() {
  }

}
