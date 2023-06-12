# Cloudy

Cloudy is a video streaming React Native application that takes inspiration from Netflix. It is a non-profit personal project, and my first React Native project which I am using to learn react ecosystem. I'm using AWS service for infrastructure along with an Express server connected to a Postgre database

## Prerequest 

- AWS account
- NodeJS
- Postgresql

## Installation

### Back-end set up

1. Go to the back-end folder and install required packages `npm i`
2. Once you have installed the necessary packages, create a `.env` file and include the example variables provided in the `example.env` file
3. Create Prisma client ( if u are new to prisma check out thier [documentation](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/install-prisma-client-typescript-postgresql))
```
npx prisma generate
```
4. Run sample migration 
```
npx prisma migrate dev
```


