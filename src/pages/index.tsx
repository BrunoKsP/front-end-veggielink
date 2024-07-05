import { MenuOutlined } from "@ant-design/icons";
import Seo from "../components/Seo";
import {
  DivText,
  FlexWrap,
  MainPage,
  NavBar,
  Monitoramento,
  ImgNavBar,
  LogoNavBar,
  Botoes,
} from "./styles";
import { useState } from "react";
import DrawerPage from "../components/Drawer";
import Button from "@mui/material/Button";
import Caroussel from "../components/Carousel";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };
  return (
    <>
      {<Seo title="Pagina inicial" description="inicio App VeggieLink" />}
      <NavBar>
        <MenuOutlined onClick={handleOpenDrawer} style={{ fontSize: "24px" }} />
        <ImgNavBar>
          <LogoNavBar
            src={require("../assets/Images/LogoVeggie.png")}
            alt="logo"
          />
        </ImgNavBar>
        <DrawerPage open={drawerOpen} onClose={handleCloseDrawer} />
      </NavBar>
      <MainPage>
        <FlexWrap>
          <DivText>
            <h2>Gerencie e divulgue seus produtos de maneira simplificada</h2>
          </DivText>
          <Monitoramento>
            <p> Impulsione seus produtos com a VeggieLink</p>
          </Monitoramento>
          <Button
            variant="contained"
            size="large"
            disableElevation
            onClick={() => {
              window.location.href = "/sigin";
            }}
            sx={{
              mt: 6,
              mb: 2,
              borderRadius: 2,
              bgcolor: "#08F9B0",
              color: "black",
              minWidth: 350,
              fontSize: 20,
              fontFamily: "Sora, sans-serif",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#08F9B0",
              },
            }}
          >
            Teste a plataforma
          </Button>
          <Caroussel></Caroussel>
          <DivText>
            <h2>
              Transforme a maneira como você cuida dos seus produtos coloniais
            </h2>
          </DivText>
          <Monitoramento>
            <p>
              {" "}
              Você já se perguntou quanto mais você poderia alcançar se seus
              produtos fossem mais vistos?
            </p>
          </Monitoramento>
          <Botoes>
            <Button
              variant="contained"
              size="large"
              disableElevation
              onClick={() => {
                window.location.href = "/sigin";
              }}
              sx={{
                mt: 6,
                mb: 2,
                borderRadius: 2,
                bgcolor: "#c8c6c6",
                color: "black",
                fontSize: 16,
                fontFamily: "Sora, sans-serif",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#c8c6c6",
                },
              }}
            >
              Teste a plataforma
            </Button>
            <Button
              variant="contained"
              size="large"
              disableElevation
              onClick={() => {
                window.location.href = "/sigin";
              }}
              sx={{
                mt: 6,
                mb: 2,
                borderRadius: 2,
                bgcolor: "#08F9B0",
                color: "black",
                fontSize: 16,
                fontFamily: "Sora, sans-serif",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#08F9B0",
                },
              }}
            >
              Fale com nosso time
            </Button>
          </Botoes>
        </FlexWrap>
      </MainPage>
    </>
  );
}
