import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() deleteButton = new EventEmitter();

  addItem = '';
  delItem = '';
  requires: {
    itemID: string;
    error: string;
  } = {
    itemID: '',
    error: ''
  };

  hookInventory() {
    this.button!.inventory = {
      add: [],
      remove: [],
      requires: []
    };
  }

  addInventoryInsert() {
    if (this.addItem.length === 0) {
      return;
    }

    this.button?.inventory?.add?.push(this.addItem);
  }

  removeAdd(index: number) {
    this.button?.inventory?.add?.splice(index, 1);
  }

  addInventoryDelete() {
    if (this.delItem.length === 0) {
      return;
    }

    this.button?.inventory?.remove?.push(this.delItem);
  }

  removeDelete(index: number) {
    this.button?.inventory?.remove?.splice(index, 1);
  }

  addInventoryRequires() {
    if (this.requires.itemID.length === 0 || this.requires.error.length === 0) {
      return;
    }

    this.button?.inventory?.requires?.push(structuredClone(this.requires));
  }

  removeRequires(index: number) {
    this.button?.inventory?.requires?.splice(index, 1);
  }

  delete() {
    this.deleteButton.emit();
  }
}
