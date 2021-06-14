import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

import { Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

// prettier-ignore
const httpLink = createHttpLink({
  uri: Platform.OS === 'ios' ? 'http://localhost:4000/' : 'http://10.0.2.2:4000'
})

const authLink = setContext( async ( _, { headers }) => {
  //Leer el token para enviarlos por header
  const token = await AsyncStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})



const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});


export default client;
/* 
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: "http://10.0.2.2:4000/"
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
}); */

// If you provide a link chain to ApolloClient, you
// don't provide the `uri` option.
//const client =  new ApolloClient({
  // The `from` function combines an array of individual links
  // into a link chain
//  link: from([errorLink, httpLink]),
//  cache: new InMemoryCache()
//});

/* const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:4000/'
    })
});  */