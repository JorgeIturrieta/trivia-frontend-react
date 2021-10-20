import styled from 'styled-components';

export const StyleTable = styled.div`
  padding: 1rem;
  overflow-x: auto;
  margin: 0 20px;
  table {
    border-spacing: 0;
    border: 1px solid black;

    margin-left: auto;
    margin-right: auto;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      text-align: center;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;
