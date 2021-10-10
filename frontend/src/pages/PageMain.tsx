import React from 'react';
import { Helmet } from 'react-helmet';
import PrimarySearchAppBar from "../features/Main/components/Header/components/AppBar/PrimarySearchAppBar";

export const PageMain: React.FC = () => {

  return (
    <div>
      <Helmet>
        <title>Data Box - Главная страница</title>
      </Helmet>
      <PrimarySearchAppBar />
    </div>
  )
};
