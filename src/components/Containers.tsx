import styled from 'styled-components';

interface ContainerProps {
  readonly backgroundColor: string;
}

export const HeaderWrapper = styled.header`
  background-color: #8cc7f7;
  padding: 0.5em 2em;
  width: 100%;
  position: sticky;
  top: 0;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    text-decoration: none;
    display: inline-block;
    margin: 0;
    text-align: left;
    font-size: clamp(1.5rem, 2.5vw, 2rem);
  }

  span {
    cursor: pointer;
    font-size: clamp(0.7rem, 2.5vw, 1rem);
  }
`;

export const Title = styled.h1`
  margin: 0;
  text-align: center;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
`;
export const ContainerQuestion = styled.div`
  display: grid;
  max-width: 500px;
  margin: 0 auto;
  border-radius: 5px;
  grid-gap: 0.5rem;
  padding: 2px 10px;
`;

export const ContainerAnswers = styled.div`
  border-radius: inherit;
  background-color: #8cc7f7;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
`;

export const ContainerBtn = styled.div`
  text-align: center;
  padding: 1rem;
`;

export const ContainerImg = styled.div`
  border-radius: 5px;
  position: relative;
  z-index: -1;
`;

export const NumberQuestion = styled.p`
  position: absolute;
  color: white;
  left: 0;
  margin: 10px;
  background-color: red;
  padding: 5px 8px;
  border-radius: 10px;
  border: 2px solid;
`;

export const TimeContainer = styled.p`
  position: absolute;
  color: white;
  right: 0;
  //text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  bottom: 0;
  margin: 10px;
  background-color: green;
  padding: 5px 8px;
  border: 2px solid;
  border-radius: 10px;
`;

export const Score = styled.p`
  position: absolute;
  background-color: green;
  border: 2px solid;
  color: white;
  right: 0;
  margin: 10px;
  padding: 5px 5px;
  border-radius: 10px;
`;
export const ImgQuestion = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

export const ContainerTitle = styled.div<ContainerProps>`
  /* background-color: #393e46; */
  margin-top: 1em;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : '#393e46'};
  color: ${(props) => (props.backgroundColor ? 'black' : 'white')};
  padding: 0.5rem;
  text-align: center;
  border-radius: inherit;
  //font-size: clamp(1rem, 2.5vw, 2em);
`;
