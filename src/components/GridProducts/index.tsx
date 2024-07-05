import React from "react";
import { Skeleton } from "antd";
import {
  GridItem,
  ProductImage,
  GridContainer,
  Grid,
  ProductLink,
  HeaderContainer,
  CategoryTitle,
  MoreLink,
} from "./styles";
import { useNavigate } from "react-router-dom";

interface IProduct {
  id: string;
  name: string;
  thumb: string;
  categoryId: string;
}

interface IProps {
  category?: string;
  products: IProduct[];
  loading: boolean;
}

const GridProducts: React.FC<IProps> = ({ category, products, loading }) => {
  const navigate = useNavigate();
  const productsToDisplay = products.slice(0, 5);

  const redirect = () => {
    navigate(`/products/${products[0].categoryId}`);
  };

  return (
    <GridContainer>
      {loading ? (
        <>
          <Skeleton.Input active style={{ width: 200 }} />
          <Skeleton.Input active style={{ width: 100 }} />
        </>
      ) : (
        <>
          <HeaderContainer>
            {category && <CategoryTitle>{category}</CategoryTitle>}
            <MoreLink onClick={redirect}>Ver Mais</MoreLink>
          </HeaderContainer>
        </>
      )}
      <Grid>
        {productsToDisplay.map((product) => (
          <GridItem key={product.id}>
            {loading ? (
              <Skeleton.Image active />
            ) : (
              <ProductLink
                href={`/products/info-product/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <ProductImage src={product.thumb} alt={product.name} />
              </ProductLink>
            )}
          </GridItem>
        ))}
      </Grid>
    </GridContainer>
  );
};

export default GridProducts;
