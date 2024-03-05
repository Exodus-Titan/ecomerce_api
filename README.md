
# Ecomerce API Prueba Técnica Carlos Ortega

API para el manejo de la autenticación de usuarios, la gestión de inventario
de productos, el procesamiento de pedidos de clientes y el almacenamiento de datos para un comercio electrónico (Ecomerce)


## API ENPOINTS

API Urls:

http://localhost:3000 (Local)

https://ecomerce-api-d53r.onrender.com (Servidor de Producción)


### Enpoints de Usuario

Usuario ruta base: /api/user

#### Obtener todos los usuarios

```http
  GET /all_users
```

| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token con permisos de administrador |

Devuelve todos los usuarios sin el atributo de la constraseña, solo alguien que haya inicado sesión como administrador puede acceder a este enpoint 

Tiene la opción de paginar los usurios recibidos usando parámetros query 
| Parámetros Query  | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| page  | Numero  | La pagina que se esta visualizando en el momento |
| pageSize  | Numero  | Cantidad de objetos por página  |


Si se piden los usuarios paginados se retornara un objeto con el arreglo con la cantidad de usuarios solicitados en los parámetros y el total de páginas

Para obtener los datos con paginacion se debe escribir lo siguiente al final de la ruta
```http
  GET /all_users?page=1&pageSize=10
```

#### Obtener usuario por Id

```http
  GET /:userId
```

| Header | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| Bearer Token  | JWT  | **Requerido**. Token enviado al iniciar sesión |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| userId | string  | **Requerido**. Id de un usuario |

Devuelve un usuario sin el atributo de la constraseña

#### Obtener usuarios por email

```http
  GET /email
```

| Header | Tipo     | Description                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token con permisos de administrador |

| Request | Tipo     | Descripcion                       |
| :-------- | :------- | :-------------------------------- |
| email | string  | **Required**. Email de un usuario registrado |

Devuelve un usuario sin el atributo de la constraseña, solo alguien que haya inicado sesión como administrador puede acceder a este enpoint 

#### Obtener usuarios por rol

```http
  GET /roles
```

| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token con permisos de administrador |

| Request | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| role | string  | **Required**. El contenido del string debe ser "admin" o "client" |

Devuelve un usuario sin el atributo de la constraseña, solo alguien que haya inicado sesión como administrador puede acceder a este enpoint 

Tiene la opción de paginar los usurios recibidos usando parámetros query 
| Parámetros Query  | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| page  | Numero  | La pagina que se esta visualizando en el momento |
| pageSize  | Numero  | Cantidad de objetos por página  |


Si se piden los usuarios paginados se retornara un objeto con el arreglo con la cantidad de usuarios solicitados en los parámetros y el total de páginas

Para obtener los datos con paginacion se debe escribir lo siguiente al final de la ruta
```http
  GET /roles?page=1&pageSize=10
```

#### Cambiar el email del usuario 

```http
  PATCH /:userId/change_email
```

| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token del mismo usuario el cual está cambiando el Email |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| userId | string  | **Requerido**. Id del usuario a modificar   |

| Request | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| email | string  | **Required**. Nuevo email para el usuario, no puede ser el mismo de uno ya registrado |

Actualiza el email del usuario y retorna este sin el atributo de la constraseña

#### Cambiar la constraseña del usuario 

```http
  PATCH /:userId/change_password
```

| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token del mismo usuario el cual está cambiando la constraseña |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| userId | string  | **Requerido**. Id del usuario a modificar   |

| Request | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| password | string  | **Required**. Nueva constraseña para el usuario |

Actualiza la constraseña del usuario y retorna este sin el atributo de la constraseña

#### Cambiar el nombre del usuario 

```http
  PATCH /:userId/change_name
```

| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token del mismo usuario el cual está cambiando el nombre |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| userId | string  | **Requerido**. Id del usuario a modificar   |

| Request | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| name | string  | **Required**. Nuevo nombre para el usuario |

Actualiza el nombre del usuario y retorna este sin el atributo de la constraseña

#### Eliminar usuario

