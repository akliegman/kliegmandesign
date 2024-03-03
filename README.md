<p align="right">
  <img src="https://img.shields.io/npm/l/express" />
</p>

# adamkliegman.com

This is repository that contains both the backend and frontend for adamkliegman.com.

## Getting Started

### Prerequisites

- Node.js (version 19 or later - this project uses Node v19.7.0)
- NPM (version 9 or later - this project uses NPM v9.5.0)

_Older versions may work, but have not been tested._

### Installation

1. Clone the repository to your local machine.

In terminal:

```
git clone https://github.com/akliegman/kliegmandesign
```

2. Install server dependencies.

In terminal:

```
# from root directory
npm install
```

3. Install client dependencies.

In terminal:

```
# from root directory
cd client
npm install
```

4. Create .env file.

Create a `.env` or `.env.local` file in the root directory, with the following content:

```
PORT=3001
ENV=local
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

5. Create db

Create a PostgreSQL database and provide the connection string in the `.env` file.
Ensure you have PoostgreSQL@14 installed and running on your machine.

```
# install PostgreSQL@14
brew install postgresql@14
# start PostgreSQL@14
brew services start postgresql@14
# create a database
createdb kliegmandesign
```

In the `.env` file:

```
POSTGRES_HOST=localhost
POSTGRES_DB=kliegmandesign
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
```

The rest of the envars required to run the app should be provided by @akliegman.

### Running the app

1. Start the server.

In terminal:

```
# from root directory
npm start
```

_or (if you want live updates)_

```
# from root directory
npm run dev
```

The server should be running on **localhost:3001**

2. Start the client.

From a new terminal:

```
# from root directory
npm run client
```

_or (if you want to run from client directory)_

```
# from root directory
cd client
npm start
```

The client should be running on **localhost:3000**

### Additional terminal commands

1. Lint the client using ESLint.

```
# from root directory
cd client
npm run lint

# or, if you want auto fixing:
npm run lint:fix
```

2. Test the client using React-Testing-Library.

Note: this command runs any time you open a new PR.

```
# from root directory
cd client
npm run test
```

3. Build the client.

```
# from root directory
cd client
npm run build
```

## Deployment

From terminal:

```
# from root directory
heroku login # should prompt browser login
git push heroku main
```

## TODOs

- Server-side tests.
- Full coverage for client side tests.

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Express](https://expressjs.com/) - A fast, unopinionated, minimalist web framework for Node.js.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- [Node.js](https://nodejs.org/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
- [PostgreSQL](https://www.postgresql.org/) - A powerful, open source object-relational database system.
- [LESS](http://lesscss.org/) - A dynamic stylesheet language that can be compiled into CSS.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - A testing utility for React that encourages good testing practices.

### Public With

- [Heroku](https://www.heroku.com/) - A cloud platform that lets you build, deliver, monitor, and scale apps.
- [Cloudflare](https://www.cloudflare.com/) - A global cloud platform that provides a range of network services to businesses of all sizes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.

## Authors

- [Adam Kliegman](https://github.com/akliegman) - All of the work.
