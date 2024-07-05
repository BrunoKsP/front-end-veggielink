import React, { useEffect, useState } from "react";
import { Skeleton } from "antd";
import {
  GridItem,
  ProductImage,
  GridContainer,
  Grid,
  ProductLink,
  HeaderContainer,
  CategoryTitle,
  NavBar,
} from "./styles";
import { getCategory } from "../../../services/Categorys";
import { useNavigate, useParams } from "react-router-dom";
import Seo from "../../../components/Seo";
import DrawerPage from "../../../components/Drawer";
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";
import Notification from "../../../components/Notification";
interface IProduct {
  id: string;
  name: string;
  thumb: string;
  categoryId: string;
}

interface ICategory {
  id: string;
  name: string;
  products: IProduct[];
}

const ListAllProducts: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
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
    const fetchProducts = async () => {
      try {
        const response = await getCategory(id);
        const categoryData: ICategory = response.data;
        setProducts(categoryData.products);
        setCategoryName(categoryData.name);
      } catch (error) {
        setNotification({ type: "error", content: "Erro Ao Buscar Produto!" });
        setTimeout(() => {
          navigate("/products");
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id, navigate]);

  return (
    <>
      <Seo title="Produtos" />
      <NavBar>
        <MenuOutlined onClick={handleOpenDrawer} style={{ fontSize: "24px" }} />
        <DrawerPage open={drawerOpen} onClose={handleCloseDrawer} />
        <a href="/products" style={{ textDecoration: "none", color: "black" }}>
          <h1>Produtos</h1>
        </a>
      </NavBar>
      <>
        {notification && (
          <Notification
            type={notification.type}
            content={notification.content}
          />
        )}
      </>
      <GridContainer>
        {loading ? (
          <>
            <Skeleton.Input active style={{ width: 200 }} />
            <Skeleton.Input active style={{ width: 100 }} />
          </>
        ) : (
          <>
            <HeaderContainer>
              <CategoryTitle>{categoryName}</CategoryTitle>
            </HeaderContainer>
          </>
        )}
        <Grid>
          {products.map((product) => (
            <GridItem key={product.id}>
              <ProductLink
                href={`/products/info-product/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <ProductImage src={product.thumb} alt={product.name} />
              </ProductLink>
            </GridItem>
          ))}
        </Grid>
      </GridContainer>
    </>
  );
};

export default ListAllProducts;
