import React from 'react';
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import {Accordion, AccordionDetails, AccordionSummary, Button, Divider, InputAdornment, Stack} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import { IResult } from '../../../SingleDataSet/components/DatasetInfo/components/DatasetInfoCard/DatasetInfoCard';
import {useSnackbar} from "notistack";
import {ICard} from "../../../Main/components/Cards/components/cards";
import { IAllResult } from '../../../Constructor/components/ChooseData/components/ChooseDataComponent';
import consImage from '../../../../common/assets/constructor.png';

interface ParamTypes{
    id?: string;
}

const Constructor = () => {

    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = React.useState<ICard[]>([]);
    const [filteredData, setFilteredData] = React.useState<ICard[]>([]);
    const [search, setSearch] = React.useState<string>('');
    const [firstData, setFirstData] = React.useState<IResult>();
    const [value, setValue] = React.useState<string[]>(['foo', 'bar']);
    const { id } = useParams<ParamTypes>();

    const operationsArray = ['Фильтр', 'Суммировать', 'Присоединить данные', 'Сортировка', 'Количестово строк']

    const handleAddChip = (chip: string) => {
        console.log('add', chip)
        const newValues = [...value, chip]
        setValue(newValues);
    }

    const handleDeleteChip = (ship: string, index: number) => {
        console.log('delete');
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try{
                axios.get(`http://185.246.64.216:8000/get_dataset/?urn=${id}`, {
                    method: 'GET',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        mode: 'no-cors',
                    }
                }).then(res => {
                    const result: IResult = res.data;
                    setFirstData(result);
                })
            } catch (error) {
                enqueueSnackbar("Произошла неизвестная ошибка с карточками", {variant: 'error'})
            }

        };
        const fetchAllData = async () => {
            try{
                axios.get('http://185.246.64.216:8000/search?query=*', {
                    method: 'GET',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        mode: 'no-cors',
                    }
                }).then(res => {
                    const result: IAllResult = res.data;
                    const dataset = result.dataset;
                    setData(dataset);
                    setFilteredData(dataset);
                })
            } catch (error) {
                enqueueSnackbar("Произошла неизвестная ошибка с карточками", {variant: 'error'})
            }

        };
        fetchAllData();
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
            console.log(isExpanded);
            if (isExpanded) {
                try {
                    axios.get('http://185.246.64.216:8000/search?query=*', {
                        method: 'GET',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json',
                            mode: 'no-cors',
                        }
                    }).then(res => {
                        const result: IAllResult = res.data;
                        const dataset = result.dataset;
                        setData(dataset);
                        setFilteredData(dataset);
                    })
                } catch (e){
                    console.log(e)
                }
            }
        };

    return (
        <div>
            <Typography variant="h4" gutterBottom component="div">
               Конструктор
            </Typography>
            <img src={consImage} alt={'constructor'}/>
            <Button style={{marginTop: '10px'}}>
                Сгенерировать файл с правилами
            </Button>
            {
                /*
                 <Typography variant="h5" noWrap>
                Данные
            </Typography>

            <Stack direction="row" spacing={2}>
                <Paper style={{padding: '10px'}}>{firstData?.schemaMetadata.name}</Paper>
            </Stack>
        <div style={{display: 'flex',justifyContent: 'space-around'}}>
            <div style={{display: 'flex',flexDirection: 'column'}}>
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
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content"
                                    id="panel1bh-header">
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

                                        </div>
                                    }
                                </AccordionDetails>
                                <Divider/>
                                <AccordionSummary>
                                    <Button
                                        onClick={() => console.log('add')}
                                        variant="outlined"
                                        size="small"
                                        style={{marginLeft: 'auto'}}
                                    >Выбрать</Button>
                                </AccordionSummary>
                            </Accordion>

                        )
                    })}
                </List>
            </Card>
            </div>

            <div style={{display: 'flex',flexDirection: 'column'}}>
            <Typography variant={"h6"} gutterBottom>
                Выберите операцию
            </Typography>
            <Card sx={{ minWidth: 275, width: '25%', padding: '20px' }}>
                <TextField
                    fullWidth
                    label="Искать операцию"
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

                <List
                    sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 300,
                        '& ul': { padding: 0 },
                    }}
                    subheader={<li />}
                >
                        <li key={`Фильтр`}>
                            <ul>
                                <ListSubheader>{`Присоединить данные`}</ListSubheader>
                                {[0, 1, 2].map((item) => (
                                    <ListItem key={`item-Присоединить данные-${item}`}>
                                        <ListItemText primary={`Item ${item}`} />
                                    </ListItem>
                                ))}
                            </ul>
                        </li>
                </List>
            </Card>
            </div>
</div>
                 */
            }



        </div>

    );
}

export default Constructor;
