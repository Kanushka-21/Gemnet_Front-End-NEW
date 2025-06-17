import React from 'react';
import { Layout, Typography } from 'antd';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer: React.FC = () => {
  return (
    <AntFooter style={{ textAlign: 'center', padding: '20px 0' }}>
      <Text>© {new Date().getFullYear()} GemNet. All Rights Reserved.</Text>
    </AntFooter>
  );
};

export default Footer;