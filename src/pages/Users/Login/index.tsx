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
import { login } from "../../../services/User";
import { setToken } from "../../../services/api";
import LoadingSpinner from "../../../components/Loader";
import Notification from "../../../components/Notification";
import { useNavigate } from "react-router-dom";
interface IForm {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Campo obrigatório")
    .email("Insira um email valido"),
  password: yup.string().required("Campo obrigatório"),
});

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [notification, setNotification] = useState<{type: "success" | "error" | "warning";content: string;} | null>(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
      setNotification(null);
      try {
        var response = await login(data);
        const token = response.data.token;
        setToken(token);
        navigate("/products");
      } catch (error) {
        const errorMessage =
          (error as any).response?.data?.error || "Erro ao efetuar Login!";
        setNotification({ type: "error", content: errorMessage });
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const handleChange =
    (name: "email" | "password") =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(name, e.target.value, { shouldValidate: true });
    };

  return (
    <>
      {<Seo title="Login" description="" />}
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
              <h1>Bem Vindo</h1>
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
                  id="password"
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
                  }}
                />
                <a
                  href="/sigIn"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h4>Não possui uma conta? Cadastre-se</h4>
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
                  Login
                </Button>
              </>
            )}
          </FlexWrap>
        </Card>
      </MainPage>
    </>
  );
}
