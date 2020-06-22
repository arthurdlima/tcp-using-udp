// importando os metodos UDP para utilizar no Tcp
const udp = require('dgram');
let servidor = udp.createSocket('udp4');
let cliente = udp.createSocket('udp4');

const portaCliente = 3333;
const portaServidor = 2222;

//exemplo pacote
const pacote = {
  sourcePort: 0,
  destPort: 0,
  seqNum: 0,
  ackNum: 0,
  ACK: false,
  SYN: false,
  data: ''
};


// ============== ARQUIVO PARA ENVIAR AO CLIENTE ==============
const arquivo = 'Aula-de-prog-avancada';
// ============================================================

/* Fazendo loop em cada char da string e adicionando seu valor
ao campo de dados do pacote. Convertendo cada pacote em buffer,
e adicionando ao array
*/
let array = [];
arquivo.forEach(char => {
  const pacote = {
    sourcePort: portaServidor,
    destPort: portaCliente,
    seqNum: 0,
    ackNum: 0,
    ACK: false,
    SYN: false,
    data: char
  };

  

})

//let str = JSON.stringify(arquivo);

//let buf = Buffer.from(str);

console.log(buf.length);



process.on('message', (m) => {
  servidor.bind(2222);
  cliente.bind(3333);
  console.log('========= No processo filho ==========')
  console.log('Cliente quer o número de sequência :', m.ultimoNseq);



  /* Enviando primeiro pacote (em buffer) ao cliente (logo após ele fazer a
    requisição pedindo o num seq 1)
  */
  servidor.send(pacoteBuffer, portaCliente , 'localhost', function (error) {
      if (error) {
          cliente.close();
      }
  });
});


servidor.on('message', function () {

  console.log("eita! Agora recebi");
});





cliente.on('message', function () {

  console.log('ta funcionando client, recebeu');

  cliente.send(buf, portaServidor , 'localhost', function (error) {
      if (error) {
          cliente.close();
      }
    });
});
