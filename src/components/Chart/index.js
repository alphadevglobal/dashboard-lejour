import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../Title';

export default function Chart({ newData, title, labelY }) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>{title}</Title>
      <ResponsiveContainer>
        <LineChart data={newData} margin={{ top: 54, right: 16, bottom: 54, left: 14 }}>
          <XAxis dataKey="name" stroke={theme.palette.text.secondary} />

          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ fontSize: '12', textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              {labelY}
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="quantity" stroke="#E2645A" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
