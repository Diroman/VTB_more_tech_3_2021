import React from 'react';
import { Redirect, Route, Switch } from 'react-router';


import styled from "styled-components";
import { RoutesPaths } from "../../common/enums/RoutesPaths";
import { PageMain } from "../../pages/PageMain";
import ScrollToTop from '../Scroll/ScrollToTop';
import {PageConstructor} from "../../pages/PageConstructor";
import {PageConstructorDataSet} from "../../pages/PageConstructorDataSet";
import {PageDatasetsBase} from "../../pages/PageDatasetsBase";
import {PagePersonalAccount} from "../../pages/PagePersonalAccount";
import {PageSingleDataset} from "../../pages/PageSingleDataset";


export const Router: React.FC = () => (
    <TemplateStyled>
        <ScrollToTop />
        <Switch>
            <Route
                path={RoutesPaths.MAIN}
                component={PageMain}
                exact={true}
            />
            <Route
                path={RoutesPaths.CONSTRUCTOR}
                component={PageConstructor}
                exact={true}
            />
            <Route
                path={RoutesPaths.CONSTRUCTORWITHID}
                component={PageConstructorDataSet}
                exact={true}
            />
            <Route
                path={RoutesPaths.DATABASE}
                component={PageDatasetsBase}
                exact={true}
            />
            <Route
                path={RoutesPaths.DATASETINFO}
                component={PageSingleDataset}
                exact={true}
            />
            <Route
                path={RoutesPaths.PERSONAL}
                component={PagePersonalAccount}
                exact={true}
            />
            <Redirect to={RoutesPaths.MAIN}/>
        </Switch>
    </TemplateStyled>
);


const TemplateStyled = styled.div`
  height: 100%;
`;
