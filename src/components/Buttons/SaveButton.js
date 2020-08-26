import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function SaveButton({ disabled = false }) {
  const classes = useStyles();

  let isDisabled = disabled;

  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      type="submit"
      disabled={isDisabled}
      className={classes.button}
      startIcon={<SaveIcon />}
    >
      Save
    </Button>
  );
}
