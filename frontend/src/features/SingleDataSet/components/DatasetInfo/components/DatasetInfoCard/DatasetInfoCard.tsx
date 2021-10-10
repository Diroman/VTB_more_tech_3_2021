import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from "axios";
import {useSnackbar} from "notistack";
import {Redirect, useParams} from "react-router-dom";
import {Chip, Divider} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DescriptionIcon from '@mui/icons-material/Description';
import ClearIcon from '@mui/icons-material/Clear';

interface IField {
    type: string;
    field: string;
    description: string;
    nullable: boolean;
}

interface IOwner {
    type: string;
    userType?: string;
    username?: string;
    urn: string;
    email?: string;
    fullName?: string;
    pictureLink?: string;
}

interface IForeignKey {
    field: string;
    parent: string;
}

interface IInfo {
    url: string;
    label: string;
    description: string;
    username: string;
}

export interface IResult {
    info: IInfo[],
    platform :{
        urn?: string;
        name?: string;
    },
    schemaMetadata: {
        name: string;
        primaryKeys: string[] ;
        foreignKeys: IForeignKey[],
        fields: IField[]
    },
    owners: IOwner[],
    error?: null | any;
}

interface ParamTypes{
    id?: string;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const DatasetInfoCard = () => {

    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = React.useState<IResult>();
    const { id } = useParams<ParamTypes>();

    const [value1, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

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
                    console.log('result', result)
                   // const dataset = result.dataset;
                    setData(result);
                })
            } catch (error) {
                enqueueSnackbar("Произошла неизвестная ошибка с карточками", {variant: 'error'})
            }

        };
        fetchData();
    }, [])

    return (
        <div>
            <Typography variant="h4" gutterBottom component="div" style={{ marginBottom: '10px'}}>
                {data?.schemaMetadata.name}
            </Typography>
            <div style={{display: 'flex', flexDirection: 'row'}}>
            <Box sx={{ width: '60%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value1} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Схема" {...a11yProps(0)} />
                        <Tab label="Документация" {...a11yProps(1)} />
                        <Tab label="Свойства" {...a11yProps(2)} />
                    </Tabs>
                </Box>

                <TabPanel value={value1} index={0}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="body1" fontWeight={600}>
                                            Поле
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1" fontWeight={600}>
                                            Тип
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1" fontWeight={600}>
                                            Описание
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1" fontWeight={600}>
                                            Nullable
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data && data.schemaMetadata.fields.map((row) => {
                                        return (
                                            <TableRow
                                                key={row.field}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.field}
                                                </TableCell>
                                                <TableCell>{row.type}</TableCell>
                                                <TableCell>{row.description}</TableCell>
                                                <TableCell> <ClearIcon/> </TableCell>
                                            </TableRow>
                                            )

                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>

                <TabPanel value={value1} index={1}>
                    <div style={{textAlign: 'center'}}>
                        <DescriptionIcon/>
                        <Typography>
                            Документации еще нет
                        </Typography>
                    </div>
                </TabPanel>

                <TabPanel value={value1} index={2}>
                   Свойства датасета
                </TabPanel>
            </Box>


               <Divider orientation="vertical" flexItem />

                <Box sx={{ width: '40%' }}>
                    <div style={{padding: '20px'}}>
                        <Typography variant="body1" fontWeight={600} gutterBottom>
                            О проекте
                        </Typography>
                        {
                            data && data.info && data.info[0] &&
                            <Typography variant="body2" color={'text.secondary'}>
                                {data.info[0].description}<br/>
                                Пример набора данных, которые были предоставлены нам в рамках хакатона от ВТБ.
                            </Typography>
                        }
                    </div>
                        <Divider/>
                    <div style={{padding: '20px'}}>
                        <Typography variant="body1" fontWeight={600} gutterBottom>
                            Владелец
                        </Typography>
                        {
                            data && data.info.map((owner) => {
                                return (
                                    <>
                                        <Chip
                                            label={owner.username}
                                            variant="outlined"
                                        />
                                    </>
                                )
                            })
                        }
                    </div>
                </Box>


            </div>
        </div>
    )
}

export default DatasetInfoCard;
