# Manual de Usuario 📘

## Índice 📑
- [Manual de Usuario 📘](#manual-de-usuario-)
  - [Índice 📑](#índice-)
  - [Introducción 🌟](#introducción-)
  - [Requisitos Mínimos de Ejecución 💻](#requisitos-mínimos-de-ejecución-)
  - [Ejecutar el Programa ▶️](#ejecutar-el-programa-️)
  - [Interfaz De Programa📋](#interfaz-de-programa)
    - [Guardar, Guardar Como, limpiar y abrir 💾](#guardar-guardar-como-limpiar-y-abrir-)
    - [Analizar 🔍](#analizar-)
  - [Opción de Analizar Archivo Cargado 📂](#opción-de-analizar-archivo-cargado-)
  - [Generación de Grafos de Operaciones 🔄](#generación-de-grafos-de-operaciones-)
  - [Generación de arbol Sintactico 🔄](#generación-de-arbol-sintactico-)
  - [Reporte de Tokens en HTML 📝](#reporte-de-tokens-en-html-)
  - [Generación de Reportes de Errores en HTML ❌](#generación-de-reportes-de-errores-en-html-)
  - [Visualización del Archivo de Entrada en Consola 🖥️](#visualización-del-archivo-de-entrada-en-consola-️)
  - [Visualización de Reportes en Consola 📊](#visualización-de-reportes-en-consola-)

## Introducción 🌟
Bienvenido al manual de usuario. Este documento le guiará a través de las funcionalidades y características de la aplicacion.

## Requisitos Mínimos de Ejecución 💻
Para ejecutar esta aplicación, asegúrese de cumplir con los siguientes requisitos mínimos:

- **Sistema Operativo:** Windows 10, macOS 10.15, o una distribución de Linux.
- **Procesador:** celeron , ryzen 3 o posteirores.
- **Memoria RAM:** 2GB.
- **Espacio en Disco:** 10 MB de espacio libre.
- **Dependencias:** Node.js 14.x, Javascript, terminal

## Ejecutar el Programa ▶️
Para ejecutar el programa debe de ingresar el siguiente comando en su carpeta raiz.

        npm run start
        o node.index.js para levantar el backend
          ng serve en carpeta angular para levantar el proyecto en WEB

![Interfaz de Usuario](imagenes/11.png)

## Interfaz De Programa📋
El menU permite navegar a través de las diferentes funcionalidades de la aplicación. Puede acceder a las opciones de anAlisis, generación de reportes y visualización de datos.
![arbol](/ManualUsuario/Imagenes/1.png)
### Guardar, Guardar Como, limpiar y abrir 💾
La aplicación permite guardar los cambios realizados en el archivo cargado. Puede utilizar la opción "Guardar" para sobrescribir el archivo actual o "Guardar Como" para crear una nueva copia del archivo con un nombre diferente.

![arbol3](/ManualUsuario/Imagenes/3.png)
![arbol2](/ManualUsuario/Imagenes/2.png)


### Analizar 🔍
El botón "Analizar" procesa el contenido del archivo cargado. Al presionar este botón, la aplicación analizará el texto del archivo y generará los reportes correspondientes, como el análisis léxico, la generación de grafos y los reportes de errores.


## Opción de Analizar Archivo Cargado 📂
Esta opción le permite cargar un archivo JSON para su analisis. Seleccione el archivo deseado y la aplicación procesara la respectiva funcionalidad.


## Generación de Grafos de Operaciones 🔄
La aplicacion al presionar la opcion de analizar ademas de analizar lexicamente el archivo cargado generara un arbol de grafos con las operaciones reconocidas en el archivo cargado
![arbol8](/ManualUsuario/Imagenes/8.png)

## Generación de arbol Sintactico 🔄
La aplicacion al presionar la opcion de analizar ademas de analizar lexicamente el archivo cargado generara un arbol de sintaxis del archico de entrada con las operaciones reconocidas en el archivo cargado
![arbol9](/ManualUsuario/Imagenes/9.png)

## Reporte de Tokens en HTML 📝
Posterior a haber analizado el archivo de entrada el programa da la opcion de cargar el reporte de tokens analizados en un archivo .html

![arbol6](/ManualUsuario/Imagenes/6.png)

## Generación de Reportes de Errores en HTML ❌
En caso de que se encuentren errores durante el analis lexico o sintactico generara un archivo en formato html tendra la opcion de poder exportar el reporte en un archivo .html

![arbol7](/ManualUsuario/Imagenes/7.png)



## Visualización del Archivo de Entrada en Consola 🖥️
Puede visualizar el contenido del archivo de entrada directamente en la consola. Esta opción es útil para una revisión rápida del contenido sin necesidad de abrir el archivo en un editor externo.

## Visualización de Reportes en Consola 📊
AdemAs de los reportes en HTML, la aplicación también permite visualizar los reportes directamente en la consola. Esto incluye tanto los tokens como los errores encontrados.

![arbol5](/ManualUsuario/Imagenes/5.png)

