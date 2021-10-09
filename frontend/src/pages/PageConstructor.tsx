import React, {useEffect} from 'react';
import { Helmet } from 'react-helmet';
import {useSnackbar} from "notistack";
import Constructor from "../features/Constructor/components/Header/components/AppBar/PrimarySearchAppBar";

export const PageConstructor: React.FC = () => {

    const { enqueueSnackbar } = useSnackbar();

    useEffect( () => {
        //enqueueSnackbar("Привет", {variant: 'success'})
    }, []);
    return (
        <div>
            <Helmet>
                <title>Data Box - Конструктор</title>
            </Helmet>
            <Constructor/>
        </div>
    )
};
