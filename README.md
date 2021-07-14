# image-labeling-api

* This project upload image with labels, currently upload the image in a local folder(uploads) and the future implemention will be in S3 bucket.

* The image metadata will be stored in dynamodb table with unique id. I used dynamodb local in a docker image.

## Highlights

* This is a Typescript project and IDE I used  Visual Studio Code
* dynamoDB is used to store metadata 
* Mocha is used for unit testing
* For local access of dynamodb we need to install dynamodb local. I created docker-compose file which will install the image/container locally

## Setup
We need the following component to get up and running the project:

* node 14.16.1
* `yarn` for the package installation
* mocha, chai for the unit testing
* Docker and Docker Compose

Once setup the enviroment we should run - 
`yarn  install` to install the packages.

## Running
The below commands are used running of the project with various expects

* `yarn dev` - run the project with nodemon
* `yarn build` - clean the exisitng build and compile & build the prject
* `yarn start` - run the project in complied code
* `yarn test` - run the test cases

Once we build the project we need to run the `docker-compose up` to setup the dynamodb local in a docker image. Which is a prerequisite otherwise we will get the error message eg.`Inaccessible host: localhost. This service may not be available in the ap-southeast-2' region.`

Once the `dynamodb` and  `imaging-app` docker containers are up and running. The `imaging-app` will check the dynamodb container for the `image_labeling_metadata` dynamodb table, if not exist, it will create a new one.

# Preferred NODE_ENV setup
    * `export NODE_ENV=dev` for docker (already pass it through docker-compose)

    * `export NODE_ENV=uat` for running the project locally 


## The API end-points
# POST http://localhost:5000/api/v1/imagelabels/label=<any text>
    * Headers 
        `contenet-type` = `multipart/form-data`
        `x-api-key` = `3c98a900-c0d9-4fbe-b3fb-2eb52d545340`, I hard coded the key for this time but future implementation will be with AWS secret manager

    * Body (`form-data`)
        `file` = <Option to select an image>

# GET http://localhost:5000/api/v1/imagelabels id=<UUID>
    * Headers 
    `contenet-type` = `application/json`
    `x-api-key` = `3c98a900-c0d9-4fbe-b3fb-2eb52d545340`
    
# source code repository: https://github.com/abis1723/image-labeling-api