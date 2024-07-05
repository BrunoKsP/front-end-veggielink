import styled from "@emotion/styled";

export const NavBar = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #e5e5e5;
  padding: 10px;
  z-index: 1000;
  max-width: 100%;
  overflow-x: hidden;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-right: 150px;
  font-size: 24px;
`;

export const StyledLink = styled.a`
  text-decoration: none;
  color: black;
  margin-left: 10px;
`;

export const ProductName = styled.h1`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 5px;
`;

export const MainPage = styled.div`
  background-color: #e5e5e5;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  margin-left: 20px;
`;

export const Card = styled.div`
  width: 80%;
  height: 80vh;
  padding: 2.5%;
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 5%;
  }
`;

export const ImageView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;

export const ProductImage = styled.img`
  display: block;
  object-fit: cover;
  border-radius: 8px;
  width: 100%;
  height: 100%;
`;

export const DescriptionView = styled.div`
  margin-top: 20px; 
  margin-bottom: 40px;
  text-align: center;
  p {
    word-wrap: break-word;
    max-width: 300px;
    margin: 0 auto;
  }
`;
