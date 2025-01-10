import { AdventureItem } from './adventure-item.interface';
import { AdventureStep } from './adventure-step.interface';

export interface AdventureModel {
  steps: AdventureStep[];
  items: AdventureItem[];
}
