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
import ManageLayout from '../Layout/ManageLayout'


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


class ManageItems extends React.Component {

//   const classes = useStyles();

    state = {
        itemToAdd : {
            item_name: '',
            price: null,
            // quantity: 1,
            category: '',
            nonVeg: false,
            outlet_id : "ggggggiiiiii"
        },
        itemToEdit: null,
        itemToDelete: null,
        items: [],
        manageToggle: 'add'
    }

    componentDidMount() {
      axios.post("http://divyansh.zapto.org:3000/menu/fetchmenu", { outlet_id : "ggggggiiiiii" })
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.data
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
        var temp = this.state.itemToAdd;
        temp[event.target.name] = val
        this.setState({itemToAdd: temp});
        console.log(this.state)
    }

    handleAddSubmit = (e) => {
        axios({
            method: 'post',
            url: 'http://divyansh.zapto.org:3000/menu/newitem',
            data: this.state.itemToAdd,
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

    handleEditState = (itemToEdit) => {
        this.setState({itemToEdit: itemToEdit})
    }

    handleEditChange = (event) => {
        var val = event.target.value; 
        var temp = this.state.itemToEdit;
        temp[event.target.name] = val
        this.setState({itemToEdit: temp});
        console.log(this.state.itemToEdit)
    }

    handleEditSave = () => {
        axios({
            method: 'post',
            url: 'http://divyansh.zapto.org:3000/menu/updateitem',
            data: this.state.itemToEdit,
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


        this.setState({itemToEdit: null})
    }

    handleDelete = (id) => {
        // console.log(id)
        axios({
            method: 'delete',
            url: `http://divyansh.zapto.org:3000/menu/deleteitem/${id}`,
            // data: this.state.itemToEdit,
            headers: {'Content-Type': 'application/json' }
            })
            .then(response => {
                //handle success
                console.log(response.data);
                this.setState({items: [...this.state.items.filter(item => item.item_id!==id)]})
                // alert(JSON.stringify(response.data));
                return this.state.items;
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            }); 
            
    }

    buttonToggle = (row, classes) => {
        if(this.state.itemToEdit != null && this.state.itemToEdit.item_id==row.item_id ){
            return(
            <TableRow key={row.item_id} onChange={this.handleEditChange}>
            <TableCell align="left"><TextField defaultValue={row.item_id} name="item_id"/></TableCell>
            <TableCell align="left"><TextField defaultValue={row.item_name} name="item_name"/></TableCell>
            <TableCell align="left"><TextField defaultValue={row.category} name="category"/></TableCell>
            <TableCell align="right"><TextField defaultValue={row.price} name="price"/></TableCell>
            {/* <TableCell align="center"><TextField defaultValue={row.quantity} name="quantity"/></TableCell> */}
            <TableCell align="left" style={{width: 250}}>
            <Button variant="contained" size="small" className={classes.button1} startIcon={<SaveIcon />}  onClick={() => {this.handleEditSave()}}>Save</Button>
            <Button variant="contained"  size="small" className={classes.button2} startIcon={<DeleteIcon />} onClick={() => {this.handleDelete(row.item_id)}}>Delete</Button>
            </TableCell>
            </TableRow>
            )
        } else {
            return(
            <TableRow key={row.item_id}>
                    <TableCell align="left">{row.item_id}</TableCell>
                    <TableCell align="left">{row.item_name}</TableCell>
                    <TableCell align="left">{row.category}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    {/* <TableCell align="center">{row.quantity}</TableCell> */}
                    <TableCell align="left" style={{width: 250}}>
                    <Button variant="contained" size="small" className={classes.button1} startIcon={<SaveIcon />} onClick={() => {this.handleEditState(row)}}>Edit</Button>
                    <Button variant="contained"  size="small" className={classes.button2} startIcon={<DeleteIcon />} onClick={() => {this.handleDelete(row.item_id)}}>Delete</Button>
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
            Add Items
            </Typography>

            <form className={classes.form} onChange={this.handleAddChange} onSubmit={this.handleAddSubmit} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        autoComplete="ItemName"
                        name="item_name"
                        variant="outlined"
                        required
                        fullWidth
                        id="ItemName"
                        label="Item Name"
                        autoFocus
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="Price"
                        label="Price"
                        name="price"
                        autoComplete="Price"
                    />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="quantity"
                        label="Quantity"
                        name="quantity"
                        autoComplete="number"
                    />
                    </Grid> */}
                    {/* <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="outlet_id"
                        label="Outlet ID"
                        name="outlet_id"
                        autoComplete="outlet_id"
                    />
                    </Grid> */}
                    
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="category"
                        label="Category"
                        id="category"
                        autoComplete="category"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox name="nonVeg" color="primary" />}
                        label="Non-Veg"
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
                    Add Item
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
                        <TableCell align="left">Item ID</TableCell>
                        <TableCell align="left">Item Name</TableCell>
                        <TableCell align="left">Category</TableCell>
                        <TableCell align="right">Price</TableCell>
                        {/* <TableCell align="center">Total Quantity</TableCell> */}
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.items.map((row) => (
                        this.buttonToggle(row, classes)
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    }

    else {
        content = <p>Please select Add Item/ Edit Item</p>
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

ManageItems.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ManageItems);



