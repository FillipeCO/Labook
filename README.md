# Labook :globe_with_meridians:

![logo projeto](https://i.ibb.co/CWSWPbC/Screenshot-from-2022-04-24-17-37-22.png)



The backend of a social network.

LaBook is a back-end development of an imaginary social  network. It is an activity result of Labenu's full-stack development course. This back-end project consists of an API constructed with Typescript and MySQL languages, using layered architecture and using NodeJS as development environment, Express as NodeJS  framework for API construction and communicating with Database through  Knex's query builder.

#### POSTMAN DOCUMENTATION: https://documenter.getpostman.com/view/19297915/UyxdL9TV



**The back-end performs the following functions:**

SignUp and Login of users through token authentication (both access and refresh token) :heavy_check_mark:

Unilateral friendship interaction :heavy_check_mark:

Feed requisition returning only friend's posts or posts filtered by posts types :heavy_check_mark:

Feed pagination :heavy_check_mark:

Posting of texts and url based pictures requisition :heavy_check_mark:

Comment requisition :heavy_check_mark:

## Tools and technologies :wrench:

:large_orange_diamond: Typescript

:large_orange_diamond: NodeJs

:large_orange_diamond: Express

:large_orange_diamond: MySql


## Running the app :runner:

```
npm install
```

Execute the application in development mode:

```
npm run dev 
```

## 

## Code architecture :computer:

This code was designed concerned with clean code, TS best  practices and Model-View-Controller (MVC) design pattern. The source  folder is devided in:

:large_blue_diamond: **controller layer**: folder containing Typescript files responsible for receiving requisitions data and directing them to the necessary layers;

:large_blue_diamond: **business layer**: folder containing Typescript files responsible for validations and the communication with the data layer;

:large_blue_diamond: **data layer**: folder containing Typescript files responsible for communicating with the Database through queries;

:large_blue_diamond: **model layer**: folder containing interfaces for a better and more secure data processing;

:large_blue_diamond: **services layer**: folder containing data processing (token generator, id generator and so on);

## 🤝 Colaborators

```
People who built and maintain the project:
```

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/FillipeCO">
        <img src="https://avatars.githubusercontent.com/u/87552890?v=4" width="100px;" alt="Foto do Fillipe no GitHub"/><br>
        <sub>
          <b>Fillipe Dias</b>
        </sub>
      </a>
    </td>
     </tr>
</table>

