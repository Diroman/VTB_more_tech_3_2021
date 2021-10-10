import React from 'react';
import { Helmet } from 'react-helmet';
import PrimeSearchAppBar from "../features/DatasetsBase/components/Header/components/AppBar/PrimarySearchAppBar";

export const PageDatasetsBase: React.FC = () => {

    return (
        <div>
            <Helmet>
                <title>Data Box - База датасетов</title>
            </Helmet>
            <PrimeSearchAppBar/>
        </div>
    )
};
