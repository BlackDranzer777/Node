import React, { useEffect, useState } from 'react'
import CustomerForm from '../Manage/CustomerForm'
import PageHeader from '../shared/PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar, Typography } from '@material-ui/core';
import useTable from '../shared/useTable';
import axios from 'axios';
import Controls from '../controls/Controls'
import { Close, EditOutlined, Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add'
import Popup from '../shared/Popup';
import Notification from '../shared/Notification';
import ConfirmDialog from '../shared/ConfirmDialog';

const useStyles = makeStyles(theme => ({
    // pageContent: {
    //     margin: theme.spacing(5),
    //     padding: theme.spacing(3),
    // },
    searchInput:{
        width:'70%',
    },
    addButton:{
        position:'absolute',
        right: '20px'
    }
}))

const headCells = [
    {id:'customer_name', label:'Customer Name'},
    {id:'customer_phone', label:'Phone No.'},
    {id:'customer_email', label:'Email'},
    {id:'customer_category', label:'Category'},
    {id:'actions', label:'Actions', disableSorting: true}
]

export default function CustomerDetails() {

    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: items => {return items}});
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subtitle:''})
    
    const url = 'http://localhost:3000/customer/fetchall'
    const outlet_id = "3d75bccf-647a-47bb-8f47-9933a068a91a"
    // const customer_id = "2280ddba-4981-4ae1-8ab0-6e2c139ebdc0"

    useEffect(() => {
        getAllRecords();
    }, []);

    const getAllRecords = () => {
        axios.post(`${url}/outlet/${outlet_id}`)
        .then((response) => {
            const allRecords = response.data;
            setRecords(allRecords);
            console.log(response.data)
        })
        .catch(error => console.error(`Error: ${error}`));
    }

    // const {
    //     TblContainer,
    //     TblHead,
    //     TblPagination,
    //     recordsAfterPagingAndSorting,
    // } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if(target.value == "")
                    return items;
                else
                    return items.filter(x => x.customer_name.toLowerCase().includes(target.value))
            }
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const addOrEdit = (values, resetForm) => {
        if (values.customer_id == 0)
            axios({
                method: 'post',
                url: 'http://localhost:3000/customer/new',
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
                }); 
        else
            {
            axios({
                method: 'post',
                url: 'http://localhost:3000/customer/update',
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
            // getAllRecords();
            setNotify({
                isOpen: true,
                message: 'Submitted Successfully',
                type: 'success'
            })

            
    }


    return (
        <>
            {/* <PageHeader
                title="New Customer"
                subtitle="Page description"
                icon= {<PeopleOutlineTwoToneIcon fontSize="large"/>}
            /> */}
            <Paper className={classes.pageContent}>
                <Toolbar>
                    {/* <Controls.Input
                        label="Search customers"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            )
                        }}
                        onChange={handleSearch}
                    /> */}
                    <Typography variant="subtitle1">
                        Customer Details
                    </Typography>
                    <Controls.Button
                        text="Add New"
                        variant="primary"
                        startIcon = {<AddIcon />}
                        className={classes.addButton}
                        onClick = {() => {setOpenPopup(true); setRecordForEdit(null);}}
                    />
                </Toolbar>
                
            </Paper>

            <Popup
                title = "Customer Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <CustomerForm 
                    recordForEdit={recordForEdit} 
                    addOrEdit={addOrEdit}/>
            </Popup>

            {/* <Notification 
                notify={notify}
                setNotify={setNotify}
            />

            <ConfirmDialog 
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            /> */}
        </>
    )
}
