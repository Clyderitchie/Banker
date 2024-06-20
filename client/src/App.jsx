import React from 'react';
import { useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './app.css';

import Login from './pages/login/login';
import Home from './pages/home/home';
import CustomerInfo from './pages/customerInfo/customerInfo';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const AuthLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: AuthLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path='/' element={<Login handleLogin={handleLogin} />} />
            <Route path='/home' element={<Home />} />
            <Route path='/customers/:clientId' element={<CustomerInfo />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  )
}

export default App
