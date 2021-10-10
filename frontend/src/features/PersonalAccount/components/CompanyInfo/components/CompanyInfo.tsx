import React from 'react';
import Typography from "@mui/material/Typography";
import Cards from "../../../../Main/components/Cards/components/Cards";
import Divider from "@mui/material/Divider";
import {Button, Chip, Stack} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const CompanyInfo: React.FC = () => {
    const [showUpdated, setShowUpdated] = React.useState(false);
    const [showTheme, setShowTheme] = React.useState(false);
    const [showPrice, setShowPrice] = React.useState(false);

    const updatedList = ['Все', "За последний месяц", "За последний год"]
    const themeList = ['Все', 'Компьютерная инженерия', 'Архитекутра и градостроительство', 'Инженерное дело']
    const priceList = ['Бесплатно', 'Платно']

    const handleClickUpdated = () => {
        setShowUpdated(true);
        setShowPrice(false);
        setShowTheme(false);
    }

    const handleClickTheme = () => {
        setShowUpdated(false);
        setShowTheme(true);
        setShowPrice(false);
    }

    const handleClickPrice = () => {
        setShowUpdated(false);
        setShowTheme(false);
        setShowPrice(true);
    }

    const resetFilters = () => {
        setShowUpdated(false);
        setShowTheme(false);
        setShowPrice(false);
    }



    return (
        <>
            <Typography variant="h4" gutterBottom component="div" style={{marginBottom: '20px'}}>
                Компания
            </Typography>

            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Card sx={{ minWidth: 275, width: '49%'}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Направление работы компании
                        </Typography>
                        <Stack direction="row" spacing={2} style={{paddingTop: '5px', paddingBottom: '15px'}}>
                            <Chip
                                variant="outlined"
                                label="CV"
                            />
                            <Chip
                                variant="outlined"
                                label="Machine Learning"
                            />
                        </Stack>

                        <Typography variant="body2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Cras feugiat varius maximus. <br/> Aliquam mollis pellentesque libero, eu pulvinar neque sodales vitae.
                            Duis posuere lorem mi, sit amet imperdiet libero mollis ac.
                            Suspendisse potenti.<br/> Vivamus cursus luctus viverra.
                            Integer tincidunt elit nec ultricies luctus.
                            Praesent sit amet tempor massa, a tincidunt felis.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Подробнее</Button>
                    </CardActions>
                </Card>
                <Card sx={{ minWidth: 275, width: '49%'}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Статистика
                        </Typography>
                        <div style={{display: 'flex', flexDirection: 'column', paddingRight: '10px'}}>

                            <div >
                                <Typography variant="caption">
                                    Количество датасетов
                                </Typography>
                                <Typography variant="h4">
                                    21
                                </Typography>
                            </div>

                            <div >
                                <Typography variant="caption">
                                    Количество посещений страницы
                                </Typography>
                                <Typography variant="h4">
                                    391
                                </Typography>
                            </div>

                        </div>
                    </CardContent>
                </Card>
            </div>



            <Typography variant="h4" gutterBottom component="div" style={{marginTop: '50px', marginBottom: '10px'}}>
                Датасеты компании
            </Typography>

            <div style={{marginBottom: '20px'}}>
                <Divider />
                <Stack direction="row" spacing={2} style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <Chip
                        variant="outlined"
                        avatar={<ArrowDropDownIcon />}
                        label="Последнее обновление"
                        onClick={handleClickUpdated}
                    />
                    <Chip
                        variant="outlined"
                        avatar={<ArrowDropDownIcon />}
                        label="Тема"
                        onClick={handleClickTheme}
                    />
                    <Chip
                        variant="outlined"
                        avatar={<ArrowDropDownIcon />}
                        label="Стоимость"
                        onClick={handleClickPrice}
                    />
                    <Button size="small" onClick={resetFilters}>
                        <Typography variant={'caption'}>
                            Очистить фильтры
                        </Typography>
                    </Button>
                </Stack>
                {
                    showUpdated &&
                    <Stack direction="row" spacing={2} style={{paddingTop: '10px', paddingBottom: '10px'}}>
                        {
                            updatedList && updatedList.map((el) => {
                                return (
                                    <Chip
                                        label={el}
                                        variant="outlined"
                                        clickable
                                    />
                                )
                            })
                        }
                    </Stack>
                }
                {
                    showTheme &&
                    <Stack direction="row" spacing={2} style={{paddingTop: '10px', paddingBottom: '10px'}}>
                        {
                            themeList && themeList.map((el) => {
                                return (
                                    <Chip
                                        label={el}
                                        variant="outlined"
                                        clickable
                                    />
                                )
                            })
                        }
                    </Stack>
                }
                {
                    showPrice &&
                    <Stack direction="row" spacing={2} style={{paddingTop: '10px', paddingBottom: '10px'}}>
                        {
                            priceList && priceList.map((el) => {
                                return (
                                    <Chip
                                        label={el}
                                        variant="outlined"
                                        clickable
                                    />
                                )
                            })
                        }
                    </Stack>
                }

                <Divider />
            </div>


            <Cards />


        </>

    )
}

export default CompanyInfo;
