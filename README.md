# ReverbRate

**Descubra, avalie e compartilhe música com autenticidade.**

## Problema que o projeto resolve

No cenário atual, milhões de músicas são lançadas diariamente nas plataformas digitais, tornando cada vez mais difícil para os ouvintes descobrirem novas faixas de forma orgânica, com base em **recomendações autênticas** de outros usuários.

Além disso:

- Fãs de música não têm um espaço dedicado para expressar suas opiniões sobre músicas específicas.
- Descobertas musicais são frequentemente moldadas por algoritmos opacos e tendências massificadas.
- Artistas independentes têm pouca visibilidade fora do circuito mainstream.

## O que é o ReverbRate?

O **ReverbRate** é uma plataforma social para avaliação e recomendação musical feita por **pessoas reais**. Um espaço onde fãs de música se conectam, compartilham descobertas, trocam opiniões e ajudam a promover músicas que realmente merecem ser ouvidas.

### O ReverbRate resolve:

✅ Centraliza **avaliações musicais autênticas**, feitas por ouvintes e não por algoritmos.  
✅ Cria uma **comunidade interativa**, com comentários, recomendações e engajamento entre usuários.  
✅ Facilita **descobertas personalizadas**, com base em gostos, estilos e perfis musicais compatíveis.  
✅ Dá voz a **artistas independentes**, ampliando sua visibilidade através do feed coletivo.

## Público-alvo

O ReverbRate é feito para pessoas apaixonadas por música que querem ir além das recomendações padronizadas das plataformas de streaming.

Esse público costuma:

- Buscar **novidades musicais constantemente**.
- Valorizar **recomendações de amigos e comunidades**.
- Usar plataformas como **Spotify, YouTube, TikTok, Last.fm ou RateYourMusic**, mas sentir falta de um espaço voltado para **opiniões musicais reais**.
- Compartilhar descobertas por **status, stories ou grupos**.
- Incluir desde **ouvintes casuais** até **críticos amadores**, **colecionadores de playlists** e **artistas independentes**.

### Também é ideal para:

- **Criadores de conteúdo musical**, que desejam engajar com seus seguidores.
- **Exploradores sonoros**, interessados em fugir do mainstream e encontrar sons únicos.

## Status do Projeto

Em desenvolvimento. Novas funcionalidades estão sendo implementadas continuamente.

## Como instalar

O projeto utiliza do backend como um submodulo, portanto para clonar o projeto você precisa utilizar o comando

```bash
git clone --recurse-submodules https://github.com/DEVLevid/Reverberate.git
```

> ⚠️ Aviso: para o submódulo funcionar corretamente você precisa ter permissão de edição em
> `https://github.com/mrleonardobrito/reverbrate-backend`

Ou caso já tenha clonado o projeto utilize

```bash
git submodule update --init --recursive
```

Para sincronizar os modulos

### Como rodar o projeto

1. Crie um `.env` em `./backend` e outro em `./frontend` contendo o conteúdo dos seus respectivos `.env.example` dentro de ambas as pastas após isso rode

```bash
source ./backend/.env
source ./frontend/.env
```

2. Volte para a pasta raiz com

```bash
cd ..
```

3. Instale os pacotes do node

```
npm install
```

4. Rode o comando para rodar o projeto em desenvolvimento

```bash
npm run dev
```

Caso esteja tudo configurado o backend e o frontend irão rodar corretamente
