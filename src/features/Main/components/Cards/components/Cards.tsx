import React from 'react';
import DataSetCard from "./Card";
import { ICard} from './cards';
import {FlexDiv} from "./Cards.style";
import {useSnackbar} from "notistack";
import axios from 'axios';

interface IResult {
    count: number;
    dataset: ICard[];
    error: any;
    start: number;
    total: number;
}

interface IProps {
    size?: number;
}


const Cards: React.FC<IProps> = ({size}) => {
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = React.useState<any[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try{
                axios.get('http://185.246.64.216:8000/search?query=*', {
                    method: 'GET',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        mode: 'no-cors',
                    }
                }).then(res => {
                        const result: IResult = res.data;
                        const dataset = result.dataset;
                        setData(dataset);
                    })
            } catch (error) {
                enqueueSnackbar("Произошла неизвестная ошибка с карточками", {variant: 'error'})
            }

        };
        fetchData();
    }, [])


    if (size) {
        return (
            <FlexDiv>
                {   data && data.slice(0, size).map((info: ICard) => {
                    return <DataSetCard key={info.urn} card={info}/>;
                })}
            </FlexDiv>

        )
    } else{
        return (
            <FlexDiv>
                {   data && data.map((info: ICard) => {
                    return <DataSetCard key={info.urn} card={info}/>;
                })}
            </FlexDiv>

        )
    }
}

export default Cards;
