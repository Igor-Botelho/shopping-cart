# Shopping Cart

## Instalation

In each repository it is necessary install the dependencies

- npm i

In the Cart and Product repository run the docker command to use the database

- sudo docker-compose up

In each repository execute the commands to initialize the projects

- npm run build
- npm run start

To run the tests on each repository, run the command

- npm run test:e2e

### Product routes

- **createProduct**:

  > post

  > /products

- **findAllProducts**

  > get

  > /products

- **getProductById** :

  > get

  > /products/:id (ObjectId mongo)

### Cart routes

- **addCart**:

  > post

  > /carts/:id

  > body : {price: number; id: string; quantity: number}

- **removeProduct** :

  > delete

  > /carts/:id/product/:productId

- **getCartById** :

  > get

  > /carts/:id

### Api routes

- **UseGuards**:

  > post

  > /auth/login

  > body : {username: 'username',password: 'password'}

- **getAllProducts** :

  > To use the api, a username and password are required to be authenticated. At the time of authentication, a tokem will be generated, which is necessary to make the api calls through the post or tool used, the token is Bearer Token that has a life time of 360s, the default system user is::{

          "username": "username",
          "password": "password"

  }

  > get

  > /products

  > header: { Authorization: Bearer + Token }

- **getProductById** :

  > get

  > /product/:id (ObjectId mongo)

  > header: { Authorization: Bearer + Token }

- **getCart**:

  > get

  > cart/:id

  > header: { Authorization: Bearer + Token }

- **addProduct** :

  > post

  > addProduct/:id (id cart)

  > body : { "quantity": number, id:string (ObjectId mongo)}

  > header: { Authorization: Bearer Token }

- **deleteProduct** :

  > delete

  > :id(id cart)/product/:productId (ObjectId mongo)

  > header: { Authorization: Bearer + Token }
