# PilotoApp

O **Sistema Piloto** é um sistema que tem como objetivo unir funcionalidades de organização de estudos com um espaço colaborativo para compartilhamento de materiais. Será utilizado por alunos que buscam melhorar seus estudos e organizações e por professores que buscam otimizar seu tempo na busca de materiais escolares.

## Colaboradores

- **Alessandro Rodrigues de Souza Júnior** - [GitHub](https://github.com/alessandrojunior1)
- **Bruno Vinicius de Araújo Eneas** - [GitHub](https://github.com/ebrunovs)
- **Caio Batista da Silva Soares** - [GitHub](https://github.com/caiosoares1)

## Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento local, execute:

```bash
ng serve
```

Após o servidor estar em execução, abra seu navegador e navegue até `http://localhost:4200/`. A aplicação será recarregada automaticamente sempre que você modificar qualquer um dos arquivos fonte.

## Criação de Componentes

O Angular CLI inclui ferramentas poderosas de scaffolding de código. Para gerar um novo componente, execute:

```bash
ng generate component nome-do-componente
```

Para uma lista completa de schematics disponíveis (como `components`, `directives` ou `pipes`), execute:

```bash
ng generate --help
```

## Build

Para compilar o projeto, execute:

```bash
ng build
```

Isso irá compilar seu projeto e armazenar os artefatos de build no diretório `dist/`. Utilize a opção `--prod` para um build de produção.

## Back-End

Este projeto possui um back-end complementar que pode ser encontrado no seguinte repositório: [Piloto Backend](https://github.com/ebrunovs/piloto-backend).

## Executando Testes Unitários

Para executar os testes unitários via [Karma](https://karma-runner.github.io), utilize:

```bash
ng test
```
