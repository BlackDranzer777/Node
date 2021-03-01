import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container,
         makeStyles, useStyles, withStyles, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import Sidebar from '../shared/Sidebar';
import HeaderNav from '../shared/HeaderNav';

import Aux from '../../hoc/Auxx';


const ManageLayout = (props) => {

    return(
        <Aux>
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
                    <main>
                        { props.children }
                    </main>
                </Grid>
            </Grid>
        </Container>
    
        
    </Aux>
    )
}

export default ManageLayout;