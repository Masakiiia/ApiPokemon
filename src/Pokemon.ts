const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;
const server = createServer(async (req, res) => {

    const randomId = Math.floor(Math.random() * 1025)+1;
    const getpoke = await fetch('https://pokeapi.co/api/v2/pokemon/'+ randomId);
    const data = await getpoke.json();

    if (req.method === 'GET' && req.url === '/wild') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    }

    if (req.method === 'GET' && req.url === '/wild/capture') {
        const captureRate = Math.floor(Math.random() * 100)+1;
        if(captureRate % 2 === 0) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            return res.end("Capture de "+data.name+ " réussie !!!");
        }
        else{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            return res.end("Dommage... La capture de "+data.name+ " n'a pas abouti....;")

        }
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});