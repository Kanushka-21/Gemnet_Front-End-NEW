import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, ShopOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Navbar: React.FC = () => {
  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="marketplace" icon={<ShopOutlined />}>
          <Link to="/marketplace">Marketplace</Link>
        </Menu.Item>
        <Menu.Item key="admin" icon={<UserOutlined />}>
          <Link to="/admin">Admin Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="seller" icon={<UserOutlined />}>
          <Link to="/seller">Seller Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="buyer" icon={<UserOutlined />}>
          <Link to="/buyer">Buyer Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="meetings" icon={<CalendarOutlined />}>
          <Link to="/meetings">Meetings</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;