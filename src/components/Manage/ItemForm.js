import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../shared/useForm';
import Controls from '../controls/Controls';
import { authenticationService } from '../../_services';

const initialFValues = {
    item_id: 0,
    price: 0,
    category: '',
    nonVeg: false,
    // outlet_id : '',
}

export default function ItemForm(props) {
    const {addOrEdit, recordForEdit} = props;

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('item_name' in fieldValues)
            temp.item_name = fieldValues.item_name ? "" : "This field is required.";
        if('price' in fieldValues)
            temp.price = fieldValues.price.length != 0 ? "" : "Price must be mentioned.";
        if('category' in fieldValues)
            temp.category = fieldValues.category ? "" : "This field is required.";
        // if('category' in fieldValues)
        //     temp.category = fieldValues.category.length != 0 ? "" : "This field is required.";
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
                    name="item_name"
                    label="Item Name"
                    value={values.item_name}
                    error={errors.item_name}
                    onChange={handleInputChange}
                />
                <Controls.Input
                    name="price"
                    label="Price"
                    value={values.price}
                    error={errors.price}
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid item xs={6}>
                <Controls.Input
                    name="category"
                    label="Category"
                    value={values.category}
                    error={errors.category}
                    onChange={handleInputChange}
                />
                <Controls.Checkbox
                    name="nonVeg"
                    label="Non-Veg"
                    value={values.nonVeg}
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


