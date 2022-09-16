const project = require("../model/project");

//todo create new supplier
const createSupplier = async (req, res) => {
    try {
        const { supplierName, supplierType, supplierPhone, supplierEmail, projectStatus } = req.body;
        let updates;
        if (req.body.supplierName) {
            console.log('update supplier')
            updates = { $addToSet: { supplier: { supplierName, supplierType, supplierPhone, supplierEmail } } }
        }
        if (req.body.projectStatus) {
            console.log('update status')
            updates = { $addToSet: { projectStatus } }
        } else {
            throw new Error('Provide input');
        }

        const newSupp = await project.findOneAndUpdate({ projectId: req.body.projectId }, updates, { new: true })
        res.status(201).send({ message: 'supplier created', data: newSupp });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message });
    }
}

module.exports = { createSupplier }