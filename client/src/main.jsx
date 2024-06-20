import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from './App.jsx'


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>
)