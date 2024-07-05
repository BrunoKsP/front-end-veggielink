import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Slide, Image, ImageContainer} from "./styles";

const CarouselInfinity = () => {
  const imagens = [
    require("../../assets/Images/syngenta.png"),
    require("../../assets/Images/embrapa.png"),
    require("../../assets/Images/feltrin.png"),
    require("../../assets/Images/yara.png"),
  ];

  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500, 
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 0, 
    draggable: false, 
    swipe: false, 
    arrows: false,
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Container>
      <Slider ref={sliderRef} {...settings}>
        {imagens.map((imagem, index) => (
          <Slide key={index}>
            <ImageContainer>
              <Image src={imagem} alt={`Imagem ${index + 1}`} />
            </ImageContainer>
          </Slide>
        ))}
      </Slider>
    </Container>
  );
  
};

export default CarouselInfinity;
