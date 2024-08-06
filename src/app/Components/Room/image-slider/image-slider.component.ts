import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {
  images = [
    'assets/roomComponent1.jpg',
    'https://favorparkhotel.com/wp-content/uploads/2021/09/ZOL_3525_16x9_3000px-scaled-e1634497512804.jpg',
    'https://favorparkhotel.com/wp-content/uploads/2021/10/ZOL_6960-scaled-e1634211942282.jpg',
    // додайте шляхи до ваших зображень тут
  ];
  currentIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1;
    }
  }

  next(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }
}
