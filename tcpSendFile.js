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
/* Valor do String pode ser alterado, será alterado a quantidade de pacotes */
const arquivo = 'Lin Tse Min!!!';
// ============================================================


//let str = JSON.stringify(arquivo);

//let buf = Buffer.from(str);

//console.log(array.length);


let array = [];
let nSeq = 0;

process.on('message', (m) => {
  servidor.bind(2222);
  cliente.bind(3333);
  console.log(' ')
  console.log('========= PROCESSO FILHO ==========')
  console.log(' ')
  console.log('Cliente quer o pacote de número de sequência :', m.ultimoNseq);
  nSeq = m.ultimoNseq;

  /* Fazendo loop em cada char da string e adicionando seu valor
  ao campo de dados do pacote. Convertendo cada pacote em buffer,
  e adicionando ao array
  */

  arquivo.split('').forEach(char => {
    const pacote = {
      sourcePort: portaServidor,
      destPort: portaCliente,
      seqNum: nSeq,
      ackNum: 0,
      ACK: false,
      SYN: false,
      data: char
    };
  let pacoteEmString = JSON.stringify(pacote);
  let pacoteEmBuffer = Buffer.from(pacoteEmString);
  array.push(pacoteEmBuffer);
  nSeq = nSeq+1;
  })
  nSeq = nSeq-1;


  /* Enviando primeiro pacote (em buffer) ao cliente (logo após ele fazer a
    requisição pedindo o num seq 1)
  */
  servidor.send(array[0], portaCliente , 'localhost', function (error) {
      if (error) {
          cliente.close();
      }
      console.log('Enviando pacote 1 de '+nSeq+ ' para cliente...');
  });

});


servidor.on('message', function (reqEmBuffer) {
  let reqString = reqEmBuffer.toString();
  let reqInt = JSON.parse(reqString);

  servidor.send(array[reqInt-1], portaCliente , 'localhost', function (error) {
      if (error) {
          cliente.close();
      }
      console.log('Enviando pacote '+ reqInt +' de '+nSeq+ ' para cliente...');
  });

});





cliente.on('message', function (pacoteBuff) {
  let pacoteString = pacoteBuff.toString();
  let pacoteObj = JSON.parse(pacoteString);

  if(pacoteObj.seqNum == nSeq) {
    console.log('Cliente recebeu pacote ' + pacoteObj.seqNum + ' de ' + nSeq +' !!!');
    console.log(' ')
    console.log('==== ENVIO DE ARQUIVO COMPLETO! ====')
    return process.exit(1);
  }

  let proxPacote = pacoteObj.seqNum + 1;
  console.log('Cliente recebeu pacote ' + pacoteObj.seqNum + ' de ' + nSeq +' !!!');
  console.log('Cliente quer pacote ' + proxPacote);
  console.log(' ');

  let reqEmString = JSON.stringify(proxPacote);
  let reqEmBuffer = Buffer.from(reqEmString);
    setTimeout(function() {
      cliente.send(reqEmBuffer, portaServidor , 'localhost', function (error) {
          if (error) {
              cliente.close();
          }
        });
    }, 1000
  );
});
