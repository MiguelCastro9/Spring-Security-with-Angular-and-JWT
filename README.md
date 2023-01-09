# Overview

Login system with users permission using SpringBoot, Spring Security, JWT (JSON Web Token), Angular and persistence.

Note: after running the application, execute the following SQL commands:

> 
> _INSERT INTO role_model (role_nome) VALUES ('ROLE_ADMIN');_
>
> _INSERT INTO role_model (role_nome) VALUES ('ROLE_READ');_
>
>(link to generate first access hash https://www.javainuse.com/onlineBcrypt)
>
> _INSERT INTO usuario_model  VALUES (1, 'admin@email.com', 'admin', 1, '$2a$10$Qkr5pwN4ZRkQmt6KjKT/yePO7kjYW/jN06uVziz2jXp8QzrFn6Rxq', true);_
>
> _IINSERT INTO usuario_role (usuario_id, role_id) VALUES (1, 1);_


## Generating token
![token](https://user-images.githubusercontent.com/56695817/211249526-791b9a77-180d-417e-92e1-60016e3bcd22.gif)

## validating access
![users](https://user-images.githubusercontent.com/56695817/211249844-2559d25f-3163-4a6a-955a-0c61ff27e454.gif)

## Inserting user (administrator)
![insert1](https://user-images.githubusercontent.com/56695817/211249673-2e896d3a-7f2d-4775-be95-902fda7a4dee.gif)

## Inserting user (reader)
![insert2](https://user-images.githubusercontent.com/56695817/211249758-fb52f6a5-f1e1-4823-ab44-3bba18791897.gif)

## Validating unauthorized access
![validationacess](https://user-images.githubusercontent.com/56695817/211250134-9531f70d-f1ea-48fe-b698-c5a266b875d1.gif)




