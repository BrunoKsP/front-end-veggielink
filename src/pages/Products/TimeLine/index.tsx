import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons/lib/icons";
import Seo from "../../../components/Seo";
import DrawerPage from "../../../components/Drawer";
import { getProductById } from "../../../services/Product";
import Notification from "../../../components/Notification";
import {
  Header,
  StyledLink,
  ProductName,
  ImageView,
  ProductImage,
  DescriptionView,
  Card,
  CardTimeLine,
  HeaderContainer,
  NavBar,
  MainPage,
} from "./styles";
import { Timeline } from "antd";

interface ProductData {
  id: string;
  name: string;
  thumb: string;
  description: string;
  observation: string;
  fertilizer: string;
  plantingDate: string;
  harverstDate: string;
  preparingDate: string;
}

const TimeLineProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "warning";
    content: string;
  } | null>(null);

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
        setNotification({ type: "error", content: "Erro Ao Buscar Produto!" });
        setTimeout(() => {
          navigate("/products");
        }, 3000);
      }
    };

    fetchProduct();
  }, [id, navigate]);

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
        {notification && (
          <Notification
            type={notification.type}
            content={notification.content}
          />
        )}
        <Card>
          <ImageView>
            <ProductImage src={product?.thumb} alt={product?.name} />
          </ImageView>
          <DescriptionView>
            <p>{product?.description}</p>
          </DescriptionView>
        </Card>
        <CardTimeLine>
          <Timeline
            items={[
              {
                color: "green",
                children: `Colhido dia ${product?.harverstDate?.slice(0, 10)}`,
              },
              {
                color: "red",
                children: (
                  <>
                    <p>Observações:{product?.observation}</p>
                  </>
                ),
              },
              {
                children: (
                  <>
                    <p>Adubação {product?.fertilizer}</p>
                  </>
                ),
              },
              {
                color: "gray",
                children: (
                  <>
                    <p>Data de Plantio {product?.plantingDate.slice(0, 10)}</p>
                  </>
                ),
              },
              {
                color: "gray",
                children: (
                  <>
                    <p>Preparação do Solo {product?.preparingDate.slice(0, 10)}</p>
                  </>
                ),
              },
            ]}
          />
        </CardTimeLine>
      </MainPage>
    </>
  );
};

export default TimeLineProduct;
