const io = require('../index');
//Mensajes de Sockets
io.on('connection', client => {
    console.log("cliente conectado");

    client.on('disconnect', () => { 
        console.log('cliente desconectado') });

    client.on('mensaje',(payload)=>{
        console.log('aceptar mensaje', payload);
        io.emit('mensaje', {admin:'nuevo mensaje'});
    });
  });