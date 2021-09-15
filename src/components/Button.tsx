import styled from 'styled-components';
interface ButtonProps {
  readonly inputColor: string;
}
export const Button = styled.button<ButtonProps>`
  display: block;
  background-color: ${(props) =>
    props.inputColor ? props.inputColor : 'bisque'};
  font: 20px sans-serif;
  cursor: pointer;
  font-size: 1em;
  margin: 1em;
  padding: 1em 1em;
  border: 2px solid palevioletred;
  border-radius: 10px;
  width: 200px;
`;

export const CorrectButton = styled.button`
  display: block;
  background-color: green;
  font: 20px sans-serif;
  font-size: 1em;
  margin: 1em;
  padding: 1em 1em;
  border: 2px solid palevioletred;
  border-radius: 10px;
  width: 200px;
`;
