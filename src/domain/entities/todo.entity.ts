export class TodoEntity {
    constructor(
        public id: number,
        public text: string,
        public completedAt?: Date | null
    ) {}

    get isCompleted() {
        return !!this.completedAt;
    }

    public static fromObj( object: {[key: string]: any} ): TodoEntity {
        const { id, text, completedAt } = object;

        if (!id || !text) throw new Error("Incompleted parameters");

        let newCompletedAt;
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (isNaN(newCompletedAt.getTime())) {
                throw "completedAt is not a valid date";
            }
        }

        return new TodoEntity(id, text, completedAt);
    }
}