# EXPRESS

## Web Server

1. Install express and types:

```bash
npm i express @types/express
```

2. Create an .env file and install dotenv and env-var to configure the enviroment variables:
```bash
npm i dotenv env-var
```

3. On server.ts create the Server class, the constructor of this class receive the port and the public path as properties from the .env file.

4. The Server class must have a function called start, this function have as middleware the serving of the public folder:
```ts
this.app.use(express.static(this.publicPath));
```

5. Then serve the SPA with router using this:
```ts
this.app.get("/{*splat}", (req, res) => {
    const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html`);
    res.sendFile(indexPath);
    return;
});
```

6. Then use the listen method:
```ts
this.app.listen(this.port, () => {
    console.log(`Server running on port ${ this.port }`);
});
```

6. On app.ts, create a main function, on this function create an instance of the Server class, pass the properties to the class, then create an immediately invoked function expression and start the server.

```ts
(async () => {
    main();
})();
```

## RESTful API - CRUD

1. Create a controller.ts file, on this file we have the TodosController class, that has every CRUD methods, every method receives as parameters the request and the response.

2. Define the routes of the todos module:
```ts
export class TodoRoutes {
    static get routes(): Router {

        const router = Router();
        const todoController = new TodosController();

        router.get("/", todoController.getTodos);
        // post, put, delete, etc...

        return router;
    };
};
```

3. On a top level routes file, use the routes defined on the todos routes file:

```ts
export class AppRoutes {
    static get routes(): Router {

        const router = Router();

        router.use("/api/todos", TodoRoutes.routes);

        return router;
    };
};
```

4. 


5. On the Server class in server.ts file, we need to receive as a property all the routes from the app.ts and use it as middleware:

```ts
this.app.use(this.routes);
```

And define middlewares to parse the body from the requests and use it to do the CRUD:

```ts
this.app.use(express.json()); // for raw
this.app.use(express.urlencoded({extended: true})); // for x-www-form-urlencoded
```