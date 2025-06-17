import React, { useState } from 'react';
import { Layout, Form, Input, Button, Typography, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { authService } from '../services/auth.service';

const { Title } = Typography;
const { Content } = Layout;

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await authService.login(values.email, values.password);
      message.success('Login successful!');
      history.push('/home'); // Redirect to home or dashboard after login
    } catch (error) {
      message.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="login-page">
      <Content style={{ padding: '50px', maxWidth: '400px', margin: 'auto' }}>
        <Title level={2}>Login</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default LoginPage;