import * as React from 'react';
import { Theme} from '@mui/material/styles';
import {makeStyles} from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ConstructionIcon from '@mui/icons-material/Construction';
import StarsIcon from '@mui/icons-material/Stars';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HelpIcon from '@mui/icons-material/Help';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import {RoutesPaths} from "../../../../../../common/enums/RoutesPaths";
import smallLogo from "../../../../../../common/assets/smallLogo.png";
import DataBaseComponent from "../../../DataBase/components/DataBaseComponent/DataBaseComponent";
import Cards from '../../../../../../features/Main/components/Cards/components/Cards';


const useStyles = makeStyles((theme: Theme) => ({
    toolbar: {
        display: "flex",
        alignItems: "center",
        marginTop: 16,
        justifyContent: "flex-end",
        padding: "0 8px",
      //  ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: 16 * 3,
        paddingTop: 100,
        display: "flex",
        flexDirection: "column",
    },
}));


const drawerWidth = 240;

const PrimeSearchAppBar: React.FC = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div style={{display: 'flex'}}>
            <AppBar
                    position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        component={Link} to={RoutesPaths.MAIN}
                    >
                        <img src={smallLogo} alt={'small logo'} height={'40px'}/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Добро пожаловать, <b>Юзер Юзеров</b>
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>
                    <ListItem button key={'Личный кабинет'}>
                        <ListItemIcon>
                            <AccountCircleIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Личный кабинет'} />
                    </ListItem>
                    <ListItem button key={'База датасетов'} component={Link} to={RoutesPaths.DATABASE}>
                        <ListItemIcon>
                            <FilterNoneIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'База датасетов'} />
                    </ListItem>
                    <ListItem button key={'Конструктор'}  component={Link} to={RoutesPaths.CONSTRUCTOR}>
                        <ListItemIcon>
                            <ConstructionIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Конструктор'} />
                    </ListItem>
                    <ListItem button key={'Избранное'}>
                        <ListItemIcon>
                            <StarsIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Избранное'} />
                    </ListItem>
                    <ListItem button key={'Мои задачи'}>
                        <ListItemIcon>
                            <AssignmentIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Мои задачи'} />
                    </ListItem>
                    <Divider/>

                    <ListItem key={'ПОМОЩЬ'}>
                        <ListItemText primary={'ПОМОЩЬ'} />
                    </ListItem>

                    <ListItem button key={'Библиотека'}>
                        <ListItemIcon>
                            <LibraryBooksIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Библиотека'} />
                    </ListItem>
                    <ListItem button key={'Поддержка'}>
                        <ListItemIcon>
                            <QuestionAnswerIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Поддержка'} />
                    </ListItem>
                    <ListItem button key={'FAQ'}>
                        <ListItemIcon>
                            <HelpIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'FAQ'} />
                    </ListItem>

                </List>
            </Drawer>
            {renderMenu}
            <main className={classes.content}>
                <DataBaseComponent/>


                <Cards/>
            </main>
        </div>
    );
}

export default PrimeSearchAppBar;
