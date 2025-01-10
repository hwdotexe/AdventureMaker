import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdventureButton } from '../../../models/adventure-button.interface';
import { AdventureItem } from '../../../models/adventure-item.interface';
import { AdventureModel } from '../../../models/adventure-model.interface';
import { AdventureStep } from '../../../models/adventure-step.interface';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent {
  json = '';
  gameModel: AdventureModel;
  steps: AdventureStep[];
  unlockedSteps: AdventureStep[];
  items: AdventureItem[];
  unlockedItems: AdventureItem[];

  stepsToShow = 5;

  constructor() {
    this.gameModel = {
      steps: [],
      items: []
    };

    this.steps = [];
    this.unlockedSteps = [];
    this.items = [];
    this.unlockedItems = [];
  }

  parse() {
    try {
      this.gameModel = JSON.parse(this.json) as AdventureModel;

      this.steps = this.gameModel.steps;
      this.items = this.gameModel.items;

      this.pushStep(this.gameModel.steps[0].stepID);
    } catch (e) {
      window.alert('Error parsing the provided JSON');
      console.log(e);
    }
  }

  advanceStep(currentStep: string, button: AdventureButton) {
    if (!!button.route) {
      window.alert('Navigation to: ' + button.route);
    } else {
      this.pushSelfMessage(button.label);

      if (button.inventory?.requires) {
        for (var requiredItem of button.inventory.requires) {
          if (!this.unlockedItems.find(ui => ui.itemID === requiredItem.itemID)) {
            this.pushSelfMessage(requiredItem.error);
            this.pushStep(currentStep);

            return;
          }
        }
      }

      if (button.inventory?.add) {
        for (var addItem of button.inventory.add) {
          if (!this.unlockedItems.find(ui => ui.itemID === addItem)) {
            var newItem = this.items.find(ni => ni.itemID === addItem);

            if (newItem) {
              this.unlockedItems.push(newItem);
            }
          }
        }
      }

      if (button.inventory?.remove) {
        for (var removeItem of button.inventory.remove) {
          var oldItem = this.unlockedItems.find(ui => ui.itemID === removeItem);

          if (oldItem) {
            this.unlockedItems.splice(this.unlockedItems.indexOf(oldItem), 1);
          }
        }
      }

      this.pushStep(button.stepID);
    }
  }

  private pushSelfMessage(message: string) {
    this.unlockedSteps.push({
      stepID: '',
      label: message,
      self: true,
      buttons: []
    });
  }

  private pushStep(stepID: string) {
    var nextStep = structuredClone(this.steps.find(s => s.stepID === stepID));

    if (nextStep) {
      setTimeout(() => {
        this.unlockedSteps.push(nextStep!);

        if (this.unlockedSteps.length > this.stepsToShow) {
          this.unlockedSteps.splice(0, this.unlockedSteps.length - this.stepsToShow);
        }
      }, 200);
    }
  }
}
