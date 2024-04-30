$(document).ready(function() {
    var casillas = {
        1: "vacio",
        2: "vacio",
        3: "vacio",
        4: "vacio",
        5: "vacio",
        6: "vacio",
        7: "vacio",
        8: "vacio",
        9: "vacio"
    };
    let turno = 1;
    let gameOver=false;
    let nameCheck=false; // para que no spueda clickear nada hasta que se introduzcan  los nombres

    function checkGanador() {
        // checkea columnas
        for (let i = 1; i <= 3; i++) {
            if (casillas[i] !== "vacio" && casillas[i] === casillas[i + 3] && casillas[i] === casillas[i + 6]) {    // comprueba que la casilla no esté vacia y la compara con las otras casillas de la columna
                if(casillas[i]==nombreJ1){    // si coinciden, se declara ganador, y muestra un mensaje u otro dependiendo del jugador que haya ganado
                    $(".contenedorTexto").html(`<strong>${nombreJ1} ha ganado</strong>`);
                    mensajeFinJuego();
                }else{
                    $(".contenedorTexto").html(`<strong>${nombreJ2} ha ganado</strong>`);
                    mensajeFinJuego();
                }
                return;
            }
        }    
        // checkea filas
        for (let i = 1; i <= 7; i+=3) {
            if (casillas[i] !== "vacio" && casillas[i] === casillas[i + 1] && casillas[i] === casillas[i + 2]) {    // comprueba que la casilla no esté vacia y la compara con las otras casillas de la fila
                if(casillas[i]==nombreJ1){    // si coinciden, se declara ganador, y muestra un mensaje u otro dependiendo del jugador que haya ganado
                    $(".contenedorTexto").html(`<strong>${nombreJ1} ha ganado</strong>`);
                    mensajeFinJuego();
                }else{
                    $(".contenedorTexto").html(`<strong>${nombreJ2} ha ganado</strong>`);
                    mensajeFinJuego();
                }
                return;
            }
        }    
        // chequea diagonales
        if (casillas[1] !== "vacio" && casillas[1] === casillas[5] && casillas[1] === casillas[9]) {    // comprueba que la casilla no esté vacia y la compara con las otras casillas de la diagonal
            if(casillas[1]==nombreJ1){    // si coinciden, se declara ganador, y muestra un mensaje u otro dependiendo del jugador que haya ganado
                $(".contenedorTexto").html(`<strong>${nombreJ1} ha ganado</strong>`);
                mensajeFinJuego();
            }else{
                $(".contenedorTexto").html(`<strong>${nombreJ2} ha ganado</strong>`);
                mensajeFinJuego();
            }
            return;
        }
        if (casillas[3] !== "vacio" && casillas[3] === casillas[5] && casillas[3] === casillas[7]) {    // comprueba que la casilla no esté vacia y la compara con las otras casillas de la diagonal
            if(casillas[3]==nombreJ1){    // si coinciden, se declara ganador, y muestra un mensaje u otro dependiendo del jugador que haya ganado
                $(".contenedorTexto").html(`<strong>${nombreJ1} ha ganado</strong>`);
                mensajeFinJuego();
            }else{
                $(".contenedorTexto").html(`<strong>${nombreJ2} ha ganado</strong>`);
                mensajeFinJuego();
            }
            return;
        }    
        // si no hay ganador, se declara empate
        if (Object.values(casillas).every(value => value !== "vacio")) {    // checkea que todos los valores del objeto casillas sean distinto de vacio
            $(".contenedorTexto").html("<strong>EMPATE</strong>");
            
            setTimeout(function() {
                
                var iframe = $('<iframe>', {    // iframe para el video
                    src: 'https://www.youtube.com/embed/J49irbymkzo?autoplay=1&loop=1', // SURPRISE, MOTHERFUCKER
                    width: '560',
                    height: '315',
                    frameborder: '0',
                    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                    allowfullscreen: true
                });
                $('body').html(''); // borramos todo            
                $('body').append(iframe); //metemos el iframe en body
            }, 1000); // delay de 1 segundo
            
        }
    }
    let nombreJ1=null,nombreJ2=null;// iniciamos variables para nombres

    

    $("#agregar").click(function() {
        console.log("//////");
        nombreJ1 = $("#nombre1").val();
        nombreJ2 = $("#nombre2").val();
        // Recuerda que no hay input si se agrega sin texto
        if (nombreJ1.trim() === '') {
            alert('Por favor numero 1, introduzca un nombre valido');
            return;
        };
        if (nombreJ2.trim() === '') {
            alert('Por favor numero 2, introduzca un nombre valido');
            return;
        };
        if(nombreJ1!=null && nombreJ2!=null){   // cuando las dos cambian del valor inicial, se inicia la partida
            nameCheck=true;
            $(".contenedorTexto").html(`<strong>Turno de ${nombreJ1}</strong>(ROJO)`);
        }
    });


    

    function mensajeFinJuego() {
        $(".contenedorTexto2").css("display", "flex"); // cambia el flex de none a flex para mostrar el mensaje
        gameOver=true;  //marcamos juego como finalizado
    }

    $(document).keydown(function(e) {   // evento para saber si hay keydown
        if (e.key === 'Enter' && gameOver) {   // si hay keydown ENTER y el juego está marcado como finalizado...
            location.reload(); // ...recarga la pagina
        }
    });
    

    $(".contenedor").on("click", ".casilla", function() {   // cada vez que se hace click en una casilla del contenedor

        var casillaId = $(this).data("casilla");    // guarda la id de esa casilla usando "data" (declarado en el div de las casillas)

        if (casillas[casillaId] === "vacio" && gameOver===false && nameCheck===true) {  //busca la casilla con la id y si esta vacia, se han introducido nombres y el juego sigue en curso, checkea las condiciones

            var imgElement = $(this).find('img'); // identificamos la imagen de la casilla

            if (turno === 1) {  // dependiendo del turno, actualiza el estado de la casilla a un color u otro
                imgElement.attr('src', 'tile_1.png'); // cambiamos la imagen contenida en casilla por la nueva ruta con el metodo attr
                casillas[casillaId] = nombreJ1;
                turno = 2;  // y cambia el turno
                $(".contenedorTexto").html(`<strong>Turno de ${nombreJ2}</strong>(AZUL)`);
            } else {    // dependiendo del turno, actualiza el estado de la casilla a un color u otro
                imgElement.attr('src', 'tile_2.png'); // cambiamos la imagen contenida en casilla por la nueva ruta
                casillas[casillaId] = nombreJ2;
                turno = 1;  // y cambia el turno
                $(".contenedorTexto").html(`<strong>Turno de ${nombreJ1}</strong>(ROJO)`);
            }
            checkGanador();
        }
    });
});