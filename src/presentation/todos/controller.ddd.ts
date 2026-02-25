import { Request, Response } from "express";
import { prisma } from "../../data/postgres/db";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos/todos";
import { TodoRepository } from "../../domain";

export class TodosController {
    constructor(
        private readonly todoRepository: TodoRepository,
    ) {}

    //* CRUD

    // CREATE
    public createTodo = async (req: Request, res: Response) => {
        const [ error, createTodoDTO ] = CreateTodoDTO.create(req.body || {});

        if (error) return res.status(400).json({ error });

        const todo = await this.todoRepository.create(createTodoDTO!);
        return res.json(todo);
    };

    // READ
    public getTodos = async (req: Request, res: Response) => {
        const todos = await this.todoRepository.getAll();
        return res.json(todos);
    };

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        try {
            const todo = await this.todoRepository.findById(id);
            return res.json(todo);
        } catch (error) {
            return res.status(400).json({error});
        }
    };

    // UPDATE
    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [ error, updateTodoDto ] = UpdateTodoDTO.create({...req.body, id});

        if (error) return res.status(400).json({ error });

        const todo = await this.todoRepository.updateById(updateTodoDto!);
        return res.json(todo);
    };

    // DELETE
    public deteleTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({ error: `ID is not a number.` });
        }

        const todo = await this.todoRepository.deleteById(id);
        return res.json(todo);
    };
}
