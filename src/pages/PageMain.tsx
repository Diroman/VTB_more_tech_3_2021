import React, {useEffect} from 'react';
import { Helmet } from 'react-helmet';
import {useSnackbar} from "notistack";
import PrimarySearchAppBar from "../features/Main/components/Header/components/AppBar/PrimarySearchAppBar";

export const PageMain: React.FC = () => {

  const { enqueueSnackbar } = useSnackbar();

  useEffect( () => {
    enqueueSnackbar("Привет", {variant: 'success'})
  }, []);
  return (
    <div>
      <Helmet>
        <title>Data Box - Главная страница</title>
      </Helmet>
      <PrimarySearchAppBar />
    </div>
  )
};
