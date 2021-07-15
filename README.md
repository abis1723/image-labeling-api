# image-labeling-api

* This project upload image with labels, I have used minio docker image which has the S3 like functions to upload images.

* The image metadata will be stored in dynamodb table with unique id. I used dynamodb local in a docker image.

## Highlights

* This is a Typescript project and IDE I used  Visual Studio Code
* dynamoDB is used to store metadata 
* Mocha is used for unit testing
* For local access of dynamodb we need to install dynamodb local. I created docker-compose file which will install the image/container locally
* For local access minio, we also need to install minio docker image/container
* image id is auto generated uuid, I used `uuidv4` npm
* username - using `os` npm, which fetch the OS login name
* for the security I am using x-api-key, currently hardcoded but we in future we can use AWS SM

## Setup
We need the following component to up and running the project:

* node 14.16.1
* `yarn` for the package installation
* mocha, chai for the unit testing
* Docker and Docker Compose

Once completed the enviroment setup we should run - 
`yarn  install` to install the packages.

## Running
The bellow commands run the application with various options

* `yarn dev` - run the project with nodemon
* `yarn build` - clean the exisitng build and compile & build the prject
* `yarn start` - run the project in complied code
* `yarn test` - run the test cases

Once the application is built we need to run the `docker-compose build --no-cache --pull` to setup the dynamodb local in a docker image which is a prerequisite for this app. Otherwise we will get the error message eg.`Inaccessible host: localhost. This service may not be available in the ap-southeast-2' region.`


Once the `dynamodb` and  `imaging-app` docker containers are up and running. The `imaging-app` will check the dynamodb container for the `image_labeling_metadata` dynamodb table, if the table is not exist, it will create a new one.

# Preferred NODE_ENV setup
    * `export NODE_ENV=dev` for docker (already pass it through docker-compose)

    * `export NODE_ENV=uat` for running the project locally 


## The API end-points
# POST http://localhost:5000/api/v1/imagelabels/diseasetype=covid-19
    * Headers 
        `contenet-type` = `multipart/form-data`
        `x-api-key` = `3c98a900-c0d9-4fbe-b3fb-2eb52d545340`, I hard coded the key for this time but future implementation will be with AWS secret manager

    * Body (`form-data`)
        `file` = <Option to select an image>

# GET http://localhost:5000/api/v1/imagelabels?diseaseType=covid-19
    * Headers 
        `contenet-type` = `application/json`
        `x-api-key` = `3c98a900-c0d9-4fbe-b3fb-2eb52d545340`
    
# source code repository: https://github.com/abis1723/image-labeling-api