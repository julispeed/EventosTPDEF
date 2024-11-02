//VARIABLES
let eventos=[];
let numeroeventos=
(
    function()
    {
        let numero=0;
        return function()
        {
            numero++;
            return numero
        }
    }
)();

//FUNCIONES

const tabla = document.getElementById("informacion");

function ListarTabla(evento) {
    evento.forEach(element => {
        
        const fila = document.createElement("tr");

        const nombre = document.createElement("td");
        const fecha = document.createElement("td");
        const ciudad = document.createElement("td");
        const editar = document.createElement("td");
        const eliminar = document.createElement("td");

        nombre.textContent = element.nombre;
        fecha.textContent = element.fecha;
        ciudad.textContent = element.ciudad;
        editar.textContent = "editar";
        eliminar.textContent = "eliminar";

        fila.appendChild(nombre);
        fila.appendChild(fecha);
        fila.appendChild(ciudad);
        fila.appendChild(editar);
        fila.appendChild(eliminar);

        tabla.appendChild(fila);
    });
}


//LISTENER Y ELEMENTOS


//Enviar, almacenamiento en eventos con las validaciones

document.getElementById('boton-enviar').addEventListener('click',function(event)
    {
        event.preventDefault();

        const EventoNombre=document.getElementById('evento-nombre').value;
        const EventoTipo=document.querySelector('input[name="evento-tipo"]:checked');
        const EventoFecha=document.getElementById('evento-fecha').value;
        const EventoDireccion=document.getElementById('evento-direccion').value;
        const EventoCiudad=document.getElementById('evento-ciudad').value;
        const EventoCapacidad=document.getElementById('evento-capacidad').value;
        const EventoCobro=document.getElementById('evento-cotizacion').checked;
        const EventoValorizacion=document.getElementById('evento-puntuacion').value;
        const EventoObservacion=document.getElementById('evento-observacion').value;

        if (!EventoNombre)
        {   
                alert("Nombre inválido");
                return;
        }
        else if (!EventoTipo)
        {
            alert("Tipo Inválido");
            return;
        }
        else if (!EventoFecha)
        {
            alert("Fecha inválida");
            return;
        }
        else if (!EventoDireccion)
        {
            alert("Dirección inválida");
            return;
        }
        else if (!EventoCapacidad)
        {
            alert("Capacidad inválida");
            return;
        }
        else if (!EventoValorizacion)
        {
            alert("Cotizacion inválida");
            return;
        }
        else if (eventos.some(evento=> evento.nombre === EventoNombre))
        {
                alert("Nombre ya existe");
                return;
        }
        const evento =
        {
            numero:numeroeventos(),
            nombre:EventoNombre,
            tipo:EventoTipo.value,
            fecha:EventoFecha,
            direccion:EventoDireccion,
            ciudad:EventoCiudad,
            capacidad:EventoCapacidad,
            cobro:EventoCobro,
            valoriacion:EventoValorizacion,
            observacion:EventoObservacion
        }



        eventos.push(evento);
        alert
        (
            `
            Evento: ${evento.nombre}
            Detelles:
            Numero:${evento.numero}
            Fecha:${evento.fecha}
            Direccion:${evento.direccion}
            Ciudad:${evento.ciudad}
            Capacidad:${evento.capacidad}
            Cobro:${evento.cobro}
            Valorizacion:${evento.valoriacion}
            Observaciones:${evento.observacion}
            `
        );

        document.getElementById('datoseventos').reset();
        //limpiamos la tabla
        tabla.innerHTML="";
        ListarTabla(eventos);

    });
//fin ENVIAR

