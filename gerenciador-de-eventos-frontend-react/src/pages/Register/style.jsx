import styled from 'styled-components';

export const RegisterContainer = styled.div`
  max-width: 400px;
  max-height: 100vh;
  margin: 5em auto;
  padding: 20px;
  background-color: #f3e7d1;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  text-align: center;
  margin-top: 5px;
  margin-bottom: 0px;
  color: #ab8742;
  font-family: 'Alex Brush', cursive;
  font-size: 4.2em;
`;

export const Form = styled.form`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 2px;
  color: #4B4B4B;
  font-family: 'Comfortaa', sans-serif;
`;

export const Input = styled.input`
  margin-bottom: 15px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
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