# Backend

## Passos Para Construir o Ambiente

1. Clone o Repositório:
    ```bash
    git clone https://github.com/Cooperlago/backend.git
    cd backend
    ```

2. Execute os Containers:
    ```bash 
        docker compose up
    ```

3. Acesse a Aplicação:
    Abra o navegador ou seu API client (postman, insomnia...) e visite a rota http://localhost:3000 para acessar a aplicação em execução.

4. Parar e Remover os Containers:
    ```bash 
        docker compose down
    ```

## Testes
1. Acesse o arquivo docker-compose.yml
2. Em command trocar por: 
    ```bash 
        sh -c "npm run migrate && npm run test"
    ```