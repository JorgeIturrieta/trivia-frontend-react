import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategory {
    getCategories {
      name
      id
    }
  }
`;
export interface Icategory {
  id: string;
  name: string;
}
export interface IcategoryData {
  getCategories: Icategory[];
}
