async function waitUtilLoaded(elm='.o_menu_brand') {
    let isLoaded = false;
    while (!isLoaded) {
        if (!(document.querySelector(elm) == null)) {
            isLoaded = true;
            await new Promise(resolve => setTimeout(resolve, 2000));
            break;
        }
        await new Promise(resolve => setTimeout(resolve, 300));
    }
    return isLoaded;
}