# GrindDaily

![This is a screenshot.](Screenshot.png)

## Project Overview
GrindDaily is a daily challenge platform where users can view and complete tasks via the React frontend, while the Spring Boot backend provides RESTful APIs for data interaction.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js
- **Database**: MongoDB
- **Test Tool (optional)**: Postman

## System Requirements
- **Operating System**: Windows 10, macOS, or Linux
- **Node.js**: v14 or higher

## How to Run the Project 
1. Clone the repository:
- On the command line:
```
git clone https://github.com/cis3296f24/GrindDaily.git
```

2. Install dependencies:
- On the command line (need to be at root folder):
```
npm run install-all
```
- Then run:
for Windows OS:
```
npm install -g nodemon
```
for mac OS:
```
sudo npm install -g nodemon
```
- Optional (if not installed):
```
npm install concurrently
```

3. Setup server side:
- Go to `server` folder and create a file named as `.env`
- In the `.env` file, include these information:
```
MONGODB_URI=mongodb+srv://<YOUR USER NAME>:<YOUR PASSWORD>@grinddaily.xqa8e.mongodb.net/GrindDaily?retryWrites=true&w=majority&appName=GrindDaily

JWT_SECRET='asfakdanbkvkfhaifoajfpowiaaskbvpa'
```
- In the field of `<YOUR USER NAME>` and `<YOUR PASSWORD>` replace them with the username and password I gave to you guys through Discord

4. Run the project:
- Finally Back to the GrindDaily folder by input following command on the command line (do not run the command if you are already at the root folder):
```
cd ..
```
- Run the project:
```
npm start
```

# How to contribute
Follow this project board to know the latest status of the project: 
[https://github.com/orgs/cis3296f24/projects/100]([https://github.com/orgs/cis3296f24/projects/100]) 

### How to build
- Use this github repository: ... 
- Specify what branch to use for a more stable release or for cutting edge development.  
- Use InteliJ 11
- Specify additional library to download if needed 
- What file and target to compile and run. 
- What is expected to happen when the app start.