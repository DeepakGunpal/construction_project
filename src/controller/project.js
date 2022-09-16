const project = require("../model/project.js");
const projectId = require("../model/projectId.js");
const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const hbs = require("handlebars");
const path = require('path');

//todo create new project
const createProject = async (req, res) => {
    try {
        console.log(req.body)
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
            budget: parseInt(req.body.budget),
            siteAddress: req.body.siteAddress,
            projectStatus: req.body.projectStatus,
            supplier: {
                supplierName: req.body.supplierName,
                supplierType: req.body.supplierType,
                supplierPhone: parseInt(req.body.supplierPhone),
                supplierEmail: req.body.supplierEmail,
            }
        }

        const newProject = await project.create(data);
        res.status(201).send({ message: 'project Created', data: newProject });

    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message });
    }
}

//todo fetch allprojects only 4fields for dashboard
const dashboard = async (req, res) => {
    try {
        const allProjects = await project.find().select('projectId projectName budget endDate');
        res.status(200).send({ message: 'All projects', data: allProjects });
    } catch (error) {
        res.status(500).send({ message: error.message });
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
        res.status(500).send({ message: error });
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

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const content = await compile('index', { details });

        await page.setContent(content);
        await page.pdf({
            path: './pdfReport.pdf',
            format: 'A4'
        });

        console.log('pdf generated');

        res.status(200).send({ data: details });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

//todo fetchpdf
const fetchPDF = async (req, res) => {
    try {
        res.sendFile(`${process.cwd()}/pdfReport.pdf`)
    } catch (error) {
        console.log("getpdf", error);
        res.status(500).send({ message: error.message });
    }
}

module.exports = { createProject, dashboard, projectDetail, createPDF, fetchPDF };