console.log('%cOdooUtils Running...', "color: #875A7B; font-size: 3rem; font-weight: bold;")

let users = {
    cindy: "Cindy Bosch",
    admin: "Administrator",
    sav: "Samuel Scheen",
    nils: "Samuel Scheen",
    pep: "Samuel Scheen",
    thep: "Samuel Scheen",
    raph: "Raphael Orthmans",
    john: "John's computers",
    flo: "Florent Timsonet",
    ced: "Cédric Bennai",
    bb: "Bryan Drouven",
}

firebase.initializeApp({
    apiKey: "AIzaSyCsqL1DBtM6ZOJxBifNhd9jEVbSMeMMVHE",
    authDomain: "odoo-utils.firebaseapp.com",
    projectId: "odoo-utils",
    storageBucket: "odoo-utils.appspot.com",
    messagingSenderId: "951852864069",
    appId: "1:951852864069:web:6b5dde259359dc98da492c",
    measurementId: "G-BTSC9ZZT95"
});
let db = firebase.firestore();

Notification.requestPermission().then(function(result) {
    console.log(result);
});

removeBanner()
printArticel()
setPosUser()
setOrderUser()
hideUnkownProducts()
fritteVote()
// alertOrder()