const app = require('./src/config/express');
let port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Server listening on port: ${port}!`);
})