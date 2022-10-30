# CULQI-API
API que incluye los servicios para generar token y obtener los datos de una tarjeta de crédito.

## Getting Started
A continuación se listarán las instruciones neecesarias para ejecutar las pruebas y desplegar el API en AWS.

### Pre requisites

```
nodejs >= v14.20.0
Visual Studio Code (o tu IDE preferido)
```

### Installing 

Para realizar la instalación se deben ejecutar los siguientes comandos:

```
npm install
npm install -g serverless
```

### Configuring AWS Profile (culqiProfile)

Para realizar la configuración de culqiProfile se deben ejecutar el siguiente comando:

```
sls config credentials --provider aws --profile culqiProfile --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

## Running the tests

Para ejecutar las pruebas unitarias del proyecto se debe ejecutar el siguiente comando: 

```
npm test
```

## Deployment

Para desplegar los servicios del proyecto se debe ejecutar el siguiente comando: 

```
npm run sls-deploy
```

## Built With

* [serverless framework](https://serverless.com/framework/docs/getting-started/) - To build serverless applications
* [NPM](https://www.npmjs.com/) - Dependency Management
* [JEST](https://jestjs.io/) - To build unit testing

## Author

* **Junior Rodriguez**