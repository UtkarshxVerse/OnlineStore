const categoryModel = require('../Model/CategoryModel');

const CategoryController = {
    async create(req, res) {
        try {
            const { name, slug } = req.body;
            if (!name || !slug) {
                return res.send({ msg: "Name and slug are required", flag: 0 });
            }

            const category = new categoryModel({
                name: name,
                slug: slug
            })

            await category.save().then(
                (data) => {
                    return res.send({ msg: "Category created successfully", flag: 1, data: data });
                }
            ).catch(
                (err) => {
                    return res.send({ msg: "Error creating category", flag: 0 });
                }
            )
        } catch (error) {
            res.send({ msg: "Internal server error", flag: 0 });
        }
    },

    async getData(req, res) {
        try {
            const id = req.params.id;
            let categories = null;
            if(id) {
                categories = await categoryModel.findById(id);
            }else{
                 categories = await categoryModel.find()
            }
            // const categories = await categoryModel.find()
            if (!categories) {
                return res.send({ msg: "No categories found", flag: 0 });
            }
            return res.send({ msg: "Categories fetched successfully", flag: 1, category : categories });  // or u can simply write categories instead of data & cat , it will automatically create key categories
        } catch (err) {
            return res.send({ msg: "Internal server error !", flag: 0 });
        }
    },

    async status(req, res) {
        try {
            const id = req.params.id;
            const categories = await categoryModel.findById(id);
            if(!categories) {
                return res.send({ msg: "Category not found", flag: 0 });
            }
            await categoryModel.updateOne(
                {
                    _id: id
                },
                {
                    status: !categories.status
                }
            ).then(
                (resp) => {
                    return res.send({ msg: "Category status updated successfully", flag: 1 });
                }
            ).catch(
                (err) => {
                    console.log(err)
                    return res.send({ msg: "Error updating category status", flag: 0 });
                }
            )
        } catch (error) {
            return res.send({ msg: "Internal server error", flag: 0 });
        }
    },

    async delete(req, res) {
        try {
            const id = req.params.id;
            const categories = await categoryModel.findById(id);
            if (!categories) {
                return res.send({ msg: "Category not found", flag: 0 });
            }
            await categoryModel.deleteOne({ _id: id }).then(
                (resp) => {
                    return res.send({ msg: "Category deleted successfully", flag: 1 });
                }
            ).catch(
                (err) => {
                    return res.send({ msg: "Error deleting category", flag: 0 });
                }
            )
        } catch (error) {
            return res.send({ msg: "Internal server error", flag: 0 });
        }
    }
}

module.exports = CategoryController;