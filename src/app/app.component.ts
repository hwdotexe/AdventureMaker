import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdventureItemComponent } from './components/ui/adventure-item/adventure-item.component';
import { AdventureStepComponent } from './components/ui/adventure-step/adventure-step.component';
import { AdventureModel } from './models/adventure-model.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, AdventureStepComponent, AdventureItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  json = '';
  gameModel?: AdventureModel;

  parse() {
    try {
      this.gameModel = JSON.parse(this.json) as AdventureModel;

      console.log(this.gameModel);
    } catch (e) {
      window.alert('Error parsing the provided JSON');
      console.log(e);
    }
  }

  export() {
    this.json = JSON.stringify(this.gameModel);
  }
}
