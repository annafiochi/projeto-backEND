# API do Sistema de Livros - Documentação

## Base URL
`http://localhost:5000`

## Endpoints Disponíveis

### 📚 **LIVROS**

#### Buscar todos os livros
- **GET** `/livros`
- **GET** `/books` (compatibilidade)
- Retorna todos os livros com informações da estante

#### Buscar livro por ID
- **GET** `/livros/:id`
- Retorna um livro específico

#### Buscar livros por status
- **GET** `/livros/status/:status`
- Status disponíveis: `lidos`, `nao-lidos`, `lendo`, `quero-ler`, `abandonei`, `relendo`
- Exemplo: `/livros/status/lidos`

#### Criar novo livro
- **POST** `/livros`
- Body:
```json
{
  "title": "Nome do Livro",
  "synposee": "Sinopse do livro",
  "releaseYear": 2023,
  "genres": "Romance, Ficção",
  "imageUrl": "https://exemplo.com/imagem.jpg",
  "author": "Nome do Autor",
  "status": "quero-ler",
  "shelfId": 3
}
```

#### Atualizar livro completo
- **PUT** `/livros/:id`
- Body: (mesmo formato do POST)

#### Atualizar apenas status/estante do livro
- **PATCH** `/livros/:id/status`
- Body:
```json
{
  "status": "lidos",
  "shelfId": 1
}
```

#### Deletar livro
- **DELETE** `/livros/:id`

---

### 📁 **ESTANTES**

#### Buscar todas as estantes
- **GET** `/estantes`
- **GET** `/shelves` (compatibilidade)
- Retorna todas as estantes com seus livros

#### Buscar estante por ID
- **GET** `/estantes/:id`

#### Criar nova estante
- **POST** `/estantes`

#### Atualizar estante
- **PUT** `/estantes/:id`

#### Deletar estante
- **DELETE** `/estantes/:id`

---

### 👤 **USUÁRIOS**

#### Buscar todos os usuários
- **GET** `/usuarios`

#### Buscar usuário por ID
- **GET** `/usuarios/:id`
- Retorna usuário com seus livros e estantes

#### Criar novo usuário
- **POST** `/usuarios`
- Body:
```json
{
  "name": "Nome do Usuário",
  "email": "email@exemplo.com",
  "password": "senha123"
}
```

#### Atualizar usuário
- **PUT** `/usuarios/:id`

#### Deletar usuário
- **DELETE** `/usuarios/:id`

#### Buscar livros de um usuário por status
- **GET** `/usuarios/:id/livros/:status`
- Exemplo: `/usuarios/1/livros/lidos`

#### Buscar estantes de um usuário
- **GET** `/usuarios/:id/estantes`

---

## 🎯 **Funcionalidades para o Frontend**

### Para a página de perfil com estantes:
1. **Todos os livros**: `GET /livros`
2. **Lidos**: `GET /livros/status/lidos`
3. **Não lidos**: `GET /livros/status/nao-lidos`
4. **Lendo**: `GET /livros/status/lendo`
5. **Quero ler**: `GET /livros/status/quero-ler`
6. **Abandonei**: `GET /livros/status/abandonei`
7. **Relendo**: `GET /livros/status/relendo`

### Para o botão de adicionar à estante:
- Use `PATCH /livros/:id/status` para alterar o status do livro
- Envie o novo status e o ID da estante correspondente

### Mapeamento Status → Estante ID:
- `lidos` → shelfId: 1
- `lendo` → shelfId: 2  
- `quero-ler` → shelfId: 3
- `abandonei` → shelfId: 4
- `relendo` → shelfId: 5
- `nao-lidos` → shelfId: 6

## 📋 **Status de Livros Disponíveis**
- `lidos` - Livros já terminados
- `nao-lidos` - Livros que ainda não foram iniciados
- `lendo` - Livros sendo lidos atualmente
- `quero-ler` - Livros na lista de desejo
- `abandonei` - Livros que foram abandonados
- `relendo` - Livros sendo lidos novamente

## 🔧 **Como testar**
1. Servidor rodando em: `http://localhost:5000`
2. Use ferramentas como Postman, Insomnia ou fetch do navegador
3. Para testar no navegador: acesse `http://localhost:5000/livros` para ver todos os livros
