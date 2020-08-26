import React, { useState, useContext } from 'react';
import { ItemsContext } from '../../contexts/ItemsContext/ItemsContext';
import { v4 as uuidv4 } from 'uuid';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import DateInput from '../Inputs/DateInput';
import { Paper } from '@material-ui/core';
import SaveButton from '../Buttons/SaveButton';

import { formatToTimestamp } from '../../utils/dateUtils';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: 10,
      width: 150,
    },
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  AddItemForm: {
    width: '60rem',
    maxWidth: '100%',
    margin: 10,
    padding: '20px 0 20px 0'
  },
}));

export default function AddItemForm() {
  const classes = useStyles();
  let currentDateTimestamp = Date.now();

  const { addItem } = useContext(ItemsContext);

  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState(1);
  const [date, setDate] = useState(currentDateTimestamp);

  const handleDateChange = date => {
    const expDateTimestamp = formatToTimestamp(date);
    setDate(expDateTimestamp);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      id: uuidv4(),
      label: label.trim(),
      amount,
      expDateTimestamp: date,
      expWarningCode: 0,
    }

    addItem(data);

    setLabel('');
    setAmount(1);
    setDate(currentDateTimestamp);
  }

  return (
    <Paper elevation={ 2 } className={ classes.AddItemForm }>
      <form className={ classes.root } autoComplete="off" onSubmit={ handleSubmit }>
        <Grid container justify="space-around">
          <TextField
            id="standard-basic"
            name="label"
            style={ { width: '50%' } }
            label="Item label"
            value={ label }
            onChange={ (e) => setLabel(e.target.value) }
          />
          <TextField
            id="standard-number"
            name="amount"
            label="Amount"
            type="number"
            value={ amount }
            InputLabelProps={ {
              shrink: true,
            } }
            onChange={ (e) => setAmount(e.target.value) }
          />
          <DateInput handleDateChange={ handleDateChange } date={ date } />
        </Grid>
        <SaveButton disabled={ label.length < 5 } />
      </form>
    </Paper>
  );
}
