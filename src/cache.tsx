import { InMemoryCache } from '@apollo/client';
import { makeVar } from '@apollo/client';
export const isLoggedInVar = makeVar(!!localStorage.getItem('token'));
export const userScoreVar = makeVar(0);
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        userScore: {
          read() {
            return userScoreVar();
          },
        },
      },
    },
  },
});
