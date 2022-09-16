import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { axiosInstance } from '../../config';

const ProjectStatus = ({ setUpdate }) => {

    var { projectId } = useParams();
    const [newProjectStatus, setNewProjectStatus] = useState({
        projectId: projectId,
        projectStatus: "",
    });

    const updateStatus = async (data) => {
        const res = await axiosInstance.post('/createSupplier', data)
        console.log(res)
        if (res.status === 201) window.alert("Status updated")
        else window.alert("Invalid Data")
    };

    const handleAdd = () => {
        const updatedStatus = { ...newProjectStatus }
        console.log('handleAdd', updatedStatus);
        updateStatus(updatedStatus);
        setNewProjectStatus("");
        setUpdate(false);
    };

    const validate = (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z]+/, '');
    };

    const handleInput = ({ target: { name, value } }) => {
        setNewProjectStatus({ ...newProjectStatus, [name]: value })
    };

    return (
        <div style={{ fontSize: 'large' }}>
            <hr />
            <div style={{
                display: 'flex',
                gap: '0.9rem',
                fontSize: 'large',
                justifyContent: 'space-around',
                backgroundColor: 'white',
                padding: '10px',
                borderRadius: '10px'
            }}>
                <TextField
                    className="search"
                    onChange={handleInput}
                    label="Project Status"
                    name="projectStatus"
                    id='input-field'
                    onKeyUp={(e) => validate(e)}
                    type='text'
                />
                <Button
                    variant="contained"
                    style={{
                        fontWeight: 'bold',
                        fontSize: '15px',
                        padding: '0px 22px',
                        backgroundColor: 'black',
                        margin: '0 0 0 5%',
                    }}
                    onClick={handleAdd}>Update</Button>
            </div>
        </div>
    )
}

export default ProjectStatus;