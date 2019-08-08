 Turing Back End Challenge
 API Endpoints with response

1. DEPARTMENTS
1.1. GET ALL DEPARTMENTS
Description: This endpoint retrieve the list of departments from the database and returns an
array of department objects to the user .
Path: localhost:<your_port>/departments
Method: GET
Status: 200
Success Response:
 {
        "department_id": 1,
        "name": "Regional",
        "description": "Proud of your country? Wear a T-shirt with a national symbol stamp!"
    },

1.2 GET A SINGLE DEPARTMENT
Description: This endpoint get a single department using the department Id in the request
params.
Path: /departments/{department_id}
Method: GET
Status: 200
Success Response:
{
    "department_id": 3,
    "name": "Seasonal",
    "description": "Each time of the year has a special flavor. Our seasonal T-shirts express traditional symbols using unique postal stamp pictures."
}

 "error":  "error": {
        "status": 404,
        "code": "DEP_02",
        "message": " Don'exist department with this ID 10",
        "field": "department_id"
    }

2. CATEGORIES
2.1 GET ALL CATEGORIES
Description: This endpoint returns a list of product categories to the user.
Path: /categories
Method: GET
Status: 200
Success Response:
[
    {
        "category_id": 1,
        "department_id": 1,
        "name": "French",
        "description": "The French have always had an eye for beauty. One look at the T-shirts below and you'll see that same appreciation has been applied abundantly to their postage stamps. Below are some of our most beautiful and colorful T-shirts, so browse away! And don't forget to go all the way to the bottom - you don't want to miss any of them!"
    },
]

2.2 GET A SINGLE CATEGORY
Description: This endpoint returns a single category using the category id.
Path: /categories/{category_id}
Method: GET
Status: 200
Success Response:
{
    "category_id": 4,
    "department_id": 2,
    "name": "Animal",
    "description": " Our ever-growing selection of beautiful animal T-shirts represents critters from everywhere, both wild and domestic. If you don't see the T-shirt with the animal you're looking for, tell us and we'll find it!"
}

error: {
   "status": 404,
        "code": "CAT_01",
        "message": "Don't exist category with this ID.",
        "field": "category_id"
    }

2.3 GET PRODUCT CATEGORY
Description: This endpoint returns the category of a particular product.
Path: /categories/inProduct/{product_id}
Method: GET
Status: 200
Success Response:
[
   {
        "category_id": 1,
        "department_id": 1,
        "name": "French",
        "description": "The French have always had an eye for beauty. One look at the T-shirts below and you'll see that same appreciation has been applied abundantly to their postage stamps. Below are some of our most beautiful and colorful T-shirts, so browse away! And don't forget to go all the way to the bottom - you don't want to miss any of them!"
    }
]

error:
 {
        "status": 404,
        "code": "CAT_02",
        "message": "Don't exist category with this ID. 1023",
        "field": "product_id"
}

2.4 GET ALL CATEGORIES IN A DEPARTMENT
Description: This endpoint returns a list of categories in a department.
Path: /categories/inDepartment/{department_id}
Method: GET
Status: 200
Success Response:
[
    {
        "category_id": 1,
        "department_id": 1,
        "name": "French",
        "description": "The French have always had an eye for beauty. One look at the T-shirts below and you'll see that same appreciation has been applied abundantly to their postage stamps. Below are some of our most beautiful and colorful T-shirts, so browse away! And don't forget to go all the way to the bottom - you don't want to miss any of them!"
    },
    {
        "category_id": 2,
        "department_id": 1,
        "name": "Italian",
        "description": "The full and resplendent treasure chest of art, literature, music, and science that Italy has given the world is reflected splendidly in its postal stamps. If we could, we would dedicate hundreds of T-shirts to this amazing treasure of beautiful images, but for now we will have to live with what you see here. You don't have to be Italian to love these gorgeous T-shirts, just someone who appreciates the finer things in life!"
    },
]

error:
{
        "status": 404,
        "code": "DEP_02",
        "message": "Don'exist department with this ID  156",
        "field": "department_id"
}

3. ATTRIBUTES
3.1 GET ALL ATTRIBUTES
Description: This endpoint returns a list of attributes from the database.
Path: /attributes
Method: GET
Status: 200
Success Response:
[
    {
        "attribute_id": 1,
        "name": "Size"
    },
    {
        "attribute_id": 2,
        "name": "Color"
    }
]

