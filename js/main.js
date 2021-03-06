function scan()
{
    $('#reader').html5_qrcode(function(data){
            // do something when code is read
        console.log("leeeeeeeeeeee")
        },
        function(error){
            //show read errors
        }, function(videoError){
            //the video stream could be opened
        }
    );
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