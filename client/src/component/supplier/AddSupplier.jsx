import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { axiosInstance } from '../../config';

const AddSupplier = ({ setSupp }) => {

    var { projectId } = useParams();
    const [newSupplierDetails, setNewSupplierDetails] = useState({
        projectId: projectId,
        supplierName: "",
        supplierType: "",
        supplierPhone: "",
        supplierEmail: "",
    });

    const newSupplier = async (data) => {
        const res = await axiosInstance.post('/createSupplier', data)
        console.log(res)
        if (res.status === 201) window.alert("Supplier Added")
        else window.alert("Invalid Data")
    };

    const handleAdd = () => {
        const newSupplierData = { ...newSupplierDetails }
        console.log('handleAdd', newSupplierData);
        newSupplier(newSupplierData);
        setNewSupplierDetails("");
        setSupp(false);
    };

    const validate = (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z]+/, '');
    };

    const handleInput = ({ target: { name, value } }) => {
        setNewSupplierDetails({ ...newSupplierDetails, [name]: value })
    };

    return (
        <div style={{ fontSize: 'large' }}>
            <p> 1.) Supplier Phone should be of 10 digit without 0 & country code</p>
            <p> 2.) Supplier Email should be a valid Email</p>
            <hr />
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.7rem',
                fontSize: 'large',
                backgroundColor: 'white',
                padding: '10px',
                borderRadius: '10px'
            }}>
                <TextField
                    className="search"
                    onChange={handleInput}
                    label="Supplier Name"
                    name="supplierName"
                    type='text'
                    onKeyUp={(e) => validate(e)}

                />
                <TextField
                    className="search"
                    onChange={handleInput}
                    label="Supplier Type"
                    name="supplierType"
                    type='text'
                    onKeyUp={(e) => validate(e)}

                />
                <TextField
                    className="search"
                    onChange={handleInput}
                    label="Supplier Phone"
                    name="supplierPhone"
                    type="number"
                />
                <TextField
                    className="search"
                    onChange={handleInput}
                    label="Supplier Email"
                    name="supplierEmail"
                    type="email"
                />
                <br />
                <Button
                    variant="contained"
                    style={{
                        fontWeight: 'bolder',
                        fontSize: '15px',
                        padding: '8px 15px',
                        backgroundColor: 'black',
                        margin: '0 0 0 5%',
                    }}
                    onClick={handleAdd}>Add</Button>
            </div>
        </div>
    )
}

export default AddSupplier