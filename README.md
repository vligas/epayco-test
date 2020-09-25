# Epayco Test
Prueba tecnica de epayco WIP 🚧 [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/eda580736acb6c4531e5)

## Setup
Para configurar y ejecutar cada proyecto referirse a sus respectivos README:

## Arquitectura
Por requerimiento se trabajo en una arquitectura con un servicio y un gateway dodne el frontend solo se comunica con el gateway, asumiendo que el gateway se puede comunicar con N servicios (en una arquitectura de microservicios) de los cuales uno de ellos es el servicio implementado. (En la rama `simple-backend` se encuentra este mismo proyecto pero sin gateway y el frontend comunicandose directamente con el servicio que tiene contacto con la base da datos).


## Consideraciones
* Se emulo un sistema de autentificacion donde las credenciales son los parametros del servicio que obtiene le saldo de la wallet
* Se hizo un dashboard como extra para ver las ultimas transferencias.
* En la pantalla de pago el servicio recibe adicionalmente el numero de telefono y documento del usuario conectado
* Para no perder mucho tiempo configurando el smtp de gmail y creando una cuenta se opto simplemente por usar un smtp de prueba, para visualizar el correo que se envia se debe utilizar la url que aparece en la consola donde se esta ejecutando `service`
* Al no tener experiencia implementado sistemas SOAP o gRPC se opto por implementar `service` como una api REST, para mostrar la comunicacion entre servicios.
* El `service` y el `gateway` utilizan una api key para autentificar las peticiones.


## Mejoras
* Mejorar estandares de nombres en la app de react
* Incluir un sistema de autentificacion entre `gateway` y `service` mas robusto
* Incluir un sistema de autentificacion con JWT para comunicarse entre `gateway` y `frontend`
* Dockerizar `gateway` y `service` para que sea mas comodo la ejecucion.
* Añadir pruebas unitarias y de integracion.
* Firmar el token que devuelve el endpoint de `users/make-purchase`
* Agregar `ResponseDtos` para poder agregar swagger como documentacion para las apis