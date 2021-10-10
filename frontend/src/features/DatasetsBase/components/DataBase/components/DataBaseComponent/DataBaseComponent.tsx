import {Button, Chip, Stack, Typography} from '@mui/material';
import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Divider from "@mui/material/Divider";

const DataBaseComponent: React.FC = () => {
    const [showUpdated, setShowUpdated] = React.useState(false);
    const [showTheme, setShowTheme] = React.useState(false);
    const [showPrice, setShowPrice] = React.useState(false);

    const updatedList = ['Все', "За последний месяц", "За последний год","За последние 3 года"]
    const themeList = ['Все', 'Гуманитарные науки', 'Общественные науки', 'Биологические науки', 'Сельское хозяйство',
        'Естественные науки', 'Геонауки', 'Компьютерная инженерия', 'Архитекутра и градостроительство', 'Инженерное дело']
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
    )
}

export default DataBaseComponent;
