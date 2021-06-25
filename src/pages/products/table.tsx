import React, { useContext, useEffect } from 'react'
import clsx from 'clsx'
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import { ApiContext } from '../../contexts/ApiContext'
import { Payment, ShoppingCart } from '@material-ui/icons'
import { Link } from 'react-router-dom'

interface Data {
  calories: number
  carbs: number
  fat: number
  name: string
  protein: number
}

function createData(name: string, calories: number, fat: number, carbs: number, protein: number): Data {
  return { name, calories, fat, carbs, protein }
}

const rows = [createData('Cupcake', 305, 3.7, 67, 4.3), createData('Donut', 452, 25.0, 51, 4.9), createData('Eclair', 262, 16.0, 24, 6.0), createData('Frozen yoghurt', 159, 6.0, 24, 4.0), createData('Gingerbread', 356, 16.0, 49, 3.9), createData('Honeycomb', 408, 3.2, 87, 6.5), createData('Ice cream sandwich', 237, 9.0, 37, 4.3), createData('Jelly Bean', 375, 0.0, 94, 0.0), createData('KitKat', 518, 26.0, 65, 7.0), createData('Lollipop', 392, 0.2, 98, 0.0), createData('Marshmallow', 318, 0, 81, 2.0), createData('Nougat', 360, 19.0, 9, 37.0), createData('Oreo', 437, 18.0, 63, 4.0)]

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(order: Order, orderBy: Key): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

interface EnhancedTableProps {
  headCells: any[]
  classes: ReturnType<typeof useStyles>
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } = props

  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox indeterminate={numSelected > 0 && numSelected < rowCount} checked={rowCount > 0 && numSelected === rowCount} onChange={onSelectAllClick} inputProps={{ 'aria-label': 'select all desserts' }} />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'} padding={headCell.disablePadding ? 'none' : 'default'} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? <span className={classes.visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span> : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85)
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark
          },
    title: {
      flex: '1 1 100%'
    }
  })
)

interface EnhancedTableToolbarProps {
  numSelected: number
  selected: any[]
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles()
  const { numSelected, selected } = props
  const { addProductToCart, cart } = useContext(ApiContext)
  console.log('cart')
  console.log(cart)
  const addToCart = () => {
    console.log('chamado add to cart')
    console.log(selected)

    selected.forEach((product) => {
      addProductToCart(product)
    })
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color='inherit' variant='subtitle1' component='div'>
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant='h6' id='tableTitle' component='div'>
          Nutrition
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title='Delete' onClick={() => addToCart()}>
          <Link to='/cart'>
            <IconButton aria-label='delete'>
              Adicionar no carrinho <ShoppingCart />
            </IconButton>
          </Link>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton aria-label='filter list'>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2)
    },
    table: {
      minWidth: 750
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1
    }
  })
)

export const ProductsData: React.FC = () => {
  const classes = useStyles()
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('calories')
  const [selected, setSelected] = React.useState<any[]>([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const { data, getAllDataFrom } = useContext(ApiContext)

  useEffect(() => {
    getAllDataFrom('product')
  }, [])

  const headCells: any[] = data.length
    ? Object.keys(data[0]).map((key) => {
        const column = { id: key, numeric: false, disablePadding: false, label: key }

        return column
      })
    : []

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data //data.map((n) => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, product: string) => {
    const selectedIndex = selected.indexOf(product)
    let newSelected: string[] = []
    console.log('handling selected')
    console.log(selected)
    console.log(product)
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, product)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} selected={selected} />
        <TableContainer>
          <Table className={classes.table} aria-labelledby='tableTitle' size={dense ? 'small' : 'medium'} aria-label='enhanced table'>
            <EnhancedTableHead headCells={headCells} classes={classes} numSelected={selected.length} order={order} orderBy={orderBy} onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={rows.length} />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                const isItemSelected = isSelected(row)
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow hover onClick={(event) => handleClick(event, row)} role='checkbox' aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected}>
                    <TableCell padding='checkbox'>
                      <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                    </TableCell>

                    {Object.keys(row).map((key, index) => {
                      if (index === 0) {
                        return (
                          <TableCell component='th' id={labelId} scope='row' padding='none'>
                            {row[key]}
                          </TableCell>
                        )
                      }
                      return <TableCell align='right'>{row[key]}</TableCell>
                    })}
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[5, 10, 25]} component='div' count={rows.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
      </Paper>
      <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label='Dense padding' />
    </div>
  )
}
