import { InMemoryCache } from '@apollo/client';
import { makeVar } from '@apollo/client';
export const isLoggedInVar = makeVar(!!localStorage.getItem('token'));
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
      },
    },
  },
});
