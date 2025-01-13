import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdventureStep } from '../../../models/adventure-step.interface';
import { AdventureButtonComponent } from '../adventure-button/adventure-button.component';

@Component({
  selector: 'app-adventure-step',
  standalone: true,
  imports: [CommonModule, FormsModule, AdventureButtonComponent],
  templateUrl: './adventure-step.component.html',
  styleUrl: './adventure-step.component.css'
})
export class AdventureStepComponent {
  @Input() step?: AdventureStep;
  @Input() index?: number;
  @Input() scopeStep?: string;
  @Output() deleteStep = new EventEmitter();
  @Output() scope = new EventEmitter();

  addButton() {
    this.step?.buttons.push({
      label: '',
      stepID: '',
      route: ''
    });
  }

  delete() {
    this.deleteStep.emit();
  }

  scopeToThis() {
    this.scope.emit();
  }

  deleteButton(button: number) {
    this.step?.buttons.splice(button, 1);
  }
}
