import React from 'react';
import { Helmet } from 'react-helmet';
import PrimeSearchAppBar from "../features/ConstructorDataset/components/Header/components/AppBar/PrimarySearchAppBar";

export const PageConstructorDataSet: React.FC = () => {

    return (
        <div>
            <Helmet>
                <title>Data Box - Конструктор выбранного датасета</title>
            </Helmet>
            <PrimeSearchAppBar/>
        </div>
    )
};
