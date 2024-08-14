const { Book } = require("../models");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookById = async (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  
  try {
    const book = await Book.findByPk(bookId);
    
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Libro no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};