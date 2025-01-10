import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdventureItem } from '../../../models/adventure-item.interface';

@Component({
  selector: 'app-adventure-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adventure-item.component.html',
  styleUrl: './adventure-item.component.css'
})
export class AdventureItemComponent {
  @Input() item?: AdventureItem;
  @Input() index?: number;
  @Output() deleteItem = new EventEmitter();

  delete() {
    this.deleteItem.emit();
  }
}
