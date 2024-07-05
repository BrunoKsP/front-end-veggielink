import { ChangeEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import { IconButton, InputAdornment, Typography } from "@mui/material";
import Seo from "../../../components/Seo";
import { DivText, FlexWrap, Logo, MainPage, Image, Card } from "./styles";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { sigIn } from "../../../services/User";
import LoadingSpinner from "../../../components/Loader";
import { setToken } from "../../../services/api";
import Notification from "../../../components/Notification";
import { useNavigate } from "react-router-dom";
interface IForm {
  name: string;
  email: string;
  segment?: string;
  password: string;
  photo?: string;
  description?: string;
}

const validationSchema = yup.object({
  name: yup.string().required("Campo obrigatório"),
  email: yup
    .string()
    .required("Campo obrigatório")
    .email("Insira um email valido"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(8, "Tamanho minimo de 8 caracteres")
    .max(10, "Tamanho máximo de 10"),
  segment: yup.string(),
  photo: yup.string(),
  description: yup.string().max(150, "Máximo de 150 caracteres"),
});

export default function SigIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [notification, setNotification] = useState<{type: "success" | "error" | "warning"; content: string; } | null>(null);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const submitForm = useCallback(
    async (data: IForm) => {
      setLoading(true);
      try {
        const response = await sigIn(data);
        const token = response.data.token;
        setToken(token);
        navigate("/products");
      } catch (error) {
        const errorMessage =
          (error as any).response?.data?.error || "Erro ao criar sua  conta!";
        setNotification({ type: "error", content: errorMessage });
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const handleChange =
    (
      name: "name" | "email" | "password" | "photo" | "description" | "segment"
    ) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(name, e.target.value === "" ? undefined : e.target.value, {
        shouldValidate: true,
      });
    };

  return (
    <>
      {<Seo title="Criar Conta" description="" />}
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
              <h1>Cadastre-se</h1>
            </DivText>
            <Image>
              <Logo
                src={require("../../../assets/Images/LogoVeggie.png")}
                alt="logo"
              />
            </Image>
            {loading ? (
              <LoadingSpinner></LoadingSpinner>
            ) : (
              <>
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
                  name="email"
                  label="Email"
                  type={"text"}
                  id="email"
                  onChange={handleChange("email")}
                  helperText={
                    errors.email && (
                      <Typography variant="body2" color="error">
                        {errors.email.message}
                      </Typography>
                    )
                  }
                  sx={{ borderRadius: 1 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="senha"
                  label="Senha"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange("password")}
                  autoFocus
                  helperText={
                    errors.password && (
                      <Typography variant="body2" color="error">
                        {errors.password.message}
                      </Typography>
                    )
                  }
                  sx={{ borderRadius: 1 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    inputProps: {
                      maxLength: 10,
                    },
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="segment"
                  label="Segmento"
                  type={"text"}
                  id="segmento"
                  onChange={handleChange("segment")}
                  helperText={
                    errors.segment && (
                      <Typography variant="body2" color="error">
                        {errors.segment?.message}
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
                <a
                  href="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h4>Já possui uma conta? Faça Login</h4>
                </a>
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
                  Criar Conta
                </Button>
              </>
            )}
          </FlexWrap>
        </Card>
      </MainPage>
    </>
  );
}
