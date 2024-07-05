import { Button } from "@mui/material";
import { Drawer } from "antd";
import { Links, CustomDrawerHeader, LogoNavBar } from "../Drawer/styles";
import { useEffect, useState } from "react";
interface DrawerPageProps {
  onClose: () => void;
  open: boolean;
}

export default function DrawerPage({ onClose, open }: DrawerPageProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <>
      <Drawer
        title={
          <CustomDrawerHeader>
            <LogoNavBar
              src={require("../../assets/Images/LogoVeggie.png")}
              alt="logo"
            />
          </CustomDrawerHeader>
        }
        onClose={onClose}
        open={open}
        placement="left"
      >
        <Links>
          {!isLoggedIn ? (
            <a
              href="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h2>Login</h2>
            </a>
          ) : (
            <>
              <a
                href="/"
                onClick={handleLogout}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h2>Logout</h2>
              </a>
              <a
                href="/products"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h2>Produtos</h2>
              </a>
            </>
          )}
          {isLoggedIn && (
            <a
              href="/products/create-product"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h2>Criar Produtos</h2>
            </a>
          )}
          <a
            href="https://www.linkedin.com/in/brunok-siqueirap/"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h2>Contato</h2>
          </a>
          <h2>Quem Somos</h2>
        </Links>
        {!isLoggedIn && (
          <Button
            variant="contained"
            size="small"
            disableElevation
            onClick={() => {
              window.location.href = "/sigin";
            }}
            sx={{
              mt: 4,
              mb: 2,
              borderRadius: 2,
              bgcolor: "#08F9B0",
              color: "black",

              fontFamily: "Sora, sans-serif",
              "&:hover": {
                backgroundColor: "#08F9B0",
              },
            }}
          >
            Teste a plataforma
          </Button>
        )}
      </Drawer>
    </>
  );
}
