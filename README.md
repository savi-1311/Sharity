# Sharity - The Best Christmas Smile you can Gift 🎁

## 💡Inspiration
* ☃️ Winter is a season of🎄 Holidays and Gifts! But the case is drastically different for the underprivileged section of society. According to the statistics, nearly 4.8 million deaths are caused due to extreme cold. Many people don't even have proper warm clothes to protect them from the frostbiting cold.

* 🧣 On the other hand, we generally look for new styles and fashionable sweaters, jackets even boots every year. And in turn, discard the old clothes which can be used by the needy.

* 🌱 Nowadays, we don't find pure woollen garments easily. Instead, they are mixed with synthetic fibres. On throwing it away, the entire thing will take forever to biodegrade. Hence, just throwing away the garments is harmful to nature as well.

***

## ⚙️ What it does?
Sharity is a web platform where you can upload and donate your used and discarded winter wears for the underprivileged. Either you will be contacted by Donation Centres or somebody in need of the items.

### Features: 

* ⬆️ **Upload**: It provides a platform, where people can upload their discarded winter wear for the needy person or the donation centres around them to get contacted.

![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/56017960/147406929-7acf9e82-3020-4e6d-b24b-b82eea8a6e8d.gif)
* 🔍 **Explore**: A unique 3D Globe UI displaying items to be donated for people to determine location easily and request.

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/56017960/147406973-82d023c6-e758-4495-94cb-a6ba41de0fa9.gif)

* 💙 **Donation Centers**: If someone doesn't wish to donate individually, they can contact other donation organizations. A single page displaying contact details of a few popular donation centres.
![image](https://user-images.githubusercontent.com/56017960/147406905-430e23b0-0ca3-433f-a71d-6766776e50bb.png)

### Architecture:

The website is enabled to perform complete transaction cycle for a user such as **Register, Email Verification, Add/Delete Items and Logout**. There are also routes protected by both backend and frontend, to minimize unauthorized access (Access with invalid email, no login, wrong password). I have used JWT Tokens for Authentication.

![Screenshot from 2021-12-26 11-58-41](https://user-images.githubusercontent.com/56017960/147407073-4f18c330-6a24-4edd-bdff-f7a626f4968e.png)

***

## How we built it

<p align="left"> <a href="https://expressjs.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg" alt="express" height="40"/> </a> <a href="https://git-scm.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://heroku.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank"> <img src="https://img.icons8.com/color/48/000000/html-5.png"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://img.icons8.com/color/48/000000/javascript.png"/> </a> <a href="https://www.mongodb.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" alt="mongodb" width="50" height="50"/> </a> <a href="https://nodejs.org" target="_blank"> <img src="https://img.icons8.com/color/48/000000/nodejs.png"/> </a> <a href="https://postman.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" alt="React" width="60" height="40"/> </a></p>
<br>

* __Frontend:__ Reactjs, Javascript, HTML, CSS
* __Backend:__ Nodejs, Expressjs
* __Databse:__ MongoDB
* __Deployment:__ Heroku
* __Tools:__ Git

***

## Challenges I ran into 🙁

❗️Enabling image upload: Initially, I was uploading the image in the website directory only. Therefore, the project got too large in size. Also, it was not a scalable solution. Then after hours of scanning the Internet, I found the correct way to use *Cloudinary*. And then instead of saving the blob, I saved the link in the schema.

❗️Deployment configurations for Heroku: The Website crashed multiple times on deployment. Then I realized the problem was that I was not configuring the environment variables correct. Also, I was hard coding the PORT value which resulted in errors.

***

## Accomplishments that I'm proud of 😇

* It has to be time management. I joined the Hackathon a bit late and was a solo participant. I finished the complete backend and the frontend in the time frame. Submitting the project itself is an achievement for me.
* Implementing the Globe UI. Since I am most comfortable in Backend Development, I always had in mind to come out of my comfort zone. This time I tried to implement a decent UI along with a twist to the conventional 2D UI. So, I'm pretty happy that my project's design has come out to be better than I had expected.

***

## What I learned 🤔

* **Globe.js**: This is an amazing Library. Getting hold of a new library in 48 hours was a tough task. Especially when it is a major portion of the project. Still, I managed to learn some of the implementations.
*  **Cloudinary**: I had never used the API to store and retrieve images before. So this was also new learning for me.
*  **JWT Tokens**: All my previous projects were session authentication based. So, this time I switched to a more secure method of Authentication, JWT.

***

## What's next for Sharity- The Best Christmas Smile you can Gift :)

A lot of things can be done with this project.
* Idea wise, we can get in touch with the donation centres and have a tie-up with them. And send a small token for every person who contributes.
* We can also integrate Google Maps API so that during a road trip, people can stop in a way to donate the clothes.
* Technically, the UI needs to be more responsive.

***
