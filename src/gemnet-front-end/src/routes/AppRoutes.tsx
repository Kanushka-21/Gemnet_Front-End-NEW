import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import BuyerDashboard from '../pages/BuyerDashboard';
import GemDetailsPage from '../pages/GemDetailsPage';
import HomePage from '../pages/HomePage';
import MarketplacePage from '../pages/MarketplacePage';
import NotFoundPage from '../pages/NotFoundPage';
import SellerDashboard from '../pages/SellerDashboard';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/buyer" component={BuyerDashboard} />
        <Route path="/seller" component={SellerDashboard} />
        <Route path="/marketplace" component={MarketplacePage} />
        <Route path="/gems/:id" component={GemDetailsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default AppRoutes;