# Workout API | Hipertrofia & Progressão de Cargas

Uma API RESTful desenvolvida em Node.js para gerir rotinas de treino, focada no acompanhamento da progressão de cargas (Progressive Overload) em exercícios de hipertrofia. Esta versão inicial implementa uma arquitetura *In-Memory* para demonstrar o domínio sobre operações CRUD e tipagem estática rigorosa.

##  Visão Geral do Projeto
O objetivo desta API é fornecer os alicerces de Back-end para um futuro painel (Dashboard) de acompanhamento de treinos. O sistema permite registar exercícios segmentados por grupo muscular (ex: Pernas, Bíceps, Tríceps), definir cargas, atualizar progressões e consultar o histórico completo.

##  Tecnologias Utilizadas
* **Node.js + Express:** Estrutura base do servidor e roteamento web.
* **TypeScript:** Tipagem estática (Strict Mode) para blindar contratos de dados e requisições HTTP.
* **TSX:** Motor de execução super-rápido baseado em `esbuild` para ambiente de desenvolvimento.
* **Padrão REST:** Arquitetura de comunicação padronizada.

## 🔗 Endpoints da API

| Método | Rota | Descrição | Payload (Body) |
|---|---|---|---|
| `GET` | `/api/workouts` | Lista todo o histórico de treinos. | *N/A* |
| `POST` | `/api/workouts` | Regista uma nova série/carga. | `{ muscleGroup, exercise, weight, reps }` |
| `PUT` | `/api/workouts/:id`| Atualiza os dados de um treino existente. | `{ muscleGroup?, exercise?, weight?, reps? }` |
| `DELETE`| `/api/workouts/:id`| Remove um treino do histórico. | *N/A* |

## Destaques de Engenharia
* **Interface `Workout`:** Contrato de dados estrito que impede a injeção de *payloads* malformados (ex: rejeita pedidos que não enviem o peso em formato numérico).
* **Tratamento de Erros:** Respostas HTTP semânticas (`201 Created`, `404 Not Found`) para falhas de validação ou quando um ID não existe no sistema.
* **Persistência In-Memory:** Gestão de estado volátil através de arrays tipados, ideal para testes rápidos de integração de Front-end.

## Como Executar Localmente
1. Clone o repositório.
2. Instale as dependências: `npm install`
3. Inicie o servidor de desenvolvimento: `npm run dev`
4. A API ficará disponível em `http://localhost:3333`