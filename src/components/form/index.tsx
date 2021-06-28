/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useState } from 'react'
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
  }
}))

interface Props {
  subject: string
  fields: string[]
}
export const Form: React.FC<Props> = ({ subject, fields }) => {
  const classes = useStyles()
  const generatedId = uuidv4()

  let fieldsValue: any = { id: generatedId }

  const setFieldValue = (field: string, value: any) => {
    fieldsValue[field] = value
    console.log(fieldsValue)
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    create(subject, fieldsValue)
    document.location.href = 'http://localhost:3000/'
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
              return (
                <Grid item xs={12}>
                  <TextField name={field} variant='outlined' required fullWidth id={field} label={field} autoFocus onChange={(e) => setFieldValue(field, e.target.value)} />
                </Grid>
              )
            })}
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
