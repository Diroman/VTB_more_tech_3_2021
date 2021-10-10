import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {ICard} from "./cards";
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import {Divider, Fade, Tooltip} from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import {useSnackbar} from "notistack";

import imageSample from '../../../../../common/assets/images.jpeg';

interface IDataSetComponent {
  card: ICard;
}


const DataSetCard: React.FC<IDataSetComponent> = ({card}) => {
    const { enqueueSnackbar } = useSnackbar();
    const showNotification = () => {
        //enqueueSnackbar('', opions: {success});
    }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', width: '500px', height: '310px', marginBottom: '20px' }}>
          <CardContent style={{height: '255px'}} >
              <div style={{display: 'flex', flexDirection: 'row',
                  justifyContent: 'space-between', alignItems: 'start'}}>
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                      <Typography variant="h5" noWrap>
                          {card.name}
                      </Typography>
                      <div style={{display: 'flex', flexDirection: 'row'}}>
                          {

                              card && card.owners && card.owners.map((owner) => {
                                  return (
                                      <Typography style={{marginRight: '10px'}} component={"span"} variant="overline" color="text.secondary" fontWeight={600}>
                                          {owner.username}
                                      </Typography>
                                  )
                              })
                          }
                      </div>


                  </div>
              </div>

          <div style={{display: 'flex', flexDirection: 'row'}}>
            <CardMedia
                component="img"
                sx={{ width: '50%', height: '160px' }}
                image={imageSample}
                alt="card image"
                style={{alignContent: 'center', borderRadius: '5px'}}
            />
            <div style={{display: 'flex', flexWrap: 'wrap', paddingLeft: '20px', paddingRight: '10px'}}>

                <div style={{width: '120px'}}>
                    <Typography variant="caption">
                        Строки
                    </Typography>
                    <Typography variant="h4">
                        336
                    </Typography>
                </div>

                <div style={{width: '80px'}}>
                    <Typography variant="caption">
                        Колонки
                    </Typography>
                    <Typography variant="h4">
                        2
                    </Typography>
                </div>

                <div style={{width: '125px'}}>
                    <Typography variant="caption">
                        Запросы в месяц
                    </Typography>
                    <Typography variant="h4">
                        255
                    </Typography>
                </div>

            </div>
          </div>
        </CardContent>
        <Divider/>
        <CardActions style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} disableSpacing>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Tooltip title="Добавить в избранное" arrow
                         TransitionComponent={Fade}
                         TransitionProps={{ timeout: 600 }}>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Добавить в конструктор" arrow
                         TransitionComponent={Fade}
                         TransitionProps={{ timeout: 600 }}>
                    <IconButton aria-label="add to cart">
                        <PlaylistAddIcon/>
                    </IconButton>
                </Tooltip>
            </div>

          <div style={{display: 'flex', alignItems: 'center'}}>
            <Typography variant="caption" style={{marginRight: '10px' }}>
              Ratings
            </Typography>
            <Rating name="read-only" precision={0.5} value={4.5} readOnly />
          </div>

        </CardActions>

    </Card>
  );
}

export default DataSetCard;
