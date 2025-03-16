export class Todo {


        public id?: string;
        public userId?: string;
        public titulo?: string;
        public descricao?: string;
        public data_da_postagem?: string;


      constructor(id?: string, todo: Todo = {}) {
        this.id = id;
        this.userId = todo.userId;
        this.titulo = todo.titulo;
        this.descricao = todo.descricao;
        this.data_da_postagem = todo.data_da_postagem;
    }
}