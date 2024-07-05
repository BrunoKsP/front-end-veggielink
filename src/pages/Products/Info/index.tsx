import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons/lib/icons";
import Seo from "../../../components/Seo";
import {
  Card,
  DescriptionView,
  Header,
  HeaderContainer,
  ImageView,
  MainPage,
  NavBar,
  ProductImage,
  ProductName,
  StyledLink,
} from "./styles";
import DrawerPage from "../../../components/Drawer";
import { getProductById } from "../../../services/Product";
import { Button } from "@mui/material";
import Notification from "../../../components/Notification";
import { QRCode } from "antd";

interface ProductData {
  id: string;
  name: string;
  thumb: string;
  description: string;
}

const InfoProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id as string);
        setProduct(data.data);
      } catch (error) {
        <Notification type={"error"} content={"Erro ao buscar Produto!"} />;
      }
    };

    fetchProduct();

    const token = sessionStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, [id]);

  const downloadQRCode = async () => {
    try {
      const canvas = document
        .getElementById("myqrcode")
        ?.querySelector<HTMLCanvasElement>("canvas");
      if (canvas) {
        const url = canvas.toDataURL();
        const a = document.createElement("a");
        a.download = "QRCode.png";
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Seo title="Produtos" />
      <NavBar>
        <MenuOutlined onClick={handleOpenDrawer} style={{ fontSize: "24px" }} />
        <HeaderContainer>
          <StyledLink href="/products">
            <ProductName>Produtos</ProductName>
          </StyledLink>
        </HeaderContainer>

        <DrawerPage open={drawerOpen} onClose={handleCloseDrawer} />
        <Header>
          <ProductName>/{product?.name}</ProductName>
        </Header>
      </NavBar>
      <MainPage>
        <Card>
          <ImageView>
            <ProductImage src={product?.thumb} alt={product?.name} />
          </ImageView>
          <DescriptionView>
            <p>{product?.description}</p>
          </DescriptionView>
          <Button
            variant="contained"
            fullWidth
            size="small"
            disableElevation
            href={`/products/timeline-product/${id}`}
            sx={{
              mt: 1,
              mb: 2,
              borderRadius: 2,
              bgcolor: "#08F9B0",
              color: "black",
              fontSize: 15,
              fontFamily: "Sora, sans-serif",
              fontWeight: 800,
              "&:hover": {
                backgroundColor: "#08F9B0",
              },
            }}
          >
            Ver Trajetória
          </Button>
          {isLoggedIn ? (
            <>
              <div id="myqrcode">
                <QRCode
                  value={`https://front-end-veggielink.vercel.app/products/timeline-product/${id}`}
                  bgColor="#fff"
                  style={{ display: "none" }}
                />
              </div>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={downloadQRCode}
                disableElevation
                sx={{
                  mt: 1,
                  mb: 2,
                  borderRadius: 2,
                  bgcolor: "#08F9B0",
                  color: "black",
                  fontSize: 15,
                  fontFamily: "Sora, sans-serif",
                  fontWeight: 800,
                  "&:hover": {
                    backgroundColor: "#08F9B0",
                  },
                }}
              >
                Gerar QRCODE
              </Button>
              <Button
                variant="contained"
                fullWidth
                size="small"
                disableElevation
                href={`/products/edit-product/${id}`}
                sx={{
                  mt: 1,
                  mb: 2,
                  borderRadius: 2,
                  bgcolor: "#08F9B0",
                  color: "black",
                  fontSize: 15,
                  fontFamily: "Sora, sans-serif",
                  fontWeight: 800,
                  "&:hover": {
                    backgroundColor: "#08F9B0",
                  },
                }}
              >
                Editar
              </Button>
            </>
          ) : null}
          {!isLoggedIn && (
            <>
              <a
                href="/sigIn"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h4>Compre direto com o produtor</h4>
              </a>
              <Button
                variant="contained"
                fullWidth
                size="small"
                disableElevation
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: 2,
                  bgcolor: "#08F9B0",
                  color: "black",
                  fontSize: 15,
                  fontFamily: "Sora, sans-serif",
                  fontWeight: 800,
                  "&:hover": {
                    backgroundColor: "#08F9B0",
                  },
                }}
              >
                Comprar
              </Button>
            </>
          )}
        </Card>
      </MainPage>
    </>
  );
};

export default InfoProduct;
