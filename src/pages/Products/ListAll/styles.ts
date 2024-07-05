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

export const GridContainer = styled.div`
  margin-top: 50px;
  padding: 10px;
  margin-left: 8px;
`;

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const GridItem = styled.div`
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 4px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  width: 17%;
  height: 100px;
`;

export const ProductLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const ProductImage = styled.img`
  display: flex;
  object-fit: cover;
  border-radius: 8px;
  width: 100%;
  height: 100%;
`;

export const ProductName = styled.h2`
  font-size: 1.2em;
  margin: 10px 0;
`;

export const ProductCategory = styled.p`
  color: #555;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CategoryTitle = styled.h1`
  margin-bottom: 10px;
  display: flex;
  font-family: "Sora, sans-serif";
  font-size: 24px;
`;

export const MoreLink = styled.h1`
  margin-bottom: 8px;
  display: flex;
  font-family: "Sora, sans-serif";
  font-size: 18px;
  cursor: pointer;
`;
