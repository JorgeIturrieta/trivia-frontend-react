import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import {
  GET_CATEGORIES,
  IcategoryData,
} from '../graphql/queries/getCategories';

export const CategoryScreen = () => {
  const { loading, data } = useQuery<IcategoryData>(GET_CATEGORIES);

  return (
    <div>
      <h2>Seleccione una categoria</h2>
      {loading ? (
        <p> Cargando....</p>
      ) : (
        data?.getCategories.map((c, i) => {
          return (
            <Link key={i} to={`./questions/${c.id}`}>
              <div>{c.name}</div>
            </Link>
          );
        })
      )}
    </div>
  );
};
