import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { Slider } from 'src/app/shared/models/global.models';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [NgbCarouselConfig]
})
export class SliderComponent implements OnInit {

  showNavigationArrows = true;
  showNavigationIndicators = true;
  slides: Slider [] = [];

  constructor(config: NgbCarouselConfig) {
      // customize default values of carousels used by this component tree
      this.slides = [ 
        {captionTitle: "ФРАНЦУСКИЕ БАГЕТЫ", captionText: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.", src: `../assets/images/image7.jpg`},
        {captionTitle: "ТОРТ НАПАЛЕОН", captionText: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.", src: `../assets/images/image8.jpg`},
        {captionTitle: "ТОРТ С КЛУБНИКОЙ", captionText: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.", src: `../assets/images/image10.jpg`},
      ];
      config.showNavigationArrows = true;
      config.showNavigationIndicators = true;
  }

  ngOnInit() {
    
  }

}
