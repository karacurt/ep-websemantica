import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { getAllUsers } from '../../services/user'
import { UsersContext } from '../../contexts/UsersContext'
import { User } from '../../types'

interface Column {
  id: 'name' | 'email' | 'password'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'email', minWidth: 170 },
  { id: 'password', label: 'password', minWidth: 170 }
]

interface Data {
  name: string
  code: string
  population: number
  size: number
  density: number
}

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  }
})

export const UsersData: React.FC = () => {
  const { users, getUsers } = useContext(UsersContext)

  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [rows, setRows] = useState([] as User[])
  useEffect(() => {
    console.log('rodando o get users uma vez')
    getUsers()
  }, [])

  useEffect(() => {
    console.log('+++++++++atualizou o users++++++')
    console.log(users)
    console.log('+++++++++rows before++++++')
    console.log(rows)
    setRows(users)
    console.log('+++++++++rows after++++++')
    console.log(rows)
  }, [users, rows])

  const dataRows = () => {}
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              console.log('pegando row')
              console.log(row)
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.email}>
                  {columns.map((column) => {
                    console.log('column id-->')
                    console.log(column.id)
                    console.log('row-->')
                    console.log(row)
                    const value = row[column.id]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination rowsPerPageOptions={[10, 25, 100]} component='div' count={rows.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
    </Paper>
  )
}
