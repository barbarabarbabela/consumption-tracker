# Consumption Tracker
<div style="display: inline block">
<img src="https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg" width="20px"/>    
<img src="https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg" width="20px"/>
<img src="https://www.vectorlogo.zone/logos/docker/docker-tile.svg" width="20px"/>
<img src="https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg" width="20px"/>
<img src="https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg" width="20px"/>
</div>

## O que é?

O Consumption Tracker é um microsserviço que realiza a leitura individualizada de consumo de água e gás.
O serviço utiliza a Inteligência Artificial do Google, Gemini, para obter medições a partir de fotos de medidores e permite realizar a confirmação e a listagem de leituras.

## Tecnologias utilizadas

Node.js;

TypeScript;

Express;

TypeORM;

Docker;

PostgreSQL;

## Como rodar o serviço

### Pré-requisitos

- Node.js
- Npm
- Git
- Docker

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/barbarabarbabela/consumption-tracker.git
```

2. Entre na pasta do projeto:

```bash
cd consumption-tracker
```

3. Instale as dependências:

```bash
npm install
```

4. Crie um arquivo `.env` na pasta do projeto com as seguintes variáveis de ambiente:

```bash
POSTGRES_HOST
POSTGRES_PORT
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
GEMINI_API_KEY
```

5. Com o Docker Desktop instalado em seu computador, execute o comando abaixo:

```bash
docker-compose up
```

## Parâmetros

- `image`: A imagem a ser analisada. Deve ser um base64 válido.
- `customer_code`: O código do cliente que está realizando a leitura.
- `measure_datetime`: A data e hora da medição. Deve ser um formato válido.
- `measure_type`: O tipo de medição. Deve ser um dos seguintes valores: `WATER` ou `GAS`. Esse parâmetro é case insensitive.
- `confirmed_value`: O valor da medição confirmada. Deve ser um número inteiro.
- `measure_uuid`: O UUID da medição. Deve ser um UUID válido.
- `confirmed`: Um booleano que indica se a medição foi confirmada ou não.
- `image_url`: A URL da imagem enviada.

## Endpoints

```json
1. POST /upload
Request body:
{
  "image": string,
  "customer_code": string,
  "measure_datetime": datetime,
  "measure_type": water | gas
}
Response body:
{
  "image_url": string,
  "measure_value": number,
  "measure_uuid": string
}
```

```json
2. PATCH /confirm
Request body:
{
  "measure_uuid": string,
  "confirmed_value": number
}

Response body:
{
  "success": boolean
}
```

```json
3. GET /:customer_code/list?measure_type=:measure_type
Response body:
{
  "customer_code": string,
  "measures": [
    {
      "measure_uuid": string,
      "measure_datetime": datetime,
      "measure_type": water | gas,
      "has_confirmed": boolean
      "image_url": string,

    }
  ]
}
```

## Decisões de projeto
