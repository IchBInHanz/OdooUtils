let product = {
    name: undefined,
    price: undefined,
    barCode: undefined
}

async function printArticel() {
    window.addEventListener('hashchange', async () => {
        if (window.location.hash.includes('action=350') && window.location.hash.includes('view_type=form')) {
            await waitUtilLoaded() 
            try {
                document.querySelector('.o_search_options').innerHTML = ''
                document.querySelector('.o_search_options').innerHTML += `
                    <input id="ou-num-print" type="number" value="1">
                    <button id="ou-print">PRINT</button>`
                document.getElementById('ou-print').addEventListener('click', () =>{
                    product.name = document.getElementsByName('name')[0].innerHTML
                    // try {
                    //     product.price = parseFloat(document.getElementsByName('list_price')[0].innerHTML).toString().split(".")
                    //     if (product.price[1].length == 1) {product.price[1] = product.price[1]+'0'}
                    //     product.price = product.price[0]+'.'+product.price[1] 
                    // } catch (err) {
                    //     product.price = parseFloat(document.getElementsByName('list_price')[0].innerHTML).toString() + '.00'
                    // }
                    product.price = document.getElementsByName('list_price')[0].innerHTML.slice(0, -7)
                    product.barCode = parseFloat(document.getElementsByName('barcode')[0].innerHTML)
                    if (product.barCode == 'NaN') {
                        product.barCode = ''
                    }
                    printZPL(createPayload(product, parseInt(document.getElementById('ou-num-print').value)) )
                })
            } catch (err) { console.log('Lazzzzy Loading')}
        }
    })
}

function createPayload(product, number) {
    var ttText = ``
    var printText = `^XA^FO15,15^A0N,18,18^FD${product.name}^FS^FO15,50^CI28^A0N,30,30^FH^FDPrice: ${product.price} €^FS^FO65,95^BY1^BCN,80,Y,N,N^FD${product.barCode}^FS^XZ`
    for (let i = 0; i < number; i++) { 
        ttText += printText
    }
    return ttText;
}