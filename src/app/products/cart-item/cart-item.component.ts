import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() item: any;
  @Output() removedItem = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  removeItem(product) {
    this.removedItem.emit(product);
  }

}
