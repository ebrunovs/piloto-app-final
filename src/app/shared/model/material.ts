export class Material {

    constructor(
                public id?: string,
                public userId?: string,
                public titulo?: string ,
                public disciplina?: string,
                public assunto?: string,
                public observacoes?: string,
                public data_da_postagem?: string,
                public link?: string,
                public privado?: string,
                public favorito?: boolean,
                public isOwner?: boolean,
                ) {
    }
}