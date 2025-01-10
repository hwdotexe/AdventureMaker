import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdventureButton } from '../../../models/adventure-button.interface';

@Component({
  selector: 'app-adventure-button',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adventure-button.component.html',
  styleUrl: './adventure-button.component.css'
})
export class AdventureButtonComponent {
  @Input() button?: AdventureButton;

  hookInventory() {
    this.button!.inventory = {
      add: [],
      remove: [],
      requires: []
    };
  }

  addInventoryInsert() {
    this.button?.inventory?.add?.push('');
  }

  addInventoryDelete() {
    this.button?.inventory?.remove?.push('');
  }

  addInventoryRequires() {
    this.button?.inventory?.requires?.push({
      itemID: '',
      error: ''
    });
  }
}
