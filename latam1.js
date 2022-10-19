/*--:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::.

     _____  _______ _______ _____ _______ _____ _______ _______        X
    |_____] |_____| |         |   |______   |   |       |_____|      (o o)
    |       |     | |_____  __|__ |       __|__ |_____  |     |     (  V  )
   ___________________________________________________________________m.m____..
   |||||||| By: pacifica.co |||||||||||||||||||||||||||||||||||||||||||||||||||

   :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

   console.log('Pacifica is READY !!!')

window.onload = (event) => {
var currentCountry = getCurrentCountry();
if(currentCountry !== 'cl'){
    btn({
      href:`https://avoncpe.com/chat${currentCountry.toUpperCase()}`,
      image:"/dam/cpe-assets/static/images/icono_chat-avon.png",
      imageDesktopWidth:"7.5rem",
      imageMobileWidth:"6rem"
    });
}

ReplaceLoginButton(currentCountry);
};

//-----------------------------------------------------------------------------------------------------------

//Función que obtiene el país
function getCurrentCountry(){
    var path = location.pathname;
    var countries = ['co', 'ec', 'pe', 'cl'];
    var currentCountry = '';
    countries.forEach(ct => {
        if(path.includes(`avon-${ct}`) || path.includes(`${ct}-home`)){
            currentCountry = ct
        }
    })
    return currentCountry;
}

function GetLoginButtonLabel(country){
    switch (country) {
        case 'co':
        case 'ec':
        case 'pe':
            return 'REPRESENTANTE / MI ESPACIO AVON';
        case 'cl':
            return 'CONSEJERA / MI ESPACIO AVON';           
    }
}

//Función para agregar botón flotante
function btn(props){
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    var container=document.createElement('div')
    container.style.position="fixed"
    container.style.bottom="25%"
    container.style.right="0"
    container.style.zIndex="9999"    

    var anchor=document.createElement("a")
    anchor.href=props.href
    anchor.target="_blank"

    var image=document.createElement("img")
    image.src=props.image



    var cssHandler=function(e){
        console.log(props.imageDesktopWidth)
        if(e.matches){
            image.style.width=props.imageMobileWidth;
        }else{
            image.style.width=props.imageDesktopWidth;
        }
    }

    var mediaquery=window.matchMedia("(max-width: 768px)")
    mediaquery.addListener(cssHandler.bind(this))
    // window.addEventListener('resize',function(){cssHandler(mediaquery)})
    cssHandler(mediaquery)

    if(!isMobile){
        anchor.append(image)
        container.append(anchor)
        document.querySelector("body").append(container)
    }
    
}

//Función para reemplazar el botón de login
function ReplaceLoginButton(country){
    var tag = window.screen.width <= 766 ? 'div' : 'li';
    var container = $(`${tag}[ng-controller="loginCtrl"]`)[0];
    var loginRoot = '';
    var label = GetLoginButtonLabel(country);
    if(country === 'co'){
        loginRoot = 'http://avon.com.co';
    }
    else{
        loginRoot = `https://www.${country}.avon.com`
    }
    container.innerHTML = `<a href="${loginRoot}/REPSuite/loginMain.page" Target="_Blank">${label}</a>`;
}

