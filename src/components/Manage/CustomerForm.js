import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../shared/useForm';
import Controls from '../controls/Controls';

const Categories = [
    {id:'general' ,title:'General'},
    {id:'swiggy' ,title:'Swiggy'},
    {id:'zomato' ,title:'Zomato'}
]

const initialFValues = {
    customer_id: 0,
    customer_name: '',
    customer_phone : '',
    customer_email : '',
    customer_category : 'general',
    outlet_id : "3d75bccf-647a-47bb-8f47-9933a068a91a",
    customer_id : "2280ddba-4981-4ae1-8ab0-6e2c139ebdc0",
}

export default function CustomerForm(props) {
    const {addOrEdit, recordForEdit} = props;

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('customer_name' in fieldValues)
            temp.customer_name = fieldValues.customer_name ? "" : "This field is required.";
        if('customer_email' in fieldValues)
            temp.customer_email = (/$^|.+@.+..+/).test(fieldValues.customer_email) ? "" : "Email is not valid.";
        if('customer_phone' in fieldValues)
            temp.customer_phone = fieldValues.customer_phone.length>9 ? "" : "Minimum 10 numbers required.";
        if('customer_category' in fieldValues)
            temp.customer_category = fieldValues.customer_category.length != 0 ? "" : "This field is required.";
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
                    name="customer_name"
                    label="Full Name"
                    value={values.customer_name}
                    error={errors.customer_name}
                    onChange={handleInputChange}
                />
                <Controls.Input
                    name="customer_phone"
                    label="Contact Number"
                    value={values.customer_phone}
                    error={errors.customer_phone}
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid item xs={6}>
                <Controls.Input
                    name="customer_email"
                    label="Email"
                    value={values.customer_email}
                    error={errors.customer_email}
                    onChange={handleInputChange}
                />
                <Controls.Select
                    name="customer_category"
                    label="Category"
                    options={Categories}
                    error={errors.customer_category}
                    value={values.customer_category}
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


