const project = require("../model/project.js");
const projectId = require("../model/projectId.js");
const fs = require("fs-extra");
const pdf = require('html-pdf');
const hbs = require("handlebars");
const path = require('path');

//?----------------------------- error handler ----------------------------

const handleErrors = (err) => {
    let errors = {};

    // incorrect email
    if (err.message === 'Provide input') {
        errors.addSupplier = 'Provide input';
    }
    // incorrect email
    if (err.message === 'Please enter a valid email') {
        errors.email = 'Please enter a valid supplier email';
    }

    // incorrect password
    if (err.message === 'Minimum phone length is 10 characters') {
        errors.phone = 'Minimum phone length is 10 characters';
    }

    // duplicate email error
    if (err.code === 11000) {
        errors[`supplier email`] = `supplier email is already registered`;
        return errors;
    }

    // validation errors
    if (err.message.includes('project validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

//todo create new project
const createProject = async (req, res) => {
    try {
        const projId = await projectId.findOneAndUpdate({ id: '2234000' }, { $inc: { seq: 1 } }, { new: true });
        if (projId) {
            req.body.projectId = projId.seq;
        } else {
            await projectId.create({ id: '2234000', seq: 2234000 });
            req.body.projectId = 2234000;
        }

        const data = {
            projectId: req.body.projectId,
            projectName: req.body.projectName,
            projectManager: req.body.projectManager,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            budget: parseInt(req.body.budget) ? parseInt(req.body.budget) : 0,
            siteAddress: req.body.siteAddress,
            projectStatus: req.body.projectStatus,
            supplier: {
                supplierName: req.body.supplierName,
                supplierType: req.body.supplierType,
                supplierPhone: parseInt(req.body.supplierPhone) ? parseInt(req.body.supplierPhone) : 0,
                supplierEmail: req.body.supplierEmail,
            }
        }
        const newProject = await project.create(data);
        console.log('project created');
        res.status(201).send({ message: 'project Created', data: newProject });

    } catch (error) {
        const err = handleErrors(error);
        res.status(400).send({ message: err });
    }
}

//todo fetch allprojects only 4fields for dashboard
const dashboard = async (req, res) => {
    try {
        const allProjects = await project.find().select('projectId projectName budget endDate');
        res.status(200).send({ message: 'All projects', data: allProjects });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}


//todo fetch projectDetails
const projectDetail = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const completeProject = await project.findOne({ projectId: projectId })
        console.log('projectFetched');
        res.status(200).send({ message: 'Project details', data: completeProject });
    } catch (error) {
        res.status(400).send({ message: error });
    }
}

//todo compiles the dynamic data with hbs template
const compile = async (templateName, details) => {
    const filePath = path.join(process.cwd(), 'src', 'controller', 'pdfTemp', `${templateName}.hbs`);
    const html = await fs.readFile(filePath, 'utf8');
    return hbs.compile(html)(details);
}

//todo createPdf and store on the server
const createPDF = async (req, res) => {
    try {
        const projects = await project.find().select('projectId projectName budget');
        const details = JSON.parse(JSON.stringify(projects)); //todo deep copy (handlebars error resolved)

        const content = await compile('index', { details });
        pdf.create(content, {}).toFile(`${process.cwd()}/public/pdf/allProjectBudgetReport.pdf`, (err) => {
            if (err) {
                Promise.reject('pdf generation failed').catch((error) => res.send({ message: error }))
            } else {
                Promise.resolve('pdf generated')
                    .then(() =>
                        res.send({ message: 'pdf generated' })
                    )
            }
        });

    } catch (error) {
        res.status(400).send({ message: error });
    }
}

//todo fetchpdf
const fetchPDF = async (req, res) => {
    try {
        res.sendFile(`${process.cwd()}/public/pdf/allProjectBudgetReport.pdf`)
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

module.exports = { createProject, dashboard, projectDetail, createPDF, fetchPDF, handleErrors };