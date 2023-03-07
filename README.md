HomeWork 4 what was done:
###  4.1
1. Use AWS Console to create two database tables in DynamoDB. Expected schemas for products and stocks:
Product model:
```
products:
id -  uuid (Primary key)
title - text, not null
description - text
price - integer
Stock model:
```
````
stocks:
product_id - uuid (Foreign key from products.id)
count - integer (Total number of products in stock, can't be exceeded)
````
 2.  Write a script to fill tables with test examples. Store it in your Github repository. Execute it for your DB to fill data.
src/scripts/initialUploadToTables.ts   
````
npm run dynamo:iUpload
````
### 4.2
1. Extend your serverless.yml file with data about your database table and pass it to lambda’s environment variables section.
2. Integrate the getProductsList lambda to return via GET /products request a list of products from the database (joined stocks and products tables).
3. Implement a Product model on FE side as a joined model of product and stock by productId. For example:
BE: Separate tables in DynamoDB
````
Stock model example in DB:
{
product_id: '19ba3d6a-f8ed-491b-a192-0a33b71b38c4',
count: 2
}


Product model example in DB:
{
id: '19ba3d6a-f8ed-491b-a192-0a33b71b38c4'
title: 'Product Title',
description: 'This product ...',
price: 200
}
````
4. Integrate the getProductsById lambda to return via GET /products/{productId} request a single product from the database.

### 4.3 
1. Create a lambda function called createProduct under the same Serverless config file (i.e. serverless.yaml) of Product Service which will be triggered by the HTTP POST method.
2. The requested URL should be /products.
3. Implement its logic so it will be creating a new item in a Products table.
4. Save the URL (API Gateway URL) to execute the implemented lambda functions for later - you'll need to provide it in the PR (e.g in PR's description) when submitting the task.


### Additional (optional) tasks  
1. +6 (All languages) - POST /products lambda functions returns error 400 status code if product data is invalid
2. +6 (All languages) - All lambdas return error 500 status code on any error (DB connection, any unhandled error in code)
3. +6 (All languages) - All lambdas do console.log for each incoming requests and their arguments
4.  -----
5. +6 (All languages) - Transaction based creation of product (in case stock creation is failed then related to this stock product is not created and not ready to be used by the end user and vice versa)
    Transaction was used through the  transactWriteItems [(DynamoDB SDK transactWriteItems )](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/dynamodb.html#transactwriteitems)




Instruction how to build,
run:
- npm run build
- cd dist
- serverless deploy






# Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

## Test your service

This template contains a single lambda function triggered by an HTTP request made on the provisioned API Gateway REST API `/hello` route with `POST` method. The request body must be provided as `application/json`. The body structure is tested by API Gateway against `src/functions/hello/schema.ts` JSON-Schema definition: it must contain the `name` property.

- requesting any other path than `/hello` with any other method than `POST` will result in API Gateway returning a `403` HTTP error code
- sending a `POST` request to `/hello` with a payload **not** containing a string property named `name` will result in API Gateway returning a `400` HTTP error code
- sending a `POST` request to `/hello` with a payload containing a string property named `name` will result in API Gateway returning a `200` HTTP status code with a message saluting the provided name and the detailed event processed by the lambda

> :warning: As is, this template, once deployed, opens a **public** endpoint within your AWS account resources. Anybody with the URL can actively execute the API Gateway endpoint and the corresponding lambda. You should protect this endpoint with the authentication method of your choice.

### Locally

In order to test the hello function locally, run the following command:

- `npx sls invoke local -f hello --path src/functions/hello/mock.json` if you're using NPM
- `yarn sls invoke local -f hello --path src/functions/hello/mock.json` if you're using Yarn

Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.

### Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and `name` parameter in the following `curl` command in your terminal or in Postman to test your newly deployed application.

```
curl --location --request POST 'https://myApiEndpoint/dev/hello' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Frederic"
}'
```

## Template features

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas

```
.
├── src
│   ├── functions               # Lambda configuration and source code folder
│   │   ├── hello
│   │   │   ├── handler.ts      # `Hello` lambda source code
│   │   │   ├── index.ts        # `Hello` lambda Serverless configuration
│   │   │   ├── mock.json       # `Hello` lambda input parameter, if any, for local invocation
│   │   │   └── schema.ts       # `Hello` lambda input event JSON-Schema
│   │   │
│   │   └── index.ts            # Import/export of all lambda configurations
│   │
│   └── libs                    # Lambda shared code
│       └── apiGateway.ts       # API Gateway specific helpers
│       └── handlerResolver.ts  # Sharable library for resolving lambda handlers
│       └── lambda.ts           # Lambda middleware
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
└── webpack.config.js           # Webpack configuration
```

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file

### Advanced usage

Any tsconfig.json can be used, but if you do, set the environment variable `TS_NODE_CONFIG` for building the application, eg `TS_NODE_CONFIG=./tsconfig.app.json npx serverless webpack`