```http
  DELETE /:userId
```

| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token del mismo usuario que se está eliminando |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| userId | string  | **Requerido**. Id del usuario a eliminar   |


Devuelve los datos del usuario que se eliminó exceptuando la constraseña

Al eliminar un usuario todas las ordenes asociadas a este también se eliminarán

#### Eliminar usuario como administrador

```http
  DELETE /:userId/admin_delete
```

| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token con permisos de administrador  |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| userId | string  | **Requerido**. Id del usuario a eliminar   |


Devuelve los datos del usuario que se eliminó exceptuando la constraseña, solo alguien que haya inicado sesión como administrador puede acceder a este enpoint

Al eliminar un usuario todas las ordenes asociadas a este también se eliminarán

### Enpoints de Categoria

Categoria ruta base: /api/category

#### Obtener todas las categorias

```http
  GET /
```


Devuelve todas las categorias con todos sus atributos

Tiene la opción de paginar las categorias recibidas usando parámetros query 
| Parámetros Query  | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| page  | Numero  | La pagina que se esta visualizando en el momento |
| pageSize  | Numero  | Cantidad de objetos por página  |


Si se piden las categorias paginadas se retornara un objeto con el arreglo con la cantidad de categorias solicitadas en los parámetros y el total de páginas

Para obtener los datos con paginacion se debe escribir lo siguiente al final de la ruta
```http
  GET /?page=1&pageSize=10
```

#### Obtener categoria por Id

```http
  GET /:categoryId
```

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| categoryId | string  | **Requerido**. Id de una categoria  |

Devuelve una categoria con todos sus atributos

#### Obtener categoria por nombre

```http
  GET /name
```

| Request | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| name | string  | **Requerido**. Nombre de una categoria  |

Devuelve una categoria con todos sus atributos

#### Crear categoria

```http
  POST /create_category
```
| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token con permisos de administrador  |

| Request | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| name | string  | **Requerido**. Nombre de la categoria  |
| description | string  | **Requerido**. Descripción de la categoria  |


Crea una categoria y retorna los atributos de esa categoria, solo alguien que haya inicado sesión como administrador puede acceder a este enpoint

#### Cambiar el nombre de la categoria

```http
  PATCH /:categoryId/change_name
```
| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token con permisos de administrador  |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| categoryId | string  | **Requerido**. Id de la categoria a modificar  |

| Request | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| name | string  | **Requerido**. Nuevo nombre de la categoria   |



Actualiza el nombre de la categoria y retorna esta y todos sus atributos, solo alguien que haya inicado sesión como administrador puede acceder a este enpoint

#### Cambiar la descipción de la categoria

```http
  PATCH /:categoryId/change_description
```
| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token con permisos de administrador  |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| categoryId | string  | **Requerido**. Id de la categoria a modificar  |

| Request | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| description | string  | **Requerido**. La nueva Descripcion de la categoria   |



Actualiza la descripción de la categoria y retorna esta y todos sus atributos, solo alguien que haya inicado sesión como administrador puede acceder a este enpoint

#### Eliminar categoria por Id

```http
  DELETE /:categoryId
```
| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token con permisos de administrador  |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| categoryId | string  | **Requerido**. Id de la categoria a eliminar  |

Elimina la categoria  y retorna los datos de la categoria eliminada, solo alguien que haya inicado sesión como administrador puede acceder a este enpoint

Al eliminar una categoria también se eliminarán todos los productos asociadas a esta 

### Enpoints de Productos

Productos ruta base: /api/product

#### Obtener todos los productos

```http
  GET /
```


Devuelve todos los productos con todos sus atributos

Tiene la opción de paginar los productos recibidos usando parámetros query 
| Parámetros Query  | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| page  | Numero  | La pagina que se esta visualizando en el momento |
| pageSize  | Numero  | Cantidad de objetos por página  |


Si se piden los prodcutos paginados se retornara un objeto con el arreglo con la cantidad de productos solicitados en los parámetros y el total de páginas

Para obtener los datos con paginacion se debe escribir lo siguiente al final de la ruta
```http
  GET /?page=1&pageSize=10
```

