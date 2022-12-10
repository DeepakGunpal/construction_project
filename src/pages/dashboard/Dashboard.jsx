import React, { useEffect, useState } from 'react';
import './Dashboard.css'
import AddProject from '../../component/form/AddProject'
import Nav from '../../component/nav/Nav';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config';

const Dashboard = () => {
    const [details, setDetails] = useState([]);

    const dashboardProjects = async () => {
        const projectDetails = await axiosInstance.get('/dashboard');
        setDetails(projectDetails.data.data);
    }

    useEffect(() => {
        dashboardProjects();
    }, [])

    return (
        <div>
            <div className='dashboard_container'>
                <Nav />
                <AddProject />
                <div className='projects_data'>
                    {
                        details.map(({ projectId, projectName, budget, endDate }) => {
                            return <Link to={`/project/${projectId}`} className='project_container' > <div>
                                <p>ProjectID    : {projectId}</p>
                                <p>Project Name : {projectName}</p>
                                <p>Budget       : ₹ {budget} Cr.</p>
                                <p>End Date     : {endDate}</p>
                            </div></Link>
                        })
                    }
                </div>
            </div>
        </div >

    )
}

export default Dashboard