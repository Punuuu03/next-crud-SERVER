const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// CRUD Routes
router.post('/items', itemController.createItem);
router.get('/items', itemController.getItems);
router.get('/items/:id', itemController.getItemById); // <-- Add this route for fetching a single item by ID
router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);

module.exports = router;
