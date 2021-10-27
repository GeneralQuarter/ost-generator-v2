import { FC } from 'react';
import styled from 'styled-components';
import { ItemModel } from '../model/item.model';
import { OSTModel } from '../model/ost.model';
import ItemBucket from './ItemBucket';

const Container = styled.div`
  border: 1px solid lightgrey;
`;

const Title = styled.h3`
  width: 100%;
  padding: 8px;
  width: 100%;
  background-color: #515151;
  color: white;
  margin: 0;
`;

const BucketList = styled.div`
  display: flex;
`;

interface Props {
  ost: OSTModel;
  statusesOrder: string[];
  items: {[itemId: string]: ItemModel};
}

const OST: FC<Props> = ({ ost, statusesOrder, items }) => {
  return <Container>
    <Title>{ost.id}</Title>
    <BucketList>
      {statusesOrder.map(status => {
        const itemsByStatus = ost.itemIdsByStatus[status].map(id => items[id])
        return <ItemBucket key={status} title={status} bucketId={`${ost.id}__${status}`} items={itemsByStatus} />
      })}
    </BucketList>
  </Container>
};

export default OST;