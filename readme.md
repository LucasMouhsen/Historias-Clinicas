# Historias clínicas físicas

¡Bienvenido a la aplicación web de historias clínicas! Esta aplicación web te permite registrar y gestionar historias clínicas en una base de datos. Aquí encontrarás la información necesaria para comprender cómo funciona la aplicación y cómo configurarla en tu entorno local.

## Características principales

La aplicación web de historias clínicas físicas cuenta con las siguientes características principales:

1. **Vista de inicio (Home)**: En esta vista podrás registrar nuevas historias clínicas. Proporciona un formulario intuitivo para ingresar la información relevante de cada paciente.

2. **Vista de listado**: Aquí encontrarás un listado de todas las historias clínicas registradas.Tambien puedes filtrar la que busques y puedes ver una vista previa de cada historia clínica y hacer clic para ver los detalles completos.

3. **Vista de detalle**: En esta vista puedes ver los detalles completos de una historia clínica específica, incluyendo toda la información ingresada durante el registro. Esta vista es de solo lectura para los usuarios.

4. **Vista de inicio de sesión (Login)**: Es una vista exclusiva para los coordinadores. Aquí pueden autenticarse utilizando sus credenciales para acceder a las funcionalidades de edición y eliminación de historias clínicas dentro de cada detalle de historias clínicas.

5. **Vista de edición**: Esta vista permite a los coordinadores editar los detalles de una historia clínica existente. Pueden actualizar la información y guardar los cambios.

## Requisitos previos

Antes de comenzar a configurar la aplicación web en tu entorno local, asegúrate de tener instalado lo siguiente:

- Node.js (versión 10 o superior)
- Gestor de bases de datos MySQL

## Instalación

Sigue los pasos a continuación para configurar la aplicación web de historias clínicas físicas en tu entorno local:

1. Clona el repositorio de la aplicación desde GitHub:

   ```
   git clone https://github.com/LucasMouhsen/Historias-Clinicas
   ```

2. Accede al directorio del proyecto:

   ```
   cd Historias-Clinicas
   ```

3. Instala las dependencias del proyecto utilizando npm (Node Package Manager):

   ```
   npm install
   ```
4. Instala las dependencias globales del proyecto utilizando npm (Node Package Manager):

   ```
   npm install sequelize-cli -D
   ```

5. Crea un archivo de entorno `.env` en el directorio raíz del proyecto y configura las variables de entorno necesarias, como la configuración de la base de datos y la clave secreta de sesión. Asegúrate de establecer los valores correctos para tu entorno:

   ```
    DB_USERNAME=<usuario_de_la_base_de_datos>
    DB_PASS=<contraseña_de_la_base_de_datos>
    DB_DATABASE=HistoriasClinicas
    DB_HOST=<host_de_la_base_de_datos>
    DB_DIALECT=mysql
    DB_PORT=<puerto_de_la_base_de_datos>
   ```

6. Crea la base de datos en tu servidor MySQL utilizando Sequelize:
 
    ```
    npx sequelize db:create
    npx sequelize db:migrate
    npx sequelize db:seed:all
    ```
7. Inicia la aplicación web:

   ```
   npm start
   ```

8. Accede a la aplicación web en tu navegador a través de la siguiente URL en consola
