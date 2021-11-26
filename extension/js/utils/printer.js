function createPayload(product, number) {
    var ttText = ``
    var printText = `^XA^FO15,15^A0N,18,18^FD${product.name}^FS^FO15,50^CI28^A0N,30,30^FH^FDPrice: ${product.price} €^FS^FO65,95^BY1^BCN,80,Y,N,N^FD${product.barCode}^FS^XZ`
    for (let i = 0; i < number; i++) { 
        ttText += printText
    }
    return ttText;
}


function jspmWSStatus() {
    if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Open)
        return true;
    else if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Closed) {
        alert('JSPrintManager (JSPM) is not installed or not running! Download JSPM Client App from https://neodynamic.com/downloads/jspm');
        return false;
    }
    else if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Blocked) {
        alert('JSPM has blocked this website!');
        return false;
    }
}


function printZPL(zplText) {
    if (jspmWSStatus()) {
        var cpj = new JSPM.ClientPrintJob();
        cpj.printerCommands = zplText;
        cpj.sendToClient();
    }
}

JSPM.JSPrintManager.auto_reconnect = true;
JSPM.JSPrintManager.start();
JSPM.JSPrintManager.WS.onStatusChanged = function () {
    jspmWSStatus()
};