console.log('OdooUtils Running...')


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
// setOrderUser()
// alertOrder()