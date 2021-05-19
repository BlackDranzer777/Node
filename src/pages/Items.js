import React, { useEffect, useState } from 'react'
import ItemForm from '../components/Manage/ItemForm'
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
    {id:'item_name', label:'Item Name'},
    {id:'price', label:'Price'},
    {id:'category', label:'Category'},
    {id:'nonVeg', label:'Non-Veg'},
    {id:'actions', label:'Actions', disableSorting: true}

]

export default function Items() {

    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: items => {return items}});
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subtitle:''})
    
    const url = 'http://localhost:3000/menu/fetchmenu'
    const outlet_id = authenticationService.currentUserValue.outlet_id;
    
    useEffect(() => {
        getAllRecords();
    }, []);

    const getAllRecords = () => {
        axios.post(`${url}`, { outlet_id: outlet_id })
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
                    return items.filter(x => x.item_name.toLowerCase().includes(target.value))
            }
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const addOrEdit = (values, resetForm) => {
        const data = {...values, outlet_id }
        if (values.item_id == 0)
            axios({
                method: 'post',
                url: 'http://localhost:3000/menu/newitem',
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
                url: 'http://localhost:3000/menu/updateitem',
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
            url: `http://localhost:3000/menu/deleteitem/${id}`,
            // data: this.state.itemToEdit,
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
                title="New Item"
                subtitle="Page description"
                icon= {<PeopleOutlineTwoToneIcon fontSize="large"/>}
            />
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Search items"
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
                                <TableRow key={item.item_id}>
                                    <TableCell>{item.item_name}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>{item.nonVeg}</TableCell>
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
                                                    onConfirm: ()=>{onDelete(item.item_id)}
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
                title = "item Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <ItemForm 
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
