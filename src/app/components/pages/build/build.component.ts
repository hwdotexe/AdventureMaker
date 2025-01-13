import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdventureModel } from '../../../models/adventure-model.interface';
import { ScopeFilterPipe } from '../../../pipes/scope-filter/scope-filter.pipe';
import { AdventureItemComponent } from '../../ui/adventure-item/adventure-item.component';
import { AdventureStepComponent } from '../../ui/adventure-step/adventure-step.component';

@Component({
  selector: 'app-build',
  standalone: true,
  imports: [CommonModule, FormsModule, AdventureStepComponent, AdventureItemComponent, ScopeFilterPipe],
  templateUrl: './build.component.html',
  styleUrl: './build.component.css'
})
export class BuildComponent implements OnInit {
  json = '';
  validateMessages: string[] = [];
  gameModel: AdventureModel;
  scopeStep: string = '';

  constructor(private router: Router) {
    this.gameModel = {
      steps: [],
      items: []
    };
  }

  ngOnInit(): void {
    var local = localStorage.getItem('advmaker');

    if (local) {
      this.json = local;
      this.gameModel = JSON.parse(local) as AdventureModel;
    }
  }

  parse() {
    try {
      this.gameModel = JSON.parse(this.json) as AdventureModel;
    } catch (e) {
      window.alert('Error parsing the provided JSON');
      console.log(e);
    }
  }

  export() {
    this.json = JSON.stringify(this.gameModel);
    localStorage.setItem('advmaker', this.json);
  }

  play() {
    this.export();
    this.router.navigate(['/play']);
  }

  scope(stepID: string) {
    if (this.scopeStep === '') {
      this.scopeStep = stepID;
    } else {
      this.scopeStep = '';
    }
  }

  reset() {
    this.gameModel = {
      steps: [],
      items: []
    };

    this.json = '';
  }

  validate() {
    this.validateMessages = [];

    for (let step of this.gameModel.steps) {
      var stepNumber = this.gameModel.steps.indexOf(step) + 1;

      if (step.stepID.length === 0) {
        this.validateMessages.push('Step ' + stepNumber + ' has a blank ID');
      }

      if (step.buttons.length === 0) {
        this.validateMessages.push('Step ' + stepNumber + ' has 0 buttons');
      }

      for (let stepButton of step.buttons) {
        if (stepButton.stepID.length > 0) {
          if (!this.gameModel.steps.find(s => s.stepID === stepButton.stepID)) {
            this.validateMessages.push('Button in step ' + stepNumber + ' does not direct to a real step (unknown step "' + stepButton.stepID + '")');
          }
        } else if (!(stepButton.route && stepButton.route.length > 0)) {
          this.validateMessages.push('Button in step ' + stepNumber + ' does not direct anywhere');
        }

        if (stepButton.inventory) {
          for (let addItem of stepButton.inventory.add || []) {
            if (!this.gameModel.items.find(gi => gi.itemID === addItem)) {
              this.validateMessages.push('Step ' + stepNumber + ' button attempts to add an unknown item "' + addItem + '"');
            }
          }

          for (let removeItem of stepButton.inventory.remove || []) {
            if (!this.gameModel.items.find(gi => gi.itemID === removeItem)) {
              this.validateMessages.push('Step ' + stepNumber + ' button attempts to remove an unknown item "' + removeItem + '"');
            }
          }

          for (let requireItem of stepButton.inventory.requires || []) {
            if (!this.gameModel.items.find(gi => gi.itemID === requireItem.itemID)) {
              this.validateMessages.push('Step ' + stepNumber + ' button attempts to require an unknown item "' + requireItem.itemID + '"');
            }
          }
        }
      }

      if (this.gameModel.steps.indexOf(step) !== 0) {
        var hasLink = false;
        var hasDuplicateID = false;

        for (let nestedStep of this.gameModel.steps) {
          var currentIndex = this.gameModel.steps.indexOf(step);
          var nestedStepIndex = this.gameModel.steps.indexOf(nestedStep);

          if (currentIndex !== nestedStepIndex && nestedStep.stepID === step.stepID) {
            hasDuplicateID = true;
          }

          for (let nestedButton of nestedStep.buttons) {
            if (nestedButton.stepID === step.stepID) {
              hasLink = true;
              break;
            }
          }

          if (hasLink) {
            break;
          }
        }

        if (!hasLink) {
          this.validateMessages.push('Step ' + stepNumber + ' does not have any buttons that direct to it');
        }

        if (hasDuplicateID) {
          this.validateMessages.push('Duplicate Step IDs detected: ' + step.stepID);
        }
      }
    }

    for (let item of this.gameModel.items) {
      var itemNumber = this.gameModel.items.indexOf(item) + 1;
      var itemIsAdded = false;
      var itemIsRemoved = false;
      var itemIsRequired = false;

      if (item.itemID.length === 0) {
        this.validateMessages.push('Item ' + itemNumber + ' has a blank ID');
      }

      if (item.name.length === 0) {
        this.validateMessages.push('Item ' + itemNumber + ' has a blank display name');
      }

      for (let nestedStep of this.gameModel.steps) {
        for (let nestedButton of nestedStep.buttons) {
          if (nestedButton.inventory) {
            var adds = nestedButton.inventory.add?.find(ai => ai === item.itemID);
            var deletes = nestedButton.inventory.remove?.find(ri => ri === item.itemID);
            var requires = nestedButton.inventory.requires?.find(ri => ri.itemID === item.itemID);

            if (adds) {
              itemIsAdded = true;
            }

            if (deletes) {
              itemIsRemoved = true;
            }

            if (requires) {
              itemIsRequired = true;
            }
          }
        }
      }

      if (!itemIsAdded) {
        this.validateMessages.push('Item ' + itemNumber + ' is never added to the inventory');
      }

      if (!itemIsRemoved) {
        this.validateMessages.push('Item ' + itemNumber + ' is never removed from the inventory');
      }

      if (!itemIsRequired) {
        this.validateMessages.push('Item ' + itemNumber + ' is never checked in the inventory');
      }
    }

    if (this.validateMessages.length === 0) {
      this.validateMessages.push('No validation issues detected!');
    }
  }

  addStep() {
    this.gameModel?.steps.push({
      stepID: '',
      label: '',
      buttons: []
    });
  }

  addItem() {
    this.gameModel?.items.push({
      itemID: '',
      name: ''
    });
  }

  deleteStep(stepIndex: number) {
    this.gameModel.steps.splice(stepIndex, 1);
  }

  deleteItem(itemIndex: number) {
    this.gameModel.items.splice(itemIndex, 1);
  }
}
