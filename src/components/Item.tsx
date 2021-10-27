import { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { ItemModel } from '../model/item.model';

const Container = styled.div`
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin-bottom: 8px;
  background-color: white;
`;

interface Props {
  item: ItemModel;
  index: number;
}

const Item: FC<Props> = ({ item, index }) => {
  return <Draggable draggableId={item.id} index={index}>
    {provided => (
      <Container 
        ref={provided.innerRef}
        {...provided.draggableProps} 
        {...provided.dragHandleProps}
      >
        {item.id} - {item.productId}
      </Container>
    )}
  </Draggable>;
};

export default Item;