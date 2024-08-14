const express = require("express");  //Module: import express from "express"
const router = express.Router();
const bookController = require("../controlador/bookController");

router.get("/books", bookController.getAllBooks);
router.get("/books/:id", bookController.getBookById); 

module.exports = router; //export default router 
