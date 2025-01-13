import styled from 'styled-components';

export const LoginContainer = styled.div`
  max-width: 400px;
  margin: 5em auto;
  padding: 20px;
  background-color: #f3e7d1;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  text-align: center;
  margin-top: 5px;
  margin-bottom: 20px;
  color: #ab8742;
  font-family: 'Alex Brush', cursive;
  font-size: 4.5em;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  color: #4B4B4B;
  font-family: 'Comfortaa', sans-serif;
`;

export const Label2 = styled.label`
  margin-bottom: 5px;
  color: #4B4B4B;
  font-family: 'Comfortaa', sans-serif;
`;

export const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
`;

export const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  color: #4B4B4B;
  font-family: 'Comfortaa', sans-serif;
  &:focus {
    border-color: #A7B48C;
    outline: none;
  }
`;

export const Input2 = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: fit-content;
  color: #4B4B4B;
  font-family: 'Comfortaa', sans-serif;
  &:focus {
    border-color: #A7B48C;
    outline: none;
  }
`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #A7B48C;
  color: white;
  border: none;
  cursor: pointer;
  font-family: 'Comfortaa', sans-serif;
  &:hover {
    background-color: #9f6273;
  }
`;