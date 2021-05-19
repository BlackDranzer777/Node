import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container,
         makeStyles, withStyles, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import Sidebar from '../shared/Sidebar';
import HeaderNav from '../shared/HeaderNav';


const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    table: {
        // minWidth: 650,
      },
    button1: {
        fontSize: 11,
        backgroundColor: '#4798a8',
        color: 'white',
        margin: theme.spacing(1),
    
        '&:hover,&:focus': {
              backgroundColor: '#396880',
            }, 
    },
    button2: {
        fontSize: 11,
        backgroundColor: '#cf4a4a',
        color: 'white',
        margin: theme.spacing(1),

        '&:hover,&:focus': {
            backgroundColor: '#b53535',
          }, 
    }
  });


class ManageCustomers extends React.Component {

//   const classes = useStyles();

    state = {
        customerToAdd : {
            customer_name: '',
            customer_phone : '',
            customer_email : '',
            customer_category : '',
            outlet_id : "3d75bccf-647a-47bb-8f47-9933a068a91a",
            customer_id : "2280ddba-4981-4ae1-8ab0-6e2c139ebdc0", 
        },
        customerToEdit: null,
        customerToDelete: null,
        customers: [],
        manageToggle: 'add'
    }

    componentDidMount() {
        var outletid = this.state.customerToAdd.customer_id;
      axios.post(`http://divyansh.zapto.org:3000/customer/fetchall/customer/${outletid}`)
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              customers: result.data
            });
          },
          (response) => {console.log(response.data)},
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }


    changeManageToggle = (manageToggle) => {
        this.setState({ manageToggle : manageToggle })
    }


    handleAddChange = (event) => {
        var val = event.target.name !== 'nonVeg' ? event.target.value : event.target.checked; 
        var temp = this.state.customerToAdd;
        temp[event.target.name] = val
        this.setState({customerToAdd: temp});
        console.log(this.state)
    }

    handleAddSubmit = (e) => {
        axios({
            method: 'post',
            url: 'http://divyansh.zapto.org:3000/customer/new',
            data: this.state.customerToAdd,
            headers: {'Content-Type': 'application/json' }
            })
            .then(function (response) {
                //handle success
                console.log(response.data);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            }); 
        e.preventDefault();    
    }

    handleEditState = (customerToEdit) => {
        this.setState({customerToEdit: customerToEdit})
    }

    handleEditChange = (event) => {
        var val = event.target.value; 
        var temp = this.state.customerToEdit;
        temp[event.target.name] = val
        this.setState({customerToEdit: temp});
        console.log(this.state.customerToEdit)
    }

    handleEditSave = () => {
        axios({
            method: 'post',
            url: 'http://divyansh.zapto.org:3000/customer/update',
            data: this.state.customerToEdit,
            headers: {'Content-Type': 'application/json' }
            })
            .then(function (response) {
                //handle success
                console.log(response.data);
                alert(JSON.stringify(response.data));

            })
            .catch(function (response) {
                //handle error
                console.log(response);
            }); 
        // e.preventDefault(); 


        this.setState({customerToEdit: null})
    }

    handleDelete = (id) => {
        // console.log(id)
        axios({
            method: 'delete',
            url: `http://divyansh.zapto.org:3000/customer/delete/${id}`,
            // data: this.state.customerToEdit,
            headers: {'Content-Type': 'application/json' }
            })
            .then(response => {
                //handle success
                console.log(response.data);
                this.setState({customers: [...this.state.customers.filter(customer => customer.customer_id!==id)]})
                // alert(JSON.stringify(response.data));
                return this.state.customers;
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            }); 
            
    }

    buttonToggle = (row, classes) => {
        if(this.state.customerToEdit != null && this.state.customerToEdit.customer_id==row.customer_id ){
            return(
            <TableRow key={row.customer_id} onChange={this.handleEditChange}>
            <TableCell align="left"><TextField defaultValue={row.customer_name} name="customer_name"/></TableCell>
            <TableCell align="left"><TextField defaultValue={row.customer_phone} name="customer_phone"/></TableCell>
            <TableCell align="left"><TextField defaultValue={row.customer_email} name="customer_email"/></TableCell>
            <TableCell align="left"><TextField defaultValue={row.customer_category} name="customer_category"/></TableCell>
            <TableCell align="left" style={{width: 250}}>
            <Button variant="contained" size="small" className={classes.button1} startIcon={<SaveIcon />}  onClick={() => {this.handleEditSave()}}>Save</Button>
            <Button variant="contained"  size="small" className={classes.button2} startIcon={<DeleteIcon />} onClick={() => {this.handleDelete(row.customer_id)}}>Delete</Button>
            </TableCell>
            </TableRow>
            )
        } else {
            return(
            <TableRow key={row.customer_id}>
                    <TableCell align="left">{row.customer_name}</TableCell>
                    <TableCell align="left">{row.customer_phone}</TableCell>
                    <TableCell align="left">{row.customer_email}</TableCell>
                    <TableCell align="left">{row.customer_category}</TableCell>
                    <TableCell align="left" style={{width: 250}}>
                    <Button variant="contained" size="small" className={classes.button1} startIcon={<SaveIcon />} onClick={() => {this.handleEditState(row)}}>Edit</Button>
                    <Button variant="contained"  size="small" className={classes.button2} startIcon={<DeleteIcon />} onClick={() => {this.handleDelete(row.customer_id)}}>Delete</Button>
                    </TableCell>
                </TableRow>)
        }
    }; 
  
  render() {

    const { classes } = this.props;

    var content;

    if (this.state.manageToggle == "add"){
        content = 
       ( 
        <Container maxWidth="xs">
        <div className={classes.paper}>
            {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5">
            Add customers
            </Typography>

            <form className={classes.form} onChange={this.handleAddChange} onSubmit={this.handleAddSubmit} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        autoComplete="customer_name"
                        name="customer_name"
                        variant="outlined"
                        required
                        fullWidth
                        id="customer_name"
                        label="Customer Name"
                        autoFocus
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="customer_phone"
                        label="Contact Number"
                        name="customer_phone"
                        autoComplete="customer_phone"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="customer_email"
                        label="Email"
                        name="customer_email"
                        autoComplete="email"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="customer_category"
                        label="Category"
                        name="customer_category"
                        autoComplete="customer_category"
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Next
                </Button>
            </form>
        
        </div>
        </Container> )
    }

    else if(this.state.manageToggle == "edit") {

        
        
        content =
        <TableContainer  component={Paper} style={{maxWidth: 600}}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Customer Name</TableCell>
                        <TableCell align="left">Phone</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Role</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.customers.map((row) => (
                        this.buttonToggle(row, classes)
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    }

    else {
        content = <p>Please select Add Customer/ Edit Customer</p>
    }

    return (
        <Container maxWidth="xl">
        <Grid container lg={12}>
            <Grid item lg={2}>
                <Sidebar />
            </Grid>
            <Grid item lg={10} >
                <HeaderNav changeManageToggle={this.changeManageToggle} />
            </Grid>
            <Grid container item lg={12} justify="center">
                <CssBaseline />
                    {content}
            </Grid>
        </Grid>
        </Container>
    )}
}

ManageCustomers.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ManageCustomers);



