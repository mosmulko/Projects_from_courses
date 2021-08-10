const axios = require("axios");
const xml2js = require("xml2js");
const debug = require("debug")("app:goodreadsService");

const parser = xml2js.Parser({ explicitArray: false });

function goodReadService() {
  function getBookById(id) {
    // we use await in bookController so we can return a promise
    return new Promise((resolve, reject) => {
      axios
        .get(`https://www.goodreads.com/book/show/${id}.xml?key=`)
        .then((response) => {
          // we want book object
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              debug(result);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });
    });
  }

  return { getBookById };
}

module.exports = goodReadService();