#### Obtener producto por Id

```http
  GET /:productoId
```

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| productId | string  | **Requerido**. Id de un producto  |

Devuelve un producto con todos sus atributos

#### Obtener producto por nombre

```http
  GET /name
```

| Request | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| name | string  | **Requerido**. Nombre de un producto  |

Devuelve un producto con todos sus atributos

#### Obtener todos los productos de una categoria

```http
  GET /category/:categoryId
```
| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| categoryId | string  | **Requerido**. Id de la categoria de la cual se quiere conocer sus productos  |

Devuelve todos los productos con todos sus atributos de una categoria específica

Tiene la opción de paginar los productos recibidos usando parámetros query 
| Parámetros Query  | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| page  | Numero  | La pagina que se esta visualizando en el momento |
| pageSize  | Numero  | Cantidad de objetos por página  |


Si se piden los productos paginados se retornara un objeto con el arreglo con la cantidad de productos solicitados en los parámetros y el total de páginas

Para obtener los datos con paginacion se debe escribir lo siguiente al final de la ruta
```http
  GET /category/:categoryId?page=1&pageSize=10
```

#### Obtener todos los productos cuyo inventario es mayor a cero 

```http
  GET /out_of_stock
```

Devuelve todos los productos cuyo inventario es mayor a cero con todos sus atributos 

Tiene la opción de paginar los productos recibidos usando parámetros query 
| Parámetros Query  | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| page  | Numero  | La pagina que se esta visualizando en el momento |
| pageSize  | Numero  | Cantidad de objetos por página  |


Si se piden los productos paginados se retornara un objeto con el arreglo con la cantidad de productos solicitados en los parámetros y el total de páginas

Para obtener los datos con paginacion se debe escribir lo siguiente al final de la ruta
```http
  GET /out_of_stock?page=1&pageSize=10
  ```

  #### Obtener todos los productos cuyo inventario es cero

```http
  GET /inventory
```

Devuelve todos los productos cuyo inventario sea cero con todos sus atributos 

Tiene la opción de paginar los productos recibidos usando parámetros query 
| Parámetros Query  | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| page  | Numero  | La pagina que se esta visualizando en el momento |
| pageSize  | Numero  | Cantidad de objetos por página  |


Si se piden los productos paginados se retornara un objeto con el arreglo con la cantidad de productos solicitados en los parámetros y el total de páginas

Para obtener los datos con paginacion se debe escribir lo siguiente al final de la ruta
```http
  GET /inventory?page=1&pageSize=10
  ```

  #### Crear producto

```http
  POST /create_product
```
| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token con permisos de administrador  |

| Request | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| name | string  | **Requerido**. Nombre del producto  |
| description | string  | **Requerido**. Descripción del producto  |
| price | number  | **Requerido**. Precio del producto  |
| stock | number  | **Requerido**. Inventario del producto  |
| categoryId | string  | **Requerido**. Id de la categoria asociada al producto  |


Crea un producto y retorna los atributos de ese producto, solo alguien que haya inicado sesión como administrador puede acceder a este enpoint

#### Cambiar el nombre del producto

```http
  PATCH /:productId/change_name
```
| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token con permisos de administrador  |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| productId | string  | **Requerido**. Id del producto a modificar  |

| Request | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| name | string  | **Requerido**. Nuevo nombre del producto   |



Actualiza el nombre del producto y retorna esta y todos sus atributos, solo alguien que haya inicado sesión como administrador puede acceder a este enpoint

#### Cambiar la descripcion del producto

```http
  PATCH /:productId/change_description
```
| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token con permisos de administrador  |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| productId | string  | **Requerido**. Id del producto a modificar  |

| Request | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| description | string  | **Requerido**. La nueva descipcion del producto   |



Actualiza la descipción del producto y retorna esta y todos sus atributos, solo alguien que haya inicado sesión como administrador puede acceder a este enpoint

#### Cambiar el precio del producto

```http
  PATCH /:productId/change_price
```
| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token con permisos de administrador  |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| productId | string  | **Requerido**. Id del producto a modificar  |

