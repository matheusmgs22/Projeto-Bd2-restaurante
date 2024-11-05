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

Primeiro, verifique se o banco de dados `restaurante` já existe. **Se ele já foi criado**, use o [db.js](config/db.js) para se conectar ao banco.

Caso contrário, use o [createDatabase](querys/createDatabase.js) para criar o banco de dados. Ele será criado automaticamente no Postgre.

1. Abra o terminal.
2. Navegue até o diretório `db`.
3. Execute o comando abaixo para criar o banco:

```bash
node createDatabase.js
```

Este comando é o primeiro passo da configuração, para garantir que o banco restaurante esteja pronto antes da criação das tabelas.

## 2. Criar as Tabelas Iniciais

Após garantir que o banco `restaurante` exista, você pode criar as tabelas necessárias para o funcionamento do projeto.

1. Ainda no diretório db, execute o arquivo [createTable.js](querys/createTables.js):

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
Foram feitos 10 inserts nas tabelas: Cliente, prato, fornecedor, ingrediente e venda.

---

## 3. Criar os Triggers

## 4. Criar os Users

## 5. Criar as Views

## 6. Excluir o Banco de Dados
Para garantir que o banco de dados `restaurante` seja excluído do Postgre, siga os passos abaixo:

1. **Executar o Script**

   Abra o terminal, navegue até o diretório `querys`, e execute o comando para rodar o script `dropDatabase.js`:

    ```bash
    node dropDatabase.js
    ```

2. **Confirmação da Exclusão**

   Se o script for executado corretamente, o banco `restaurante` será completamente removido. Verifique no PostgreSQL se o banco não aparece mais na lista de bancos de dados.

Esse processo é útil caso precise resetar o ambiente para testar o fluxo de criação do banco novamente.


# Procedimentos e Funções

## 1. Procedimento - Reajustar Preços

O procedimento `reajustarPrecos.js` aplica um reajuste de preço, em percentual, aos pratos do restaurante que aumenta o valor de todos os pratos.

1. Navegue até o diretório `service` do projeto no seu terminal.

2. Execute o script com o comando:

    ```bash
    node reajustarPrecos.js
    ```

O script ajustará os preços na tabela prato conforme a porcentagem de reajuste especificada no código [reajustarPrecos.js](service\reajustarPrecos.js). No caso, estamos reajustando em 10% o valor dos pratos.


## 2. Procedimento - Sorteio

Esse procedimento `sortearPremiacao.js` sorteia clientes  aleatoriamente para que este cliente receba uma
premiação de 100 pontos.

1. Navegue até o diretório `service` do projeto no seu terminal.

2. Execute o script com o comando:

    ```bash
   node sortearPremiacao.js
    ```

O script selecionará clientes aleatórios da tabela cliente, aplicando um benefício de 100 pontos a esse cliente. [sortearPremiacao.js](service/sortearPremiacao.js)
