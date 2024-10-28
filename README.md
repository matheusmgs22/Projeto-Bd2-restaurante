# Projeto Banco de Dados Restaurante

## Projeto-Bd2-restaurante
Sistema de banco de dados desenvolvido na disciplina de banco de dados 2.


## Pré-requisitos
 Usaremos Javascript como linguagem de apoio e PostgreeSQL como banco de dados.

1. Instale o PostgreSQL e crie um usuário que será utilizado nas conexões.

2. Instale as dependências do projeto usando o comando:
    ```bash
    npm install
    ```

## 1. Criar o Banco de Dados

Primeiro, verifique se o banco de dados `restaurante` já existe. **Se ele já foi criado**, use o [connect.js](/Projeto-Bd2-restaurante/db/connect.js) para se conectar ao banco.

Caso contrário, use o [createDatabase](/Projeto-Bd2-restaurante/db/createDatabase.js) para criar o banco de dados. Ele será criado automaticamente no Postgre.

1. Abra o terminal.
2. Navegue até o diretório `db`.
3. Execute o comando abaixo para criar o banco:

```bash
node createDatabase.js
```

Este comando é o primeiro passo da configuração, para garantir que o banco restaurante esteja pronto antes da criação das tabelas.

## 2. Criar as Tabelas Iniciais

Após garantir que o banco `restaurante` exista, você pode criar as tabelas necessárias para o funcionamento do projeto.

1. Ainda no diretório db, execute o arquivo [createTable.js](/Projeto-Bd2-restaurante/db/createTables.js):

 ```bash
node createTable.js
 ```

Com isso, as tabelas inicias são criadas no Postgre.

**Tabelas Criadas:**
- cliente
- prato
- fornecedor
- ingredientes
- usos
- venda


## 2. Inserir Valores Iniciais

Com as tabelas prontas, o próximo passo é inserir nossos valores iniciais para facilitar o uso do banco.

Execute o arquivo `insertData.js`:
```bash
node insertData.js
```
Foram feitos 10 inserts nas tabelas: Cliente, prato, fornecedore, ingrediente e venda.

