const { MongoClient, ObjectID } = require("mongodb");
const debug = require("debug")("app:bookController");

function bookController(bookService, nav) {
  function getIndex(req, res) {
    const url = "mongodb://localhost:27017";
    const dbName = "libraryApp";

    async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug("Connected to the Server");

        const db = client.db(dbName);

        const col = db.collection("books");

        const books = await col.find().toArray();
        res.render("bookListView", {
          title: "Library",
          nav,
          books,
        });
      } catch (err) {
        debug(err.stack);
      }

      client.close();
    }
    mongo();
  }
  function getById(req, res) {
    const { id } = req.params;
    const url = "mongodb://localhost:27017";
    const dbName = "libraryApp";

    async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug("Connected to the Server");

        const db = client.db(dbName);

        const col = db.collection("books");

        const book = await col.findOne({ _id: new ObjectID(id) });

        // API call
        book.details = await bookService.getBookById(book.bookId);

        debug("book", book);
        res.render("bookView", {
          title: "Library",
          nav,
          book,
        });
      } catch (err) {
        debug(err.stack);
      }

      client.close();
    }
    mongo();
  }
  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect("/");
    }
  }
  // revealing module pattern
  return {
    getIndex,
    getById,
    middleware,
  };
}

module.exports = bookController;
