# Instalación

## Paquetes requeridos

| Paquete | Descripción |
| ---------- | ---------- |
| Node.js  | Node.js javascript del lado de servidor, versión v6.0.0 o superior |
| Postgresql | Base de datos PostgreSQL v9.4 o superior |
| git | Software para control de versiones |
| npm | Manejador de paquetes por defecto para Node.js, versión 3.10.5 |
| n | Manejador de versiones de Node.js |
| sequelize-cli | Linea de comandos para trabajar con sequelize |

## Instalación bajo la plataforma GNU/Linux(Debian Jessie).

Instalación de utilitarios para desarrollo.
```
sudo apt-get install --yes build-essential
```

Instalar curl y git
```
sudo apt-get install curl
sudo apt-get install git
```

### Instalación de n (node versión manager)
La instalación se lo realiza en el usuario actual.

Instalación de [n](https://github.com/tj/n)

```
curl -L http://git.io/n-install | bash
```
En la instalación se pregunta si quiere instalar la última versión estable de node.js.
Si se responde de forma afirmativa, entonces se instala esta versión de node.

Luego de instalar, actualizar variables de entorno.
```
. /home/usuario/.bashrc
```

Instalación de node.js v6.6.0 utilizando `n` (si no se instaló en el anterior paso).

```
$ n v6.6.0
```

Verificación de instalación con:

```
$ node -v
```

Instalación de [npm utilizando n](https://github.com/tj/n#working-with-npm)

```
curl -0 -L http://npmjs.org/install.sh | sh
```

Verificación de instalación con:

```
$ npm -v
```

## Instalación en otros sistemas.
* `Windows`: [https://nodejs.org/dist/v6.7.0/node-v6.7.0-x86.msi](-https://nodejs.org/dist/v6.7.0/node-v6.7.0-x86.msi)
* `MacOS`: [https://nodejs.org/dist/v6.7.0/node-v6.7.0.pkg](https://nodejs.org/dist/v6.7.0/node-v6.7.0.pkg)

## Instalación del proyecto

Clonar el proyecto git

```
git clone https://github.com/fujuca510/tarjetas-memoria-backend.git
cd tarjetas-memoria-backend
```

### Instalación de base de datos

Instalación de postgres

```
sudo apt-get install postgresql postgresql-contrib
```

Configuración de credenciales, acceder a consola psql

```
sudo -u postgres psql postgres
```

Modificar contraseña para usuario postgres

```
\password postgres
```

Crear la base de datos.

```
CREATE DATABASE tarjetas_memoria;
```

Salir del prompt postgreSQL con `Ctrl + d`.

### Cargar base de datos inicial con sequelize-cli.

Instalar sequelize-cli
```
npm install -g sequelize-cli
```

Instalar dependencias del proyecyo
```
npm install
```

Configuración archivo para la base de datos.

Replicar archivo de configuración para conexión.
```
cp config/config.json.sample config/config.json
```

Editar el archivo `config/config.js`, modificar las siguientes configuraciones, de la sección `development`:

```
"development": {
  "username": "postgres",
  "password": "password",
  "database": "tarjetas_memoria",
  "host": "127.0.0.1",
  "dialect": "postgres"
}
```

Donde:

* username, usuario de la base de datos.
* password, contraseña de usuario de la base de datos.
* database, nombre de la base de datos(Base de datos creado anteriormente).
* host, dominio o ip de la base de datos.
* dialect, dialecto que utiliza sequelize para postgres.

Migrar la base de datos (Esto crea la base de datos)
```
sequelize db:migrate
```

Nota: para revertir toda la migración de la base de datos(Limpia la base de datos), ejecutar.
```
sequelize db:migrate:undo:all
```

Revisar [sequelize-cli](https://github.com/sequelize/cli).

### Iniciar el servidor

Iniciar
```
npm start
```

Probar servicios con CURL

Servicio crear tarjeta:

```
curl -X POST -H "Content-Type: application/json" -d '{
	"texto_referencia":"CIENTIFICO",
	"texto_memoria":"SCIENTIST",
	"grupo":"INGLES-PROFESIONES"
}' "http://localhost:8800/api/v1/tarjetas"
```

Resultado exitoso, con la tarjeta registrada.
Código de respuesta http 200
```
{"id":1,"texto_referencia":"CIENTIFICO","texto_memoria":"SCIENTIST","grupo":"INGLES-PROFESIONES","imagen":null}
```

Resultado con error.
Código de respuesta http 500
```
{
  "mensaje": "Error en registrar tarjeta"
}
```
Servicio GET para listar las tarjetas registradas.
```
curl -X GET "http://localhost:8800/api/v1/tarjetas"
```

Resultado exitoso, con la lista de las tarjetas ya registradas
```
[{"id":1,"texto_referencia":"CIENTIFICO","texto_memoria":"SCIENTIST","imagen":null,"grupo":"INGLES-PROFESIONES"}]
```

También se puede probar los servicios utilizando la aplicacion `Postman de google`

Parar el servicio con `Ctrl + c`.

Nota: El proyecto contiene tres ramas adicionales al master, en las que se pueden revisar las etapas con las que se trabajo en el proyecto.

* taller-paso-01: creación del proyecto utilizando express-generator, en la que se quito módulos y funcionalidades no utilizadas para el proyecto backend.
* taller-paso-02: implementación de la base de datos utilizando sequelize-cli y migraciones, se creó la configuración a la base de datos y la entidad `tarjeta`.
* taller-paso-03: implementación de servicios REST básicos GET, POST, PUT y DELETE.
