# Eth-Gas-Monitor
This application helps to monitor gas fees in any given moment. It can be used to reduce gas fees spent on the Ethereum network

# Table of contents
1. [Problem Statement and Solution](#problem)
2. [How to Get Started](#started)
  1. [Prerequisites](#prerequisites)
  2. [Steps to run the project](#steps)
4. [Desired Output](#output)
5. [ Possible Error Messages ](#errors)


## Problem Statement and Solution <a name="problem"/>

We need to pay a service fee called gas fees when doing transactions on Ethereum. The price of gas is very volatile and depends on the current network usage. Therefore, it is really important to be able to get to know the current gas price and compare with historical prices in order to reduce the cost of running operation on Ethereum.

This application uses Gas Tracker APIs offered by Etherscan to periodically get gas prices and stores them in a database. This API can be used to get current gas fees or any historical gas fees requested by the user.

NOTE: All the gas prices are returned in **Gwei**  

### Endpoints

- GET "/gas"   


  Returns the current gas prices at different tiers (fast, average, low) at the current block number.
  
  **Example:**  
  
   `curl http://localhost:<application_port>/gas`
    
  **Valid Results:**  
  
  In case of an error,    
   `{ "error": true, "message": <some error-string highlighting the issue> }`  
  
  In case of a successful result,  
  `{ "error": false, "message": "fast":98, "average": 62, "low": 35, "blockNum":13442311}`
  
- GET "/average?fromTime=&toTime="  


  Returns the average gas price between a specified time interval  
  
  **Example:**  
  
  `curl http://localhost:<application_port>/average?fromTime=1633285779&toTime=1633112979`
  
  Reference for understanding the UnixTimestamp format:  
  https://www.unixtimestamp.com/  
  
  **Valid Results:**  
  
  In case of an error,  
  `{ "error": true, "message": <some error-string highlighting the issue> }`  
  
  In case of a successful result,  
  `{ "error": false, "message":{"averageGasPrice": 56, "fromTime": 1633285779, "toTime": 1633112979} }`
 
 
 ## How to Get Started  <a name="started"/>
 
 ### Prerequisites <a name="prerequisites"/>
 
 - Docker and Docker compose should be installed. (See [here](https://docs.docker.com/compose/install/) for more info)

### Steps to run the project <a name="steps"/>

- Clone this project
- Create a free API key by creating a new account in EtherScan through this [link](https://docs.etherscan.io/getting-started/creating-an-account)
- Create a file called `.env_file` in the root directory and place your API key as follows,  
   `APP_KEY="some_api_key"`
- Run the project with the following command  
   `docker-compose up -d --build`

 _Other environment variables in `docker-compose.yml` file can also be passed the same way the API key was passed._
 
 ## Technical Choices made in the application
 
 ### Choosing a Data Source
 
 EtherScan and EtherGas station are the two famous sources of data for extracting gas fees. Out of them I have chosen to use EtherScan in this application due to the following reasons
 - EtherScan documentation is very clear.
 - EtherScan would be the ideal data source if I were to improve this application in the future by adding more functionality, becuase it provides many endpoints for different uses. On the other hand EtherGasStation has only one endpoint.

### Choosing a  Database

I have decided to use a relational DB(MYSQL) in this application. Although I have only one table in the database it is easier to query data if I used a SQL database like MYSQL. Also since I am using well-structured, more or less constant data - an SQL database was the best choise.

### Choosing Server Type

The user only needs to receive data when he/she requests gas prices. Therefore, there is no use in implementing a websocket server. Therefore, I have chosen to implement a REST server.
