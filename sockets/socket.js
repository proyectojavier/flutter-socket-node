var io = require('../index.js');
const Bands = require('../models/bands.js');
const Band = require('../models/band.js');
const bands = new Bands();

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
  });