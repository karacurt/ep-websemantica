import React, { useContext, useEffect, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { ApiContext } from '../../contexts/ApiContext'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 400
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
)
interface SelectProps {
  field: string
  fields: string[]
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void
}
export const SelectBox: React.FC<SelectProps> = ({ field, fields, handleChange }) => {
  const classes = useStyles()

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id='demo-simple-select-label'>Selecione o campo</InputLabel>
      <Select labelId='demo-simple-select-label' id='demo-simple-select' value={field} onChange={handleChange}>
        {fields.map((field) => (
          <MenuItem value={field} key={field}>
            {field}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
