import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
}));


export default function CustomSelect({ sortBy, getSortOption }) {
  const classes = useStyles();

  const handleChange = event => {
    getSortOption(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
      <Select
        value={sortBy}
        onChange={handleChange}
      >
        <MenuItem value={"EXP_DATE_ASC"}>Exp date up (closest)</MenuItem>
        <MenuItem value={"EXP_DATE_DESC"}>Exp date down</MenuItem>
        <MenuItem value={"LABEL_ASC"}>Label (a-z)</MenuItem>
      </Select>
    </FormControl>
  );
}