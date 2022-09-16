import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './AddProject.css'
import { axiosInstance } from '../../config';

export default function AddProject() {
  const [open, setOpen] = useState(false);

  const [newProjectDetails, setNewProjectDetails] = useState({
    projectManager: "",
    projectName: "",
    budget: 0,
    startDate: "",
    endDate: "",
    siteAddress: "",
    projectStatus: "",
    supplierName: "",
    supplierType: "",
    supplierPhone: 0,
    supplierEmail: "",
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const newProject = async (data) => {
    const res = await axiosInstance.post('/createProject', data)
    if (res.status === 201) window.alert("Project Created")
    else window.alert("Invalid Data")
  }

  const handleAdd = () => {
    const newProjectData = { ...newProjectDetails }
    console.log('handleAdd', newProjectData);
    newProject(newProjectData);
    setNewProjectDetails("");
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInput = ({ target: { name, value } }) => {
    setNewProjectDetails({ ...newProjectDetails, [name]: value })
  }



  return (
    <div className='create_new_project_button'>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={{
          'fontWeight': 'bolder',
          'fontSize': '15px',
          'padding': '8px 15px',
          'backgroundColor': 'green'
        }}
      >
        Create New Project
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ fontSize: '18px', fontWeight: 'bold' }}
          >
            Important : <br />
            1.) * mandatory fields. <br />
            2.) Project Name and Project Manager Name is mandatory <br />
            3.) Supplier Phone should be of 10 digit without 0 & country code
          </DialogContentText>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-around', gap: '2rem' }}>
            <TextField
              className="search"
              onChange={handleInput}
              label="Project Name"
              name="projectName"
              required
            />
            <TextField
              className="search"
              onChange={handleInput}
              label="Project Manager"
              name="projectManager"
              required
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.1rem', fontSize: 'large' }}>
            <p>Start Date : </p>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              onChange={handleInput}
              name="startDate"
              type="date"
              variant="outlined"
              autoComplete='off'
            />
            <p>End Date : </p>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              onChange={handleInput}
              name="endDate"
              type="date"
              variant="outlined"
              autoComplete='off'
            />
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={handleInput}
            label="Budget"
            name="budget"
            type="number"
            fullWidth
            variant="outlined"
            autoComplete='off'
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={handleInput}
            label="Project Status"
            name="projectStatus"
            type="text"
            fullWidth
            variant="standard"
            autoComplete='off'
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={handleInput}
            label="Site Address"
            name="siteAddress"
            type="text"
            fullWidth
            variant="standard"
            autoComplete='off'
          />
          <div style={{ fontSize: 'large' }}>
            <p>Add Supplier</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.7rem', fontSize: 'large' }}>
              <TextField
                className="search"
                onChange={handleInput}
                label="Supplier Name"
                name="supplierName"
              />
              <TextField
                className="search"
                onChange={handleInput}
                label="Supplier Type"
                name="supplierType"
              />
              <TextField
                className="search"
                onChange={handleInput}
                label="Supplier Phone"
                name="supplierPhone"
              />
              <TextField
                className="search"
                onChange={handleInput}
                label="Supplier Email"
                name="supplierEmail"
              />
            </div>
          </div>

        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
