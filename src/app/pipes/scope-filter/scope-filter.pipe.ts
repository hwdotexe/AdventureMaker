import { Pipe, PipeTransform } from '@angular/core';
import { AdventureStep } from '../../models/adventure-step.interface';

@Pipe({
  name: 'scopeFilter',
  standalone: true
})
export class ScopeFilterPipe implements PipeTransform {
  transform(steps: AdventureStep[] | undefined, stepID: string): AdventureStep[] | undefined {
    if (!stepID || stepID.length === 0) {
      return steps;
    }

    var step = steps?.find(s => s.stepID === stepID);

    if (!step || !steps) {
      return steps;
    }

    var refs = this.findSubReferenceSteps(steps, [step]);

    return refs;
  }

  private findSubReferenceSteps(steps: AdventureStep[], searchSteps: AdventureStep[]): AdventureStep[] {
    var foundReferences: AdventureStep[] = [];
    var found = false;

    // Add all searchSteps to our found references list
    searchSteps.forEach(ss => foundReferences.push(ss));

    // For every step in the game,
    for (var loopStep of steps) {
      for (var button of loopStep.buttons) {
        // If it has a button that links to a step we are searching for,
        if (searchSteps.find(ss => ss.stepID === button.stepID)) {
          // And we haven't already found this step,
          if (!foundReferences.find(r => r.stepID == loopStep.stepID)) {
            // Add it to our list of found references
            foundReferences.push(loopStep);
            found = true;
          }

          break;
        }
      }
    }

    // Run this again if we found any new references
    if (found) {
      this.findSubReferenceSteps(steps, foundReferences).forEach(sr => {
        if (!foundReferences.find(fr => fr.stepID === sr.stepID)) {
          foundReferences.push(sr);
        }
      });
    }

    return foundReferences;
  }
}
