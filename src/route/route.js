const express = require('express');
const { createPDF, createProject, dashboard, fetchPDF, projectDetail } = require('../controller/project.js');
const { createSupplier } = require('../controller/supplier.js');
const route = express.Router();

route.post('/createProject', createProject);
route.get('/dashboard', dashboard);
route.get('/projectDetails/:projectId', projectDetail);

route.post('/createSupplier', createSupplier);

route.get('/create-pdf', createPDF);
route.get('/fetch-pdf', fetchPDF);

module.exports = route;