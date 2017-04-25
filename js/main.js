function scan()
{
    alert('tadaaaa');
    QRScanner.prepare(onDone); // show the prompt

    function onDone(err, status){
        if (err) {
            // here we can handle errors and clean up any loose ends.
            console.error(err);
        }
        if (status.authorized) {
            // W00t, you have camera access and the scanner is initialized.
            // QRscanner.show() should feel very fast.
        } else if (status.denied) {
            // The video preview will remain black, and scanning is disabled. We can
            // try to ask the user to change their mind, but we'll have to send them
            // to their device settings with `QRScanner.openSettings()`.
        } else {
            // we didn't get permission, but we didn't get permanently denied. (On
            // Android, a denial isn't permanent unless the user checks the "Don't
            // ask again" box.) We can ask again at the next relevant opportunity.
        }
    }
    QRScanner.scan(displayContents);

    function displayContents(err, text){
        if(err){
            // an error occurred, or the scan was canceled (error code `6`)
        } else {
            // The scan completed, display the contents of the QR code:
            alert(text);
        }
    }

// Make the webview transparent so the video preview is visible behind it.
    QRScanner.show();
// Be sure to make any opaque HTML elements transparent here to avoid
// covering the video.

}


function hideLayer(layer){
    document.getElementById(layer).style.display = 'none'
}
function showLayer(layer){
    document.getElementById(layer).style.display = 'block'
}
function hideAllScreens(){
    var screens = document.querySelectorAll('section');
    screens.forEach(function(elem) {
        hideLayer(elem.getAttribute('id'));
    });
}

function hideMenu(menu, hamburguer){
    hamburguer.classList.remove('active');
    menu.style.left = '-50%';
}

function showMenu(menu, hamburguer){
    hamburguer.classList.add('active');
    menu.style.left = '0px';
}

function toggleMenu(){
    var scope = document.getElementsByClassName('app-menu-hamburguer')[0];
    var menu = document.getElementById('js-menu-app');
    if(menu.style.left === '0px') {
        hideMenu(menu, scope);
    } else {
        showMenu(menu, scope);
    }
}

function clearQR(){
    document.getElementById("qrcode").innerHTML = "";
}

function createQR(){
        qrcode.makeCode(document.getElementById('qr-text').value);
}

function showSelectedScreen(){
    hideAllScreens();
    showLayer(this.getAttribute('data-id-screen'));
    toggleMenu(document.getElementsByClassName('app-menu-hamburguer')[0]);
}

function setListeners(){
    document.querySelectorAll('li').forEach(function(elem) {
        elem.addEventListener('click', showSelectedScreen);
    });
    document.getElementsByClassName('app-menu-hamburguer')[0].addEventListener('click', toggleMenu);
    document.getElementById('qr-create-button').addEventListener('click', createQR);
}
function init(){
    hideAllScreens();
    setListeners();
    showLayer('main-qr');
}
init();
var qrcode = new QRCode("qrcode", {
    width: 150,
    height: 150,
    colorDark : "#135db0",
    colorLight : "#ffffff"
});

if(localStorage.getItem("LocalData") == null)
{
    var data = [];
    data = JSON.stringify(data);
    localStorage.setItem("LocalData", data);
}