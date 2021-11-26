console.log('OdooUtils Running...')

let product = {
    name: undefined,
    price: undefined,
    barCode: undefined
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

window.addEventListener('hashchange', () => {
    run()
})

async function run() {
    await waitUtilLoaded()
    if (window.location.hash.includes('action=350') && window.location.hash.includes('view_type=form')) {
        try {
            document.querySelector('.o_search_options').innerHTML = ''
            document.querySelector('.o_search_options').innerHTML += `
                <input id="ou-num-print" type="number" value="1">
                <button id="ou-print">PRINT</button>`
            document.getElementById('ou-print').addEventListener('click', () =>{
                product.name = document.getElementsByName('name')[0].innerHTML
                try {
                    product.price = parseFloat(document.getElementsByName('list_price')[0].innerHTML).toString().split(".")
                    if (product.price[1].length == 1) {product.price[1] = product.price[1]+'0'}
                    product.price = product.price[0]+'.'+product.price[1] 
                } catch (err) {
                    product.price = parseFloat(document.getElementsByName('list_price')[0].innerHTML).toString() + '.00'
                }
                
                product.barCode = parseFloat(document.getElementsByName('barcode')[0].innerHTML)
                printZPL(createPayload(product, parseInt(document.getElementById('ou-num-print').value)) )
                // download(product.barCode+'.txt', createPayload(product, parseInt(document.getElementById('ou-num-print').value)))
            })
        } catch (err) { console.log('Lazzzzy Loading')}
    }
    
}
run()