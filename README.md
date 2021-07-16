# image-labeling-api
* This project upload image with labels, I have used minio docker image which has the S3 like functions to upload images.

* The image metadata will be stored in dynamodb table with unique id. I used dynamodb local in a docker image.

* I applied the SOLID princila as much as possible in this project

## Highlights
* This is a Typescript project and IDE I used  Visual Studio Code
* dynamoDB is used to store metadata 
* Mocha is used for unit testing
* For local access of dynamodb we need to install dynamodb local. I created docker-compose file which will install the image/container locally
* For local access of minio, we also need to install minio docker image/container
* or the security I am using x-api-key, currently hardcoded but we in future we can use AWS Secret manager
*  I could have generate JWT token using the username and other combination like userid, email etc. and from the app decode the JWT token and extract the user name and use it as the username. 
* username - using `os` npm, which fetch the OS login name(which is not usal but I tried to avoid writng another API for the JWT token)

* image id is auto generated uuid, I used `uuidv4` npm

## Setup
* We need the following component to up and running the project:
    * node 14.16.1
    * `yarn` for the package installation
    * mocha, chai for the unit testing
    * Docker and Docker Compose

* Once completed the enviroment setup we should run - 
    * `yarn  install` to install the packages.

# Docker setup for metadata and image location
* Once the application is built we need to* run the `docker-compose up` to setup the dynamodb and minio  in a docker image/container which is a prerequisite for this app. 

* Once the `dynamodb`, `minio` and  `imaging-app` docker containers are up and running. The `imaging-app` will check the dynamodb container for the `image_labeling_metadata` dynamodb table, if the table is not exist, it will create a new one.
* similarly `createbuckets` creates the `annaliseimagebucket` miniio bucket where the images will be stored.

*** docker-compose also start the `imaging-app` our application in localhost:5000
# Running the application
* `sh start.sh` will start the application in `localhost:4500`

* The bellow commands run the application with various options
    * `yarn dev` - run the project with nodemon
    * `yarn build` - clean the exisitng build and compile & build the prject
    * `yarn start` - run the project in complied code
    * `yarn test` - run the test cases


# Preferred NODE_ENV setup
    * `export NODE_ENV=dev` for docker (already pass it through docker-compose)
    * `export NODE_ENV=uat` for running the project locally 

# The API end-points
    * we can access the api via localhost:4500(locally running) or via localhost:5000(i frunning from docker container)
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

    
# Source code repository: https://github.com/abis1723/image-labeling-api

# Cloud deployment
    * If we use the bitbucketpipeline and AWS cloud infrastructure, we can create the bitbucket-pipelines.yml file. Create the propepr roles, bucket and dynamodb table in the.yaml file and deploy the application image in ECS.
    * we can achive the same using jenkins job

# Q & A
Q. What would your ideal environment look like and how does this fit into it?
* My ideal work environment is one where I'm able to work as part of a team as well as can work individually and that allows everyone's talents to grow. As I researched your company and noticed  you are taking take of the employees and help them grow. As I like to learn new technologies and domains, I feel that it allows me to remain passionate about my job and helps me express my creativity to the best of my ability.

Q. How are subsequent deployments made? 
* Using the Jenkins job or/and using bitbucket pipeline
    
Q. How could you avoid downtime during deployments?
* We can follow two approaches- blue/green or canary deployment

Q. Assuming a stateless application, What would your ideal environment look like and how does this fit into it?
* As stateless applications are not depend on the state from other application so we can freely scaled across available capacity without disrupting
* Kubernetes and docker are the best fit for these as if we need to scale up we can simply redeploy them as these services maintain the user state internally which doesn't impact other applications.

