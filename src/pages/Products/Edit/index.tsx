import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import { Typography } from "@mui/material";
import Seo from "../../../components/Seo";
import { DivText, FlexWrap, MainPage, Card, NavBar, ImageView } from "./styles";
import { MenuOutlined } from "@ant-design/icons";
import DrawerPage from "../../../components/Drawer";
import Notification from "../../../components/Notification";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/Loader";
import { getProductById, updateProduct } from "../../../services/Product";
import SelectCategory from "../../../components/SelectCategorys";
import BasicDatePicker from "../../../components/DatePicker";
import ImageUploader from "../../../components/Image64";

interface IForm {
  name: string;
  status: number;
  description?: string;
  category?: string;
  thumb?: string;
  categoryId?: string;
  plantingDate: Date;
  harverstDate: Date;
  preparingDate: Date;
  observation: string;
  fertilizer: string;
}

interface ProductData {
  id: string;
  name: string;
  description?: string;
  thumb: string;
  categoryId?: string;
  plantingDate: Date;
  harverstDate: Date;
  preparingDate: Date;
  observation: string;
  fertilizer: string;
}

const validationSchema = yup.object({
  name: yup.string().required("Campo obrigatório"),
  plantingDate: yup.date().required("Campo obrigatório"),
  description: yup.string().max(150, "Máximo de 150 caracteres"),
});

const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [categoryId, setCategoryId] = useState<string>("");
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "warning";
    content: string;
  } | null>(null);

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    register,
  } = useForm<IForm>({
    mode: "all",
    defaultValues: {
      name: product?.name,
      description: product?.description,
    },
    resolver: yupResolver(validationSchema) as any,
  });

  const submitForm = useCallback(
    async (data: IForm) => {
      setLoading(true);
      try {
        if (id)
          await updateProduct(id, {
            ...data,
          status: 1,
          categoryId: categoryId || "undefined",
          });
        navigate(`products/info-product/${id}`);
      } catch (error: any) {
        setNotification({ type: "error", content: "Erro Editar Produto!" });
      } finally {
        setLoading(false);
      }
    },
    [categoryId, id, navigate]
  );

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductById(id as string);
        setProduct(data.data);
        console.log("chamei use");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      <Seo title="Editar Produto" description="Edite seu produto" />
      <NavBar>
        <MenuOutlined
          onClick={() => toggleDrawer(!drawerOpen)}
          style={{ fontSize: "24px" }}
        />
        <DrawerPage open={drawerOpen} onClose={() => toggleDrawer(false)} />
      </NavBar>
      <MainPage>
        {notification && (
          <Notification
            type={notification.type}
            content={notification.content}
          />
        )}
        <Card>
          <FlexWrap>
            <DivText>
              <h1>Editar Produto</h1>
            </DivText>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                <ImageView>
                  <ImageUploader
                    onChange={(img) => setValue("thumb", img)}
                    defaultValue={product?.thumb}
                  />
                </ImageView>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Nome"
                  type={"text"}
                  id="nome"
                  defaultValue={product?.name}
                  {...register("name")}
                  helperText={
                    errors.name && (
                      <Typography variant="body2" color="error">
                        {errors.name.message}
                      </Typography>
                    )
                  }
                  sx={{ borderRadius: 1 }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Descricao"
                  type={"text"}
                  id="descricao"
                  defaultValue={product?.description}
                  {...register("description")}
                  helperText={
                    errors.description && (
                      <Typography variant="body2" color="error">
                        {errors.description?.message}
                      </Typography>
                    )
                  }
                  sx={{ borderRadius: 1 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Observação"
                  type={"text"}
                  id="observation"
                  defaultValue={product?.observation}
                  {...register("observation")}
                  helperText={
                    errors.observation && (
                      <Typography variant="body2" color="error">
                        {errors.observation.message}
                      </Typography>
                    )
                  }
                  sx={{ borderRadius: 1 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Fertilizante"
                  type={"text"}
                  id="fertilizer"
                  defaultValue={product?.fertilizer}
                  {...register("fertilizer")}
                  helperText={
                    errors.fertilizer && (
                      <Typography variant="body2" color="error">
                        {errors.fertilizer.message}
                      </Typography>
                    )
                  }
                  sx={{ borderRadius: 1 }}
                />
                <SelectCategory
                  onChange={(categoryId) => {
                    setCategoryId(categoryId);
                  }}
                />
                <BasicDatePicker
                  label="Data de Preparação"
                  onChange={(date) => {
                    setValue("preparingDate", date ?? new Date());
                  }}
                />
                <BasicDatePicker
                  label="Data de Plantio"
                  onChange={(date) => {
                    setValue("plantingDate", date ?? new Date());
                  }}
                  defaultValue={product?.plantingDate}
                />
                <BasicDatePicker
                  label="Data de Colheita"
                  onChange={(date) => {
                    setValue("harverstDate", date ?? new Date());
                  }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  disableElevation
                  onClick={handleSubmit(submitForm)}
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
                  Editar
                </Button>
              </>
            )}
          </FlexWrap>
        </Card>
      </MainPage>
    </>
  );
};

export default EditProduct;
