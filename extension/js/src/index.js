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


async function run() {
    await waitUtilLoaded()
    document.querySelector('.o_search_options').innerHTML += `
    <input id="ou-num-print" type="number" value="1">
    <button id="ou-print">Print</button>
    `
    document.getElementById('ou-print').addEventListener('click', () =>{
        product.name = document.getElementsByName('name')[0].innerHTML
        product.price = parseFloat(document.getElementsByName('list_price')[0].innerHTML)
        product.barCode = parseFloat(document.getElementsByName('barcode')[0].innerHTML)
        download(product.barCode+'.txt', createPayload(product, parseInt(document.getElementById('ou-num-print').value)))
    })
}
run()