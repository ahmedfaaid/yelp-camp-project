# Yelp Camp

*Final Project for the Web Developer Bootcamp by Colt Steele*

A camping ground information and review website built with NodeJs and MongoDB as the database using RESTful routing and CRUD.

## Routes
*These routes have been implemented so far*
- Landing (get)
- **INDEX** /campgrounds (get)
- **CREATE** /campgrounds (post)
- **NEW**/campgrounds/new (get)
- **SHOW** /campgrounds/:id (get)
### Nested Routes
- **NEW** /campgrounds/:id/comments/new (get)
- **POST** /campgrounds/:id/comments (post)

*The following routes are still yet to be implemented*
- **Edit**
- **Update**
- **Destroy**

## Technologies & Dependencies
*These are the technologies & dependencies that have been implemented so far*
- Express
- Express-Sanitizer
- EJS
- Body-Parser
- Mongoose

*These are technologies & technologies yet to be implemented*
- Passport & Passport Local
- Express-Session

Most styling is done by Bootstrap with a little bit of custom css

## What Next?

``Authentication with Passport``
