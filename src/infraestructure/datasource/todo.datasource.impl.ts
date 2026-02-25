import { prisma } from "../../data/postgres/db";
import { CreateTodoDTO, TodoDatasource, TodoEntity, UpdateTodoDTO } from "../../domain";

export class TodoDatasourceImpl implements TodoDatasource {

    //* CRUD

    // CREATE
    async create(createTodoDto: CreateTodoDTO): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        return TodoEntity.fromObj(todo);
    }

    // READ
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(todo => TodoEntity.fromObj(todo));
    }

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where: { id },
        });

        if (!todo) throw `Todo with id ${id} not found`;

        return TodoEntity.fromObj(todo);
    }

    // UPDATE
    async updateById(updateTodoDto: UpdateTodoDTO): Promise<TodoEntity> {
        const id = updateTodoDto.id;

        await this.findById(id);

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: updateTodoDto!.values,
        });

        return TodoEntity.fromObj(updatedTodo);
    }

    // DELETE
    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id);

        const deleted = await prisma.todo.delete({
            where: { id }
        });

        return TodoEntity.fromObj(deleted);
    }
    
}