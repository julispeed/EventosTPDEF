/*-----------------------------------------------------------VARIABLES--------------------------------------------------------------------*/
var eventos=[];//Arreglo Original de eventos


var eventostabla=eventos; //Arreglo a evaluar, su funcinaldiad es representar la tabla actual que se esta mostrando al usuario

var actualizar= document.getElementById("boton-actualizar");// Boton Actualizar

var eventoA=null; //represantará siempre y en todo momento el objeto que hay que editar cuando el usuario quiere editar un evento, por el momento no conozco una forma en la que no declare una variable global.


var numeroeventos=
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

const tabla = document.getElementById("informacion");//Nuestra tabla en html

/*-----------------------------------------------------------FUNCIONES--------------------------------------------------------------------*/


function validaciones(esedicion)
{
    document.getElementById('mensajeerror').textContent=""; 
    console.log("entro en validacion");
    const EventoNombre=document.getElementById('evento-nombre').value;
    const EventoTipo=document.querySelector('input[name="evento-tipo"]:checked');
    const EventoFecha=document.getElementById('evento-fecha').value;
    const EventoDireccion=document.getElementById('evento-direccion').value;    
    const EventoCapacidad=document.getElementById('evento-capacidad').value;    
    const EventoValorizacion=document.getElementById('evento-puntuacion').value;    
    let resultado=false;
    //relleno de campos
    
    //validaciones , retornamos un cartel por cada campo que lo requiera
    if (!EventoNombre)
    {   
            document.getElementById('evento-nombre').style.border='2px solid blue';
            document.getElementById('mensajeerror').textContent="Nombre inválido";
                      
    }
    else if (!EventoTipo)
    {
        document.getElementById('mensajeerror').textContent="Tipo inválido";
        document.getElementById('radio').style.border='2px solid blue';
        
    }
    else if (!EventoFecha)
    {
        document.getElementById('mensajeerror').textContent="Fecha Invalida";
        document.getElementById('evento-fecha').style.border='2px solid blue';
        
    }
    else if (!EventoDireccion)
    {
        document.getElementById('mensajeerror').textContent="Direccion Invalida";
        document.getElementById('evento-direccion').style.border='2px solid blue';
        
    }
    else if (!EventoCapacidad)
    {
        document.getElementById('mensajeerror').textContent="Capacidad Invalida";
        document.getElementById('evento-capacidad').style.border='2px solid blue';
        
    }
    else if (!EventoValorizacion)
    {
        document.getElementById('mensajeerror').textContent="Cotizacion inválida";
        document.getElementById('evento-puntuacion').style.border='2px solid blue';
        
    }
    else if (!esedicion)
    {
        if (eventos.some(evento=> evento.nombre.toLowerCase() === EventoNombre.toLowerCase()))
            {
                document.getElementById('evento-nombre').style.border='2px solid blue';
                document.getElementById('mensajeerror').textContent="Nombre ya existe";
                        
            }
        else
        {           
                resultado=true;  
                document.getElementById('mensajeerror').textContent="";          
        }
    }
    else
    {
        resultado=true;  
        document.getElementById('mensajeerror').textContent="";          
    }

    console.log("salio en validacion");
    



    return resultado;
}

function Eliminar(numero)
{
    if (numero!=null)
        {   
            if(confirm(`Desea eliminar el evento ${eventos.find(e=>e.numero===parseInt(numero)).nombre}`))
            {
                eventos=eventos.filter(e=>e.numero!=parseInt(numero));
                actualizar.disabled=true;
                document.getElementById('boton-enviar').disabled=false;
                document.getElementById('datoseventos').reset();
                document.getElementById('boton-cancelar').style.display="none";

            }            
        }
    tabla.innerHTML=""
    ListarTabla(eventos);
}

