import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  title: {
    color: 0,
    fontSize: 14
  }
});

export default function Title(props) {
  const classes = useStyles();

  return (
    <Typography className={classes.title} component="h2" variant="h6" gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