| Request | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| price | number  | **Requerido**. El nuevo precio del producto   |



Actualiza el precio del producto y retorna esta y todos sus atributos, solo alguien que haya inicado sesión como administrador puede acceder a este enpoint

#### Cambiar el inventario del producto

```http
  PATCH /:productId/change_stock
```
| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token con permisos de administrador  |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| productId | string  | **Requerido**. Id del producto a modificar  |

| Request | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| stock | number  | **Requerido**. La nueva cantidad de inventario del producto   |



Actualiza la cantidad de inventario del producto y retorna esta y todos sus atributos, solo alguien que haya inicado sesión como administrador puede acceder a este enpoint

#### Cambiar la categoria del prodcuto

```http
  PATCH /:productId/change_category
```
| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token con permisos de administrador  |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| productId | string  | **Requerido**. Id del producto a modificar  |

| Request | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| categoryId | string  | **Requerido**. El id de la nueva categoria del producto  |



Actualiza la categoria del producto y retorna esta y todos sus atributos, solo alguien que haya inicado sesión como administrador puede acceder a este enpoint

### Eliminar producto

```http
  DELETE /:productId
```
| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token con permisos de administrador  |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| productId | string  | **Requerido**. Id del producto a eliminar  |


Elimina el producto y retorna los datos del producto eliminado, solo alguien que haya inicado sesión como administrador puede acceder a este enpoint



### Enpoints de Ordenes

Ordenes ruta base: /api/orders

#### Obtener todas las ordenes

```http
  GET /
```
| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token con permisos de administrador  |

Devuelve todas las ordenes con todos sus atributos, solo alguien que haya inicado sesión como administrador puede acceder a este enpoint

Tiene la opción de paginar las ordenes recibidos usando parámetros query 
| Parámetros Query  | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| page  | Numero  | La pagina que se esta visualizando en el momento |
| pageSize  | Numero  | Cantidad de objetos por página  |


Si se piden las ordenes paginadas se retornara un objeto con el arreglo con la cantidad de 
ordenes solicitadas en los parámetros y el total de páginas

Para obtener los datos con paginacion se debe escribir lo siguiente al final de la ruta
```http
  GET /?page=1&pageSize=10
```

#### Obtener orden por Id

```http
  GET /:orderId
```
| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token enviado al iniciar sesión  |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| orderId | string  | **Requerido**. Id de una orden  |

Devuelve una orden con todos sus atributos

#### Obtener las ordenes de un usuario por el id del usuario

```http
  GET /:userId/orders
```

| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token del mismo usuario del cual se están pidiendo las ordenes  |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| userId | string  | **Requerido**. Id de un usuario  |


Devuelve todas las ordendes asociadas a ese usuario

Tiene la opción de paginar las ordenes recibidas usando parámetros query 
| Parámetros Query  | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| page  | Numero  | La pagina que se esta visualizando en el momento |
| pageSize  | Numero  | Cantidad de objetos por página  |


Si se piden las ordenes paginadas se retornara un objeto con el arreglo con la cantidad de categorias solicitadas en los parámetros y el total de páginas

Para obtener los datos con paginacion se debe escribir lo siguiente al final de la ruta
```http
  GET /:userId/orders?page=1&pageSize=10
```

#### Obtener las ordenes de un usuario por el id del usuario filtrando por su estado

```http
  GET /:userId/status
```
| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token del mismo usuario cual se están pidiendo las ordenes  |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| userId | string  | **Requerido**. Id de un usuario |

| Request | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| status | string  | **Requerido**. El contenido del string debe ser "pending", "paid", "delivered" o "cancelled"  |

Devuelve todas las ordendes asociadas a ese usuario filtrando por el estado de la orden

Tiene la opción de paginar las ordenes recibidas usando parámetros query 
| Parámetros Query  | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| page  | Numero  | La pagina que se esta visualizando en el momento |
| pageSize  | Numero  | Cantidad de objetos por página  |


Si se piden las ordenes paginadas se retornara un objeto con el arreglo con la cantidad de categorias solicitadas en los parámetros y el total de páginas

