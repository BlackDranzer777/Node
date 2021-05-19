import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../shared/useForm';
import Controls from '../controls/Controls';

const roleItems = [
    {id:'server' ,title:'Server'},
    {id:'chef' ,title:'Chef'},
    {id:'manager' ,title:'Manager'}
]

const genderItems = [
    {id:'male',title:'Male'},
    {id:'female',title:'Female'},
    {id:'other',title:'Other'}
]

const initialFValues = {
    employee_id: 0,
    employee_name: '',
    phone : '',
    employee_email : '',
    gender : 'male',
    employee_dob : new Date(),
    category : 'server',
    outlet_id : "3d75bccf-647a-47bb-8f47-9933a068a91a",
}

export default function EmployeeForm(props) {
    const {addOrEdit, recordForEdit} = props;

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('employee_name' in fieldValues)
            temp.employee_name = fieldValues.employee_name ? "" : "This field is required.";
        if('employee_email' in fieldValues)
            temp.employee_email = (/$^|.+@.+..+/).test(fieldValues.employee_email) ? "" : "Email is not valid.";
        if('phone' in fieldValues)
            temp.phone = fieldValues.phone.length>9 ? "" : "Minimum 10 numbers required.";
        if('category' in fieldValues)
            temp.category = fieldValues.category.length != 0 ? "" : "This field is required.";
        setErrors({
            ...temp
        })

        if(fieldValues == values)
            return Object.values(temp).every(x => x == "");
    }

    const{
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault();
        if (validate()){
            // axios({
            //     method: 'post',
            //     url: 'http://divyansh.zapto.org:3000/employee/new',
            //     data: values,
            //     headers: {'Content-Type': 'application/json' }
            //     })
            //     .then(function (response) {
            //         //handle success
            //         console.log(response.data);
            //     })
            //     .catch(function (response) {
            //         //handle error
            //         console.log(response);
            //     }); 

            // resetForm();
            addOrEdit(values, resetForm);
        }
    } 
    
    useEffect(()=>{
        if(recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])
    

    return (
        <Form onSubmit={handleSubmit}>
        <Grid container>
            <Grid item xs={6}>
                <Controls.Input
                    name="employee_name"
                    label="Full Name"
                    value={values.employee_name}
                    error={errors.employee_name}
                    onChange={handleInputChange}
                />
                <Controls.Input
                    name="phone"
                    label="Contact Number"
                    value={values.phone}
                    error={errors.phone}
                    onChange={handleInputChange}
                />
                <Controls.Input
                    name="employee_email"
                    label="Email"
                    value={values.employee_email}
                    error={errors.employee_email}
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid item xs={6}>
                <Controls.DatePicker
                    name="employee_dob"
                    label="Date of Birth"
                    value={values.employee_dob}
                    onChange={handleInputChange}
                />
                <Controls.RadioGroup
                    name="gender"
                    label="Gender"
                    items={genderItems}
                    value={values.gender}
                    onChange={handleInputChange}
                />
                <Controls.Select
                    name="category"
                    label="Role"
                    options={roleItems}
                    error={errors.category}
                    value={values.category}
                    onChange={handleInputChange}
                />
                <div>
                    <Controls.Button
                        type="submit"
                        text="Submit"
                    />
                    <Controls.Button
                        text="Reset"
                        color="default"
                        onClick={resetForm}
                    />
                </div>
            </Grid>
        </Grid>
        </Form>
    )
}


