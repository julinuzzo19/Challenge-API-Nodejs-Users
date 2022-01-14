NodeJS engineer challenge
Implementar una API REST en NodeJs 16.x que maneje solicitudes CRUD.

Objetivos
-Ejemplo de un usuario:
        "id":2,
        "email":"janet.weaver@reqres.in", "first_name":"Janet",
        "last_name":"Weaver",
        "company":"StatusCode Weekly",
        "url":"http://statuscode.org/",
        "text":"A weekly newsletter focusing on software.."


-Se debe poder crear un usuario directamente.
POST /api/users/:id
-Se debe poder editar cualquiera de los campos del usuario.
PUT /api/users/:id
-Se debe poder eliminar un usuario.
DELETE /api/users/:id
-Se debe poder consultar la información de uno o más usuarios por su ID en un mismo
request /api/users/1,2,3 regresando un array.
GET /api/users/:ids

-Response esperado al consultar GET /api/users/:ids
        // 200
        {
        "data": [
        {
        "id": 2,
        "email":"janet.weaver@reqres.in",
        "first_name":"Janet",
        "last_name":"Weaver",
        "company":"StatusCode Weekly",
        "url":"http://statuscode.org/", "text":"A weekly newsletter focusing on software.."
        },
        ...
        ]
        }

Si alguno de los id’s que se piden ya existen en la BD solo se tiene que regresar el
resultado.
Si alguno de los id’s que se piden NO existen en la BD se deben obtener del siguiente
endpoint y estos a su vez deben guardarse para su posterior uso.
La URL de la API externa es: https://reqres.in/api/users/:id (NOTA: Esta url
puede cambiar si el entorno es production o development )
Ejemplo de un response exitoso de la API externa 200
https://reqres.in/api/users/2

        // 200
        {
        "data": {
        "id": 2,
        "email": "janet.weaver@reqres.in", "first_name": "Janet",
        "last_name": "Weaver",
        "avatar": "https://reqres.in/img/faces/2-image.jpg" },
        "support": {
        "url": "https://reqres.in/#support-heading", "text": "To keep ReqRes free, contributions towards server costs ar
        }
        }
Ejemplo de un response fallido de la API externa 404
https://reqres.in/api/users/23
Manejo de errores
        // 404
        {}

-Manejo de errores
    Debe ser rápido e inteligente con los requests hacia APIs externas, implemente una estrategia
    en la cual realiza varios requests en paralelo. Es importante tomar en cuenta:
    ¿Qué pasa si todas las llamadas son fallidas?
    ¿Qué pasa si solo una es fallida?
    ¿Qué pasa si la API esta caida?
    ¿Como manejaria todo lo anterior de la mejor manera?

-Requisitos
    Solo puede usar Express.js o KoaJS.
    La base de datos puede ser PostgreSQL o MongoDB con (Mongoose, Mongodb driver, Nodepostgres o Sequelize).
    Se debe usar un administrador de procesos (Se recomienda usar PM2).
    Las soluciones debe ser Vanilla JS por lo que esta prohibido usar lodash, underscore o
    similares (Axios o Node-fetch estan permitidos para el manejo de requests).
    El proyecto debe estar escrito enteramente en Javacript y no debe necesitar ser transpilado
    para ejecutarse.
    Pruebas unitarias son indispensables.
    Debe tener sus respectivas variables de entorno en diferentes archivo de con guracion
    ( production y development ).
    Use buenas prácticas de programación tenga en cuenta los conceptos de SOLID, KISS y DRY.
    Debes subir un repositorio privado en Github describiendo en el README.md la información
    del proyecto, instrucciones de setup y pruebas. Si el repositorio es público no se evaluará
    la prueba.
-Puntos a evaluar
    Uso de las caracteristicas nuevas que se han ido agregando al lenguaje (ES2016 a ES2020).
    Organización, diseño y estructuración del proyecto.
    Uso y análisis de la API de un tercero.
    Diseño de clases y componentes (código).
    Documentación del proyecto.
    Testing.
    Git work ow.
    Performance.
    4/4
    Opcional/Bonus
    TDD.
    Permitir al usuario poder ordenar los resultados en base a cualquier propiedad.
    GET /api/users/:ids?sort_by=:key&order=DESC | ASC .