Para obtener los datos con paginacion se debe escribir lo siguiente al final de la ruta
```http
  GET /:userId/status?page=1&pageSize=10
```

#### Crear orden

```http
  POST /:userId/create_order
```
| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token del mismo usuario el cual está creando la orden  |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| userId | strign | **Requerido**. Id del usurio que esta creando la orden   |

| Request | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| orderedProducts | OrderedProducts[]  | **Requerido**. Arreglo con el id y la cantidad de productos que se quieren ordenar  |

Estructura de un OrderedProduct

| Atributo | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| productId | string | **Requerido**. Id del producto a ordenar  |
| quantity | number | **Requerido**. Cantidad de producto a ordenar |

Crea una orden y retorna los atributos de esa categoria

#### Cambiar el estado de una orden

```http
  PATCH /:orderId/update_status
```
| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token con permisos de administrador  |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| orderId | string  | **Requerido**. Id de la orden a modificar  |

| Request | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| status | string  | **Requerido**.  El contenido del string debe ser "pending", "paid" o "delivered"   |



Actualiza el estado de la orden y retorna esta y todos sus atributos, solo alguien que haya inicado sesión como administrador puede acceder a este enpoint

#### Cancela la orden como cliente

```http
  PATCH /:userId/user_cancel
```
| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token del mismo usuario el cual está cancelando |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| userId | string  | **Requerido**. Id del usuario dueño de la orden  |

| Request | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| orderId | string  | **Requerido**. Id de la orden a cancelar  |



Cambia el estado de la orden a "cancelled" y repone al inventario las cantidades de productos que se habian reservado al crear la orden

#### Cancela la orden como administrador

```http
  PATCH /:orderId/admin_cancel
```
| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token con permisos de administrador |

| Parámetro | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| orderId | string  | **Requerido**. Id de la orden a cancelar  |



Cambia el estado de la orden a "cancelled" y repone al inventario las cantidades de productos que se habian reservado al crear la orden, solo alguien que haya inicado sesión como administrador puede acceder a este enpoint

### Enpoints de Autenticación

Autenticación ruta base: /api/auth

#### Inicia sesión

```http
  GET /login
```

| Request | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| email | string  | **Requerido**. Email de  un usuario registrado |
| password | string  | **Requerido**. Constraseña de ese usuario  |

Devuelve los datos del usuario sin el atributo de la constraseña y un JWT del usurio con el Id de su usuario y el rol que este tiene en el sistema 

#### Registrarse

```http
  POST /register
```

| Request | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| email | string  | **Requerido**. Email para registrar un nuevo usuario|
| name | string  | **Requerido**. Nombre para el usuario |
| password | string  | **Requerido**. Constraseña del usuario |

Crea un usuario con el rol de "client" y retorna los datos del usuario sin el atributo de la constraseña

### Enpoint de Admin

Administrador ruta base: /api/admin

```http
  POST /create_admin
```
| Header | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| Bearer Token  | JWT  | **Required**. Token con permisos de administrador |

| Request | Tipo    | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| email | string  | **Requerido**. Email para registrar un nuevo usuario|
| name | string  | **Requerido**. Nombre para el usuario |
| password | string  | **Requerido**. Constraseña del usuario |

Crea un usuario con el rol de "admin" y retorna los datos del usuario sin el atributo de la constraseña



## Screenshots

### Obtener todos los usuarios

