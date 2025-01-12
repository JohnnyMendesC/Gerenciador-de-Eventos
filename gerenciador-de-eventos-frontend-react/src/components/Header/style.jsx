import styled from 'styled-components';

export const HeaderContainer = styled.header`
  z-index: 5;
  width: 100%;
  max-height: 4em;
  display: flex;
  justify-content: center;
  background-color: #ab8742;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;


export const Div1 = styled.div`
  right: 1vw;
  margin-top: 0em;
`;
export const Div2 = styled.div`
  position: fixed;
  left: 0vw;
  margin-top: -1.5em;
  `;
export const Div3 = styled.div`
  position: absolute;
  right: 0vw;
  margin-top: 0em;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-self: end;
`;

export const Icone = styled.img`
  background-color: #A7B48C;
  padding: 0.5em 2.2em 0.5em 0em;
  margin-top: 1.5em;
  width: 5.6em;
  height: 6em;
  border-radius: 0px  0px 100px 0px ;
`;
export const Logo = styled.img`
  background-color: #743f4e;
  border-radius: 0px 0px 500px 500px ;
  width: 18em;
  height: 6em;
`;

export const SiteName = styled.h1`
  font-family: 'Alex Brush', cursive;
  font-size: 2.5em;
  margin: 0;
`;

export const UserInfo = styled.div`
  margin-right: px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const LeftSpan = styled.span`
  padding-top: .25em;
  font-family: 'Alex Brush', cursive;
  position: absolute;
  left: 3em;
  font-size: 2.5em;
`;

export const RightSpan = styled.span`
  padding-top: .5em;
  font-family: 'Alex Brush', cursive;
  position: absolute;
  right: 6vw;
  font-size: 2em;
`;

export const LogoutButton = styled.button`
  background-color: #A7B48C;
  align-self: flex-end;
  color: white;
  border: none;
  padding: 5px 20px 5px 20px;
  border-radius: 50px 0px 0px 0px;
  cursor: pointer;
  font-family: 'Comfortaa', sans-serif;
  &:hover {
    background-color: #9f6273;
  }
`;
