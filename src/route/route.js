const express = require('express');
const { createPDF, createProject, dashboard, fetchPDF, projectDetail } = require('../controller/project.js');
const { createSupplier } = require('../controller/supplier.js');
const route = express.Router();

route.post('/api/createProject', createProject);
route.get('/api/dashboard', dashboard);
route.get('/api/projectDetails/:projectId', projectDetail);

route.post('/api/createSupplier', createSupplier);

route.get('/api/create-pdf', createPDF);
route.get('/api/fetch-pdf', fetchPDF);

module.exports = route;