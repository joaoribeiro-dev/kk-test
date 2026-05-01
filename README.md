# KuantoKusta Test

Este repositório contém um pequeno exercício React para uma entrevista. O objetivo foi construir uma loja simples com produtos, carrinho, persistência e navegação.

## Getting Started

1. **Clona o repositório:**
   ```bash
   git clone https://github.com/joaoribeiro-dev/kk-test.git
   ```
2. Avança para a pasta do projeto:
   ```bash
   cd kk-test
   ```
3. **Instala as dependências:**
   ```bash
   npm install
   ```
4. **Inicia a aplicação:**
   ```bash
   npm run dev
   ```
5. Abre no browser:
   ```text
   http://localhost:5173
   ```

## Decisões de arquitetura

- `src/main.jsx` é o entry point. A única responsabilidade deste ficheiro é inicializar o React e renderizar o `App`.
- `src/App.jsx` contém a estrutura principal da aplicação:
  - `BrowserRouter`
  - `Routes`
  - `Header`
  - `CartProvider`
- O estado do carrinho vive em `src/context/CartContext.jsx`.
  - Isto permite que qualquer componente aceda ao carrinho com o hook `useCart()`.
  - O `CartProvider` encapsula a aplicação para fornecer estado global.
- Os componentes estão divididos em `src/components/`.
  - Cada componente tem a sua própria pasta e estilos SCSS locais.
- Os estilos globais ficam em `src/index.css`.

## Onde vive o estado e porquê

- O estado global do carrinho está no contexto (`CartContext`).
  - Isto evita passar props em cascata entre componentes.
  - Permite atualizações centralizadas de `addToCart`, `removeFromCart`, `getCartTotal` e `getCartItemCount`.
- O estado de produtos, carregamento e erro vive em `ProductList`.
  - É um estado local porque diz respeito apenas à lista de produtos.
- A quantidade de cada produto dentro da página de produtos também está em `ProductList`, usando um objecto de quantidades por `productId`.

## Requisitos resolvidos e lógica aplicada

1. **Carrinho com persistência**
   - O `CartContext` usa `localStorage` para guardar `cartItems`.
   - O estado inicial carrega do `localStorage` e o `useEffect` atualiza sempre que o carrinho muda.

2. **Quantidade por produto**
   - Em `ProductList`, mantive um objecto `quantities` com chave `productId`.
   - Assim cada produto tem a sua própria quantidade sem partilhar estado entre cards.

3. **API externa e loading / erro**
   - A listagem de produtos faz `fetch` para a API externa.
   - Adicionei estados `loading` e `error`.
   - Em erro, mostro uma mensagem e redireciono para `/404` após 3 segundos.

4. **Navegação**
   - Uso de `react-router-dom` para `Home`, `Products`, `Cart`, `404` e rota catch-all.

5. **Notificações**
   - Integrei `react-hot-toast` no contexto para feedback de ações no carrinho.

6. **Layout e styling (com recurso a AI)**
   - Cards colocados lado a lado com grid.
   - Uso SCSS para `productCard` e estilos de página.

## O que deixei por fazer

- Não implementei um checkout real nem integração com pagamento.
- Não há autenticação nem associação de carrinho a um utilizador.
- A responsividade não está completa; funciona no desktop e tablet, mas falta adaptação mobile avançada.
- Não foram criados testes unitários ou testes de integração.
- Não há validação extra de quantidades no carrinho nem edição direta de itens dentro do carrinho.

## Trade-offs conscientes

- Optei por `localStorage` para persistência porque era rápido de implementar e mantém o carrinho entre sessões do browser.
  - `sessionStorage` teria perdido os dados ao fechar o browser ou aba.
  - Cookies só fariam sentido se guardasse apenas um `cartId`; nesse caso teria de haver backend para mapear esse ID a um carrinho.
- Com mais tempo, faria um fluxo onde o carrinho é associado a um `cartId` e apenas esse ID é guardado nas cookies.
  - Essa abordagem seria melhor para persistência em vários dispositivos ou após logout.
  - Também permitiria um backend mais completo.
- Devido a ter vindo de um background em Vue.js, não usei algumas das melhores práticas React mais idiomáticas.
  - Por exemplo, algumas estruturas poderiam estar mais separadas em hooks personalizados.
  - Também poderia ter usado menos lógica local e mais abstração de componentes.

## Nota pessoal

Venho de um background de Vue.js, por isso o meu fluxo natural não foi imediatamente o mais idiomático em React.
Ainda assim, optei por uma arquitetura simples de contexto para o carrinho e por persistência em `localStorage` para garantir que os dados não desaparecem facilmente.

Com mais tempo, faria uma refatoração para separar melhor:
- hooks de `fetch`
- lógica de carrinho em `useReducer`
- persistência em cookies com `cartId`
- componentes ainda mais pequenos e reutilizáveis
- testes automáticos

