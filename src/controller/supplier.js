const project = require("../model/project");

//todo create new supplier
const createSupplier = async (req, res) => {
    try {
        console.log(Object.keys(req.body));
        const { supplierName, supplierType, supplierPhone, supplierEmail, projectStatus } = req.body;
        let updates = {};
        if (req.body.supplierName) {
            updates = { $addToSet: { supplier: { supplierName, supplierType, supplierPhone, supplierEmail } } }
        }
        if (req.body.projectStatus) {
            updates = { $addToSet: { projectStatus } }
        }

        const newSupp = await project.findOneAndUpdate({ projectId: req.body.projectId }, updates, { new: true })
        console.log(newSupp);
        res.status(201).send({ message: 'supplier created', data: newSupp });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message });
    }
}

module.exports = { createSupplier }