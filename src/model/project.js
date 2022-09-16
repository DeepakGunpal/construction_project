const mongoose = require('mongoose');
const { isEmail } = require('validator');

const projectSchema = new mongoose.Schema({
    projectId: { type: Number, required: true },
    projectName: { type: String, required: true },
    projectManager: { type: String, required: true },
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
            minlength: [6, 'Minimum password length is 6 characters']
        },
        supplierEmail: {
            type: String,
            unique: true,
            lowercase: true,
            validate: [isEmail, 'Please enter a valid email']
        },
        _id: false
    }]
}, { timestamps: true });

module.exports = mongoose.model('project', projectSchema);