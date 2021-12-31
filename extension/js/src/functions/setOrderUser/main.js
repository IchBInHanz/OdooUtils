function setOrderUser() {
    window.addEventListener('hashchange', async () => {
        if (window.location.hash.includes('action=510') && window.location.hash.includes('view_type=form')) {
            await waitUtilLoaded()
            await new Promise(resolve => setTimeout(resolve, 100));
            do { var usrt = prompt("Tes qui??") } while (usrt == null || usrt == "" || !(usrt in users));
            await new Promise(resolve => setTimeout(resolve, 100));
            Array.from(document.getElementsByClassName('ui-menu-item-wrapper')).forEach(elm => {
                console.log(elm.innerText)
                if (elm.innerText == users[usrt]) {
                    elm.click()
                    console.log(elm.innerText)
                }
            });
            document.getElementById('o_field_input_762').value = users[usrt]
            document.getElementById('o_field_input_762').click()

            // document.getElementById('o_field_input_780').value = users[usrt]
        }
    })
}