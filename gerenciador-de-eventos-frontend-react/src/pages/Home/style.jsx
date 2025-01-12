import styled from 'styled-components';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

export const HomeContainer = styled.div`
  margin-top: 6.3em;
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
  margin-bottom: -40px;
  color: #ab8742;
  font-family: 'Alex Brush', cursive;
  font-size: 3em;
`;

export const Section = styled.section`
  margin-top: -2.5em;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const EventosGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
`;

export const EventoCard = styled.div`
  background-color: #f3e7d1;
  width: 400px;
  height: 400px;
  border-radius: 50px 50px 0 0px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
`;

export const EventoImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 50px 50px 0 0;
`;

export const EventoButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #A7B48C;
  color: white;
  border: none;
  cursor: pointer;
  font-family: 'Comfortaa', sans-serif;
  border-radius: 20px;
  width: 120px;
  &:hover {
    background-color: #9f6273;
  }
`;

export const EventoNome = styled(Typography)`
  background-color: #ab8742;
  padding: 5px;
  text-align: center;
  border-radius: 0px 0px 500px 500px;
  color: white !important;
  `;

export const EventoInfo = styled(Typography)`
  display: flex;
  justify-content: space-around;
  padding: 0 10px;
  font-family: 'Comfortaa', sans-serif;
  word-wrap: break-word;
  color: #743f4e !important;
  font-weight: 600 !important;
  `;

export const EventoActions = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
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
  color: #4B4B4B;
  font-family: 'Comfortaa', sans-serif;
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

export const AddEventButton = styled(Button)`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #A7B48C !important;
  color: white !important;
  font-family: 'Comfortaa', sans-serif !important;
  cursor: pointer;
  z-index: 4;
  border-radius: 50px 50px 500px 500px !important;
  &:hover {
    background-color: #9f6273 !important;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const EditButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #A7B48C;
  color: white;
  border: none;
  cursor: pointer;
  font-family: 'Comfortaa', sans-serif;
  border-radius: 20px;
  width: 120px;
  &:hover {
    background-color: #9f6273;
  }
`;

export const DeleteButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #743f4e;
  color: white;
  border: none;
  cursor: pointer;
  font-family: 'Comfortaa', sans-serif;
  border-radius: 20px;
  width: 120px;
  &:hover {
    background-color: #9f6273;
  }
`;