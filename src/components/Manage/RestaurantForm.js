import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../shared/useForm';
import Controls from '../controls/Controls';

const initialFValues = {
    restaurant_id: 0,
    restaurant_name: '',
}

export default function RestaurantForm(props) {
    const {addOrEdit, recordForEdit} = props;

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('restaurant_name' in fieldValues)
            temp.restaurant_name = fieldValues.restaurant_name ? "" : "This field is required.";
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
            <Grid item xs={12}>
                <Controls.Input
                    name="restaurant_name"
                    label="restaurant Name"
                    value={values.restaurant_name}
                    error={errors.restaurant_name}
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid item xs={6}>
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


