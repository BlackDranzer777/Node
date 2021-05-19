import React, { useEffect, useState } from 'react'
import EmployeeForm from '../components/Manage/EmployeeForm'
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
    {id:'employee_name', label:'Employee Name'},
    {id:'phone', label:'Phone No.'},
    // {id:'employee_email', label:'Email'},
    {id:'gender', label:'Gender'},
    {id:'employee_dob', label:'Date of Birth'},
    {id:'employee_category', label:'Designation'},
    {id:'actions', label:'Actions', disableSorting: true}

]

export default function Employees() {

    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: items => {return items}});
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subtitle:''})
    
    const url = 'http://localhost:3000/employee/fetchall'

    useEffect(() => {
        getAllRecords();
    }, []);

    const getAllRecords = () => {
        axios.post(`${url}`, {outlet_id : "3d75bccf-647a-47bb-8f47-9933a068a91a"})
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
                    return items.filter(x => x.employee_name.toLowerCase().includes(target.value))
            }
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const addOrEdit = (values, resetForm) => {
        if (values.employee_id == 0)
            axios({
                method: 'post',
                url: 'http://localhost:3000/employee/new',
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
                            // alert(JSON.stringify(values));
            {
            
            axios({
                method: 'post',
                url: 'http://localhost:3000/employee/update',
                data: values,
                headers: {'Content-Type': 'application/json' }
                })
                .then(function (response) {
                    //handle success
                    console.log(response.data);
                    // alert(JSON.stringify(response.data));
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
            url: `http://localhost:3000/employee/delete/${id}`,
            // data: this.state.employeeToEdit,
            headers: {'Content-Type': 'application/json' }
            })
            .then(response => {
                //handle success
                console.log(response.data);
                getAllRecords();
                // this.setState({employees: [...this.state.employees.filter(employee => employee.employee_id!==id)]})
                // alert(JSON.stringify(response.data));
                // return this.state.employees;
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
                title="New Employee"
                subtitle="Page description"
                icon= {<PeopleOutlineTwoToneIcon fontSize="large"/>}
            />
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Search Employees"
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
                                <TableRow key={item.employee_id}>
                                    <TableCell>{item.employee_name}</TableCell>
                                    <TableCell>{item.phone}</TableCell>
                                    {/* <TableCell>{item.employee_email}</TableCell> */}
                                    <TableCell>{item.gender}</TableCell>
                                    <TableCell>{item.employee_dob}</TableCell>
                                    <TableCell>{item.category}</TableCell>
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
                                                    onConfirm: ()=>{onDelete(item.employee_id)}
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
                title = "Employee Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <EmployeeForm 
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
