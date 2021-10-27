export interface OSTModel {
  id: string;
  itemIdsByStatus: {[status: string]: string[]};
}