function alertOrder() {
    window.addEventListener('hashchange', async () => {

        if (window.location.hash.includes('action=440') && window.location.hash.includes('view_type=form')) {
            await waitUtilLoaded()
            isCheck = false;
            try {
                if(document.getElementsByName('name')[0].outerText == 'New') {
                    isCheck = false;
                } else { check() }
            } catch (error) {
                isCheck = false
            }
        }

        if (window.location.hash.includes('action=510') && window.location.hash.includes('view_type=form')) {
            await waitUtilLoaded()
            try {
                var oderId = document.getElementsByName('name')[0].outerText
                if (!(oderId == 'Nouveau')) {
                    document.querySelector('.oe_title').innerHTML += `
                    <button id="ou-order-btn">...</button>`
                    var btnElm = document.getElementById('ou-order-btn')

                    var doc = await db.collection('orders').doc(oderId).get();
                    if (!doc.exists) {
                        btnElm.innerText = 'Set to Order'
                        btnElm.addEventListener('click', async () => {
                            btnElm.innerText = '...'
                            var bitems = {}
                            var kos = 0
                            await Array.from(document.querySelector('.o_list_table').rows).forEach((elm) => {
                                try {
                                    if (!(elm.cells[2].innerText == '' || elm.cells[7].innerText == 'UdM')) {
                                        bitems[kos] = {
                                            article: elm.cells[1].innerText,
                                            description: elm.cells[2].innerText,
                                            units: parseInt(elm.cells[3].innerText),
                                            unitPrice: elm.cells[8].innerText
                                        }
                                        kos++
                                    }
                                } catch (error) {}
                            });
                            document.getElementsByTagName('body')[0].innerHTML += `
                            <div id="ou-modal">
                                <div id="ou-modal-content">
                                    <table id="ou-modal-table"></table>
                                    <button id="ou-modal-btn">Send</button>
                                </div>
                            </div>
                            `
                            console.log(bitems)
                            for (const [key, value] of Object.entries(bitems)) {
                                document.getElementById('ou-modal-table').innerHTML += `
                                <tr id="ou-modal-tr">
                                    <td><input type="checkbox" class="ou-modal-checkbox" id="ou-modal-checkbox"></td>
                                    <td id="ou-modal-td">${value.article}</td>
                                    <td id="ou-modal-td">${value.description}</td>
                                    <td id="ou-modal-td">${value.units}</td>
                                    <td id="ou-modal-td">${value.unitPrice}€</td>
                                </tr>
                                `
                            }
                            document.getElementById('ou-modal-btn').addEventListener('click', async () => {
                                document.getElementById('ou-modal-btn').innerHTML = '...'
                                var kos = 0  
                                await Array.from(document.getElementsByClassName('ou-modal-checkbox')).forEach((elm) => {
                                    bitems[kos]['isOrder'] = elm.checked
                                    kos++
                                })
                                items = []
                                descriptions = []
                                articles = []
                                for (const [key, value] of Object.entries(bitems)) {
                                    if (value.isOrder) {
                                        descriptions.push(value.description)
                                        articles.push(value.article)
                                        items.push({
                                            name: value.article,
                                            description: value.description,
                                            units: value.units
                                        }) 
                                    }
                                }
                                db.collection('orders').doc(oderId).set({
                                    oderId: oderId,
                                    customer: document.getElementsByName('partner_id')[0].firstChild.innerHTML,
                                    items: items,
                                    descriptions: descriptions,
                                    articles: articles
                                })
                                .then(async () => {
                                    document.getElementById('ou-modal-btn').innerHTML = 'Success!'
                                    btnElm.innerHTML = 'Success!'
                                    await new Promise(resolve => setTimeout(resolve, 2000));
                                    document.getElementById('ou-modal').style.display = 'none'
                                })
                                .catch((error) => {
                                    console.error("Error adding document: ", error);
                                    document.getElementById('ou-modal-btn').innerHTML = 'Error!'
                                });
                            })
                        })
                    } else {
                        btnElm.style.width = '10vw'
                        btnElm.innerText = 'Remove from Order'
                        btnElm.addEventListener('click', () => {
                            btnElm.innerHTML = '...'         
                            db.collection('orders').doc(oderId).delete()
                            .then(() => {
                                btnElm.innerHTML = 'Success!'         
                            }).catch((error) => {
                                btnElm.innerHTML = 'Error!'         
                                console.error("Error removing document: ", error);
                            });
                        })
                    }
                }
            } catch (err) {}
        }
    })
}


