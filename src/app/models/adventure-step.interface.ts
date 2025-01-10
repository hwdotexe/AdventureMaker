import { AdventureButton } from './adventure-button.interface';

export interface AdventureStep {
  stepID: string;
  label: string;
  self?: boolean;
  buttons: AdventureButton[];
}
