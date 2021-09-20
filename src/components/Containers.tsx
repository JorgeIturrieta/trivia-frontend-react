import styled from 'styled-components';
interface ContainerProps {
  readonly backgroundColor: string;
}
export const ContainerQuestion = styled.div`
  display: grid;
  max-width: 500px;
  margin: 2em auto;
  border-radius: 5px;
  grid-gap: 0.5rem;
`;

export const ContainerAnswers = styled.div`
  border-radius: inherit;
  background-color: #79b4b7;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
`;

export const ContainerBtn = styled.div`
  text-align: center;
  padding: 1rem;
`;

export const ContainerImg = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

export const ContainerTitle = styled.header<ContainerProps>`
  /* background-color: #393e46; */
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : '#393e46'};
  color: ${(props) => (props.backgroundColor ? 'black' : 'white')};
  padding: 0.5rem;

  text-align: center;
  border-radius: inherit;
  font: 0.8rem sans-serif;
`;