3.2 GET SINGLE ATTRIBUTES
Description: This endpoint returns a single attribute using the attribute id.
Path: /attributes/{attribute_id}
Method: GET
Status: 200
Success Response:
[
    {
        "attribute_value_id": 6,
        "attribute_id": 2,
        "value": "White",
        "attribute_type": {
            "attribute_id": 2,
            "name": "Color"
        }
    },
]
error:
{
        "status": 404,
        "code": "ATR_01",
        "message": "Attribute with this ID does not exists 5",
        "field": "attribute_id"
}

3.3 GET ALL ATTRIBUTE VALUES IN AN ATTRIBUTE
Description: This endpoint returns a list of values for a single attribute using the attribute id.
Path: /attributes/values/{attribute_id}
Method: GET
Status: 200
Success Response:
[
    {
        "attribute_value_id": 6,
        "attribute_id": 2,
        "value": "White"
    },
]

error: {
        "status": 404,
        "code": "ATR_01",
        "message": "Attribute with this ID does not exists 10",
        "field": "attribute_id"
    }

3.4 GET ALL ATTRIBUTES OF A PRODUCT
Description: This endpoint returns a list of attributes for a single product using the product id
Path: /attributes/inProduct/{product_id}
Method: GET
Status: 200
Success Response:
[
    {
        "attribute_value_id": 1,
        "attribute_id": 1,
        "value": "S"
    },
    {
        "attribute_value_id": 2,
        "attribute_id": 1,
        "value": "M"
    },
]

error:
{
        "status": 404,
        "code": "ATR_02",
        "message": "Attribute with this Product ID does not exists 500",
        "field": "product_id"
    }

4. PRODUCTS
4.1 GET ALL PRODUCTS
Description: This endpoint returns a list of products in the database. It should return a
paginated response.
Path: /products
Method: GET
Status: 200
Success Response:
{
    "paginationMeta": {
        "currentPage": 1,
        "currentPageSize": 1,
        "totalPages": 20,
        "totalRecords": 101
    },
    "rows": [
        {
            "product_id": 1,
            "name": "Arc d'Triomphe",
            "description": "This beautiful and iconic T-shirt will no doubt lead you to your own triumph.",
            "price": "14.99",
            "discounted_price": "0.00",
            "image": "arc-d-triomphe.gif",
            "image_2": "arc-d-triomphe-2.gif",
            "thumbnail": "arc-d-triomphe-thumbnail.gif",
            "display": 0
        }
    ]
}

4.2 SEARCH PRODUCTS
Description: This endpoint returns a list of product that matches the search value.
Path: /products/search?query_string={search value} &all_words=on
/products/search?query_string=Coat&all_words=off
if all_words is set to "off" then it will search in name of the product only
if all_words is set to "on" then it will search in the entire object
Method: GET
Status: 200

Success Response:
[
    {
        "product_id": 3,
        "name": "Coat of Arms",
        "description": "There's good reason why the ship plays a prominent part on this shield!",
        "price": "14.50",
        "discounted_price": "0.00",
        "image": "coat-of-arms.gif",
        "image_2": "coat-of-arms-2.gif",
        "thumbnail": "coat-of-arms-thumbnail.gif",
        "display": 0
    },
    {
        "product_id": 29,
        "name": "Irish Coat of Arms",
        "description": "This was one of the first stamps of the new Irish Republic, and it makes a T-shirt you'll be proud to wear on St. Paddy's Day!",
        "price": "14.99",
        "discounted_price": "0.00",
        "image": "irish-coat-of-arms.gif",
        "image_2": "irish-coat-of-arms-2.gif",
        "thumbnail": "irish-coat-of-arms-thumbnail.gif",
        "display": 0
    }
]

4.3 GET A SINGLE PRODUCT
Description: This endpoint returns a single product object using the product id.
Path: /products/{product_id}
Method: GET
Status: 200
Success Response:
{
    "product_id": 1,
    "name": "Arc d'Triomphe",
    "description": "This beautiful and iconic T-shirt will no doubt lead you to your own triumph.",
    "price": "14.99",
    "discounted_price": "0.00",
    "image": "arc-d-triomphe.gif",
    "image_2": "arc-d-triomphe-2.gif",
    "thumbnail": "arc-d-triomphe-thumbnail.gif",
    "display": 0
}

error: {
        "status": 404,
        "code": "PRD_01",
        "message": "Product with this ID does not exists 909",
        "field": "product_id"
    }


4.4 GET ALL PRODUCTS IN A CATEGORY
Description: This endpoint should return list of products in a category using the category id in
the request params.
Path: /products/inCategory/{category_id}
Method: GET
Status: 200
Success Response:
[
    {
        "product_id": 19,
        "name": "Italia",
        "description": "The War had just ended when this stamp was designed, and even so, there was enough optimism to show the destroyed oak tree sprouting again from its stump! What a beautiful T-shirt!",
        "price": "22.00",
        "discounted_price": "18.99",
        "image": "italia.gif",
        "image_2": "italia-2.gif",
        "thumbnail": "italia-thumbnail.gif",
        "display": 2
    },
]