function Insertar(event)
{
    event.preventDefault();//evita el recargo de la pagina al usar actualizar y enviar
    document.getElementById('mensajeerror').textContent=""; 



if (validaciones(false)) 
    {
    //objeto a crear
    console.log("entro en insertar");
    const EventoNombre=document.getElementById('evento-nombre').value;
    const EventoTipo=document.querySelector('input[name="evento-tipo"]:checked');
    const EventoFecha=document.getElementById('evento-fecha').value;
    const EventoDireccion=document.getElementById('evento-direccion').value;
    const EventoCiudad=document.getElementById('evento-ciudad').value;
    const EventoCapacidad=document.getElementById('evento-capacidad').value;
    const EventoCobro=document.getElementById('evento-cotizacion').checked;
    const EventoValorizacion=document.getElementById('evento-puntuacion').value;
    const EventoObservacion=document.getElementById('evento-observacion').value;
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


    if (evento!=null)
    {
            eventos.push(evento);
            console.log(
            
                `
                Evento: ${evento.nombre}\n
                Detelles:\n
                Numero:${evento.numero}\n
                Fecha:${evento.fecha}\n
                Direccion:${evento.direccion}\n
                Ciudad:${evento.ciudad}\n
                Capacidad:${evento.capacidad}\n
                Cobro:${evento.cobro}\n
                Valorizacion:${evento.valoriacion}\n
                Observaciones:${evento.observacion}\n
                `
            );
    }  
    //limpiamos formulario
    document.getElementById('datoseventos').reset();
    //limpiamos la tabla
    tabla.innerHTML="";
    //actualizamos
    ListarTabla(eventos);

}





function ListarTabla(arregloEventos) {
    if (arregloEventos!=null)
    {
            arregloEventos.forEach((ElementEvento)=> {    
                const fila = document.createElement("tr");
                fila.innerHTML=
                `
                    <td>${ElementEvento.nombre}</td>
                    <td>${ElementEvento.fecha}</td>
                    <td>${ElementEvento.ciudad}</td>
                    <td><img src="/Imagenes/Editar.png" alt="Editar" onclick="EditarEvento('${ElementEvento.numero}')"></td>
                    <td><img src="/Imagenes/Eliminar.png" alt="Eliminar" onclick="Eliminar('${ElementEvento.numero}')" id="delete" "></td>
                `;        
                tabla.appendChild(fila);
            });
            eventostabla=arregloEventos;
    }
    else
    {
        console.log('ocurrio un error en ListarTabla(arregloEventos)');
    }
}


function EditarEvento(numero)
{    
    eventoA=eventos.find(e =>e.numero===parseInt(numero)).numero;
    let objeto=eventos.find(e =>e.numero===parseInt(numero));
    if (objeto!=null)
    {
        document.getElementById('boton-enviar').disabled = true;    
        document.getElementById('evento-nombre').value=objeto.nombre;
        document.querySelector(`input[id="${objeto.tipo}"]`).checked=true;
        document.getElementById('evento-fecha').value=objeto.fecha;
        document.getElementById('evento-direccion').value=objeto.direccion;
        document.getElementById('evento-ciudad').value=objeto.ciudad;
        document.getElementById('evento-capacidad').value=objeto.capacidad;
        document.getElementById('evento-cotizacion').checked=objeto.cobro;
        document.getElementById('evento-puntuacion').value=objeto.valoriacion;
        document.getElementById('evento-observacion').value=objeto.observacion;   
        actualizar.disabled=false;
        document.getElementById('boton-enviar').disabled=true;                
        document.getElementById('boton-cancelar').style.display='block';
        document.getElementById('delete').disabled=true;
    }
    else
    {
        console.log(`el objeto ${objeto} es nulo, se re pudria.`);
    }

}


/*-----------------------------------------------------------FIN FUNCIONES--------------------------------------------------------------------*/






/*-------------------------------------------------------LISTENER Y ELEMENTOS-----------------------------------------------------------------*/

document.getElementById('boton-cancelar').addEventListener('click',function(event)
{
    event.preventDefault();
    actualizar.disabled=true;
    document.getElementById('boton-enviar').disabled=false;
    document.getElementById('boton-cancelar').style.display='none'
    document.getElementById('datoseventos').reset();
    

})

actualizar.addEventListener('click',function()//Listener de ACTUALIZAR
{  
    if (validaciones(true))
    {
        const EventoNombre=document.getElementById('evento-nombre').value;
        const EventoTipo=document.querySelector('input[name="evento-tipo"]:checked');
        const EventoFecha=document.getElementById('evento-fecha').value;
        const EventoDireccion=document.getElementById('evento-direccion').value;
        const EventoCiudad=document.getElementById('evento-ciudad').value;
        const EventoCapacidad=document.getElementById('evento-capacidad').value;
        const EventoCobro=document.getElementById('evento-cotizacion').checked;
        const EventoValorizacion=document.getElementById('evento-puntuacion').value;
        const EventoObservacion=document.getElementById('evento-observacion').value;        
        eventos.find(e=>e.numero==eventoA).nombre=EventoNombre;
        eventos.find(e=>e.numero==eventoA).tipo=EventoTipo;
        eventos.find(e=>e.numero==eventoA).fecha=EventoFecha;
        eventos.find(e=>e.numero==eventoA).ciudad=EventoCiudad;
        eventos.find(e=>e.numero==eventoA).capacidad=EventoCapacidad;
        eventos.find(e=>e.numero==eventoA).cobro=EventoCobro;
        eventos.find(e=>e.numero==eventoA).valoriacion=EventoValorizacion;
        eventos.find(e=>e.numero==eventoA).observacion=EventoObservacion;        
    }
    alert(eventos.find(e=>e.numero==eventoA).nombre);
    
   // Insertar(event);// importante el parametro EVENT para el listener como para insertar, evitara que se reinicie la pagina y perdamos los datos  
       //limpiamos la tabla
       tabla.innerHTML="";
       //actualizamos
       ListarTabla(eventos);  
    actualizar.disabled=true;
    document.getElementById('boton-enviar').disabled = false;    
    document.getElementById('boton-cancelar').style.display='none';
    document.getElementById('datoseventos').reset(); 
    eventoA=null;   
})                                    

//BOTON CARGAR DATO

document.getElementById('boton-enviar').addEventListener('click',Insertar);// llamamos a insertar unicamente

// FIN BOTON CARGAR DATOS




// barra responsive
            const variacionp=document.getElementById('puntuacion');
            const valor=document.getElementById('evento-puntuacion');

            
            valor.addEventListener('input',function()
            {
                variacionp.textContent=valor.value;
            }
            );
//fin barra responsive





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
                let busqueda= document.getElementById("busqueda").value;     //campo donde buscamos           
                let expresion = new RegExp(`^${busqueda}`,'i')
                let coincidencias= eventos.filter(c => expresion.test(c.nombre));   //nuevo arreglo con los datos que coinciden 
                            
                let filtros= document.querySelectorAll(".filtros"); //ocultamos nuevamente los botones de filtrado y el campo a rellnar, el selectorAll agarra mas de una clase
                filtros.forEach(filtros => {//el foreach aplica el none por cada clase que contiene el nombre filtros
                    filtros.style.display="none" ;
                });   
                //Limiamos la tabla
                tabla.innerHTML=""; 
                ListarTabla(coincidencias);  
                document.querySelector('.boton-mostrartodo').style.display="block";              
            });

            //FIN FILTRAR FINALIZA CON , mismas analogias
            document.getElementById('finaliza').addEventListener('click',
                function()
                {
                    let busqueda= document.getElementById("busqueda").value;                
                    let expresion = new RegExp(busqueda + '$','i');
                    coincidencias= eventos.filter(c => expresion.test(c.nombre));            
                    console.log(coincidencias.length);
                    
                    let filtros= document.querySelectorAll(".filtros");
                    filtros.forEach(filtros => {
                        filtros.style.display="none" ;
                    });    
                    tabla.innerHTML=""; 
                    ListarTabla(coincidencias);
                    document.querySelector('.boton-mostrartodo').style.display="block";
                });
                //FIN FINALIZA CON

                // BOTON CONTIENE  mismas analogias
                document.getElementById('contiene').addEventListener('click',
                    function()
                    {
                        let busqueda= document.getElementById('busqueda').value;                                                                
                        const coincidencias= eventos.filter(c => c.nombre.toLowerCase().includes(busqueda.toLowerCase()));                   
                        console.log(coincidencias.length);
                        
                        let filtros= document.querySelectorAll(".filtros");
                        filtros.forEach(filtros => {
                            filtros.style.display="none" ;
                        });    
                        tabla.innerHTML=""; 
                        ListarTabla(coincidencias);
                        document.querySelector('.boton-mostrartodo').style.display="block";
                    });
                // FIN BOTON CONTIENE

                document.getElementById('M-todo').addEventListener('click',function(){ 
                    tabla.innerHTML="";
                     ListarTabla(eventos);
                     document.querySelector('.boton-mostrartodo').style.display="none";
                    });
  
document.getElementById("categoria").addEventListener('click', function(){
        const categoria=document.getElementById("filtro-no-listado").value;
        const EvCategoria=eventos.filter(e=>e.tipo==categoria)
        tabla.innerHTML="";
        document.querySelector('.boton-mostrartodo').style.display="block";              
        ListarTabla(EvCategoria);

});
    



/*-------------------------------------------------------FIN LISTENER Y ELEMENTOS-----------------------------------------------------------------*/


/// Lo siguiente es del trabajo anterior, lo dejo.

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
}

    // FIN BOTON BUSCAR EVENTO CON FILTRO EXACTO            

//---------------FIN--------------//