## TaskZen 

A full stack task tracking app.


## Tech Stack:

- **Frontend**: JavaScript, HTML, SCSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **Auth**: Custom session-based auth
- **Testing**: Jest
- **Cloud Hosting**: Render (app), Neon (DB)


## Motivation

This is a learning project. The goal is to build a **professional** CRUD app using basic web technologies (no frameworks) and follow development best practices.

Design is inspired by Notion. :)

After around 2.5 years of working, I became accustomed to thinking about everything in terms of frameworks and internal tools, and found it difficult to apply my knowledge in a broader context. For this project, the goal is to revisit the fundamentals of web development. The app itself is very straightforward, but it focuses more on the architectural details of a web app and what goes on under the hood, like DOM manipulation, CSR/SSR, server routes, secure cookies, and database interactions. Modern frameworks like React or Next.js often let you work on abstractions that sit a few layers above these foundational concepts, and they are the norm for developers now.

Admittedly, it is quite tedious to build any software without tooling or frameworks, especially in areas as mature as the web. You will be writing a lot of boilerplate code for not much functionality at all. But imo, building with the lower-level stuff first will enable you to better utilise the power of the modern tools, as you'll have a deeper understanding of how they work, and why exactly they were invented in the first place.


## Live App:

https://task-zen-o9q1.onrender.com

### Demo:

To access the app you need to log in. Use the demo account provided below or you can create your own account through the app.

- **Email:** ```demo@taskzen.com```

- **Password:** ```abc```


## Local Installation

To run this project locally, follow the steps below:

1. Clone the repository

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

- Create a `.env` file in the root of the project and add the following variables
- Example:
```
NODE_ENV=dev

APP_PORT=3002
APP_HOST_ADDRESS=localhost

DB_HOST=localhost
DB_PORT=5432
DB_NAME=my_db
DB_USER=my_db_user
DB_PASSWORD=my_db_password
```

4. Set up DB
- The app runs on PostgreSQL, you will need to set up a local Postgres server and create the database using the backup file in the project path: ```/sql/default-schema/xxx.sql``` (recommend using DBeaver for this), this is a backup of the production database which includes TaskZen's DB schema as well as some default data like the user for the demo account mentioned above.
- Then, you need to configure TaskZen's connection to your local postgres server through the environment variables ```DB_HOST```, ```DB_PORT```, ```DB_NAME```, ```DB_USER```, ```DB_PASSWORD```, you should now be ready to run the app.

5. Run the app
   
- For development:
```bash
npm run dev
```

- Run Tests:
```bash
npm run test
```

- For production:
```bash
npm run build
npm run start
```

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE).


## Notes:

- The production app can sometimes be a bit slow, this is because I had to migrate the DB to Neon from Render (free cloud hosting expired), which introduces some network delays.














