function createPayload(product, number) {
    var ttText = ``
    var printText = `
^XA

^FO15,15

^A0N,18,18^FD${product.name}^FS

^FO15,50

^CI28

^A0N,30,30^FH^FDPrice: ${product.price}€^FS

^FO65,95^BY1

^BCN,80,Y,N,N

^FD${product.barCode}^FS

^XZ
`
    for (let i = 0; i < number; i++) { 
        ttText += printText
    }
    return ttText;
}