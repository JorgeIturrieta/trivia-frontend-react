import { useQuery } from '@apollo/client';
import {
  GET_CATEGORIES,
  IcategoryData,
} from '../graphql/queries/getCategories';
import { CategoryCarousel } from './CategoryCarousel';

export const CategoryScreen = () => {
  const { loading, data } = useQuery<IcategoryData>(GET_CATEGORIES);

  return (
    <>
      {loading && <p>Cargando...</p>}
      {data && <CategoryCarousel categories={data?.getCategories} />}
    </>
  );
};
