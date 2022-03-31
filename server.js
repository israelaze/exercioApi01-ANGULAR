//Install express server
const express = require('express');
const path = require('path');

const nomeApp = process.env.npm_package_name;
const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/exercicioAngular01'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
});

app.listen(process.env.PORT || 8080);