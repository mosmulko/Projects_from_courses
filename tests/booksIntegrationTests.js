require("should");

const request = require("supertest");
const mongoose = require("mongoose");

// protects our database in the production side
// you can comment out our database in app to be sure
process.env.ENV = "Test";

const app = require("../app.js");

const Book = mongoose.model("Book");
const agent = request.agent(app);

describe("Book Crud Test", () => {
  it("Should allow a book to be posted and return read and _id", (done) => {
    // create a request object of book
    const bookPost = {
      title: "My book",
      author: "Monika",
      genre: "Fiction",
    };
    // agent sends api request to app
    agent
      .post("/api/books")
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        // console.log(results);
        // failing test
        results.body.read.should.equal(false);
        results.body.should.have.property("_id");
        done();
      });
  });
  // we need to delete posted test book
  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
