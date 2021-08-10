const app = require('http')
.createServer((req, res) => res.sendDate('oh hi there!'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
});
