import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { 
  CssBaseline, 
  Drawer, 
  AppBar, 
  Toolbar, 
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Grid,
  Paper,
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import CustomList from '../../components/CustomList'
import ListItem from '../../components/ListItem'

import api from '../../services/api'

import logoImg from '../../assets/lejour_logo_branco.svg'

import useStyles from './styles'

export default function VendorsInfo() {
  const classes = useStyles();

  const [open, setOpen] = useState(true);

  const [vendorsAll, setVendorsAll] = useState([{}]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    api.get('/insights/vendor/all').then((response) => {
      console.log('response')
      setVendorsAll(response.data)
    })
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>

          <Typography component="h1" variant="h5" color="inherit" noWrap className={classes.title}>
            Fornecedores
          </Typography>

          <img 
            style={{ marginRight: 25 }} 
            width={60} 
            height={60} 
            src={logoImg} 
            alt="logo le-jour"
          />
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />

        <List>
          <ListItem />
        </List>

        <Divider />
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <CustomList data={vendorsAll.slice(0, 15)} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
