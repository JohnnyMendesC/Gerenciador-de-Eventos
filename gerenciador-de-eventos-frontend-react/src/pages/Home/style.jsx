import styled from 'styled-components';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Button from '@mui/joy/Button';

export const HomeContainer = styled.div`
  margin-top: 5em;
  padding: 20px;
  background-color: #F9F9F9;
`;

export const Div = styled.div`
  position: relative;
  margin-top: -2em;
  margin-bottom: 2em;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 0px;
  color: #ab8742;
  font-family: 'Alex Brush', cursive;
  font-size: 3em;
`;

export const EventosGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
`;

export const EventoCard = styled.div`
  width: 300px;
  height: 400px;
  border-radius: 50px 50px 0 0px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
`;

export const EventoImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 50px 50px 0 0;
`;

export const EventoButton = styled.button`
  margin-top: 10px;
  background-color: #A7B48C;
  color: white;
  border: none;
  cursor: pointer;
  font-family: 'Comfortaa', sans-serif;
  &:hover {
    background-color: #9f6273;
  }
`;

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledModalDialog = styled(ModalDialog)`
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const StyledButton = styled(Button)`
  margin-top: 10px;
  box-sizing: border-box;
  background-color: #A7B48C !important;
  color: white !important;
  font-family: 'Comfortaa', sans-serif !important;
  &:hover {
    background-color: #9f6273 !important;
  }
`;