const ProductModel = require('../Model/ProductModel');
const { createUniqueImageName } = require('../helper');
const { unlinkSync } = require("fs");
const categoryModel = require("../Model/CategoryModel");
const ColorModel = require("../Model/ColorModel");

const ProductController = {
    async create(req, res) {
        try {
            const thumbnail = req.files.thumbnail;

            const { name, slug } = req.body;
            if (!name || !slug) {
                return res.send({ msg: "All fields are required", flag: 0 });
            }

            const productImage = createUniqueImageName(thumbnail.name)
            destination = "./Public/Images/Product/" + productImage;

            thumbnail.mv(
                destination,
                async (err) => {
                    if (err) {
                        return res.send({ msg: "Error uploading image", flag: 0 });
                    } else {
                        const products = new ProductModel({
                            ...req.body,
                            thumbnail: productImage,
                            colors: JSON.parse(req.body.colors)
                        });

                        await products.save().then(
                            () => {
                                return res.send({ msg: "Product created successfully", flag: 1 });
                            }
                        ).catch(
                            (err) => {
                                return res.send({ msg: "Error creating product", flag: 0, err });
                            }
                        )
                    }
                }
            )
        } catch (error) {
            res.send({ msg: "Internal server error", flag: 0, error });
        }
    },
    async getData(req, res) {
        try {
            const id = req.params.id;
            const filterQuery = {};
            if(req.query.categorySlug) {
                const category = await categoryModel.findOne({slug: req.query.categorySlug});
                filterQuery.categoryId = category._id;   // filterQuery k ander categoryId key bna di aur uski value category me se le li 
            }

            if(req.query.colorSlug) {
                const color = await ColorModel.findOne({slug: req.query.colorSlug});
                filterQuery.colors = {$in: [color._id]}  // filterQuery k ander categoryId key bna di aur uski value category me se le li 
            }

            if (id) {
                products = await ProductModel.findById(id)
            } else {
                products = await ProductModel.find(filterQuery).limit(req.query.limit || 0).populate(["categoryId", "colors"])  // populate reference leta h aur uske basis pr database me jake pura data lata h
            }
            // const categories = await categoryModel.find()
            if (!products) {
                return res.send({ msg: "No products found", flag: 0 });
            }
            return res.send({ msg: "Products fetched successfully", flag: 1, product: products });  // or u can simply write categories instead of data & cat , it will automatically create key categories
        } catch (err) {
            return res.send({ msg: "Internal server error !", flag: 0 });
        }
    },
    async status(req, res) {
        try {
            const id = req.params.id;
            const flag = req.body.flag;
            const product = await ProductModel.findById(id);
            const productStatus = {};
            let msg = ""
            if (flag == 1) {
                productStatus.stock = !product.stock;       // productStatus stock key le rha h 
                msg = "stock"
            } else if (flag == 2) {
                productStatus.topSelling = !product.topSelling;
                msg = "topSelling"
            } else if (flag == 3) {
                productStatus.status = !product.status;
                msg = "status"
            }

            if (!product) {
                return res.send({ msg: "Product not found", flag: 0 });
            }
            await ProductModel.updateOne(
                {
                    _id: id
                },
                {
                    $set: productStatus
                }
            ).then(
                () => {
                    return res.send({ msg: `Product ${msg} successfully`, flag: 1 });
                }
            ).catch(
                () => {
                    return res.send({ msg: "Error updating product status", flag: 0 });
                }
            )
        } catch (error) {
            return res.send({ msg: "Internal server error", flag: 0 });
        }
    },
    async delete(req, res) {
        try {
            const id = req.params.id;
            const product = await ProductModel.findById(id);
            // if (!categories) {
            //     return res.send({ msg: "Category not found", flag: 0 });
            // }
            await ProductModel.deleteOne(
                {
                    _id: id
                }
            ).then(
                () => {
                    unlinkSync("./Public/Images/Product/" + product.thumbnail)

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
            const image = req.files?.thumbnail || null;

            const product = await ProductModel.findById(id);
            if (!product) {
                return res.send({ msg: "Product not found", flag: 0 });
            }

            let updateData = {
                name: req.body.name,
                slug: req.body.slug
            };

            if (image) {
                const categoryImage = createUniqueImageName(image.name);
                const destination = "./Public/Images/Category/" + categoryImage;

                // Wrap image.mv in a Promise to use await
                await new Promise((resolve, reject) => {
                    image.mv(destination, (err) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve();
                    });
                });

                updateData.image = categoryImage;
            }

            await categoryModel.updateOne(
                {
                    _id: id
                },
                updateData);

            return res.send({ msg: "Category updated successfully", flag: 1 });

        } catch (error) {
            console.error("Update error:", error);
            return res.send({ msg: "Internal server error", flag: 0 });
        }
    },
    async multiple(req, res) {
        try {
            const id = req.params.id;
            const product = await ProductModel.findById(id);
            const allimages = product.images ?? [];  // agar ple se hi images uploaded ho
            const allPromise = [];      // for promise handling

            if (product) {
                const images = req.files.images;
                for (img of images) {
                    const productImage = createUniqueImageName(img.name)
                    destination = "./Public/Images/Product/" + productImage;

                    allimages.push(productImage)
                    allPromise.push(img.mv(destination))
                }
                                
                await Promise.all(allPromise)
                await ProductModel.updateOne(
                    {
                        _id: id
                    },
                    {
                        images: allimages
                    }
                ).then(
                    () => {
                        res.send(
                            {
                                msg: "Product images uploaded",
                                flag: 1
                            }
                        )
                    }
                ).catch(
                    () => {
                        res.send(
                            {
                                msg: "Unable to upload Product images",
                                flag: 1
                            }
                        )
                    }
                )

            }
        } catch (error) {
            return res.send({ msg: "Internal server error", flag: 0 });
        }
    }
}

module.exports = ProductController;