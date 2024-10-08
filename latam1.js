/*--:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::.

     _____  _______ _______ _____ _______ _____ _______ _______        X
    |_____] |_____| |         |   |______   |   |       |_____|      (o o)
    |       |     | |_____  __|__ |       __|__ |_____  |     |     (  V  )
   ___________________________________________________________________m.m____..
   |||||||| By: pacifica.co |||||||||||||||||||||||||||||||||||||||||||||||||||

  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::20241002 */

console.log('Pacifica v.1.0.50')

document.addEventListener("DOMContentLoaded", function (event) {
    var currentCountry = getCurrentCountry();

    btn({
        href: `https://avoncpe.com/chat${currentCountry.toUpperCase()}`,
        image: "/dam/cpe-assets/static/images/icono_chat-avon-nuevo2024.gif",
        imageDesktopWidth: "7.5rem",
        imageMobileWidth: "6rem",
        addToMobile: true,
        addToDesktop: true,
    })


    ReplaceLoginButton(currentCountry);
});

//-----------------------------------------------------------------------------------------------------------

//Función que obtiene el país
function getCurrentCountry() {
    var path = location.pathname;
    var countries = ['co', 'ec', 'pe', 'cl'];
    var currentCountry = '';
    countries.forEach(ct => {
        if (path.includes(`avon-${ct}`) || path.includes(`${ct}-home`)) {
            currentCountry = ct
        }
    })
    return currentCountry;
}

function GetLoginButtonLabel(country) {
    switch (country) {
        case 'co':
        case 'ec':
        case 'pe':
            return 'ACCESO A MI NEGOCIO';
        case 'cl':
            return 'CONSULTORAS / MI ESPACIO AVON';
    }
}

//Función para agregar botón flotante
function btn(props) {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    var container = document.createElement('div')
    container.style.position = "fixed"
    container.style.bottom = "25%"
    container.style.right = "0"
    container.style.zIndex = "9999"

    var anchor = document.createElement("a")
    anchor.href = props.href
    anchor.target = "_blank"

    var image = document.createElement("img")
    image.src = props.image



    var cssHandler = function (e) {
        console.log(props.imageDesktopWidth)
        if (e.matches) {
            image.style.width = props.imageMobileWidth;
        } else {
            image.style.width = props.imageDesktopWidth;
        }
    }

    var mediaquery = window.matchMedia("(max-width: 768px)")
    mediaquery.addListener(cssHandler.bind(this))
    // window.addEventListener('resize',function(){cssHandler(mediaquery)})
    cssHandler(mediaquery)

    // este condicional determina si se debe agregar o no el boton
    // nuevas props para determinar si anadir para desktop o mobile desde args
    // de la funcion
    if ((!isMobile && props.addToDesktop) || (isMobile && props.addToMobile)) {
        anchor.append(image)
        container.append(anchor)
        if(getCurrentCountry() !== 'pe'){
            document.querySelector("body").append(container)
        }
    }

}

//Función para reemplazar el botón de login
function ReplaceLoginButton(country) {
    var tag = window.screen.width <= 766 ? 'div' : 'li';
    var container = $(`${tag}[ng-controller="loginCtrl"]`)[0];
    var loginRoot = '';
    var label = GetLoginButtonLabel(country);
    if (country !== 'pe') {
        if (country === 'co') {
            loginRoot = 'http://avon.com.co';
        }
        else {
            loginRoot = `https://www.${country}.avon.com`
        }

        if(country === 'co'){
            container.innerHTML = `<a href="https://minegocio.natura-avon.com.co" Target="_Blank">${label}</a>`;
        } 
        else if (country === 'ec'){
            container.innerHTML = `<a href="https://minegocio.natura-avon.com.ec" Target="_Blank">${label}</a>`;
        }
        else if (country === 'cl'){
          container.innerHTML = `<a href="https://www.avon.cl/cl-home/Consultoria-de-Belleza-Natura-y-Avon.html" Target="_Blank">${label}</a>`;
        }
        else {
            container.innerHTML = `<a href="${loginRoot}/REPSuite/loginMain.page" Target="_Blank">${label}</a>`;
        }
    }
    else {
        container.innerHTML = `<a href="https://minegocio.natura-avon.com.pe/" Target="_Blank">${label}</a>`;
    }
}


//Función para reemplazar el logo del menú

window.onload = function(){
var avMenu = document.getElementsByClassName("big-nav");
avMenu[0].innerHTML += "<a href='/' class='ij-logo'><img src='https://cdn.jsdelivr.net/gh/pacificosas/magnolia@1/avon-logo.png' alt='Avon' class=' logo-avon'></a>";

var avMobMenu = document.querySelectorAll(".small-bar .row .col-xs-8");
avMobMenu[0].innerHTML += "<a href='/'><img src='https://cdn.jsdelivr.net/gh/pacificosas/magnolia@1/avon-logo.png' alt='Avon' class='ij-img-logo'></a>";

var grLogo = document.querySelectorAll(".ij-logo img")[0];

window.addEventListener("scroll", function(){
var scrollPos = window.scrollY;

if(scrollPos == 0){
grLogo.style.minHeight = "80px";
}
else{
grLogo.style.minHeight = "50px";
}
})


};