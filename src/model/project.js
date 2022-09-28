const mongoose = require('mongoose');
const { isEmail } = require('validator');

const projectSchema = new mongoose.Schema({
    projectId: { type: Number, required: true },
    projectName: { type: String, required: [true, 'Project Name is required.'] },
    projectManager: { type: String, required: [true, 'Project Manager Name is required.'] },
    budget: Number,
    endDate: String,
    startDate: String,
    siteAddress: String,
    projectStatus: Array,
    supplier: [{
        supplierName: String,
        supplierType: String,
        supplierPhone: {
            type: Number,
            minlength: [10, 'Minimum phone length is 10 characters'],
            unique: true
        },
        supplierEmail: {
            type: String,
            required: [true, 'supplier email is required.'],
            validate: [isEmail, 'Please enter a valid email'],
            lowercase: true,
            unique: true
        },
        _id: false
    }]
}, { timestamps: true });

module.exports = mongoose.model('project', projectSchema);