import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import {Accordion,
    AccordionDetails, AccordionSummary,
    Button, Divider, InputAdornment } from "@mui/material";
import LayersIcon from '@mui/icons-material/Layers';
import SearchIcon from '@mui/icons-material/Search';
import StorageIcon from '@mui/icons-material/Storage';
import axios from "axios";
import {ICard} from "../../../../Main/components/Cards/components/cards";
import {useSnackbar} from "notistack";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {RoutesPaths} from "../../../../../common/enums/RoutesPaths";
import { Link } from 'react-router-dom';

interface IResult {
    count: number;
    dataset: ICard[];
    error: any;
    start: number;
    total: number;
}


const ChooseDataComponent = () => {

    const [data, setData] = React.useState<ICard[]>([]);
    const [filteredData, setFilteredData] = React.useState<ICard[]>([]);
    const [search, setSearch] = React.useState<string>('');
    const { enqueueSnackbar } = useSnackbar();

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
                    setFilteredData(dataset);
                })
            } catch (error) {
                enqueueSnackbar("Произошла неизвестная ошибка с карточками", {variant: 'error'})
            }

        };
        fetchData();
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        let value = event.target.value;
        let result = [];
        result = data.filter((piece: ICard) => {
            return piece.name.search(value) != -1;
        });

        setFilteredData(result);
    };

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleAccordionChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <>
            <Typography variant={"h6"} gutterBottom>
                Выберите данные
            </Typography>
            <Card sx={{ minWidth: 275, width: '25%', padding: '20px' }}>
                    <TextField
                        fullWidth
                        label="Искать таблицу, датасет и так далее ..."
                        id="dataset search"
                        value={search}
                        onChange={handleChange}
                        style={{marginBottom: '20px'}}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Divider/>

                    <List>
                        {   filteredData && filteredData.map((info: ICard) => {
                            return (
                                <Accordion expanded={expanded === info.name} onChange={handleAccordionChange(info.name)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <StorageIcon style={{marginRight: '10px'}} />
                                        <Typography sx={{ color: 'text.secondary' }}>{info.name}</Typography>
                                    </AccordionSummary>

                                    <AccordionDetails>
                                        <Divider/>
                                        {
                                            info && info.description && info.description[0] &&
                                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                                    <Typography variant="body2" style={{marginTop: '10px'}} gutterBottom >
                                                        {info.description[0].label}
                                                    </Typography>
                                                    <div style={{ display: 'flex', flexDirection: 'row'}}>
                                                        <Typography width={'90px'} component={"span"} variant="body2" color="text.secondary" fontWeight={600}>
                                                            Владелец:
                                                        </Typography>
                                                        <Typography component={"span"} variant="body2" color="text.secondary"  style={{marginLeft: '10px'}}>
                                                            {info.description[0].username}
                                                        </Typography>
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'row'}}>
                                                        <Typography  width={'90px'} component={"span"} variant="body2" color="text.secondary" fontWeight={600}>
                                                            Источник:
                                                        </Typography>
                                                        <Typography  component={"span"} variant="body2" color="text.secondary" style={{marginLeft: '10px'}}>
                                                            {' ' + info.description[0].url}
                                                        </Typography>
                                                    </div>

                                                </div>
                                        }
                                    </AccordionDetails>
                                    <Divider/>
                                    <AccordionSummary>
                                        <Button
                                            component={Link}
                                            to={`/constructor/${info.urn}`}
                                            variant="outlined"
                                            size="small"
                                            style={{marginLeft: 'auto'}}
                                        >Выбрать</Button>
                                    </AccordionSummary>
                                </Accordion>

                            )
                        })}
                        <Divider/>


                        <Accordion expanded={expanded === 'Сохранённые запросы'} onChange={handleAccordionChange('Сохранённые запросы')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <LayersIcon style={{marginRight: '10px'}} />
                                <Typography sx={{ color: 'text.secondary' }}>{"Сохранённые запросы"}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Divider/>
                                <Typography variant="body2" style={{marginTop: '10px'}} gutterBottom>
                                    Тут хранится список всех сохраненных запросов, над которыми недавно работал разработчик.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Divider/>

                    </List>
            </Card>
        </>

    );
}

export default ChooseDataComponent;
