import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actionTypes from  '../../store/actions'
import { Grid, Container, Paper, Button, Typography } from '@material-ui/core';
import axios from 'axios'
import { authenticationService } from '../../_services';


class Items extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }
  
    componentDidMount() {
      axios.post("http://localhost:3000/menu/fetchmenu", { outlet_id : authenticationService.currentUserValue.outlet_id })
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

    
        // this.setState({
        //   isLoaded: true,
        //   items:[
        //     {
        //       id: 1,
        //       name: "mango",
        //       price : 100
        //     },
        //     {
        //       id: 2,
        //       name: "masc",
        //       price : 200
        //     },
        //     {
        //       id: 3,
        //       name: "macvj",
        //       price : 500
        //     }

        //   ]
        // })
    

    addItem = (item) => {
      var obj = {id: item.item_id, name: item.item_name, quantity:1, price:item.price}
      this.props.addBillingItems(obj)
    }

    isItemAdded = (id) => {
      return (this.props.billingItems.find(billingItem => billingItem.id == id) != undefined)
    } 

    render() {

     

        const itemstyle = {
            backgroundColor: '#fefefe',
            height: 70,
            width: 150,
            outline: 'none',
            overflow: 'none'
        }

        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {


          var filteredItems = items

          if (this.props.searchValue != "" && this.props.searchValue != undefined){
            filteredItems = [...items.filter( item => item.item_name.toLowerCase().includes(this.props.searchValue.toLowerCase()))]
          }

          if(this.props.categoryValue != "" && this.props.categoryValue != undefined){
            filteredItems = [...filteredItems.filter( item => item.category == this.props.categoryValue )]
          }
          
          return (
            <>  
              <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={3}>                              
                {filteredItems.map(item => (            
                  <Grid item key={item.item_id}>

                    <Button variant="contained" style={itemstyle} onClick={this.addItem.bind(this, item)} disabled={this.isItemAdded(item.item_id)}>

                      <Typography nowrap key={item.item_id} variant='button' style={{padding: 'auto', margin: 'auto'}}>
                          {item.item_name}<br></br><Typography variant='subtitle1' style={{color: '#edc65a', fontSize:'12px'}}>{item.price}</Typography>
                      </Typography>

                    </Button>

                  </Grid>  
                ))}
              </Grid>
            </>
          );
        }
    }
    
}

const mapStateToProps = state => {
  return {
    billingItems: state.BIR.billingItems,
    searchValue: state.FIR.searchValue,
    categoryValue: state.FIR.categoryValue
  }
}
const mapDispatchToProps = dispatch => {
  return {
      addBillingItems: (billingItem) => dispatch({type: actionTypes.ADD, billingItem: billingItem }), 
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Items);




  
    
  
