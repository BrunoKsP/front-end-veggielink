import React, { useEffect, useState } from "react";
import { MenuOutlined } from "@ant-design/icons/lib/icons";
import GridProducts from "../../components/GridProducts";
import Seo from "../../components/Seo";
import { MainPage, NavBar } from "./styles";
import DrawerPage from "../../components/Drawer";
import { getProduct } from "../../services/Product";
import Notification from "../../components/Notification";
import { Skeleton } from "antd";

interface IProduct {
  id: string;
  name: string;
  thumb: string;
  categoryId: string;
}

interface ProductCategory {
  [key: string]: IProduct[];
}

const Products: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [productCategories, setProductCategories] = useState<ProductCategory>(
    {}
  );
  const [loading, setLoading] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProduct();
        setProductCategories(data.data);
      } catch (error) {
        <Notification type={"error"} content={"Erro ao buscar Produto!"} />;
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Seo title="Produtos" />
      <NavBar>
        <MenuOutlined onClick={handleOpenDrawer} style={{ fontSize: "24px" }} />
        <DrawerPage open={drawerOpen} onClose={handleCloseDrawer} />
        <h1>Produtos</h1>
      </NavBar>
      <MainPage>
        {loading && <Skeleton></Skeleton>}
        {Object.keys(productCategories).map((category) => (
          <GridProducts
            loading={loading}
            key={category}
            category={category}
            products={productCategories[category]}
          />
        ))}
      </MainPage>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const data = await getProduct();
    return {
      props: {
        products: data.data,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: {},
      },
    };
  }
}

export default Products;
