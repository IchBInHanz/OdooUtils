async function removeBanner() {
    await waitUtilLoaded()
    await new Promise(resolve => setTimeout(resolve, 1000));
    try {
        document.getElementsByClassName('database_expiration_panel')[0].remove()
    } catch (error) {
        // console.log(error)
    }
}