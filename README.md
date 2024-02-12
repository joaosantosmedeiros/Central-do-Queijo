# Cheese Central
## Description

Ecommerce project for a school food shop created with the purpose to apply all my knowledge acquired from my last year of study with Typescript, such as **Clean Architecture**, **Authorization** and **Authentication**, **Exception Handlers**, **Dockerization/Containerization**, **Unit Tests** and some other good practices. In this project, you can create, find, update and delete products, categories, accounts, shopping carts and much more. 

### Pre-requisites
* Docker
* Node

### Installation
Clone the project or download it by github
```bash
git clone git@github.com:joaosantosmedeiros/Central-do-Queijo.git
```
Install the dependencies
```bash
npm install
```
Copy ```.env_example``` content into a new file ```.env``` in root directory and inform the required data <br><br>
Run docker
```bash
docker compose up
```
Migrate the prisma migrations
```bash
npx prisma migrate dev
```

### Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

### Test
To run tests, execute
```bash
npm run test
```

### Used technologies
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
<img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" />
<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
<img src="	https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white" />

### Authors
* **João Pedro dos Santos Medeiros** - Backend Developer - [@joaosantosmedeiros](https://github.com/joaosantosmedeiros)

### Contact
* [LinkedIn](https://www.linkedin.com/in/joao-pedro-santos-medeiros)
* <jopesame@gmail.com>
