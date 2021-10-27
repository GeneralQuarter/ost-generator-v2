import { StateModel } from './model/state.model';

export const data: StateModel = {
  items: {
    'i-1': {
      id: 'i-1',
      productId: '123',
    },
    'i-2': {
      id: 'i-2',
      productId: '123',
    },
    'i-3': {
      id: 'i-3',
      productId: '321',
    },
  },
  standbyItemIds: ['i-1', 'i-2', 'i-3'],
  statusesOrder: ['shipped', 'cancelled'],
  ostsOrder: ['ost-1'],
  osts: {
    'ost-1': {
      id: 'ost-1',
      itemIdsByStatus: {
        shipped: [],
        cancelled: [],
      },
    },
  },
};