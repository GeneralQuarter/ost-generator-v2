import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import ItemBucket from './components/ItemBucket';
import OST from './components/ost';
import { data } from './data';
import { StateModel } from './model/state.model';
import update from 'immutability-helper';

const Container = styled.div`
  display: flex;
`;

const OSTList = styled.div`
  display: flex;
  flex-flow: column;
  margin-left: 8px;
`;

function App() {
  const [state, setState] = useState<StateModel>(data);

  const standbyItems = state.standbyItemIds.map(id => state.items[id]);

  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const removeAction: [number, number] = [source.index, 1];
    const addAction: [number, number, string] = [destination.index, 0, draggableId];
    const reorderAction = [removeAction, addAction];

    // reorder in standby items
    if (source.droppableId === 'standbyItems' && destination.droppableId === 'standbyItems') {
      setState(update(state, {
        standbyItemIds: {
          $splice: reorderAction
        }
      }));

      return;
    }
    
    // move from standby items to ost status items (or vice versa)
    if (source.droppableId === 'standbyItems' || destination.droppableId === 'standbyItems') {
      const sourceIsStandby = source.droppableId === 'standbyItems';
      const [ostId, status] = (sourceIsStandby ? destination : source).droppableId.split('__');

      setState(update(state, {
        standbyItemIds: {
          $splice: [sourceIsStandby ? removeAction : addAction]
        },
        osts: {
          [ostId]: {
            itemIdsByStatus: {
              [status]: {
                $splice: [sourceIsStandby ? addAction : removeAction]
              }
            }
          }
        }
      }));

      return;
    }

    // reorder in ost status items
    if (source.droppableId === destination.droppableId) {
      const [ostId, status] = source.droppableId.split('__');

      setState(update(state, {
        osts: {
          [ostId]: {
            itemIdsByStatus: {
              [status]: {
                $splice: reorderAction
              }
            }
          }
        }
      }));

      return;
    }

    const [sourceOstId, sourceStatus] = source.droppableId.split('__');
    const [destinationOstId, destinationStatus] = destination.droppableId.split('__');

    // move from one ost status to another (same ost)
    if (sourceOstId === destinationOstId) {
      setState(update(state, {
        osts: {
          [sourceOstId]: {
            itemIdsByStatus: {
              [sourceStatus]: {
                $splice: [removeAction]
              },
              [destinationStatus]: {
                $splice: [addAction]
              }
            }
          },
        }
      }));

      return;
    }

    // move from one ost to another
    setState(update(state, {
      osts: {
        [sourceOstId]: {
          itemIdsByStatus: {
            [sourceStatus]: {
              $splice: [removeAction]
            }
          }
        },
        [destinationOstId]: {
          itemIdsByStatus: {
            [destinationStatus]: {
              $splice: [addAction]
            }
          }
        }
      }
    }));

    return;
  }

  return <DragDropContext onDragEnd={onDragEnd}>
    <Container>
      <ItemBucket bucketId="standbyItems" title="Standby Items" items={standbyItems} />
      <OSTList>
        {state.ostsOrder.map(id => (
          <OST key={id} 
            ost={state.osts[id]} 
            statusesOrder={state.statusesOrder} 
            items={state.items} />
        ))}
      </OSTList>
    </Container>
  </DragDropContext>;
}

export default App;
