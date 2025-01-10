export interface AdventureButton {
  label: string;
  stepID: string;
  route?: string;
  inventory?: {
    add?: string[];
    remove?: string[];
    requires?: {
      itemID: string;
      error: string;
    }[];
  };
}
