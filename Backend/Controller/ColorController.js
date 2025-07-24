
const ColorModel = require('../Model/ColorModel');

const ColorController = {
    async create(req, res) {
        try {
            const { name, slug, hexcode } = req.body;
            if (!name || !slug || !hexcode) {
                return res.send({ msg: "All fields are required", flag: 0 })
            }

            const color = await ColorModel({
                name,
                slug,
                hexcode
            })

            color.save().then(
                () => {
                    return res.send({ msg: "Color Added", flag: 1 })
                }
            ).catch(
                () => {
                    return res.send({ msg: "Unable to create color", flag: 0 })
                }
            )

        } catch (error) {
            res.send({ msg: "Internal server error", flag: 0 });
        }
    },
    async getData(req, res) {
        try {
            const id = req.params.id;
            let colors = null;
            if (id) {
                colors = await ColorModel.findById(id);
            } else {
                colors = await ColorModel.find()
            }
            // const categories = await categoryModel.find()
            if (!colors) {
                return res.send({ msg: "No Colors found", flag: 0 });
            }
            return res.send({ msg: "Colors fetched successfully", flag: 1, colors });  // or u can simply write categories instead of data & cat , it will automatically create key categories
        } catch (err) {
            return res.send({ msg: "Internal server error !", flag: 0 });
        }
    },
    async status(req, res) {
        try {
            const id = req.params.id;
            const colors = await ColorModel.findById(id);
            if (!colors) {
                return res.send({ msg: "Colors not found", flag: 0 });
            }
            await ColorModel.updateOne(
                {
                    _id: id
                },
                {
                    status: !colors.status
                }
            ).then(
                () => {
                    return res.send({ msg: "Color status updated successfully", flag: 1 });
                }
            ).catch(
                () => {
                    return res.send({ msg: "Error updating Color status", flag: 0 });
                }
            )
        } catch (error) {
            return res.send({ msg: "Internal server error", flag: 0 });
        }
    },
    async delete(req, res) {
        try {
            const id = req.params.id;
            const colors = await ColorModel.findById(id);
            if (!colors) {
                return res.send({ msg: "Color not found", flag: 0 });
            }
            await ColorModel.deleteOne(
                {
                    _id: id
                }
            ).then(
                () => {
                    res.send({ msg: "Color deleted successfully", flag: 1 });
                }

            ).catch(
                () => {
                    return res.send({ msg: "Error deleting Color", flag: 0 });
                }
            )
        } catch (error) {
            return res.send({ msg: "Internal server error", flag: 0 });
        }
    },
    async update(req, res) {
            try {
                const id = req.params.id;
    
                const colors = await ColorModel.findById(id);
                if (!colors) {
                    return res.send({ msg: "Color not found", flag: 0 });
                }
    
                let updateData = {
                    name: req.body.name,
                    slug: req.body.slug,
                    hexcode: req.body.hexcode
                };
    
                await ColorModel.updateOne(
                    {
                         _id: id 
                    },
                     updateData);
    
                return res.send({ msg: "Color updated successfully", flag: 1 });
    
            } catch (error) {
                return res.send({ msg: "Internal server error", flag: 0 });
            }
        }
}

module.exports = ColorController;