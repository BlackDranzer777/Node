import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actionTypes from  '../../store/actions'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, withStyles, makeStyles, Button, Divider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import QtyButton from '../shared/QtyButton';


function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}


class Billing extends React.Component {

  constructor(props) {
    super(props);
    
  }
  // subtotal = () => {
  //   return this.props.billingItem.reduce((sum, i) => (sum.quantity*sum.price)+(i.quantity*i.price), {quantity: 0, price: 0})
  // }
    render() {

        // const useStyles = makeStyles({
        //   table: {
        //     minWidth: 650
        //   }
        // })
        // const classes = useStyles();

        const StyledTableCell = withStyles((theme) => ({
            head: {
              backgroundColor: "#759cba",
              // backgroundColor: theme.palette.common.black,
              color: theme.palette.common.white,
            },
            body: {
              fontSize: 13,
              margin: 0,
            },
          }))(TableCell);
          
          const StyledTableRow = withStyles((theme) => ({
            root: {
              '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
              },
            },
          }))(TableRow);

          const TAX_RATE = 0.07;
          // const price = row.quantity * price

          var invoiceSubtotal = 0;
          this.props.billingItem.forEach(item => {
            invoiceSubtotal += item.quantity * item.price;
          });

          // function subtotal(items) {
          //   return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
          // }

          
          // const invoiceSubtotal = this.subtotal();

          // const invoiceSubtotal = subtotal(rows);
          const invoiceTaxes = TAX_RATE * invoiceSubtotal;
          const invoiceTotal = invoiceTaxes + invoiceSubtotal;

          

        return (
            
            <TableContainer component={Paper}>
                <Table aria-label="customized table" style={{minWidth: 500}}>
                    <TableHead>
                    <TableRow padding="none">
                        <StyledTableCell align="left">Item Name</StyledTableCell>
                        <StyledTableCell align="center">Quantity</StyledTableCell>
                        <StyledTableCell align="right">Rate</StyledTableCell>
                        <StyledTableCell align="right">Amount</StyledTableCell>                      
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.props.billingItem.map((row) => (
                        <StyledTableRow key={row.id} >
                        <StyledTableCell align="left">{row.name}</StyledTableCell>
                        <StyledTableCell align="right">

                          <QtyButton incQuantity={this.props.incQuantity} decQuantity={this.props.decQuantity} counter={row.quantity} id={row.id}/>
                         
                          <Button align="center" color="secondary" startIcon={<DeleteIcon />} style={{outline: "none"}} onClick={this.props.delBillingItem.bind(this, row.id)}></Button>
                        
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.price}</StyledTableCell>
                        <StyledTableCell align="right">{row.price * row.quantity}</StyledTableCell>
                        </StyledTableRow>
                    ))}

                    <TableRow>
                      <TableCell rowSpan={3} />
                      <TableCell colSpan={2}>Subtotal</TableCell>
                      <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tax</TableCell>
                      <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                      <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                    </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
            
        )
    }
}



const mapStateToProps = state => {
  return {
      billingItem: state.BIR.billingItems
  }
}  
const mapDispatchToProps = dispatch => {
  return {
      delBillingItem: (id) => dispatch({type: actionTypes.DELETE, id: id}), 
      incQuantity: (id) => dispatch({type: actionTypes.INCREMENT, id: id}),
      decQuantity: (id) => dispatch({type: actionTypes.DECREMENT, id: id}), 
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Billing);





// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];



// export default function CustomizedTables() {
//   const classes = useStyles();

//   return (
    
//   );
// }
