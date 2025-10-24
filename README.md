# mysql_database_viewer
a simple mysql database viewer

clone this repo if you want to see the mysql database viewer
Then,

## Step-1: Navigate to the `mysql_database_viewer` directory
  - Open terminal from that directory

---

## Step-2: start mysql server
``` bash
sudo systemctl start mariadb
```
---

## Step-3: install express, mysql2, ejs
- make sure that the node and npm is installed
``` bash
node -v
npm -v
npm init -y
npm install express mysql2 ejs
```

---

## Step-4: Replace with your USERNAME & PASSWORD
- open `server.js` file and replace the YOUR_USERNAME with your real username
- replace the YOUR_PASSWORD with your real password

## Step-5: run the server
```bash
node server.js
```
something like `✅ Server running on http://localhost:3000` this shows up,
go to that link in browser OR `CTRL + click`
