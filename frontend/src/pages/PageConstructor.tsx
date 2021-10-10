import React  from 'react';
import { Helmet } from 'react-helmet';
import Constructor from "../features/Constructor/components/Header/components/AppBar/PrimarySearchAppBar";

export const PageConstructor: React.FC = () => {

    return (
        <div>
            <Helmet>
                <title>Data Box - Конструктор</title>
            </Helmet>
            <Constructor/>
        </div>
    )
};
