
# 🎵 Projeto React com Styled Components

Este é um projeto desenvolvido com **React**, **Styled Components**, e **React Router**, que implementa rotas, temas dinâmicos (claro/escuro), autenticação e um sistema de gerenciamento musical.

---

## 📚 Índice

- [📚 Índice](#-índice)
- [🧩 Visão Geral](#-visão-geral)
- [📁 Estrutura de Pastas](#-estrutura-de-pastas)
- [🎨 Estilização com Styled Components](#-estilização-com-styled-components)
- [🌗 Sistema de Temas](#-sistema-de-temas)
- [🔐 Gerenciamento de Contexto](#-gerenciamento-de-contexto)
- [🔁 Navegação com React Router](#-navegação-com-react-router)
- [🚀 Como Executar](#-como-executar)
- [🛠 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [📄 Licença](#-licença)

---

## 🧩 Visão Geral

A aplicação foi desenvolvida com o objetivo de ser modular, responsiva e com temas adaptáveis. Possui:

- Interface com componentes reutilizáveis estilizados.
- Alternância entre tema claro e escuro.
- Autenticação via contexto.
- Gerenciamento de estado para música.
- Upload de arquivos com feedback visual.
- Sistema de rotas completo.

---

## 📁 Estrutura de Pastas

```
📁 src
├── App.jsx                # Componente raiz da aplicação
├── contexts/              # Contextos globais (tema, auth, música)
├── routes/                # Definições de rotas
├── styles/
│   ├── styles.js          # Componentes estilizados
│   ├── globalStyles.js    # Estilos globais
│   └── theme.js           # Definição de temas
├── index.css              # Estilos base (CSS puro)
```

---

## 🎨 Estilização com Styled Components

Os componentes utilizam `styled-components` para estilização dinâmica com suporte a temas. Também há animações com `keyframes` para modais e formulários.

Exemplo:
```jsx
const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
`;
```

---

## 🌗 Sistema de Temas

- Utiliza `ThemeContext` para alternar entre `lightTheme` e `darkTheme`.
- Estilizações adaptativas para cores, sombras, planos de fundo, etc.
- Suporte a animações de transição entre temas.

---

## 🔐 Gerenciamento de Contexto

O projeto usa a Context API para:

- **Tema:** alternância light/dark.
- **Autenticação:** controle de login e dados do usuário.
- **Música:** gerencia estado de reprodução.

---

## 🔁 Navegação com React Router

Utiliza `BrowserRouter` para navegação entre páginas com rotas declarativas via `AppRoutes`.

---

## 🚀 Como Executar

```bash
# Clone o projeto
git clone https://github.com/otaviotiltado45/Playlist-Lugao.git

# Acesse a pasta do projeto
cd project.v3

# Instale as dependências
npm install

# Inicie a aplicação
npm run dev
```

---

## 🛠 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [React Router DOM](https://reactrouter.com/)
- [Styled Components](https://styled-components.com/)
- [Context API (React)](https://reactjs.org/docs/context.html)
- [JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- TypeScript

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 🙌 Agradecimentos

A todos que contribuem com styled-components, React e com a comunidade de código aberto ❤️
