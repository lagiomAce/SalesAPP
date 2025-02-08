# Configuración del Proyecto - Angular 19 y API Web en .NET 9

Este repositorio contiene un proyecto de Angular 19 que interactúa con una API Web construida usando .NET 9.

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas:

- **Node.js** (v16.x o superior) - Para ejecutar el proyecto de Angular.
- **npm** (viene con Node.js) - Para la gestión de paquetes.
- **.NET 9 SDK** - Para ejecutar la API Web.
- **Git** - Para clonar y gestionar el repositorio.

## Configuración del Proyecto Angular

1. **Clonar el repositorio:** -- *SON DOS REPOS DISTINTOS PARA EL APIWEB Y PARA EL ANGULARAPP*
   
   Si aún no has clonado el repositorio, utiliza el siguiente comando:

   ```bash
   git clone https://github.com/lagiomAce/SalesAPP.git
   cd tu-repo

   cd angular-project
   npm install
   ng serve
   ng serve



## Ejecutar scripts que estaran en la carpeta scripsCodifico
  
  En el ultimo script esta la prueba para ejecutar el ultimo script NewOrden

## Configuración APIWEB .net9

git clone https://github.com/lagiomAce/SalesAPP.git

cd repo

abrir proyecto .net

.code

-----bash VS---------

dotnet restore 
dotnet run  

----> SWAGGER prueba para api/controllers
http://localhost:5033/swagger/index.html 


## Conexión Angular con apiweb

export const environment = {
  production: false,
  apiUrl: 'http://localhost:5033/api' 
}; validar esto.

## Validar CORS

program.cs

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});


ejecutar ambos proyectos

apiweb = dotnet run
angular = ng s -o



## Tner en cuenta que se hizo una modificación en el script trar orden y predcción proxima orden para que trajera el id y con ello poder encontrar la orden por cliente seleccionado gracias al id, ya que era innecesario crear otra consulta o mas logica en el controlador para volver al servidor cuando se puede trabajar desde la vista. En cuento a Vainilla JS realmente no lo he trabajado.

