import React from 'react';
import { Layout } from 'antd';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Navbar from '../common/Navbar';

const AdminComponents: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Navbar />
      <Layout.Content style={{ padding: '20px' }}>
        {/* Admin specific content goes here */}
      </Layout.Content>
      <Footer />
    </Layout>
  );
};

export default AdminComponents;