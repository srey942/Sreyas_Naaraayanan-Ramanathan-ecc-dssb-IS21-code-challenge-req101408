# Sreyas_Naaraayanan-Ramanathan-ecc-dssb-IS21-code-challenge-req101408
IS-21 Full Stack Developer Coding Assignment
[The web application is developed as part of the IS-21 Full Stack Developer Position]

# Introduction

This is a Web Application that tracks and manages Web Applications developed by the Province of BC. The front-end component is built using the NextJS framework and the backend with the NestJS framework. 

The application has landing page where the BC Government Ministry of Education and Child Care (ECC) (Product Owner and DevOps developer) can view all the products that ECC currently develops or maintains.

On clicking the `Add Product` one can add a product to the list of products that branch by filling in all relevant information related to the product. The `Edit` button on each product allows to the edit product related information ensuring that product data is accurate.

# Pre-Requisites 
- Mininum Node version required v16 (recomended v16.6.0)

## Project Structure.

The front end part of the application is on the `web-app` and the backend is present on the `api`.

Backend folder structure.

```sh
api
├── Dockerfile   # The Dockerfile for backend of the application
├── package.json #  Project Dependencies, scripts and its related information
├── nodemon.json # Nodemon config file for to monitoring for changes, environment variables, and other options
api/src/
├── modules
│   ├── app.module.ts
│   ├── common/  # The common module contains pipes, guards, service and provider used in the backend
│   ├── product/  # The module that manages product resources
│   │   ├── controller/
│   │   │   └── product.controller.ts
│   │   ├── flow/  # The "flow" directory contains the pipes, interceptors and everything that may change the request or response flow
│   │   │   └── product.pipe.ts
│   │   ├── model/
│   │   │   ├── product.data.ts  # The model that will be returned in the response
│   │   │   ├── product.entity.ts  # The actual product entity
│   │   │   └── product.input.ts  # The model that is used in the request
│   │   ├── product.module.ts
│   │   ├── service/
│   │   │   └── product.service.ts
│   │   └── spec/
└── server.ts
```

Frontend structure 
```sh
web-app
├── Dockerfile     # The Dockerfile for frontend of the application
├── package.json   # Project Dependencies, scripts and its related information
├── next.config.js # Next.js config file for modifying webpack settings, define environment variables, configure routing rules etc.
web-app/src/
├── api
├── component - product component that contains product form
├── hooks - hooks to handle product state
├── pages - pages related the application
├── apistyles - styles used in the application
├── app.module.ts
│   ├── common/  # The common module contains pipes, guards, service and provider used in the backend
│   ├── product/  # The module that manages product resources
│   │   ├── controller/
│   │   │   └── product.controller.ts
│   │   ├── flow/  # The "flow" directory contains the pipes, interceptors and everything that may change the request or response flow
│   │   │   └── product.pipe.ts
│   │   ├── model/
│   │   │   ├── product.data.ts  # The model that will be returned in the response
│   │   │   ├── product.entity.ts  # The actual product entity
│   │   │   └── product.input.ts  # The model that is used in the request
│   │   ├── product.module.ts
│   │   ├── service/
│   │   │   └── product.service.ts
│   │   └── spec/
└── server.ts
```

## How to run

There are two ways which the application could be run. The first way is on your local machine. The second method is using docker installed on your machine.

### Local Machine method :

Please have the minimum version of node installed on your workstation.

Start by cloning the GitHub Repository - [https://github.com/srey942/Sreyas_Naaraayanan-Ramanathan-ecc-dssb-IS21-code-challenge-req101408.git](https://github.com/srey942/Sreyas_Naaraayanan-Ramanathan-ecc-dssb-IS21-code-challenge-req101408.git).

 Back-end :
- cd into `/api` and create an .env file with the following contents

```
API configuration
API_PORT=3000
API_PREFIX=/api/
SWAGGER_ENABLE=1
```

- After creating the .env file, please install the required node modules by `npm install`
- Once the node modules are installed,run `npm run dev` command to start the backend (api component).
- After the backend is up and running the swagger is available on [http://localhost:3000/api/api-docs/](http://localhost:3000/api/api-docs/)
- Seed mock data by executing the endpoint (`/api/product/seed`) from the swagger documentation.
- After seeding the data all products can be viewed at `http://localhost:3000/api/product`
- The swagger documentation contains the GET, POST, PUT and DELETE endpoints for the product for the product apis.

**Note The backend requires to be seeded with random products first before running the front-end.**

Front-end :
- cd into `/web-app`
- Please install the required node modules by `npm install`.
- Start the frontend by running `npm run dev`.
- Once the frontend is started, open [http://localhost:4000](http://localhost:4000) on your browser to use the application.

### Docker method:

Please ensure that you have mininum version of docker version 19.03.8 [https://nvd.nist.gov/vuln/detail/CVE-2019-14271] is installed on your system.

Start by cloning the GitHub Repository - [https://github.com/srey942/Sreyas_Naaraayanan-Ramanathan-ecc-dssb-IS21-code-challenge-req101408.git](https://github.com/srey942/Sreyas_Naaraayanan-Ramanathan-ecc-dssb-IS21-code-challenge-req101408.git).

 Back-end :
- cd into `/api` and create an .env file with the following contents

```
API configuration
API_PORT=3000
API_PREFIX=/api/
SWAGGER_ENABLE=1
```

- After creating the .env file, run the follwing docker command to build the container (to be run from `/api` directory).
    * `docker build -t server .`
- Once the container is built, run the following command to start the backend of the application.
    * `docker run -p 3000:3000 server:latest`
- After the backend is up and running the swagger is available on [http://localhost:3000/api/api-docs/](http://localhost:3000/api/api-docs/) 
- Seed mock data by executing the endpoint (`/api/product/seed`) from the swagger documentation.
- After seeding the data all products can be viewed at `http://localhost:3000/api/product`
- The swagger documentation contains the GET, POST, PUT and DELETE endpoints for the product apis.

**Note The backend requires to be seeded with random products first before running the front-end.**

Front-end :
- cd into `/web-app`
- Run the follwing docker command to build the container (to be run from `/web-app` directory)
    * `docker build -t client .`
- Once the container is built, run the following command to start the frontend of the application.
    * `docker run -p 4000:4000 client:latest`
- Once the frontend is started, open [http://localhost:4000](http://localhost:4000) on your browser to use the application.


## References

- https://github.com/bcgov/ehpr2
- https://github.com/Saluki/nestjs-template
