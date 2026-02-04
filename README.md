# EXPRESS

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