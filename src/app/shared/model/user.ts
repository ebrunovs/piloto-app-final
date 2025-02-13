import { Material } from "./material";

export class User {

    constructor(
                public id?: string,
                public nome?: string,
                public email?: string,
                public senha?: string,
                public materiais?: Material[],
                ) {
    }
}