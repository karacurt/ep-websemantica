/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { ArrowBack, ControlPointSharp } from '@material-ui/icons'
import { create } from '../../services/api'
import { v4 as uuidv4 } from 'uuid'
import { useHistory } from 'react-router'
import { SelectBox } from '../select'
import { Store } from '../../types'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

interface Props {
  subject: string
  fields: string[]
  categories?: string[]
  stores?: Store[]
  activities?: string[]
}
export const Form: React.FC<Props> = ({ subject, fields, categories, stores, activities }) => {
  const classes = useStyles()
  const generatedId = uuidv4()
  const [fieldStore, setFieldStore] = useState('')
  const [fieldsStore, setFieldsStore] = useState<string[]>([])
  const [fieldCategory, setFieldCategory] = useState('')
  const [fieldsCategory, setFieldsCategory] = useState(categories as [])
  const [activity, setActivity] = useState('')

  const [fieldsValue, setFieldsValue] = useState<any>({ id: generatedId })

  const setFieldValue = (field: string, value: any) => {
    fieldsValue[field] = value
    console.log(fieldsValue)
  }

  const onSubmit = (e: any) => {
    e.preventDefault()

    console.log(fieldsValue)
    create(subject, fieldsValue)

    document.location.href = `http://localhost:3000/${subject}s`
  }

  useEffect(() => {
    const allFieldsStore: string[] = []

    stores?.map((store: { name: string }) => {
      allFieldsStore.push(store.name)
    })

    setFieldsStore(allFieldsStore)
  }, [stores])

  const handleChangeStore = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFieldStore(event.target.value as string)
    fieldsValue['store'] = event.target.value as string
    console.log(fieldsValue)
  }
  const handleChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFieldCategory(event.target.value as string)
    fieldsValue['category'] = event.target.value as string
    console.log(fieldsValue)
  }
  const handleChangeActivity = (event: React.ChangeEvent<{ value: unknown }>) => {
    setActivity(event.target.value as string)
    fieldsValue['activity'] = event.target.value as string
    console.log(fieldsValue)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          New {subject}
        </Typography>
        <form className={classes.form} onSubmit={(e) => onSubmit(e)} noValidate>
          <Grid container spacing={2}>
            {fields?.map((field) => {
              if (field === 'id') {
                return
              }
              if (field === 'category') {
                return <SelectBox handleChange={handleChangeCategory} fields={fieldsCategory} field={fieldCategory} />
              }
              if (field === 'activity') {
                return <SelectBox handleChange={handleChangeActivity} fields={activities || []} field={activity} />
              }
              if (field === 'price' || field === 'quantity') {
                return (
                  <Grid item xs={12}>
                    <TextField name={field} variant='outlined' required fullWidth id={field} label={field} type='number' autoFocus onChange={(e) => setFieldValue(field, e.target.value)} />
                  </Grid>
                )
              }
              return (
                <Grid item xs={12}>
                  <TextField name={field} variant='outlined' required fullWidth id={field} label={field} autoFocus onChange={(e) => setFieldValue(field, e.target.value)} />
                </Grid>
              )
            })}
            {subject === 'product' ? (
              <FormControl className={classes.formControl}>
                <InputLabel id='demo-simple-select-label'>Selecione o campo </InputLabel>
                <Select labelId='demo-simple-select-label' id='demo-simple-select' value={fieldStore} onChange={handleChangeStore}>
                  {stores ? (
                    stores.map((store) => (
                      <MenuItem value={store.name} key={store.id}>
                        {store.name}
                      </MenuItem>
                    ))
                  ) : (
                    <h1>sem lojas cadastradas</h1>
                  )}
                </Select>
              </FormControl>
            ) : null}
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            Create
          </Button>
          <Grid container justify='flex-end'></Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}
