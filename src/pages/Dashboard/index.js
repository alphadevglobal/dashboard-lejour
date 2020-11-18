import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns'
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

import Chart from '../../components/Chart';
import CustomCard from '../../components/CustomCard';
import ListItem from '../../components/ListItem';

import getMostPopular from '../../utils/getMostPopular'

import logoImg from '../../assets/lejour_logo_branco.svg'

import api from '../../services/api'

import useStyles from './styles'

const wedding = {
  ID: 0,
  OWNER_ID: 0,
  BUDGET: 0,
  WEDDING_DATE: '',
  NUMBER_OF_GUESTS: 0,
  STYLE: ''
};

const invoice = {
  ID: 0,
  WEDDING_ID: 0,
  VENDOR_ID: 0,
  AMOUNT: 0,
  VENDOR_AMOUNT: 0,
  ACCEPTED: '',
  VENDOR_CATEGORY: ''
};

const user = {
  ID: 0,
  CREATED_AT: '',
};

const itemWithQuantityObj = { 
  name: '', 
  quantity: 0
}

export default function Dashboard() {
  const classes = useStyles();

  const [open, setOpen] = useState(true);

  const [weddings, setWeddings] = useState([wedding]);
  const [weddingAverageBudget, setWeddingAverageBudget] = useState(0);
  const [avaregeOfGuests, setAvaregeOfGuests] = useState(0);
  const [weddingsPerMonth, setWeddingsPerMont] = useState([])
  
  const [invoices, setInvoices] = useState([invoice]);
  const [mostPopularVendorCategory, setMostPopularVendorCategory] = useState(itemWithQuantityObj);
  const [mostPopularVendor, setMostPopularVendor] = useState(itemWithQuantityObj);
  
  const [users, setUsers] = useState([user])
  const [usersRegisteredPerMonth, setUsersRegisteredPerMonth] = useState([])

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    api.get('/weddings').then((response) => {
      setWeddings(response.data)
    })

    api.get('/invoices').then((response) => {
      setInvoices(response.data)
    })

    api.get('/users').then((response) => {
      setUsers(response.data)
    })
  }, []);

  useEffect(() => {
    const totalBudget = weddings.reduce((accumulator, wedding) => {
      return accumulator += wedding.BUDGET
    }, 0)

    const avarege = 
      (totalBudget / weddings.length)
      .toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})

    setWeddingAverageBudget(avarege)
  }, [weddings]);

  useEffect(() => {
    const totalOfGuests = weddings.reduce((accumulator, wedding) => {
      return accumulator += wedding.NUMBER_OF_GUESTS
    }, 0);

    setAvaregeOfGuests((totalOfGuests / weddings.length).toFixed(2))
  }, [weddings]);

  useEffect(() => {
    const allInvoicesVendors = invoices.map((invoice) => {
      return invoice.VENDOR_ID;
    })

    const vendors = allInvoicesVendors.filter((category, index) => {
      return allInvoicesVendors.indexOf(category) === index
    })

    let mostPopularVendor = getMostPopular(vendors, allInvoicesVendors)

    setMostPopularVendor(mostPopularVendor)

  }, [invoices]);

  useEffect(() => {
    const allInvoicesCategories = invoices.map((invoice) => {
      return invoice.VENDOR_CATEGORY;
    })

    const vendorCategories = allInvoicesCategories.filter((category, index) => {
      return allInvoicesCategories.indexOf(category) === index
    })

    let mostPopularCategory = getMostPopular(vendorCategories, allInvoicesCategories)

    const name = mostPopularCategory.name
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1)

    mostPopularCategory = {
      ...mostPopularCategory,
      name: formattedName
    }

    setMostPopularVendorCategory(mostPopularCategory)

  }, [invoices]);

  useEffect(() => {
    let monthsWithQuantity = [
      { name: 'Jan', quantity: 0 }, 
      { name: 'Feb', quantity: 0 }, 
      { name: 'Mar', quantity: 0 }, 
      { name: 'Apr', quantity: 0 }, 
      { name: 'May', quantity: 0 }, 
      { name: 'Jun', quantity: 0 }, 
      { name: 'Jul', quantity: 0 }, 
      { name: 'Aug', quantity: 0 }, 
      { name: 'Sep', quantity: 0 }, 
      { name: 'Oct', quantity: 0 }, 
      { name: 'Nov', quantity: 0 }, 
      { name: 'Dec', quantity: 0 }, 
    ]

    if(weddings) {
      const weddingsWithFormattedDate = weddings.map((wedding) => {
        let formattedDate = ''

        if(wedding.WEDDING_DATE) {
          const weddingDate = parseISO(wedding.WEDDING_DATE)
          formattedDate = format(weddingDate, 'MMM')
        } else {
          formattedDate = null;
        }

        return wedding = {
          ...wedding,
          WEDDING_DATE: formattedDate,
        }
      })

      for (let n = 0; n < monthsWithQuantity.length; n++) {
        weddingsWithFormattedDate.forEach((wedding) => {
          if (wedding.WEDDING_DATE === monthsWithQuantity[n].name) {
    
            monthsWithQuantity[n].quantity++
          }
        })
      }
    }

    setWeddingsPerMont(monthsWithQuantity)

  }, [weddings])

  useEffect(() => {
    let monthsWithQuantity = [
      { name: 'Jan', quantity: 0 }, 
      { name: 'Feb', quantity: 0 }, 
      { name: 'Mar', quantity: 0 }, 
      { name: 'Apr', quantity: 0 }, 
      { name: 'May', quantity: 0 }, 
      { name: 'Jun', quantity: 0 }, 
      { name: 'Jul', quantity: 0 }, 
      { name: 'Aug', quantity: 0 }, 
      { name: 'Sep', quantity: 0 }, 
      { name: 'Oct', quantity: 0 }, 
      { name: 'Nov', quantity: 0 }, 
      { name: 'Dec', quantity: 0 }, 
    ]

    if(users[1]) {
      const usersWithFormattedDate = users.map((user) => {
        const userDate = new Date(user.CREATED_AT)
        const formattedDate = format(userDate, 'MMM')

        return user = {
          ...user,
          CREATED_AT: formattedDate,
        }
      })

      for (let n = 0; n < monthsWithQuantity.length; n++) {
        usersWithFormattedDate.forEach((user) => {
          if (user.CREATED_AT === monthsWithQuantity[n].name) {
    
            monthsWithQuantity[n].quantity++
          }
        })
      }
    }

    setUsersRegisteredPerMonth(monthsWithQuantity)
  }, [users])

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
            Dashboard
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
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <CustomCard 
                  title="Valor médio por casamento" 
                  content={weddingAverageBudget} 
                  avaregeOfGuests
                />
              </Paper>
            </Grid>

            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <CustomCard 
                  title="Média de convidados" 
                  content={avaregeOfGuests}
                />
              </Paper>
            </Grid>

            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <CustomCard 
                  title="Fornecedor mais solicitado" 
                  content={`Id: ${mostPopularVendor.name}`}
                />
              </Paper>
            </Grid>

            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <CustomCard 
                  title="Ctg. de serviço mais solicitada" 
                  content={mostPopularVendorCategory.name}
                />
              </Paper>
            </Grid>

            {/* Chart */}
            <Grid item xs={12} md={8} lg={6}>
              <Paper className={fixedHeightPaper} style={{ height: 520 }}>
                <Chart 
                  title='Casamentos por mês' 
                  labelY='Qntd. de Casamentos' 
                  newData={weddingsPerMonth} 
                />
              </Paper>
            </Grid>

            {/* Chart */}
            <Grid item xs={12} md={8} lg={6}>
              <Paper className={fixedHeightPaper} style={{ height: 520 }}>
                <Chart 
                  title='Usuários cadastrados por mês' 
                  labelY='Qntd. de Usuários Cadastrados' 
                  newData={usersRegisteredPerMonth} 
                />
              </Paper>
            </Grid>

          </Grid>
        </Container>
      </main>
    </div>
  );
}
