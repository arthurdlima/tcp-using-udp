class ATcpPacket {
    constructor() {
        this.sourcePort = 0;
        this.destinationPort = 0;
        this.sequenceNumber = 0;

        this.SYN = 0;
        this.ACK = 0;
        this.FIN = 0;

        this.data = null;
    }


    getSourcePort() {
        return this.sourcePort;
    }
    getDestinationPort() {
        return this.destinationPort;
    }
    getSequenceNumber() {
        return this.sequenceNumber;
    }
    getData() {
        return this.data;
    }
    getSYN() {
        return this.SYN;
    }
    getACK() {
        return this.ACK;
    }
    getFIN() {
        return this.FIN;
    }

    // -----------------------------------------

    setSourcePort(sourcePort) {
        this.sourcePort = sourcePort;
    }
    setDestinationPort(destinationPort) {
        this.destinationPort = destinationPort;
    }
    setSequenceNumber(sequenceNumber) {
        this.sequenceNumber = sequenceNumber;
    }
    setData(data) {
        this.data = data;
    }
    setSYN(SYN) {
        this.SYN = SYN;
    }
    setACK(ACK) {
        this.ACK = ACK;
    }
    setFIN(FIN) {
        this.FIN = FIN;
    }
}

module.exports = ATcpPacket;