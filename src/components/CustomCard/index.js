import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../Title';

const useStyles = makeStyles({
  content: {
    marginTop: 20,
    fontSize: 36,
    textAlign: 'center'
  }
});

export default function CustomCard({ title, content }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>{title}</Title>
      
      <Typography className={classes.content} component="p" variant="h4">
        {content}
      </Typography>
    </React.Fragment>
  );
}
