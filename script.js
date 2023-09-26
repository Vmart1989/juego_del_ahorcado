
let palabra = document.getElementById('palabra')


let palabras = ['BALLENA','BRUJA', 'MARRON', 'FLORA', 'MOTOCICLETA', 'FRESA', 'BANANA', 'AGUA', 'FUTBOL', 'BALONCESTO', 'PLAYA', 'CONTENEDOR', 'PROGRAMACION', 'MITO', 'LENGUAJE', 'MICROBIO', 'SULTAN', 'ALFOMBRA', 'TELESCOPIO', 'TSUNAMI', 'ACORDEON', 'MILOJA', 'ORDENADOR']
let imagen = document.getElementById("imagen_ahorcado")
let game_over = document.getElementById("game_over")

a1 = "img/a1.png"
a2 = "img/a2.png"
a3 = "img/a3.png"
a4 = "img/a4.png"
a5 = "img/a5.png"
a6 = "img/a6.png"


let imagenes = [a1, a2, a3, a4, a5, a6]

let boton_letra = document.querySelectorAll('button')
let boton_empezar = document.getElementById('empezar')
let boton_revelar = document.getElementById('revelar')
let secreta = ""
let guionesSecreta = []
let empezarPartida = false

boton_revelar.addEventListener("click", revelarPalabra)
boton_empezar.addEventListener("click", empezarJuego)



for (let index = 0; index < boton_letra.length; index++) {
    boton_letra[index].addEventListener("click", comprobarLetra);
}



function palabraSecreta() {
    let aleatorio = Math.floor(Math.random() * palabras.length)
    return palabras[aleatorio]
}

function empezarJuego() {
    errores = 0
    guionesSecreta = []
    empezarPartida = true
    imagen.src = imagenes[0]
    game_over.innerHTML = ""
    boton_empezar.disabled="true";
    boton_revelar.disabled="";
    
    for (let index = 0; index < boton_letra.length; index++) {
        boton_letra[index].disabled="";
        boton_letra[index].classList.replace("btn-success", "btn-dark")
        boton_letra[index].classList.replace("btn-danger", "btn-dark")
    }

        secreta = palabraSecreta()
        for (let i = 0; i < secreta.length; i++) {
            guionesSecreta[i] = " _ "
        }
        palabra.innerHTML = guionesSecreta.join(' ')
}


function revelarPalabra() {
    palabra.innerHTML = secreta;
    
    boton_empezar.disabled="";
    boton_empezar.value = "Jugar de nuevo";
    for (let index = 0; index < boton_letra.length; index++) {
        boton_letra[index].disabled="true";
        
    }
    

}


let errores = 0

function comprobarLetra(e) {
    if(!empezarPartida) {
        return
    }

    let letra = e.target.innerHTML.toUpperCase()
    
    if (secreta.includes(letra)) {
        
        e.target.classList.replace("btn-dark", "btn-success")
        e.target.disabled="true"
        
        for (let i = 0; i < secreta.length; i++) {
            if (secreta[i] == letra) {
                guionesSecreta[i]=letra
                palabra.innerHTML = guionesSecreta.join('')

            } 
            if (!guionesSecreta.includes(" _ ")) {
                game_over.innerHTML = "¡THE HAS SALVADO!"
                imagen.src = "img/happy.gif";
                boton_empezar.value = "Jugar de nuevo"
                boton_empezar.disabled="";
                boton_revelar.disabled="true";
                for (let index = 0; index < boton_letra.length; index++) {
                    boton_letra[index].disabled="true";
                }
                
            }
            

        }


    } else {
        errores++
        imagen.src = imagenes[errores]
        e.target.classList.replace("btn-dark", "btn-danger")
        e.target.disabled="true"
        if (errores > 4) {
            imagen.src = imagenes[errores]
            game_over.innerHTML = "¡HAS MUERTO!"
            boton_empezar.value = "Jugar de nuevo"
            boton_empezar.disabled="";
            palabra.innerHTML = secreta;
            for (let index = 0; index < boton_letra.length; index++) {
                boton_letra[index].disabled="true";
                
            }
        }
    }
}







