import React from 'react';
import { Helmet } from 'react-helmet';
import PrimarySearchAppBar from "../features/PersonalAccount/components/Header/components/AppBar/PrimarySearchAppBar";

export const PagePersonalAccount: React.FC = () => {

    return (
        <div>
            <Helmet>
                <title>Datazilla - Личный кабинет</title>
            </Helmet>
         <PrimarySearchAppBar/>
        </div>
    )
};
