# SimpleGoogleCalculatrice
Simple calculatrice google exercice.   
This exercice is about a web app. This web app is a calculator online.   
You can interact with it by clicking on button but also with keyboard inputs.   
This calculator is able to handle negative numbers, floating numbers, division, substraction, addition and multiplication.   
Calcul are made by a backend api which is basicly calculating it without any pre-done algorithms. 

# Front end

Front-end is developed in Angular. Also i use material for aesthetic.   
In this front end you are able to interact with the calculator by clicking on differents buttons but also by pressing keyboards input when you focus the calculator input.   
Finally, you will be able to see your history and click on it to get back the calcul

# Back end

Back end is developed is NodeJs. For readability reasons i use typescript as main language.   
Nodejs Api is calculated a string representing a calcul like "2+3x6".
To calcul it we have done a recursive algorithm which mean that we have not calculated it by pre-done algorithm. 

# How to run it ? :computer:
## With Docker
To run it, just go in the folder ./SimpleGoogleCalculatrice and run the command
```bash
docker-compose up
```
Then just open your favorite browser and go on "localhost:4200"
## Without Docker
### Warning
To install it without docker make sure first to install node and angular
[https://nodejs.dev/learn/how-to-install-nodejs]

### Run Front-End
To run Front-End, first go in the folder ./SimpleGoogleCalculatriceFront.
Install the node dependencies by running 
```bash
npm i
```
then run it by running 
```bash
ng serve -o
```
### Run Back-End
To run Back-End, first go in the folder ./SimpleGoogleCalculatriceBack.
Install the node dependencies by running 
```bash
npm i
```
then run it by running 
```bash
npm run dev
```


## How to run test ? 
### Front test
To run Front-End test , first go in the folder ./SimpleGoogleCalculatriceFront.
Install the node dependencies by running 
```bash
npm i
```
then run it by running 
```bash
ng test
```