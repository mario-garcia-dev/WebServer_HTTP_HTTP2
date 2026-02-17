import express, { Router } from "express";
import path from "path";

interface Options {
    port: number;
    public_path?: string;
    routes: Router;
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { routes, port, public_path = "public" } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start() {
        //* MIDDLEWARES
        this.app.use(express.json()); // for raw
        this.app.use(express.urlencoded({ extended: true })); // for x-www-form-urlencoded

        // Public folder
        this.app.use(express.static(this.publicPath));

        // Routes
        this.app.use(this.routes);

        // serve SPA with router
        this.app.get("/{*splat}", (req, res) => {
            const indexPath = path.join(
                __dirname + `../../../${this.publicPath}/index.html`,
            );
            res.sendFile(indexPath);
            return;
        });

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
