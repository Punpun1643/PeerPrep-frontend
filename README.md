## Local deployment (dockerized)

### Set-up:

1. Ensure that Docker desktop application is running. 
2. Go to the root directory of the repository.
3. Run the following command:
    ```bash
    #build and run each microservice using docker-compose
    docker-compose up --build -d
    ```
4. After the docker containers are up, navigate to  `localhost:3000` on your web browser and start using the application. 


### Tear down:
1. Run the following command:
   ```bash
   # tear down containers 
   docker-compose down
   ```

