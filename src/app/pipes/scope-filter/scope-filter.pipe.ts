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

    var newList = [];

    if (steps.indexOf(step) > 0) {
      newList.push(step);

      var workingStepID = step.stepID;

      for (var i = 0; i < steps.length; i++) {
        for (var loopStep of steps) {
          for (var button of loopStep.buttons) {
            if (button.stepID === workingStepID) {
              workingStepID = loopStep.stepID;

              if (!newList.find(nl => nl.stepID === loopStep.stepID)) {
                newList.push(loopStep);
              }

              break;
            }
          }
        }
      }

      return newList;
    }

    return steps;
  }
}
