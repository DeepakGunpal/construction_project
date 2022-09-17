import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './Project.css'
import { Button } from '@mui/material';
import AddSupplier from '../../component/supplier/AddSupplier';
import ProjectStatus from '../../component/updateProjectStatus/ProjectStatus';
import Nav from '../../component/nav/Nav';
import { axiosInstance } from '../../config';

const Project = () => {

    const [details, setDetails] = useState(Object);
    const [supp, setSupp] = useState(false);
    const [update, setUpdate] = useState(false);

    var { projectId } = useParams();

    const projectDetails = async (id1) => {
        const projectDetails = await axiosInstance.get(`/projectDetails/${id1}`);
        setDetails(projectDetails.data.data);
    }

    const addSupplier = () => {
        setSupp(true);
    }
    const handleUpdate = () => {
        setUpdate(true);
    }

    useEffect(() => {
        projectDetails(projectId)
    }, [projectId])

    return (
        <div className='project_details_container'>
            <div className='nav_in_linechart'>
                <Nav />
            </div>
            <div className='add_supplier_button_container'>
                <Button
                    variant="contained"
                    onClick={addSupplier}
                    style={{
                        fontWeight: 'bolder',
                        fontSize: '15px',
                        padding: '8px 15px',
                        backgroundColor: 'green'
                    }}
                >Add Supplier</Button></div>
            <div className='details'>

                {
                    supp && <div
                        className='add_supplier'
                    ><AddSupplier setSupp={setSupp} /></div>
                }

                <div className='details_container'>
                    <p>ProjectID    : {details.projectId}</p>
                    <p>Project Name : {details.projectName}</p>
                    <p>Project Manager : {details.projectManager}</p>
                    <p>Budget       : ₹ {details.budget}</p>
                    <p>End Date     : {details.endDate}</p>
                    <p>Start Date     : {details.startDate}</p>
                    <p>Site Address     : {details.siteAddress}</p>


                </div>
                <div className='details_container'>
                    {details && details.projectStatus &&
                        details.projectStatus.map((status, i) => {
                            return <div>
                                <p>Project Status {i + 1} : {status}</p>
                            </div>
                        })

                    }
                    <Button
                        variant="contained"
                        onClick={handleUpdate}
                        style={{
                            fontWeight: 'bolder',
                            fontSize: '15px',
                            padding: '8px 15px',
                            backgroundColor: 'white',
                            margin: '0 0 0 5%',
                            color: 'black'
                        }}
                    >Update Status</Button>
                    <br />
                    <br />

                    {
                        update && <div
                            className='add_supplier'
                        ><ProjectStatus setUpdate={setUpdate} /></div>
                    }
                </div>
                {details && details.supplier &&
                    details.supplier.map(({ supplierType, supplierName, supplierPhone, supplierEmail }) => {
                        return <div className='details_container'>
                            <p>Supplier     : {supplierType}</p>
                            <p>Contact Person     : {supplierName}</p>
                            <p>Phone     : {supplierPhone}</p>
                            <p>Email     : {supplierEmail}</p>

                        </div>
                    })

                }


            </div>
        </div>
    )
}

export default Project