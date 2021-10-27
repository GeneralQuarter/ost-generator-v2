import { ItemModel } from './item.model';
import { OSTModel } from './ost.model';

export interface StateModel {
  items: {[itemId: string]: ItemModel};
  statusesOrder: string[];
  standbyItemIds: string[];
  osts: {[ostId: string]: OSTModel};
  ostsOrder: string[];
}