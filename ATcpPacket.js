class ATcpPacket {
    constructor() {
        sourcePort = 0;
        destinationPort = 0;
        data = '';
    }
    getSourcePort() {
        return sourcePort;
    }
    getDestinationPort() {
        return destinationPort;
    }
    getData() {
        return data;
    }
    setSourcePort(sourcePort) {
        this.sourcePort = sourcePort;
    }
    setDestinationPort(destinationPort) {
        this.destinationPort = destinationPort;
    }
    setData(data) {
        this.data = data;
    }

}