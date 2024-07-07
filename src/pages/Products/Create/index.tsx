import { ChangeEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import Notification from "../../../components/Notification";

import * as yup from "yup";

import { Typography } from "@mui/material";
import Seo from "../../../components/Seo";
import { DivText, FlexWrap, MainPage, Image, Card, NavBar } from "./styles";
import SelectCategory from "../../../components/SelectCategorys";
import { createProduct } from "../../../services/Product";

import LoadingSpinner from "../../../components/Loader";
import BasicDatePicker from "../../../components/DatePicker";
import { useNavigate } from "react-router-dom";
import DrawerPage from "../../../components/Drawer";
import { MenuOutlined } from "@ant-design/icons";
import ImageUploader from "../../../components/Image64";

interface IForm {
  name: string;
  description?: string;
  thumb: string;
  categoryId?: string;
  plantingDate: Date;
  preparingDate: Date;
  observation: string;
  fertilizer: string;
}

const validationSchema = yup.object({
  name: yup.string().required("Campo obrigatório"),
  plantingDate: yup.date().required("Campo obrigatório"),
  description: yup.string().max(150, "Máximo de 150 caracteres"),
});

export default function CreateProduct() {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<string | undefined>("");

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>({
    mode: "onChange",
    resolver: yupResolver(validationSchema) as any,
  });

  const submitForm = useCallback(
    async (data: IForm) => {
      setLoading(true);
      try {
        await createProduct({
          ...data,
          categoryId: categoryId,
          thumb: image,
        });
        navigate("/products");
      } catch (error) {
        <Notification type={"error"} content={"Erro ao criar Produto!"} />;
      } finally {
        setLoading(false);
      }
    },
    [categoryId, image, navigate]
  );

  const handleCategoryChange = (categoryId: string) => {
    setCategoryId(categoryId);
  };

  const handleDateChange = (date: Date | null) => {
    setValue("plantingDate", date ?? new Date());
  };

  const handleChange =
    (
      name:
        | "name"
        | "thumb"
        | "description"
        | "observation"
        | "preparingDate"
        | "fertilizer"
    ) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(name, e.target.value === "" ? undefined : e.target.value, {
        shouldValidate: true,
      });
    };

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Seo title="Criar Produto" description="Cadastre seu novo produto" />
      <NavBar>
        <MenuOutlined onClick={handleOpenDrawer} style={{ fontSize: "24px" }} />
        <DrawerPage open={drawerOpen} onClose={handleCloseDrawer} />
      </NavBar>
      <MainPage>
        <Card>
          <FlexWrap>
            <DivText>
              <h1>Cadastrar Produto</h1>
            </DivText>
            <Image></Image>
            {loading ? (
              <LoadingSpinner></LoadingSpinner>
            ) : (
              <>
                <Image>
                  <ImageUploader
                    onChange={setImage}
                    defaultValue={""}
                  />
                </Image>

                <BasicDatePicker
                  label="Data de Plantio"
                  onChange={handleDateChange}
                ></BasicDatePicker>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="thumb"
                  label="Imagem"
                  type={"text"}
                  id="thumb"
                  onChange={handleChange("thumb")}
                  helperText={
                    errors.thumb && (
                      <Typography variant="body2" color="error">
                        {errors.thumb.message}
                      </Typography>
                    )
                  }
                  sx={{ borderRadius: 1 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="name"
                  label="Nome"
                  type={"text"}
                  id="nome"
                  onChange={handleChange("name")}
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
                  required
                  fullWidth
                  name="observation"
                  label="Observação"
                  type={"text"}
                  id="observation"
                  onChange={handleChange("observation")}
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
                  name="fertilizer"
                  label="Fertilizante"
                  type={"text"}
                  id="fertilizer"
                  onChange={handleChange("fertilizer")}
                  helperText={
                    errors.fertilizer && (
                      <Typography variant="body2" color="error">
                        {errors.fertilizer.message}
                      </Typography>
                    )
                  }
                  sx={{ borderRadius: 1 }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="description"
                  label="Descricao"
                  type={"text"}
                  id="descricao"
                  onChange={handleChange("description")}
                  helperText={
                    errors.description && (
                      <Typography variant="body2" color="error">
                        {errors.description?.message}
                      </Typography>
                    )
                  }
                  sx={{ borderRadius: 1 }}
                />
                <SelectCategory
                  onChange={handleCategoryChange}
                ></SelectCategory>
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
                  Criar
                </Button>
              </>
            )}
          </FlexWrap>
        </Card>
      </MainPage>
    </>
  );
}
