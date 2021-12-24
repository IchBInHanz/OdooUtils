let users = {
    cindy: "Cindy Bosch",
    admin: "Administrator",
    sav: "Samuel Scheen",
    raph: "Raphael Orthmans",
    john: "John's computers",
    flo: "Florent Timsonet",
    ced: "Cédric Bennai",
    bryan: "Bryan Drouven",
}

async function ask() {
    console.log(window.location.href)
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 500));
        if (window.location.href.includes('/pos/ui')) {
            if ((document.getElementsByClassName('pay-circle')[0]) && (document.getElementsByClassName('actionpad')[0]) && !(document.getElementsByClassName('screen-login')[0])) {
                console.log(window.location.href)
                console.log('is POS')
                await new Promise(resolve => setTimeout(resolve, 100));
                document.getElementsByClassName('username')[0].click()
                await new Promise(resolve => setTimeout(resolve, 100));
                document.getElementsByClassName('modal-dialog')[0].style.display = 'none'
                await new Promise(resolve => setTimeout(resolve, 100));
                do { var usrt = prompt("Give input") } while(usrt == null || usrt == "" );
                await new Promise(resolve => setTimeout(resolve, 100));
                Array.from(document.getElementsByClassName('selection-item')).forEach(elm => {
                    if (elm.innerText == users[usrt]) {
                        elm.click()
                    }
                });
                
                document.getElementsByClassName('modal-dialog')[0].style.display = 'block'
                document.getElementsByClassName('pay')[0].addEventListener('click', async (e) => {
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    ask()
                })                
                break
            }
        }
    }
    
}
ask()