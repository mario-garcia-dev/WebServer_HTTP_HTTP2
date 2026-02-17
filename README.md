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
    const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`,
    );
    res.sendFile(indexPath);
    return;
});
```

6. Then use the listen method:

```ts
this.app.listen(this.port, () => {
    console.log(`Server running on port ${this.port}`);
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
    }
}
```

3. On a top level routes file, use the routes defined on the todos routes file:

```ts
export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/todos", TodoRoutes.routes);

        return router;
    }
}
```

4.

5. On the Server class in server.ts file, we need to receive as a property all the routes from the app.ts and use it as middleware:

```ts
this.app.use(this.routes);
```

And define middlewares to parse the body from the requests and use it to do the CRUD:

```ts
this.app.use(express.json()); // for raw
this.app.use(express.urlencoded({ extended: true })); // for x-www-form-urlencoded
```

## PostgreSQL

1. Create the postgres variables in the .env file, then create the docker-compose.yml and create the postgres sevice using those variables.

2. Run the postgres container:
```bash
docker compose up -d
```

3. Install prisma and dependencies:
```bash
npm install prisma @types/pg --save-dev 
npm install @prisma/client @prisma/adapter-pg pg
```

4. Set up the Prisma ORM project by creating the schema.prisma file:
```bash
npx prisma init --datasource-provider postgresql --output ../generated/prisma
```

5. Define the model in the schema.prisma file, edit the prisma.config.ts with the correct url on the datasource config.

6. Create and apply the migration to the database:
```bash
npx prisma migrate dev --name init
```

7. Generate the Prisma Client and instantaite the client:
```bash
npx prisma generate
```
I use the path: src/data/postgres/prisma.ts

```ts
import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma }
```

8. In the controller use prisma in the CRUD.

9. Then create the DTOs:
```ts
export class NameDTO {
    private constructor(
        public readonly prop: string,
    ){}

    static create(props: {[key: string]: any}): [string?, NameDTO?] {
        // stuff...

        return [undefined, new NameDTO(prop)];
    }
}
```