import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Title from '../Title';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders({ data }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Top 15 Fornecedores mais solicitados</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id do Fornecedor</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Aceitos</TableCell>
            <TableCell>Recusados</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.vendor_id}>
              <TableCell>{item.vendor_id}</TableCell>
              <TableCell>{item.vendor_category}</TableCell>
              <TableCell>{item.accepted}</TableCell>
              <TableCell>{item.rejected}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore} />
    </React.Fragment>
  );
}