error:
 {
        "status": 404,
        "code": "PRD_02",
        "message": "Product with this category does not exists 200",
        "field": "category_id"
    }

4.5 GET ALL PRODUCTS IN A DEPARTMENT
Description: This endpoint returns list of products in a department using the department id in
the request params.
Path: /products/inDepartment/{department_id}
Method: GET
Status: 200
Success Response:
[
    {
        "product_id": 36,
        "name": "Visit the Zoo",
        "description": "This WPA poster is a wonderful example of the art produced by the Works Projects Administration during the Depression years. Do you feel like you sometimes live or work in a zoo? Then this T-shirt is for you!",
        "price": "20.00",
        "discounted_price": "16.95",
        "image": "visit-the-zoo.gif",
        "image_2": "visit-the-zoo-2.gif",
        "thumbnail": "visit-the-zoo-thumbnail.gif",
        "display": 2
    },
]


error:
{
        "status": 404,
        "code": "PRD_03",
        "message": "Product in this Department with this department ID does not exists  500",
        "field": "department_id"
}

4.6 GET REVIEWS OF A PRODUCT
Description: This endpoint returns a list reviews for a product using the product id in the
request params.
Path: /products/{product_id}/reviews
Method: GET
Status: 200
Success Response:
{
    "review_id": 1,
    "customer_id": 1,
    "product_id": 1,
    "review": "best product",
    "rating": 10,
    "created_on": "2019-08-08T02:32:43.000Z"
}

  error:
{
        "status": 404,
        "code": "REV_01",
        "message": "Review of this product is not avaialble with product ID  23",
        "field": "product_id"
}

4.7 POST A PRODUCT REVIEW
Description: This endpoint allows a user to post a product review.
Path: /products/{product_id}/reviews
Method: POST
Status: 201
Request body:
{
	"product_id" : 6 ,
    "review" : "Best in the town" ,
    "rating" : 10
}

Success Response:
{
    "name": "Alsace",
    "review": "Best in the town",
    "rating": 10,
    "created_on": "2019-08-08T05:37:32.051Z"
}

5. CUSTOMERS
5.1 CREATE A NEW CUSTOMER
Description: This endpoints allow a user to create a new account.
Path: /customers
Method: POST
Status: 201
Request body:
{
"name" : "JOHN" ,
"email" : "john@hotmail.com" ,
"password" : "12345"
}
Success Response:
{
    "customer": {
        "shipping_region_id": 1,
        "customer_id": 3,
        "name": "JOHN",
        "email": "john@hotmail.com",
        "password": "$2b$08$BlGcfBNHgx9j3MPt/sCeq.Xdvm1IqOmUhZ8KZqWsVZce4pGh7AFhe"
    },
    "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5AaG90bWFpbC5jb20iLCJpYXQiOjE1NjUyNDI4NzQsImV4cCI6MTU2NTMyOTI3NH0.I-MA2YNSW4QIHnnDjc9vN0uBt8nnHZ2QzAi8J7pGPeQ",
    "expiresIn": "24h"
}

"error": {
        "status": 404,
        "code": "USR_04",
        "message": "The email already exists. with Email:  john@hotmail.com",
        "field": "email"
    }

 Getting started

 Prerequisites

In order to install and run this project locally, you would need to have the following installed on you local machine.

* [**Node JS**](https://nodejs.org/en/)
* [**Express**](https://expressjs.com/)
* [**MySQL**](https://www.mysql.com/downloads/)

 Installation

* Clone this repository

* Navigate to the project directory

* Run `npm install` or `yarn` to instal the projects dependencies
* create a `.env` file and copy the contents of the `.env.sample` file into it and supply the values for each variable

```sh
cp .env.sample .env
```
* Create a MySQL database and run the `sql` file in the database directory to migrate the database

```sh
mysql -u <dbuser> -D <databasename> -p < ./src/database/database.sql
```

* Run `npm run dev` to start the app in development

 Docker

* Build image

`docker build -t node_challenge .`

* Run container
`docker run --rm -p 8000:80 node_challenge`

 Request and Response Object API guide for all Endpoints
Check [here](https://docs.google.com/document/d/1J12z1vPo8S5VEmcHGNejjJBOcqmPrr6RSQNdL58qJyE/edit?usp=sharing)

