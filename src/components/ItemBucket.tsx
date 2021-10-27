import { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { ItemModel } from '../model/item.model';
import Item from './Item';

const Container = styled.div`
  min-width: 150px;
`;

const ItemList = styled.div`
  padding: 8px;
  min-height: 100px;
  border: 1px solid lightgrey;
`;

const Title = styled.h4`
  width: 100%;
  padding: 8px;
  width: 100%;
  background-color: #414141;
  color: white;
  margin: 0;
  text-transform: capitalize;
`;

interface Props {
  bucketId: string;
  title: string;
  items: ItemModel[];
}

const ItemBucket: FC<Props> = ({bucketId, title, items}) => {
  return <Container id={bucketId}>
    <Title>{title}</Title>
    <Droppable droppableId={bucketId}>
      {provided => (
        <ItemList 
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {items.map((item, index) => (<Item key={item.id} item={item} index={index} />))}
          {provided.placeholder}
        </ItemList>
      )}
    </Droppable>
  </Container>;
};

export default ItemBucket;