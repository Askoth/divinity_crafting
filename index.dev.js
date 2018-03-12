import express from 'express';
import fs from 'fs';

function init () {
    let app = express();

    app.get('*.json', function (req, res) {
        // res.send('hello world')

        const contenType = `application/javascript; charset=UTF-8`;
        const jsonPath = __dirname + '/src' + req.path;

        let json = fs.readFileSync(jsonPath);

        res.set('Content-Type', contenType);

        res.send(`
            export default ${json}
        `);
    })

    app.use(express.static('src'))

    app.get('/', function (req, res) {
      // res.send('hello world')
      res.sendFile('index.html')
    })

    app.listen(3000, () => console.log('Example app listening on port 3000!'))
}


export default {
    init
}
