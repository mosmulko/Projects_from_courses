function booksController(Book) {
  function post(req, res) {
    const book = new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      return res.send("Title is required");
    }
    book.save();
    res.status(201);
    return res.json(book);
  }
  function get(req, res) {
    // const query = {};
    // if (req.query.genre) {
    //   query.genre = req.query.genre;
    // }

    // if I want to search by more than genre
    const { query } = req;

    // we either get an error or some books back
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      const newBooks = books.map((book) => {
        // we need to strip it off mongoose
        const newBook = book.toJSON();
        newBook.links = {};
        newBook.links.self = `http://${req.headers.host}/api/books/${newBook._id}`;
        return newBook;
      });
      return res.json(newBooks);
    });
  }
  return { post, get };
}

module.exports = booksController;
