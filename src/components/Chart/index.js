import React from 'react';
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../Title';

export default function Chart({ newData, title, labelY }) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>{title}</Title>
      <ResponsiveContainer>
        <LineChart data={newData} margin={{ top: 0, right: 16, bottom: 16, left: 24 }}>
          <XAxis dataKey="name" stroke={theme.palette.text.secondary} />

          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              {labelY}
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="quantity" stroke="#006D77" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
