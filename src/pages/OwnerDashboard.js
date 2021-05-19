import axios from 'axios';
import { Card, CardActionArea, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { Component, useEffect, useState } from 'react'
import { authenticationService } from '../_services'
import { findByLabelText } from '@testing-library/dom';


const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto',
        width: '50%', 
        textAlign: 'center',
        padding: 50,
    },
    outletsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'grey'
    },
    outletWrapper: {
        maxWidth: 345,
        overflow: 'none',
        height: 130,
        color: '#303030',
      },
}))

export default function OwnerDashboard () {

    const classes = useStyles();
    const [records, setRecords] = useState([]);


    // const currentUser = authenticationService.currentUserValue;
    const url = 'http://localhost:3000';
    const restaurant_id = authenticationService.currentUserValue.restaurant_id;

    useEffect(() => {
        getAllOutlets();
    }, []);

    const getAllOutlets = () => {
        axios.post(`${url}/outlet/fetchall`, {restaurant_id : restaurant_id})
        .then((response) => {
            setRecords(response.data);
            console.log(response.data, 'outlets, od')
        })
        .catch(error => console.error(`Error: ${error}`));
    }

    return (
        <div className={classes.root}>
            <Grid container
                className={classes.outletsContainer} 
                spacing={7} 
                lg={12}
                direction="row"
                justify="center"
                alignItems="center" >
                
                <Grid item xl={12} lg={12} md={12} sm={12}>
                    <Typography className={classes.header} variant="h4" >
                        O U T L E T S
                    </Typography>
                </Grid>
               
            {
              records.map(record => (
                <Grid item xl={4} lg={6} md={12} key={record.outlet_id}>
                    <Card>
                        <CardActionArea className={classes.outletWrapper}>
                            <Typography variant="h6">
                                {record.outlet_name.toUpperCase()}
                            </Typography>
                        </CardActionArea>
                    </Card>
                </Grid>
              ))
            }
            </Grid>
        </div>
    )
}
