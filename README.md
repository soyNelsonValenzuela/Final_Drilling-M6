# Final Drilling Módulo 6

Este proyecto corresponde al trabajo final del módulo 6, donde se implementa un servidor HTTP utilizando Node.js. El servidor permite gestionar una lista de animes mediante diversas rutas, accesibles a través de herramientas como Postman.

---

## Instalación

Para utilizar este proyecto, asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu sistema. Luego, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/soyNelsonValenzuela/Final_Drilling-M6.git
   cd Final_Drilling-M6
   ```
2. Instala las dependencias necesarias:
  ```bash
  npm start
```

---

## Uso del Servidor

### Iniciar el servidor

Para iniciar el servidor, ejecuta el siguiente comando en la terminal:

```bash
npm start
```

El servidor estará disponible en http://localhost:3001.

### Correr pruebas

Para ejecutar las pruebas del proyecto, utiliza:

```bash
npm run test
```

---

## Rutas del Servidor

Una vez que el servidor esté corriendo, puedes interactuar con las siguientes rutas utilizando Postman:

### 1. Mensaje de bienvenida

**Método**: GET
**URL**: http://localhost:3001/
**Descripción**: Devuelve un mensaje de bienvenida.

---

### 2. Listar animes

**Método**: GET
**URL**: http://localhost:3001/animes
**Descripción**: Devuelve la lista completa de animes.

---

### 3. Crear un nuevo anime

**Método**: POST
**URL**: http://localhost:3001/agregar
**Descripción**: Agrega un nuevo anime a la lista.
**Body (JSON)**:

```bash
{
    "nombre": "One Piece",
    "genero": "Shonen",
    "anio": 1999,
    "autor": "Eiichiro Oda"
}
```

---

### 4. Listar un anime por su ID

**Método**: GET
**URL**: http://localhost:3001/animes?id=1
**Descripción**: Devuelve los detalles de un anime específico según su ID.

---

### 5. Listar un anime por su nombre

**Método**: GET
**URL**: http://localhost:3001/animes?nombre=Dragon%20Ball
**Descripción**: Devuelve los detalles de un anime según su nombre.
**Nota**: Si el nombre contiene espacios, reemplázalos con %20 en la URL.

---

### 6. Actualizar un anime

**Método**: PUT
**URL**: http://localhost:3001/actualizar/1
**Descripción**: Actualiza los detalles de un anime específico según su ID.
**Body (JSON)**:

```bash
{
    "nombre": "Akira (ACTUALIZADO)",
    "genero": "Seinen",
    "anio": 1988,
    "autor": "Katsuhiro Otomo"
}
```

### 7. Eliminar un anime

**Método**: DELETE
**URL**: http://localhost:3001/eliminar/1
**Descripción**: Elimina un anime específico según su ID.

### Autor

Desarrollado por **Nelson Valenzuela**.
Repositorio: [Final_Drilling-M6](https://github.com/soyNelsonValenzuela/Final_Drilling-M6.git).
