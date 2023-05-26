# Fullstack-Afiliados

Este repositório contém uma API para leitura de arquivo .txt, juntamente com um aplicativo de front-end feito com React.


## FRONTEND

O Frontend foi desenvolvido utilizando REACTJS e possui alguns frameworks que auxiliam no desenvolvimento do projeto:

 - React-router-dom
 - MUI Material e dependências
 - Axios

## API

A API foi desenvolvida utilizando o framework ASP.NET Core e oferece endpoints para criar e ler os dados que são armazenados em um banco de dados PostgreSQL. A bibliotecas adicionais ao projeto são:
 - DotNetEnv
 - Newtonsoft.Json
 - Npgsql
 - xunit

### Endpoints da API

- `POST localhost:5097/getFile`: Regista o arquivo no servidor, enviando para o banco de dados os dados
- `POST localhost:5097/getData`: Busca os dados das vendas retornando a lista de vendas


## Docker Compose

O projeto inclui um arquivo `docker-compose.yml` que permite a execução da aplicação completa em contêineres Docker. O Docker Compose é responsável por configurar os serviços da API, banco de dados e aplicativo de front-end, e conectar tudo em uma rede isolada.

### Executando com Docker Compose

Certifique-se de ter o Docker instalado em sua máquina. Em seguida, execute os seguintes comandos no diretório raiz do projeto:

1. `docker-compose build`: Constrói as imagens dos serviços.
2. `docker-compose up`: Inicia os contêineres e executa a aplicação.

Após executar esses comandos, a API estará disponível em `http://localhost:5097` e o aplicativo de front-end estará disponível em `http://localhost:3000`.

## Testes

O projeto inclui testes unitários para a API, que podem ser executados usando o comando `dotnet test`. Certifique-se de estar no diretório `backend/` e execute o seguinte comando:

O projeto inclui testes unitários para o FrontEnd, que podem ser executados usando o comando `npx jest`. Certifique-se de estar no diretório `frontend/` e execute o seguinte comando:


--------

# Fullstack-Afiliados - English Version

This repository contains an API for affiliate management, along with an React front-end application.

## Front-end
The front-end application is developed using ReactJS and utilizes several frameworks to aid in the project's development:

 - React-router-dom
 - MUI Material and dependencies
 - Axios

## API
The API is developed using the ASP.NET Core framework and provides endpoints for creating and reading the data is stored in a PostgreSQL database.

## API Endpoints
 - `POST localhost:5097/getFile:` Registers the file on the server, sending the data to the database.
 - `POST localhost:5097/getData:` Retrieves sales data and returns the list of sales.

## Docker Compose
The project includes a `docker-compose.yml` file that allows the execution of the complete application in Docker containers. Docker Compose is responsible for configuring the API, database, and front-end application services and connecting everything within an isolated network.

### Running with Docker Compose
Make sure you have Docker installed on your machine. Then, execute the following commands in the project's root directory:

1. `docker-compose build`: Builds the service images.
2. `docker-compose up`: Starts the containers and runs the application.

After executing these commands, the API will be available at `http://localhost:5097`, and the front-end application will be available at `http://localhost:3000`.

## Testing
The project includes unit tests for the API, which can be executed using the dotnet test command. Make sure you are in the `backend/` directory and run the following command:

The project also includes unit tests for the front-end, which can be executed using the npx jest command. Make sure you are in the `frontend/` directory and run the following command:

Feel free to contribute to this project with any improvements. If you encounter any issues or have suggestions, open an issue so that we can discuss them.

---
This is a challenge by Coodesh