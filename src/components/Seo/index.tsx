import React from "react";
import { Helmet } from "react-helmet";

interface IProps {
  title: string;
  description?: string;
}
const logo = require("../../assets/Images/LogoVeggie.png")
const Seo: React.FC<IProps> = ({ title, description }) => {
  return (
    <Helmet>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;700&display=swap');`}
      </style>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="icon" type="image/png" sizes="32x18" href={logo} />
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');`}
      </style>
    </Helmet>
  );
};

export default Seo;
