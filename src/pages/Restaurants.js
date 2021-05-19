import React, { useEffect, useState } from 'react'
import RestaurantForm from '../components/Manage/RestaurantForm'
import PageHeader from '../components/shared/PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import useTable from '../components/shared/useTable';
import axios from 'axios';
import Controls from '../components/controls/Controls'
import { Close, EditOutlined, Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add'
import Popup from '../components/shared/Popup';
import Notification from '../components/shared/Notification';
import ConfirmDialog from '../components/shared/ConfirmDialog';
import { authenticationService } from '../_services';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    searchInput:{
        width:'70%',
    },
    addButton:{
        position:'absolute',
        right: '10px'
    }
}))

const headCells = [
    {id:'restaurant_name', label:'Restaurant Name'},
    {id:'actions', label:'Actions', disableSorting: true}

]

export default function Restaurants() {

    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: items => {return items}});
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subtitle:''})
    
    const url = 'http://localhost:3000/restaurant/fetchall'
    const user_id = authenticationService.currentUserValue.user_id;

    useEffect(() => {
        getAllRecords();
    }, []);

    const getAllRecords = () => {
        axios.post(`${url}`, {user_id : user_id})
        .then((response) => {
            const allRecords = response.data;
            setRecords(allRecords);
            console.log(response.data)
        })
        .catch(error => console.error(`Error: ${error}`));
    }

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if(target.value == "")
                    return items;
                else
                    return items.filter(x => x.restaurant_name.toLowerCase().includes(target.value))
            }
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const addOrEdit = (values, resetForm) => {
        const data = {...values, user_id}
        if (values.outlet_id == 0)
            axios({
                method: 'post',
                url: 'http://localhost:3000/restaurant/new',
                data: data,
                headers: {'Content-Type': 'application/json' }
                })
                .then(function (response) {
                    //handle success
                    console.log(response.data);
                    getAllRecords();
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                }); 
        else
            {
            axios({
                method: 'post',
                url: 'http://localhost:3000/restaurant/update',
                data: values,
                headers: {'Content-Type': 'application/json' }
                })
                .then(function (response) {
                    //handle success
                    console.log(response.data);
                    getAllRecords();

                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                }) 
            }                                                                                                                           

            resetForm();
            setRecordForEdit(null);
            setOpenPopup(false);
            getAllRecords();
            setNotify({
                isOpen: true,
                message: 'Submitted Successfully',
                type: 'success'
            })

            
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        })
        axios({
            method: 'delete',
            url: `http://localhost:3000/restaurant/delete/${id}`,
            // data: this.state.outletToEdit,
            headers: {'Content-Type': 'application/json' }
            })
            .then(response => {
                //handle success
                console.log(response.data);
                getAllRecords();
                setNotify({
                    isOpen: true,
                    message: 'Deleted Successfully',
                    type: 'error'
                })
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    return (
        <>
            <PageHeader
                title="New Restaurant"
                subtitle="Page description"
                icon= {<PeopleOutlineTwoToneIcon fontSize="large"/>}
            />
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Search outlets"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            )
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon = {<AddIcon />}
                        className={classes.addButton}
                        onClick = {() => {setOpenPopup(true); setRecordForEdit(null);}}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => (
                                <TableRow key={item.restaurant_id}>
                                    <TableCell>{item.restaurant_name}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton 
                                            color="primary"
                                            onClick={() => {openInPopup(item)}}
                                        >
                                            <EditOutlined fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton 
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subtitle: "You can't undo this operation",
                                                    onConfirm: ()=>{onDelete(item.outlet_id)}
                                                })
                                            }}
                                        >
                                            <Close fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>

            <Popup
                title = "Restaurant Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <RestaurantForm 
                    recordForEdit={recordForEdit} 
                    addOrEdit={addOrEdit}/>
            </Popup>

            <Notification 
                notify={notify}
                setNotify={setNotify}
            />

            <ConfirmDialog 
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
