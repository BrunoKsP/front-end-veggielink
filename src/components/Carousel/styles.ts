import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  overflow-x: auto; 
`;


export const Slide = styled.div`
  position: relative;
  display: flex; 
  justify-content: center; 
`;


export const ImageContainer = styled.div`
  position: relative;
  height: 200px;
  display: flex; 
  justify-content: center; 
  align-items: center; 
  margin: 0 10px; 
`;


export const Image = styled.img`
  max-width: 100%; 
  max-height: 100%; 
  object-fit: contain;
`;

export const MobileSlide = styled(Slide)`
  width: 50%;
  float: left;
`;
