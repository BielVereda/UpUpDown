# Up, Up & Down! 🎮

Uma plataforma moderna para preservação e acesso a jogos clássicos, com uma estética retrô inspirada em arcades dos anos 80 e 90.

![UpUpDown Banner](https://img.shields.io/badge/Up%2C%20Up%20%26%20Down-Retro%20Gaming-9333ea?style=for-the-badge&logo=gamepad)

## 📸 Screenshots

<!-- Adicione screenshots do projeto aqui -->

## ✨ Funcionalidades

- 🎵 **Sistema de Áudio Dinâmico**: Playlist aleatória de trilhas sonoras clássicas de jogos
- 🎮 **Catálogo Extensivo**: Base de dados com jogos de múltiplas plataformas (GBA, NDS, PS1, etc.)
- 🔍 **Busca e Filtros**: Sistema avançado de busca por nome, gênero e console
- 🎯 **Favoritos**: Sistema de favoritos personalizado com persistência local
- 🎨 **Design Retrô**: Interface inspirada em arcades com efeitos neon e estilo CRT
- 📱 **Responsivo**: Design adaptável para desktop e dispositivos móveis
- ⚡ **Animações Suaves**: Transições fluidas usando Framer Motion
- 🔗 **Integração**: Dados de conquistas via RetroAchievements API

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/BielVereda/UpUpDown.git
cd UpUpDown
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra seu navegador em `http://localhost:5173`

## 📜 Scripts Disponíveis

```bash
# Inicia o servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Executa o linter
npm run lint
```

## 🏗️ Estrutura do Projeto

```
UpUpDown/
├── public/                 # Arquivos estáticos
│   ├── audio/              # Trilhas sonoras
│   ├── images/             # Imagens (logos, capas, ícones)
│   └── favicon.png
├── src/
│   ├── components/         # Componentes React
│   │   ├── atoms/          # Componentes atômicos (Button, Input, etc)
│   │   ├── molecules/      # Componentes moleculares (SearchBar, Card)
│   │   ├── organisms/      # Componentes de organismos (Navbar, Footer)
│   │   └── templates/      # Templates de layout
│   ├── data/               # Dados estáticos (jogos, emuladores)
│   ├── pages/              # Páginas da aplicação
│   ├── services/           # Serviços externos (API)
│   ├── store/              # Estado global (Zustand)
│   ├── App.jsx             # Componente principal
│   └── main.jsx            # Entry point
├── .devin/                 # Configurações do Devin
├── index.html              # HTML template
├── package.json            # Dependências e scripts
├── tailwind.config.js      # Configuração do Tailwind
├── vite.config.js          # Configuração do Vite
└── README.md
```

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19** - Biblioteca JavaScript para construção de interfaces
- **React Router DOM 7** - Roteamento da aplicação
- **Vite 8** - Build tool e servidor de desenvolvimento
- **Tailwind CSS 3** - Framework CSS utilitário
- **PostCSS + Autoprefixer** - Processamento de CSS

### Animações
- **Framer Motion 14** - Biblioteca de animações

### Estado
- **Zustand 5** - Gerenciamento de estado global

### Ícones
- **Lucide React** - Biblioteca de ícones

### Linting
- **ESLint 10** - Linter JavaScript/React

## 🎨 Design System

### Cores Neon
- **Cyan**: `#00ffff` - Cor primária
- **Magenta**: `#ff00ff` - Acentos secundários
- **Yellow**: `#ffff00` - Destaques especiais
- **Green**: `#00ff00` - Elementos de sucesso
- **Purple**: `#9333ea` - Efeitos e gradientes

### Tipografia
- **Press Start 2P** - Fonte pixel art para títulos
- **Orbitron** - Fonte futurista para textos secundários

## 📦 Componentes Principais

### Páginas
- **Intro** - Tela de introdução com efeitos 3D
- **Home** - Página inicial com destaque de jogos populares
- **Catalog** - Catálogo completo com filtros
- **Emulators** - Seção de emuladores
- **Play** - Página de jogos
- **About** - Sobre o projeto

### Componentes Organismos
- **Navbar** - Barra de navegação com busca
- **Footer** - Rodapé com informações legais
- **HeroBanner** - Banner principal
- **FeaturedSection** - Seções de jogos em destaque
- **GameModal** - Modal de detalhes do jogo
- **BackgroundMusic** - Sistema de controle de áudio

## 🔧 Configuração

### Variáveis de Ambiente
O projeto atualmente não requer variáveis de ambiente para funcionar. Todas as configurações são feitas via arquivos de configuração.

### Adicionando Novos Jogos
Edite o arquivo `src/data/gamesData.js` e adicione novos objetos seguindo o padrão existente:

```javascript
{
  id: 'unique-id',
  title: 'Nome do Jogo',
  system: 'Console',
  genre: 'Gênero',
  year: 1990,
  coverUrl: '/path/to/cover.jpg',
  popularity: 100,
  availability: 'free' | 'premium',
  driveUrl: 'https://drive.google.com/...',
  rating: 4.5
}
```

### Adicionando Novas Músicas
Coloque arquivos `.mp3` na pasta `public/audio/` e eles serão automaticamente detectados e incluídos na playlist.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📝 Aviso Legal

Este é um projeto sem fins lucrativos voltado à preservação histórica. Não vendemos nada. Os jogos pertencem aos seus respectivos detentores de direitos; incentive e respeite os criadores adquirindo edições oficiais quando disponíveis.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Gabriel Vereda (BielVereda)**

- GitHub: [@BielVereda](https://github.com/BielVereda)
- Projeto: [UpUpDown](https://github.com/BielVereda/UpUpDown)

## 🙏 Agradecimentos

- Comunidade de preservação de jogos
- RetroAchievements pelos dados de conquistas
- Todos os criadores dos jogos clássicos

---

Feito com 💜 para a comunidade de retro gaming

**INSERT COIN ▮**
