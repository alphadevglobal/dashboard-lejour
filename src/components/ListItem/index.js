import React from 'react';
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BusinessIcon from '@material-ui/icons/Business';

export default function ListItems() {
  return (
    <div>
      <Link style={{ textDecoration: 'none', color: 'black' }} to="/dashboard">
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon style={{ color: '#E2645A' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      <Link style={{ textDecoration: 'none', color: 'black' }} to="/vendors">
        <ListItem button>
          <ListItemIcon>
            <BusinessIcon style={{ color: '#E2645A' }} />
          </ListItemIcon>
          <ListItemText primary="Fornecedores" />
        </ListItem>
      </Link>
    </div>
  )
}