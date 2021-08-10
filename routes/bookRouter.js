/* eslint-disable no-param-reassign */
const express = require("express");
const booksController = require("../controllers/booksController");

function routes(Book) {
  const bookRouter = express.Router();
  const controller = booksController(Book);
  bookRouter.route("/books").post(controller.post).get(controller.get);

  // finding an individual item by it's ID
  bookRouter.use("/books/:bookId", (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      // if book exists then make it available to other calls
      if (book) {
        req.book = book;
        return next();
      }
      // if there's no book return 404
      return res.sendStatus(404);
    });
  });
  bookRouter
    .route("/books/:bookId")
    .get((req, res) => {
      const newBook = req.book.toJSON();
      const genre = newBook.genre.replace(" ", "%20");
      const author = newBook.author.split(" ").join("%20");
      console.log(genre.name);
      newBook.links = {};
      newBook.links.FilterByThisGenre = `http://${req.headers.host}/api/books/?genre=${genre}`;
      newBook.links.FilterByThisAuthor = `http://${req.headers.host}/api/books/?author=${author}`;
      return res.json(newBook);
    })
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .patch((req, res) => {
      const { book } = req;
      // eslint-disable-next-line no-underscore-dangle
      if (req.body._id) {
        // eslint-disable-next-line no-underscore-dangle
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        book[key] = value;
      });
      book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });

  return bookRouter;
}

module.exports = routes;
