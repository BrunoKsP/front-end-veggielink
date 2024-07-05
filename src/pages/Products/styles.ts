import styled from "@emotion/styled";

export const NavBar = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 95%;
  background-color: #e5e5e5;
  padding: 10px;
  z-index: 1000;
  max-width: 100%;
  overflow-x: hidden;
  h1 {
    margin-left: 20px;
    display: flex;
    font-family: "Sora, sans-serif";
    font-size: 24px;
  }
`;
export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
`;

export const MainPage = styled.div`
  background-color: #e5e5e5;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
`;
