import styled from 'styled-components';
interface ButtonProps {
  readonly inputColor: string;
}
export const Button = styled.button<ButtonProps>`
  background-color: ${(props) =>
    props.inputColor ? props.inputColor : '#393e46'};
  border: 1px solid #333;
  width: 180px;
  color: ${(props) => (props.inputColor ? 'black' : 'white')};
  border-radius: 5px;
  padding: 1em;
  font-size: 1rem;

  cursor: pointer;
`;

export const NextButton = styled.button`
  padding-top: 1rem;
  background-color: #393e46;
  color: white;
  font: 20px sans-serif;
  font-size: 1em;
  margin: 1em;
  padding: 1em 1em;
  border-radius: 10px;
  cursor: pointer;
`;