// barra responsive
    const variacionp=document.getElementById('puntuacion');
    const valorp=document.getElementById('evento-puntuacion');
 
    
    valorp.addEventListener('input',function()
    {
        variacionp.textContent=valorp.value;
    }
    );
       //fin barra responsive

       //BOTON LISTAR EVENTOS SIN FILTROS

    document.getElementById('mostrar').addEventListener('click', function()
    { 
        let muestras="";
        if (eventos.length===0)
            {
                alert("No hay eventos")
                return
            }
            eventos.forEach
            (
                eventos => 
                {
                    muestras=muestras+"\n"+ `${eventos.nombre}--${eventos.fecha}`;
                }
            );
        alert(muestras);


    });

    //FIN BOTON LISTAR EVENTOS SIN FILTROS

    // BOTON BUSCAR EVENTO CON FILTRO EXACTO

    document.getElementById('buscar').addEventListener('click',
        function()
        {
            let muestras="";
            if (eventos.length===0)
                {
                    alert("No hay eventos")
                    return;
                }
            let busqueda=prompt("Ingrese el nombre del evento: ");
            console.log(busqueda)
            const coincidencias= eventos.filter(c => c.nombre.toLowerCase().includes(busqueda.toLowerCase()));   
            coincidencias.forEach
        (
            evento => 
            {
                muestras=muestras+"\n"+`Nombre: ${evento.nombre}-fecha: ${evento.fecha}- Tipo: ${evento.tipo} - Capacidad: ${evento.capacidad}`;   
            }
        );
            alert(muestras);
        }
    );
    // FIN BOTON BUSCAR EVENTO CON FILTRO EXACTO


    // BOTON ORDENAR EVENTOS ALFABETICAMENTE

    document.getElementById('ordenar').addEventListener('click',
        function()
        {
            let eventosordenados=eventos;
            eventosordenados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            muestras="";
            eventosordenados.forEach
                (
            evento => 
                    {
                        muestras=muestras+"\n"+`Nombre: ${evento.nombre} -- Fecha: ${evento.fecha}`;
                    }
                );
                if (eventos.length===0)
                        alert("no hay eventos con esa ciudad");
                else
                {
                    alert(muestras);
                }
        })
            // FIN BOTON ORDENAR EVENTOS ALFABETICAMENTE

                // BOTON FILTRAR 
    document.getElementById('filtrar').addEventListener('click',
         function()
         {
            let filtros= document.querySelectorAll(".filtros");
            filtros.forEach(filtros => {
                filtros.style.display="flex" ;
            });            
         });
         //FIN BOTON FILTRAR
         
            // BOTON FILTRAR CON COMIENZA CON
         document.getElementById('comienza').addEventListener('click',
            function()
            {
                let busqueda= document.getElementById("busqueda").value;                
                let expresion = new RegExp(`^${busqueda}`,'i')
                let coincidencias= eventos.filter(c => expresion.test(c.nombre));  
                /* 
                eventos.forEach(evento=>
                {
                    if (expresion.test(evento.nombre))
                            {
                                coincidencias.push(evento);
                            }
                }
                )*/                
                console.log(coincidencias.length);
                
                let filtros= document.querySelectorAll(".filtros");
                filtros.forEach(filtros => {
                    filtros.style.display="none" ;
                });   
                //Limiamos la tabla
                tabla.innerHTML=""; 
                ListarTabla(coincidencias);
                console.log("fin");
            });

            //FIN FILTRAR FINALIZA CON
            document.getElementById('finaliza').addEventListener('click',
                function()
                {
                    let busqueda= document.getElementById("busqueda").value;                
                    let expresion = new RegExp('[' + busqueda + ']$', 'i');
                    coincidencias= eventos.filter(c => expresion.test(c.nombre)); 
                    /*                    
                    eventos.forEach(evento=>
                    {
                        if (expresion.test(evento.nombre))
                                {
                                    coincidencias.push(evento);
                                }
                    }
                    )   
                    */             
                    console.log(coincidencias.length);
                    
                    let filtros= document.querySelectorAll(".filtros");
                    filtros.forEach(filtros => {
                        filtros.style.display="none" ;
                    });    
                    tabla.innerHTML=""; 
                    ListarTabla(coincidencias);
                    console.log("fin");
                });
                //FIN FINALIZA CON

                // BOTON CONTIENE
                document.getElementById('contiene').addEventListener('click',
                    function()
                    {
                        let busqueda= document.getElementById("busqueda").value;                                                                
                        const coincidencias= eventos.filter(c => c.nombre.toLowerCase().includes(busqueda.toLowerCase()));                   
                        console.log(coincidencias.length);
                        
                        let filtros= document.querySelectorAll(".filtros");
                        filtros.forEach(filtros => {
                            filtros.style.display="none" ;
                        });    
                        tabla.innerHTML=""; 
                        ListarTabla(coincidencias);
                        console.log("fin");
                    });
                // FIN BOTON CONTIENE

//---------------FIN--------------//