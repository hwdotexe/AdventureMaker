import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AdventureStep } from '../../../models/adventure-step.interface';

@Component({
  selector: 'app-adventure-step',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adventure-step.component.html',
  styleUrl: './adventure-step.component.css'
})
export class AdventureStepComponent {
  @Input() step?: AdventureStep;
}
