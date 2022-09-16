import React, { useEffect, useState } from 'react'
import { saveAs } from 'file-saver';
import './PdfReport.css'
import Nav from '../../component/nav/Nav';
import { axiosInstance } from '../../config';

const PdfReport = () => {
    const [details, setDetails] = useState([]);
    const pdfReport = async () => {
        const projectDetails = await axiosInstance.get('/dashboard');
        setDetails(projectDetails.data.data);
    }

    const createAndDownloadPdf = async () => {
        await axiosInstance.get('/create-pdf');
        const res = await axiosInstance.get('/fetch-pdf', { responseType: 'blob' })
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'report.pdf');
    }

    useEffect(() => {
        pdfReport();
    }, [])

    return (
        <div >
            <div className='nav_in_linechart'>
                <Nav />
            </div>
            <div className='table_container'>
                <h1>Project Details</h1>
                <div className='pdf_button_container'>
                    <button className='pdfButton' onClick={createAndDownloadPdf}>Download PDF</button>
                </div>

                <table >
                    <thead>
                        <tr>
                            <th>ProjectId</th>
                            <th>Project Name</th>
                            <th>Budget (in ₹ Crore)</th>
                        </tr>
                    </thead>
                    <hr/>
                    {
                        details.map((detail) => {
                            return  <tbody>
                                <tr>
                                    <td>{detail.projectId}</td>
                                    <td>{detail.projectName}</td>
                                    <td>{detail.budget}</td>
                                </tr>
                            </tbody>
                        })
                    }
                </table>
            </div>
        </div >
    )
}

export default PdfReport