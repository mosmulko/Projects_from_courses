const should = require("should");
const sinon = require("sinon");
const bookController = require("../controllers/booksController");

describe("Books Controller Tests", () => {
  describe("Post", () => {
    it("should not allow empty title on post", () => {
      // we need an instance of Book that calls save
      // save doesn't need to do anything
      const Book = function (book) {
        this.save = () => {};
      };

      // mock up of request without title
      const req = {
        body: {
          author: "Jon",
        },
      };

      // for resp we need what it sends and status
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        // we don't really need json, because it shouldn't be callled
        json: sinon.spy(),
      };

      // to create a test:
      const controller = bookController(Book);
      controller.post(req, res);

      // we want the status to be 400 'bad request'
      res.status
        .calledWith(400)
        .should.equal(true, `Bad status ${res.status.args[0][0]}`);

      res.send.calledWith("Title is required").should.equal(true);
    });
  });
});
