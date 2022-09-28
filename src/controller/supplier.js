const project = require("../model/project");
const { handleErrors } = require("./project");

//todo create new supplier
const createSupplier = async (req, res) => {
    try {
        const { supplierName, supplierType, supplierPhone, supplierEmail, projectStatus } = req.body;
        let updates;
        if (req.body.supplierName) {
            console.log('update supplier')
            updates = { $addToSet: { supplier: { supplierName, supplierType, supplierPhone, supplierEmail } } }
        } else if (req.body.projectStatus) {
            console.log('update status')
            updates = { $addToSet: { projectStatus } }
        } else {
            throw new Error('Provide input');
        }

        const newSupp = await project.findOneAndUpdate({ projectId: req.body.projectId }, updates, { new: true })
        res.status(201).send({ message: 'supplier created', data: newSupp });
    } catch (error) {
        const err = handleErrors(error);
        res.status(400).send({ message: err });
    }
}

module.exports = { createSupplier }