async function check() {
    document.querySelector('.o_statusbar_buttons').innerHTML += `
    <button type="button" id="ou-check-orders-btn" class="btn btn-secondary">
        <span>Check for Orders</span>
    </button>
    `
    checkBtn = document.getElementById('ou-check-orders-btn')
    checkBtn.addEventListener('click', async () => {
        checkBtn.innerText = '...'
        var bitems = {}
        var kos = 0
        var artArr = []
        await Array.from(document.querySelector('.o_list_table').rows).forEach((elm) => {
            try {
                if (!(elm.cells[2].innerText == '' || elm.cells[1].innerText == 'Article')) {
                    bitems[kos] = {
                        article: elm.cells[1].innerText,
                        description: elm.cells[2].innerText,
                        units: parseInt(elm.cells[4].innerText)
                    }
                    kos++
                }
            } catch (error) {}
        });
        var ordersList = {}
        document.getElementsByTagName('body')[0].innerHTML += `
            <div id="ou-modal">
                <div id="ou-modal-content">
                    <div id="ou-modal-insert"></div>
                    <button id="ou-modal-btn">Send</button>
                </div>
            </div>
        `
        for (const [key, value] of Object.entries(bitems)) {
            // console.log(value)
            await db.collection('orders').where('articles', 'array-contains', value.article).get()
            .then((qS) => {
                qS.forEach((doc) => {
                    var data = doc.data()
                    if (ordersList[doc.id] == undefined || ordersList[doc.id] == null) {
                        ordersList[doc.id] = {
                            order: doc.id,
                            oderId: doc.id.replace(/\D/g,''),
                            customer: data.customer,
                            items: []
                        }
                    }
                    var item = data.items[data.descriptions.indexOf(value.description)]
                    if (!(item == undefined)) {
                        ordersList[doc.id].items.push(item)
                    }
                })
            })
        }
        for (const [orderKey, orderValue] of Object.entries(ordersList)) {
            console.log(orderKey)
            // console.log(value)
            document.getElementById('ou-modal-insert').innerHTML += `
                <span>${orderKey}</span>
                <table id="ou-modal-table" class="ou-${orderKey} ou-tabledance"></table>
            `
            for (const [itemKey, itemValue] of Object.entries(orderValue.items)) {
                console.log(itemValue)
                document.querySelector('.ou-'+orderKey).innerHTML += `
                    <tr id="ou-modal-tr">
                        <td id="ou-modal-td">${itemValue.name}</td>
                        <td id="ou-modal-td">${itemValue.description}</td>
                        <td id="ou-modal-td">${itemValue.units}</td>
                    </tr>                
                `
            }
        }
        // console.log(ordersList)
    })
}








                            // var data = doc.data()
                            // var indexOfIr = data.descriptions.indexOf(value.description)
                            // console.log('index: '+indexOfIr)
                            // ordersList[doc.id] = {
                            //     order: doc.id,
                            //     orderId: doc.id.replace(/\D/g,''),
                            //     customer: data.customer,
                            // }
                            // if (ordersList[doc.id].items == undefined) {
                            //     ordersList[doc.id].items = []
                            // }
                            // console.log(data.items[indexOfIr])
                            // value.units = value.units - data.items[indexOfIr].units
                            // console.log(doc.id, " => ", data);
                            // var oderUrl = `https://johnscomputer.odoo.com/web#id=${doc.id.replace(/\D/g,'')}&action=510&model=sale.order&view_type=form&cids=1&menu_id=326`
                            // document.getElementById('ou-modal-table').innerHTML += `
                            //     <tr id="ou-modal-tr">
                            //         <td id="ou-modal-td"><a href="${oderUrl}" target="_blank">${doc.id}</a></td>
                            //         <td id="ou-modal-td">${value.description}</td>
                            //         <td id="ou-modal-td">${value.units}</td>
                            //     </tr>
                            // `
                            // ordersList[doc.id].items.push(data.items[indexOfIr])