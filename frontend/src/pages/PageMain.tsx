import React from 'react';
import { Helmet } from 'react-helmet';
import PrimarySearchAppBar from "../features/Main/components/Header/components/AppBar/PrimarySearchAppBar";

export const PageMain: React.FC = () => {

  return (
    <div>
      <Helmet>
        <title>Datazilla - Главная страница</title>
      </Helmet>
      <PrimarySearchAppBar />
    </div>
  )
};
