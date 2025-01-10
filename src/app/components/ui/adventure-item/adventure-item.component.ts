import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AdventureItem } from '../../../models/adventure-item.interface';

@Component({
  selector: 'app-adventure-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adventure-item.component.html',
  styleUrl: './adventure-item.component.css'
})
export class AdventureItemComponent {
  @Input() item?: AdventureItem;
}
