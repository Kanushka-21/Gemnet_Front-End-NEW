import React from 'react';
import { Card, Typography, Button, List } from 'antd';
import { GemInterface } from '../../interfaces/gem.interface';

const { Title } = Typography;

interface SellerComponentsProps {
  gems: GemInterface[];
  onEdit: (gemId: string) => void;
  onDelete: (gemId: string) => void;
}

const SellerComponents: React.FC<SellerComponentsProps> = ({ gems, onEdit, onDelete }) => {
  return (
    <div>
      <Title level={3}>My Gems</Title>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={gems}
        renderItem={gem => (
          <List.Item>
            <Card
              title={gem.name}
              extra={<Button type="link" onClick={() => onEdit(gem.id)}>Edit</Button>}
              actions={[
                <Button type="danger" onClick={() => onDelete(gem.id)}>Delete</Button>
              ]}
            >
              <p>Price: ${gem.price}</p>
              <p>Description: {gem.description}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SellerComponents;