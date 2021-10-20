import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import {
  GET_SCORES,
  IScoreData,
  SearchScoreInput,
} from '../graphql/queries/getScores';
import { StyleTable } from './StyleTable';
import moment from 'moment';
import { formatTime } from '../helpers/formatTime';
import { Title } from './Containers';
import { Menu } from './Menu';

type Params = {
  categoryId: string;
};
export const ScoreScreen = () => {
  const { categoryId } = useParams<Params>();

  const { loading, data, error } = useQuery<
    IScoreData,
    { searchScoreInput: SearchScoreInput }
  >(GET_SCORES, {
    variables: { searchScoreInput: { idCategory: categoryId } },
    fetchPolicy: 'no-cache',
  });
  return (
    <>
      <Menu />
      <Title>Tabla de puntuaciones</Title>

      {loading && <p>Cargando...</p>}

      {data && (
        <StyleTable>
          <table>
            <thead>
              <tr>
                <th>Ranking</th>
                <th>Usuario</th>
                <th>Puntuación</th>
                <th>Tiempo</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {data.getScores.map((score, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{score.user.name}</td>
                  <td>{score.score}</td>
                  <td>{formatTime(score.time)}</td>
                  <td>
                    {moment
                      .utc(score.createdAt)
                      .local()
                      .format('DD-MM-YYYY HH:mm:ss ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </StyleTable>
      )}

      {error && <span>{error.message}</span>}
    </>
  );
};
