const { createUniqueImageName } = require('../helper');
const categoryModel = require('../Model/CategoryModel');
const { unlinkSync } = require("fs");

const CategoryController = {
    async create(req, res) {
        try {
            const image = req.files.image;

            const { name, slug } = req.body;
            if (!name || !slug || !image) {
                return res.send({ msg: "All fields are required", flag: 0 });
            }

            const categoryImage = createUniqueImageName(image.name)
            destination = "./Public/Images/Category/" + categoryImage;

            image.mv(
                destination,
                async (err) => {
                    if (err) {
                        return res.send({ msg: "Error uploading image", flag: 0 });
                    } else {
                        const category = new categoryModel({
                            name: name,
                            slug: slug,
                            image: categoryImage
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
                    }
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
            if (id) {
                categories = await categoryModel.findById(id);
            } else {
                categories = await categoryModel.find()
            }
            // const categories = await categoryModel.find()
            if (!categories) {
                return res.send({ msg: "No categories found", flag: 0 });
            }
            return res.send({ msg: "Categories fetched successfully", flag: 1, category: categories });  // or u can simply write categories instead of data & cat , it will automatically create key categories
        } catch (err) {
            return res.send({ msg: "Internal server error !", flag: 0 });
        }
    },

    async status(req, res) {
        try {
            const id = req.params.id;
            const categories = await categoryModel.findById(id);
            if (!categories) {
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
            // if (!categories) {
            //     return res.send({ msg: "Category not found", flag: 0 });
            // }
            await categoryModel.deleteOne(
                {
                    _id: id
                }
            ).then(
                () => {
                    unlinkSync("./Public/Images/Category/" + categories.image)

                    res.send({ msg: "Category deleted successfully", flag: 1 });
                }

            ).catch(
                () => {
                    return res.send({ msg: "Error deleting category", flag: 0 });
                }
            )
        } catch (error) {
            return res.send({ msg: "Internal server error", flag: 0 });
        }
    },
    async update(req, res) {
        try {
            const id = req.params.id;
            const image = req.files.image ? req.files.image : null ;
            const categories = await categoryModel.findById(id);
            if (!categories) {
                return res.send({ msg: "Category not found", flag: 0 });
            }

            if (image) {
                const categoryImage = createUniqueImageName(image.name)
                destination = "./Public/Images/Category/" + categoryImage;

                image.mv(
                    destination,
                    async (err) => {
                        if (err) {
                            return res.send({ msg: "Unable to upload category image", flag: 0 })
                        } else {
                            await categoryModel.updateOne(
                                {
                                    _id: id
                                },
                                {
                                    name: req.body.name,
                                    slug: req.body.slug,
                                    image: categoryImage
                                }
                            ).then(
                                () => {
                                    res.send({ msg: "Category updated successfully" })
                                }
                            ).catch(
                                (err) => {
                                    return res.send({ msg: "Unable to update category" })
                                }
                            )
                        }
                    }
                )

            } else {
                await categoryModel.updateOne(
                    {
                        _id: id
                    },
                    {
                        name: req.body.name,
                        slug: req.body.slug,
                    }
                ).then(
                    () => {
                        res.send({ msg: "Category updated successfully" })
                    }
                ).catch(
                    (err) => {
                        return res.send({ msg: "Unable to update category" })
                    }
                )
            }

        } catch (error) {
            return res.send({ msg: "Internal server error", flag: 0 });
        }
    }
}

module.exports = CategoryController;