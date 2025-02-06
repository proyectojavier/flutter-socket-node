const express = require('express');
const path = require('path');
const Bands = require('./models/bands');
const Band = require('./models/band');
require('dotenv').config();

//App express
const app = express();

//Node server
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//
const bands = new Bands;

//
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Foo Fighter'));
bands.addBand(new Band('Heroes'));
bands.addBand(new Band('Salsa'));

//Mensajes de Sockets
io.on('connection', client => {
    console.log("cliente conectado");

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { 
        console.log('cliente desconectado') });

    client.on('mensaje',(payload)=>{
        console.log('aceptar mensaje', payload);
        io.emit('mensaje', {admin:'nuevo mensaje'});
    });

    client.on('vote-band', (payload)=> {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => { 
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBands(payload.id);
        io.emit('active-bands', bands.getBands());
    })

  });

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

server.listen(process.env.PORT, (err)=>{
    if(err) throw new Error(err);
    console.log('server started---port', process.env.PORT);
});