![](https://i.ibb.co/7SKB61X/image.png)

### Obtener usuario por Id

![](https://i.ibb.co/6mTgYr9/image.png)

### Obtener usuarios por email

![](https://i.ibb.co/8jH22MK/image.png)

### Obtener usuarios por rol

![](https://i.ibb.co/xjDFkby/image.png)

### Cambiar el email del usuario

![](https://i.ibb.co/qMdVyQR/image.png)

### Cambiar la contraseña del usuario

![](https://i.ibb.co/47Y9Q56/image.png)

### Cambiar el nombre del usuario

![](https://i.ibb.co/BgyHw1H/image.png)

### Eliminar Usuario

![](https://i.ibb.co/Vpr7zY3/image.png)

### Eliminar usuario como administrador

![](https://i.ibb.co/cyzZPnn/image.png)

### Obtener todas las categorias

![](https://i.ibb.co/cyzZPnn/image.png)

### Obtener categoria por Id

![](https://i.ibb.co/mNYBZq8/image.png)

### Obtener categoria por nombre

![](https://i.ibb.co/9GX0GgP/image.png)

### Crear categoria

![](https://i.ibb.co/YDyFyCG/image.png)

### Cambiar el nombre de la categoria

![](https://i.ibb.co/wWQkCZs/image.png)

### Cambiar la descipción de la categoria

![](https://i.ibb.co/4gR8FSC/image.png+)

### Eliminar categoria

![](https://i.ibb.co/3ydQdvn/image.png)

### Obtener todos los productos

![](https://i.ibb.co/wQBPt6j/image.png)

### Obtener producto por Id

![](https://i.ibb.co/Pghk1c6/image.png)

### Obtener producto por nombre

![](https://i.ibb.co/Byn9gn8/image.png)

### Obtener todos los productos de una categoria

![](https://i.ibb.co/cLLDVHw/image.png)

### Obtener todos los productos cuyo inventario es mayor a cero 

![](https://i.ibb.co/gdm441x/image.png)

### Obtener todos los productos cuyo inventario es cero

![](https://i.ibb.co/k6j0gJV/image.png)

### Crear producto

![](https://i.ibb.co/wYRDKy2/image.png)

### Cambiar el nombre del producto

![](https://i.ibb.co/qyTFqxq/image.png)

### Cambiar la descripcion del producto

![](https://i.ibb.co/sgMbZ9c/image.png)

### Cambiar el precio del producto

![](https://i.ibb.co/zxvmYf0/image.png)

### Cambiar el inventario del producto

![](https://i.ibb.co/mzTpWQj/image.png)

### Cambiar la categoria del prodcuto

![](https://i.ibb.co/Nx1GwLW/image.png)

### Eliminar producto

![](https://i.ibb.co/dQ0p9R0/image.png)

### Obtener todas las ordenes

![](https://i.ibb.co/HpqR2QG/image.png)

### Obtener orden por Id

![](https://i.ibb.co/B41Qb9y/image.png)

### Obtener las ordenes de un usuario por el id del usuario

![](https://i.ibb.co/hx61sNn/image.png)

### Obtener las ordenes de un usuario por el id del usuario filtrando por su estado

![](https://i.ibb.co/HtxPr99/image.png)

### Crear orden

![](https://i.ibb.co/L0h3sVz/image.png)

### Cambiar el estado de una orden

![](https://i.ibb.co/xY7t9jK/image.png)

### Cancela la orden como cliente

![](https://i.ibb.co/ZVT8cFZ/image.png)

### Cancela la orden como administrador

![](https://i.ibb.co/4FJQtsx/image.png)

### Inicia sesión

![](https://i.ibb.co/Gxxh16L/image.png)

### Registrarse

![](https://i.ibb.co/MG23JZp/image.png)

### Crear administrador

![](https://i.ibb.co/Kz2KJTS/image.png)


## Instalación

Para poder ejecutar el proyecto se debe tener instalada la una versión de Nodejs >= a Nodejs 20.9.0 y la versión de npm >= a npm 10.4.0 

Para comprobar la versión de estos se pueden usar los siguientes comandos en consola 

```bash
  node --version
  npm --version
```
También debe tener instalado el CLI de Git en su maquina

Luego de comprobar las versiones deberá clonar el repositorio

 ```bash
  git clone https://github.com/Exodus-Titan/ecomerce_api.git
```

Para poder correr el proyecto deberá crear el archivo con las variables de entorno

Una vez esté en la carpeta del proyecto podrá usar el comando 

```bash
  npm install
```

Para poder instalar todas las dependencias del proyecto

Para correr el servidor en modo desarrollo podra usar el comando 

```bash
  npm run dev
```