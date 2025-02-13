export class Material {

    constructor(
                public id: number = 0,
                public titulo: string ='',
                public disciplina?: string,
                public assunto?: string,
                public observacoes?: string,
                public data_da_postagem?: string,
                public link?: string,
                ) {
    }
}