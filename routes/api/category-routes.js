const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll(req.params.id, {
    include: [{
      model: Product,
      include: [ProductTag]
    }]
  }).then(dbCategories => {
    res.json(dbCategories)
  })
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findByPk(req.params.id, {
    include:[{
      model: Product,
      include: [ProductTag]
    }]
  }).then (dbCategory => {
    res.json(dbCategory)
  })
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body).then(newCategory => {
    res.json(newCategory)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedCategory => {
    res.json(updatedCategory)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(deleteCategory => {
    res.json(deleteCategory)
  })
});

module.exports = router;
