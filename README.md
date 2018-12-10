Created: 28/09/2018 - Last Update: 10/11/2018 

#### gitHub: [gitHub/FDMcreative](https://github.com/FDMcreative/)
#### website: [FDMcreative.com](http://www.fdmcreative.com) 
#### email: [federico.delmonte@gmail.com](federico.delmonte@gmail.com)
---
# Instagram Clone - AngularJS
### *An Instagram-like web MEAN app with AngularJS.*
-

This project is a **MEAN** web app which recreates a simplified version of Instagram with basic functionalities such as login, register, upload photos and post comments.

I made use of:

- **Mongo** - For the database
- **Express** - For the web-framework
- **Angular** - For the client-side framework
- **Node** - For the server-side language

---

#### Server-side

* **Mongo, Node & Express** to build a server-side API.
* **The API** has 2 related models (photo, user).
* The API includes **all RESTFUL actions** for the User model.
* Includes **authentication** to restrict access to authorized users.
* Includes **one embedded sub-document** (comment).

---

#### Client-side

* Use of **Angular** to build a front-end that consumes the API.
* Use **SCSS** instead of **CSS**.
* Use of **Bower** to manage the client-side dependencies.
* Use of **Gulp & Babel** to convert ES6 code to ES5
* Use of **Gulp & Sass** to convert **SCSS** to **CSS**.

---

#### Functionalities:

- Register, Login and Logout.
- Uploading of images on AWS by registered users.
- Commenting of images by the registered users.
- Deleting of comments by the creator user.


---

#### Difficulties:

- Search is implemented in a very simple way; without a function inside the controller, but directly in the "profile view".

---

#### Not Implemented:

- Reciprocal vertical allignment of the images on the Index Page.