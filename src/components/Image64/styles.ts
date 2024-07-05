import { EditOutlined } from "@mui/icons-material";
import styled from "styled-components";

export const ImageView = styled.div`
  position: relative;
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

export const UploadIcon = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo escuro para destacar o ícone */
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0; /* Inicialmente invisível */
  transition: opacity 0.3s ease; /* Transição suave de opacidade */
  cursor: pointer;

  ${ImageView}:hover & {
    opacity: 1; /* Torna visível ao passar o mouse */
  }
`;

export const Icon = styled(EditOutlined)`
  color: white;
  font-size: 32px;
`;

export const HiddenInput = styled.input`
  display: none;
`;