import React, {useEffect} from 'react';
import { Helmet } from 'react-helmet';
import {useSnackbar} from "notistack";
import PrimeSearchAppBar from "../features/ConstructorDataset/components/Header/components/AppBar/PrimarySearchAppBar";

export const PageConstructorDataSet: React.FC = () => {

    const { enqueueSnackbar } = useSnackbar();

    useEffect( () => {
        //enqueueSnackbar("Привет", {variant: 'success'})
    }, []);
    return (
        <div>
            <Helmet>
                <title>Data Box - Конструктор выбранного датасета</title>
            </Helmet>
            <PrimeSearchAppBar/>
        </div>
    )
};
