import React  from 'react';
import { Helmet } from 'react-helmet';
import PrimeSearchAppBar from "../features/SingleDataSet/components/Header/components/AppBar/PrimarySearchAppBar";
export const PageSingleDataset: React.FC = () => {

    return (
        <div>
            <Helmet>
                <title>Datazilla - Описание датасета</title>
            </Helmet>
            <PrimeSearchAppBar/>
        </div>
    )
};
