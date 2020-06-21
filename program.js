// importando os metodos UDP para utilizar no Tcp
const udp = require('dgram');
let servidor = udp.createSocket('udp4');
let cliente = udp.createSocket('udp4');

servidor.bind(2222);
cliente.bind(3333);


// Exemplo objeto PACOTE:

const pacote = {
  sourcePort: 0,
  destPort: 0,
  seqNum: 0,
  ackNum: 0,
  ACK: false,
  SYN: false
};

// =========== PORTA DO CLIENTE: 3333 ======================
const portaCliente = '3333';

// =========== PORTA DO SERVIDOR: 2222 =====================
const portaServidor = 2222;




// =============== SERVIDOR ===============================

// criando servidor


// Booleano que será TRUE quando o 3-way-handshake
// for realizado com sucesso.
let statusConexao = false;
let numeroHandshake = 0;
// Emite quando um pacote é recebido
servidor.on('message', function (pacoteBufferCliente) {
    let stringBuffer = pacoteBufferCliente.toString();
    let pacoteDoCliente = JSON.parse(stringBuffer);

    if(pacoteDoCliente.SYN == true && pacoteDoCliente.ACK == true ) {
      console.log('SYN-ACK RECEBIDO!');
      numeroHandshake = numeroHandshake+1;
      statusConexao = true;
      console.log('CONNECÃO: ', statusConexao);
      process.exit(1);
    }


    if(pacoteDoCliente.SYN == true ) {
      setTimeout(function() {
      console.log('SYN recebido do cliente : ' + pacoteDoCliente.SYN.toString());

      //Enviando pacote com ACK true
      let pacoteParaCliente = {
        sourcePort: portaServidor,
        destPort: portaCliente,
        seqNum: 0,
        ackNum: pacoteDoCliente.seqNum + 1,
        ACK: true,
        SYN: false
      }

      let pacoteParaClienteSTRING = JSON.stringify(pacoteParaCliente);
      let pacoteParaClienteBUFFER = Buffer.from(pacoteParaClienteSTRING);
      setTimeout(function() {
      servidor.send(pacoteParaClienteBUFFER, portaCliente , 'localhost', function (error) {
          if (error) {
              client.close();
          } else {
              numeroHandshake = numeroHandshake + 1;
              console.log('DADOS ENVIADO !');
              console.log('HANDSHAKE ATUAL: ', numeroHandshake);
          }
      });
    }, 2000
  );

}, 2000
  );
    }


});

// =============== CLIENTE ===============================

// criando servidor cliente

// Cliente iniciando 3 way handshake (enviando syn = 0)
const pacoteSYNInicial = {
  sourcePort: portaCliente,
  destPort: portaServidor,
  seqNum: 0,
  ackNum: 0,
  ACK: false,
  SYN: true
};

let pacoteSynIniString = JSON.stringify(pacoteSYNInicial);
let pacoteSynIniBUFFER = Buffer.from(pacoteSynIniString);

setTimeout(function() {
    cliente.send(pacoteSynIniBUFFER, portaServidor, 'localhost', function (error) {
        if (error) {
            client.close();
        } else {
            numeroHandshake = numeroHandshake + 1;
            console.log('Pacote SYN inicial enviado !');
        }
    });
  }, 2000
);

// Emite quando um pacote é recebido

cliente.on('message', function (pacoteBufferServidor) {
  let stringBufferDoServidor = pacoteBufferServidor.toString();
  let pacoteDoServidorr = JSON.parse(stringBufferDoServidor);

    if(pacoteDoServidorr.ACK == true ) {

      setTimeout(function() {
      console.log('ACK recebido do servidor : ' + pacoteDoServidorr.ACK.toString());

      //Enviando pacote com SYN ACK de volta ao servidor
      let pacoteParaServSynAck = {
        sourcePort: portaCliente,
        destPort: portaServidor,
        seqNum: 1,
        ackNum: pacoteDoServidorr.ackNum,
        ACK: true,
        SYN: true
      }

      let pacoteSynAckString = JSON.stringify(pacoteParaServSynAck);
      let pacoteSynAckBUFFER = Buffer.from(pacoteSynAckString);
      setTimeout(function() {
      cliente.send(pacoteSynAckString, portaServidor , 'localhost', function (error) {
          if (error) {
              client.close();
          } else {
              numeroHandshake = numeroHandshake + 1;
              console.log('DADOS SYN-ACK ENVIADO !');
              console.log('HANDSHAKE ATUAL: ', numeroHandshake);
          }
      });
    }, 2000
  );
    }, 2000
  );
    }
});




// ======================== FIM 3 WAY HANDSHAKE ===================================
