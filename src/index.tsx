import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import { ApolloClient, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { cache } from './cache';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './css/styles.css';
import { URI } from './utils/config-env';

const httpLink = createHttpLink({
  uri: URI,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  name: 'Trivia',
  version: '1.0',
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
