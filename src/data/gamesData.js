// Catálogo informativo. Os jogos aparecem como fichas (capa, sinopse, dados e emulador recomendado).
// Não há links de download de ROMs: o botão do modal leva ao RetroAchievements e à página /jogar.
// Capas: public/images/games/<PASTA>/<arquivo>.svg
// developer: null = não informado (aparece como "—").

import { freeGames } from './freeGames'

const ra = (t) => `https://retroachievements.org/searchresults.php?s=${encodeURIComponent(t)}`

// Mapeamento de links do Google Drive por arquivo
const DRIVE_LINKS = {
  // GBA
  'castelvaniaaos': 'https://drive.google.com/drive/folders/1xjyuCZg66gY-AaQrngIC82LzcoxsFJjj',
  'doom': 'https://drive.google.com/drive/folders/133smE9a38KukgcKQegxPWK8hrjp0lhc4',
  'dgb': 'https://drive.google.com/drive/folders/118KYlkioiwzuv0kDXNRKeaDDEtYB3cvM',
  'gta': 'https://drive.google.com/drive/folders/1Nkyd46WmPQ8DBd8sYQqHRWnA-cT1VSaC',
  'kirby': 'https://drive.google.com/drive/folders/1Z2XKLh0c3vJdinurB_5EAkR90Qqu9jxC',
  'zelda': 'https://drive.google.com/drive/folders/1lAqaLZPKukbgdOvOIGnjK1yq7yZm0ipJ',
  'metalslug': 'https://drive.google.com/drive/folders/1mZxEyOdJ9gHE1pTYOplJncKz4rR0YdX0',
  'metroidfusion': 'https://drive.google.com/drive/folders/1zQ6KTUJs0vHQtFgnl5iFBLbTQu22WD6z',
  'metroidzeromission': 'https://drive.google.com/drive/folders/1nPxtpA9_neuOdLhrt-xhQ5_AEJA8nYx0',
  'pkme': 'https://drive.google.com/drive/folders/1ksT8mFvxCc4L6xfn_2GzTCVxiiRFXWVH',
  'pkmfr': 'https://drive.google.com/drive/folders/1t-6tae7F-nMo20LqH85oDc24wKXsacZh',
  'pkmlf': 'https://drive.google.com/drive/folders/1EmrAtZIrauUmLw6aC9dl3V_s3hbH9ZuY',
  'pkmr': 'https://drive.google.com/drive/folders/14UduecdvKef8zHSZ0KrY0xB55lmdb_lV',
  'pkms': 'https://drive.google.com/drive/folders/1tNQ1MTa3jobdCDyMAxPlHr2IJfKP82Z9',
  'pkmuv': 'https://drive.google.com/drive/folders/1-HESFq-6jPdhF4EB_rId8TH_YW7xlSN6',
  'supermarioworld2': 'https://drive.google.com/drive/folders/1rPgzugOyje_HF2EDrVnCugp2TjQqWNeQ',
  'supermariobros3': 'https://drive.google.com/drive/folders/1wdswjE2yYbHaxHb7gotER-luTwZUskEu',
  'mariobros': 'https://drive.google.com/drive/folders/1AnQbjrePA1VzWPy0pEDin6ZIlHCfOYmo',
  'yugiohwct': 'https://drive.google.com/drive/folders/1ANKB1yltm_8r_IruxfSbKtbgwc-MPQ8G',
  // GBC
  'dkking': 'https://drive.google.com/drive/folders/1d9h5l1Rh1ooOH0tO48KRSHDF-Cuj8ktz',
  'dukenuken': 'https://drive.google.com/drive/folders/101ahRdGXXEYklsG1y9WIbdDNR7BPRcNE',
  'gta2': 'https://drive.google.com/drive/folders/1xKJ0XmgvEmP7zYUdoJ3R5PkC5SSBtpFr',
  'zeldaoa': 'https://drive.google.com/drive/folders/1iTU2JojW9Rd4M2v5bbf33zJV8FMTtPi5',
  'megaman': 'https://drive.google.com/drive/folders/1uIIZLnN1V96sy04_c1JxEnIUcRCPEI4p',
  'pkmb': 'https://drive.google.com/drive/folders/173WDHnsLfaHaE9HDZhN-tZZ-hONjoJyP',
  'pkmc': 'https://drive.google.com/drive/folders/1M9vgDH9qLe2uRl00r04nd_2aKESSeb3D',
  'pkmg': 'https://drive.google.com/drive/folders/1uP_ea3V3HIGLUqR0yhGyRqwYofsH9wxO',
  'pkms': 'https://drive.google.com/drive/folders/1gPgsHr8xOmXoZa61xMzrhzN8lqGmyDW4',
  'reg': 'https://drive.google.com/drive/folders/1TnTyTW9byipibm7sM9MU2r9Y5yxVR6-r',
  'spaceinvaders': 'https://drive.google.com/drive/folders/1cP5K8O-zMgFKoBL2dEwWfx4uxUMVdUIA',
  'spiderman2': 'https://drive.google.com/drive/folders/1CwXUrlmmQkFAmmYSdmb4KtFBeNQl8Z0M',
  'streetfighter': 'https://drive.google.com/drive/folders/1TzotEa_ThLMW44ka0yL2iP0yN8zAJO6G',
  'mariodeluxe': 'https://drive.google.com/drive/folders/1hwnLUJrjJKzClOaUHJ16Ka-NDprj9emq',
  'tombraider': 'https://drive.google.com/drive/folders/1xSg6PQixcH2VS_F6E8xF0pkwTl0LEg1F',
  'wario2': 'https://drive.google.com/drive/folders/1O_UbW4vZwwHeXe-fP4ZuQyY0rcfLwuwD',
  'wario3': 'https://drive.google.com/drive/folders/1BhddRBIFhGuESoWUvLOx6BCyj9Ekx-qd',
  // NDS
  'codbops': 'https://drive.google.com/drive/folders/12xSST3wOa28mIBTnKNHfkGM_8EufecKH',
  'castelvaniads': 'https://drive.google.com/drive/folders/18ASLo5RGy-EUSiWibXwn2YW1VVEnLQg-',
  'chronotrigger': 'https://drive.google.com/drive/folders/1UbIeKAQpI6syKAFk6hP1xHhmZmRAVu7P',
  'coraline': 'https://drive.google.com/drive/folders/1ajFBTElgUDXhLBEZx1XRJBmii1ZWN1pF',
  'gtacw': 'https://drive.google.com/drive/folders/1PSExhyfV4C7pM1iqRocswtkDLNouJV9b',
  'kirbysustar': 'https://drive.google.com/drive/folders/1GbKATWa6KhNzmY9PzVziZS1x8vxNKv8t',
  'kirbyma': 'https://drive.google.com/drive/folders/1dQkhl8rH6cH2q7jLkTWwEDt_mFBTjbHe',
  'zeldast': 'https://drive.google.com/drive/folders/1wk0mpNXuSi-U5nm1B2XBkkl8BjuJ6sbo',
  'legomarvel': 'https://drive.google.com/drive/folders/1Yc442WfRhqd8N6L1LvSgHDqyvRjzxnW2',
  'legoswcs': 'https://drive.google.com/drive/folders/10Y4rNqRFcCXYT6CyCnurMC5h4umPde28',
  'mariokds': 'https://drive.google.com/drive/folders/1r1lnptcTjiPlSW4vyxBF4wCpx9yPA2uv',
  'mariopartyds': 'https://drive.google.com/drive/folders/1Mrnwqp7mmrxt-_CXraw2mJw1CcNiS7MP',
  'metalslug7': 'https://drive.google.com/drive/folders/11x_iHbj_ZN73xTG9K5opMZ6mX0CAXnz_',
  'pkmwv2': 'https://drive.google.com/drive/folders/1f5-JfRYDHbR8g6huguElBvwdgiEw227S',
  'residentevilds': 'https://drive.google.com/drive/folders/1lphY8TdtE6LMMqo2TwMfwPU-a-SNSuUw',
  'simpsons': 'https://drive.google.com/drive/folders/1_hwVPMpwKFgD5AwLPrYoxVjVxuKvTOdz',
  'soniccollection': 'https://drive.google.com/drive/folders/1EM0LlImQhf3eJb_LsEkujI7y0FtOPCY9',
  'supermario64': 'https://drive.google.com/drive/folders/1GBD7oa4Mcn9KqazJkA4RLFySGloKCK7n',
  'animalcrossing': 'https://drive.google.com/drive/folders/16X2nxC9E_QeVgsJjxJwc4IlKGC10NJOs',
  // PS1
  'metalgear': 'https://drive.google.com/drive/folders/1S-JULg9_KV3fABm8V7yTpyKJ66VLDeLA',
  'mktrilogy': 'https://drive.google.com/drive/folders/1oAPmmGpkkywheOFr4rrAHHE7KUCmDVVs',
  're2': 'https://drive.google.com/drive/folders/1z-6IqAN8Y2K-0z4O6zvsR5h2Jzf8u1sd',
  're3': 'https://drive.google.com/drive/folders/12bQcF1kPIka1spAA86g0Pnv1mCu0HVUG',
  'sillenthill': 'https://drive.google.com/drive/folders/1RkBzCK0OSIHVwnFOO4x-oNnC_Fz8j_0k',
  'tombraider': 'https://drive.google.com/drive/folders/1HJKAh8q3bH21Hk0maWV7SdF9UWbZ4roo',
  // PSP
  'assassinscreedbl': 'https://drive.google.com/drive/folders/1HMy9t8fkAdroTdsGlRqqluvXcVN8A-vC',
  'ben10ultimatealien': 'https://drive.google.com/drive/folders/1M8CPP3r27flaKcem9eXnVQkVzm9K0g7D',
  'callofduttyrtv': 'https://drive.google.com/drive/folders/12-53P8ayRFCdZat02Z7rO-PUYjEb1tAB',
  'crashmom': 'https://drive.google.com/drive/folders/1xNp0RZtLlyJbdr9iN1cnPhvLrofE1syJ',
  'dantesinferno': 'https://drive.google.com/drive/folders/1xKJ0XmgvEmP7zYUdoJ3R5PkC5SSBtpFr',
  'defjam': 'https://drive.google.com/drive/folders/1ITaq3po1pKrzqe66QBkQc07hX57uduaC',
  'dbzsb2': 'https://drive.google.com/drive/folders/1mrVX4xE_UXG7NyXI1olO-MiZgpc5uQEC',
  'gowcoolympus': 'https://drive.google.com/drive/folders/1h07G9HE1PNkCykKyBKJeame_aVWgWzDx',
  'gowgos': 'https://drive.google.com/drive/folders/1GJY0Fmd5S_GwYgJYpoVSIoQAQ1EFiMnU',
  'legobatman': 'https://drive.google.com/drive/folders/1rQ0Adsu9s5q6t3ZdUW-SSZ14TtqOpSF2',
  'metalgear': 'https://drive.google.com/drive/folders/1MIyx8fRccdXzKFU6eglDuC-R8yfzFKyV',
  'mkunchained': 'https://drive.google.com/drive/folders/1sph7ol8Jq8-TVD81Ge6jnn0Pma01-GfL',
  'narutosuni': 'https://drive.google.com/drive/folders/1sRaDXIXQhbYtvsxSb480BdVTTO8vCHdH',
  'spidermanfof': 'https://drive.google.com/drive/folders/1TYK_TqONluazEfa8r4Mrn5996qgr_qnP',
  'toystory3': 'https://drive.google.com/drive/folders/191yGbAmkpwNFlxFl-Db5-N7tk_WHECR1',
  'wwes': 'https://drive.google.com/drive/folders/1vNu8dFfA9eOYTw9VMbw6BqrOub5nEvA8',
}

const CONSOLES = {
  gba: { system: 'Game Boy Advance', folder: 'GBA', emu: 'mgba' },
  gbc: { system: 'Game Boy Color', folder: 'GBC', emu: 'mgba' },
  nds: { system: 'Nintendo DS', folder: 'NDS', emu: 'melonds' },
  ps1: { system: 'PlayStation 1', folder: 'PS1', emu: 'duckstation' },
  psp: { system: 'PSP', folder: 'PSP', emu: 'ppsspp' },
}

// [arquivo da capa, título, gênero, ano, desenvolvedora, sinopse, popularidade]
const ROWS = {
  gba: [
    ['castelvaniaaos', 'Castlevania: Aria of Sorrow', 'Ação', 2003, 'Konami', 'Soma Cruz explora o castelo de Drácula num Metroidvania aclamado, com o sistema de absorver almas de inimigos.', 80],
    ['doom', 'Doom', 'Tiro', 2001, null, 'O clássico shooter em primeira pessoa adaptado para o portátil da Nintendo.', 60],
    ['dgb', 'Dragon Ball: Advanced Adventure', 'Ação', 2004, null, 'Goku revive a saga clássica em fases de ação lateral cheias de golpes e transformações.', 60],
    ['gta', 'Grand Theft Auto Advance', 'Ação', 2004, 'Digital Eclipse', 'A visão aérea de Liberty City e a liberdade típica da série, em versão portátil.', 65],
    ['kirby', 'Kirby: Nightmare in Dream Land', 'Plataforma', 2002, 'HAL Laboratory', 'Remake de Kirby’s Adventure, com visual renovado e cooperação para dois jogadores.', 65],
    ['zelda', 'The Legend of Zelda: The Minish Cap', 'Aventura', 2004, 'Flagship / Capcom', 'Link encolhe ao tamanho dos Minish, ao lado do chapéu falante Ezlo, para salvar Hyrule.', 85],
    ['metalslug', 'Metal Slug Advance', 'Ação', 2004, null, 'Tiroteio frenético e cheio de humor da série Metal Slug, agora no GBA.', 60],
    ['metroidfusion', 'Metroid Fusion', 'Ação', 2002, 'Nintendo R&D1', 'Samus enfrenta o parasita X numa estação espacial tensa e claustrofóbica.', 80],
    ['metroidzeromission', 'Metroid: Zero Mission', 'Ação', 2004, 'Nintendo R&D1', 'Releitura modernizada do primeiro Metroid, com a origem da missão em Zebes.', 80],
    ['pkme', 'Pokémon Emerald', 'RPG', 2004, 'Game Freak', 'A edição definitiva de Hoenn, com o Battle Frontier e as Equipes Magma e Aqua.', 92],
    ['pkmfr', 'Pokémon FireRed', 'RPG', 2004, 'Game Freak', 'Remake da primeira geração, com Kanto reconstruída para o GBA.', 90],
    ['pkmlf', 'Pokémon LeafGreen', 'RPG', 2004, 'Game Freak', 'Par de FireRed: a jornada por Kanto com Pokémon exclusivos da versão.', 88],
    ['pkmr', 'Pokémon Ruby', 'RPG', 2002, 'Game Freak', 'Estreia da terceira geração, em Hoenn, com habilidades e batalhas duplas.', 86],
    ['pkms', 'Pokémon Sapphire', 'RPG', 2002, 'Game Freak', 'Versão irmã de Ruby, com Pokémon e eventos exclusivos.', 85],
    ['pkmuv', 'Pokémon Ultra Violet', 'RPG', null, 'Hack não oficial', 'Hack feito por fãs, com nova região e novos desafios.', 50],
    ['supermarioworld2', 'Super Mario Advance 2: Super Mario World', 'Plataforma', 2001, 'Nintendo', 'O clássico do Super Nintendo com Mario, Luigi e Yoshi, agora portátil.', 82],
    ['supermariobros3', 'Super Mario Advance 4: Super Mario Bros. 3', 'Plataforma', 2003, 'Nintendo', 'Um dos melhores jogos de plataforma de todos os tempos, em versão remasterizada.', 85],
    ['mariobros', 'Super Mario Bros.', 'Plataforma', 2004, 'Nintendo', 'O jogo que definiu o gênero, relançado na linha Classic NES Series.', 70],
    ['yugiohwct', 'Yu-Gi-Oh! World Championship Tournament', 'Estratégia', null, 'Konami', 'Duelos de cartas do anime em torneios para montar e testar o seu deck.', 55],
  ],
  gbc: [
    ['dkking', 'Donkey Kong Country', 'Plataforma', 2000, 'Rareware', 'Donkey e Diddy Kong recuperam suas bananas em fases coloridas e cheias de segredos.', 70],
    ['dgb', 'Dragon Ball Z: Legendary Super Warriors', 'RPG', 2002, null, 'Combates por cartas com os guerreiros Z, em batalhas por turnos baseadas na saga.', 60],
    ['dukenuken', 'Duke Nukem', 'Tiro', 1999, 'Torus Games', 'O herói boca-suja enfrenta alienígenas numa adaptação para o portátil colorido.', 50],
    ['gta', 'Grand Theft Auto', 'Ação', 1999, 'Tarantula Studios', 'A estreia da série em visão de cima, adaptada para o Game Boy Color.', 55],
    ['gta2', 'Grand Theft Auto 2', 'Ação', 2000, 'Tarantula Studios', 'Continuação em visão aérea, com mais gangues e missões.', 55],
    ['zelda', 'The Legend of Zelda: Link’s Awakening DX', 'Aventura', 1998, 'Nintendo', 'Link naufraga na misteriosa Ilha Koholint, agora em cores e com uma masmorra extra.', 92],
    ['zeldaoa', 'The Legend of Zelda: Oracle of Ages', 'Aventura', 2001, 'Flagship / Capcom', 'Link viaja no tempo para resolver enigmas em Labrynna.', 82],
    ['megaman', 'Mega Man Xtreme', 'Ação', 2000, 'Capcom', 'Versão portátil da linha X, com chefes e fases clássicas.', 65],
    ['pkmb', 'Pokémon Blue', 'RPG', 1996, 'Game Freak', 'A primeira geração em Kanto: escolha seu inicial e enfrente os oito ginásios.', 88],
    ['pkmc', 'Pokémon Crystal', 'RPG', 2000, 'Game Freak', 'Versão aprimorada de Johto, com animações e o Battle Tower.', 90],
    ['pkmg', 'Pokémon Gold', 'RPG', 1999, 'Game Freak', 'A segunda geração, com ciclo de dia e noite e duas regiões para explorar.', 90],
    ['pkmr', 'Pokémon Red', 'RPG', 1996, 'Game Freak', 'Onde tudo começou: capture, treine e vire campeão de Kanto.', 90],
    ['pkms', 'Pokémon Silver', 'RPG', 1999, 'Game Freak', 'Versão irmã de Gold, com Pokémon e eventos exclusivos.', 88],
    ['reg', 'Resident Evil Gaiden', 'Terror', 2001, null, 'Um spin-off de terror a bordo de um navio-cruzeiro tomado por criaturas.', 55],
    ['spaceinvaders', 'Space Invaders', 'Tiro', 1999, null, 'O clássico dos fliperamas, com ondas de alienígenas descendo em fileiras.', 45],
    ['spiderman2', 'Spider-Man 2: The Sinister Six', 'Ação', 2001, null, 'O Homem-Aranha enfrenta o Sexteto Sinistro numa aventura de ação lateral.', 50],
    ['streetfighter', 'Street Fighter Alpha: Warriors’ Dreams', 'Luta', 2000, 'Capcom', 'A luta da série Alpha adaptada para o portátil, com lutadores e golpes clássicos.', 60],
    ['mariodeluxe', 'Super Mario Bros. Deluxe', 'Plataforma', 1999, 'Nintendo', 'O Super Mario Bros. original com extras, modos de desafio e recursos novos.', 78],
    ['tombraider', 'Tomb Raider: Curse of the Sword', 'Aventura', 2001, null, 'Lara Croft explora tumbas e resolve enigmas em visão lateral.', 55],
    ['wario2', 'Wario Land II', 'Plataforma', 1998, 'Nintendo R&D1', 'Wario, praticamente indestrutível, enfrenta fases cheias de truques e segredos.', 60],
    ['wario3', 'Wario Land 3', 'Plataforma', 2000, 'Nintendo R&D1', 'Wario cai numa caixa de música mágica e precisa recuperar os tesouros.', 62],
  ],
  nds: [
    ['codbops', 'Call of Duty: Black Ops', 'Tiro', 2010, null, 'A versão para o portátil da campanha de Black Ops, em tiroteios de guerra fria.', 55],
    ['castelvaniads', 'Castlevania: Dawn of Sorrow', 'Ação', 2005, 'Konami', 'Soma Cruz volta em um Metroidvania que usa as duas telas do DS.', 82],
    ['chronotrigger', 'Chrono Trigger', 'RPG', 2008, 'Square Enix', 'A épica viagem no tempo, em edição para o DS com conteúdo extra.', 95],
    ['coraline', 'Coraline', 'Aventura', 2009, null, 'Aventura baseada no filme, com a heroína explorando o Outro Mundo.', 45],
    ['gtacw', 'Grand Theft Auto: Chinatown Wars', 'Ação', 2009, 'Rockstar Leeds', 'Crime e perseguições em visão aérea, aclamado como um dos melhores jogos do DS.', 80],
    ['kirbysustar', 'Kirby Super Star Ultra', 'Plataforma', 2008, 'HAL Laboratory', 'Remake de Kirby Super Star, com vários jogos e modos em um só.', 80],
    ['kirbyma', 'Kirby: Mass Attack', 'Plataforma', 2011, 'HAL Laboratory', 'Dez Kirbys controlados pela tela de toque numa aventura divertida.', 65],
    ['zeldast', 'The Legend of Zelda: Spirit Tracks', 'Aventura', 2009, 'Nintendo EAD', 'Link conduz um trem e usa a tela de toque para resolver enigmas.', 82],
    ['legomarvel', 'LEGO Marvel Super Heroes: Universe in Peril', 'Ação', 2013, null, 'Heróis da Marvel em versão LEGO, com humor e muitos personagens.', 60],
    ['legoswcs', 'LEGO Star Wars: The Complete Saga', 'Aventura', 2007, null, 'As seis primeiras trilogias de Star Wars contadas em blocos de LEGO.', 70],
    ['mariokds', 'Mario Kart DS', 'Corrida', 2005, 'Nintendo EAD', 'Corridas com itens, pistas clássicas e multiplayer online na época.', 90],
    ['mariopartyds', 'Mario Party DS', 'Festa', 2007, 'Hudson Soft', 'Minijogos e tabuleiros para todos, com atividades que usam a tela de toque.', 60],
    ['metalslug7', 'Metal Slug 7', 'Ação', 2008, null, 'A série de tiro e correria de volta, com novas fases e missões.', 55],
    ['pkmwv2', 'Pokémon White Version 2', 'RPG', 2012, 'Game Freak', 'Continuação direta de Pokémon White, com novos Pokémon e eventos em Unova.', 85],
    ['residentevilds', 'Resident Evil: Deadly Silence', 'Terror', 2006, 'Capcom', 'Remake do primeiro Resident Evil que usa o toque e o microfone do DS.', 72],
    ['simpsons', 'The Simpsons Game', 'Ação', 2007, null, 'Os Simpsons percebem que são personagens de um videogame, com muita sátira.', 55],
    ['soniccollection', 'Sonic Classic Collection', 'Plataforma', 2010, null, 'Coleção com os clássicos do Sonic em um só cartucho.', 62],
    ['supermario64', 'Super Mario 64 DS', 'Plataforma', 2004, 'Nintendo EAD', 'Remake do clássico do N64, com novos personagens jogáveis e fases extras.', 90],
    ['animalcrossing', 'Animal Crossing: Wild World', 'Simulação', 2005, 'Nintendo EAD', 'Vida tranquila numa vila de animais, com relógio em tempo real e visita entre amigos.', 85],
  ],
  ps1: [
    ['metalgear', 'Metal Gear Solid', 'Ação', 1998, 'Konami', 'Solid Snake infiltra Shadow Moses em um clássico do jogo furtivo.', 95],
    ['mktrilogy', 'Mortal Kombat Trilogy', 'Luta', 1996, 'Midway', 'Reúne personagens e cenários dos três primeiros jogos da série.', 75],
    ['re2', 'Resident Evil 2', 'Terror', 1998, 'Capcom', 'Leon e Claire sobrevivem a Raccoon City num clássico do survival horror.', 92],
    ['re3', 'Resident Evil 3: Nemesis', 'Terror', 1999, 'Capcom', 'Jill Valentine é perseguida pelo implacável Nemesis.', 88],
    ['sillenthill', 'Silent Hill', 'Terror', 1999, 'Konami', 'Harry Mason procura a filha em uma cidade coberta de névoa e pesadelos.', 90],
    ['tombraider', 'Tomb Raider', 'Aventura', 1996, 'Core Design', 'A estreia de Lara Croft em explorações 3D e enigmas em tumbas.', 85],
  ],
  psp: [
    ['assassinscreedbl', 'Assassin’s Creed: Bloodlines', 'Ação', 2009, 'Griptonite Games', 'Altaïr em Chipre, continuando a história do primeiro Assassin’s Creed.', 65],
    ['ben10ultimatealien', 'Ben 10: Ultimate Alien – Cosmic Destruction', 'Ação', 2010, null, 'Ben usa o Omnitrix e novos alienígenas em lutas pelo universo.', 50],
    ['callofduttyrtv', 'Call of Duty: Roads to Victory', 'Tiro', 2007, null, 'Campanha da Segunda Guerra Mundial adaptada para o portátil da Sony.', 60],
    ['crashmom', 'Crash: Mind Over Mutant', 'Plataforma', 2008, null, 'Crash Bandicoot enfrenta a Doutor Neo Cortex e seus mutantes.', 55],
    ['dantesinferno', 'Dante’s Inferno', 'Ação', 2010, null, 'Dante atravessa os círculos do Inferno para resgatar Beatrice.', 65],
    ['defjam', 'Def Jam: Fight for NY – The Takeover', 'Luta', 2006, null, 'Lutas de rua com estrelas do hip hop e muito estilo.', 65],
    ['dbzsb2', 'Dragon Ball Z: Shin Budokai 2', 'Luta', 2007, 'Dimps', 'Combates dinâmicos com transformações e modo história.', 75],
    ['gowcoolympus', 'God of War: Chains of Olympus', 'Ação', 2008, 'Ready at Dawn', 'Kratos luta para libertar o Sol e enfrenta deuses e monstros.', 90],
    ['gowgos', 'God of War: Ghost of Sparta', 'Ação', 2010, 'Ready at Dawn', 'Kratos busca seu passado e sua família esquecida.', 88],
    ['legobatman', 'LEGO Batman: The Videogame', 'Ação', 2008, null, 'Batman e Robin em versão LEGO, enfrentando vilões de Gotham.', 60],
    ['metalgear', 'Metal Gear Solid: Peace Walker', 'Ação', 2010, 'Kojima Productions', 'Big Boss lidera uma missão na Costa Rica durante a Guerra Fria.', 85],
    ['mkunchained', 'Mortal Kombat: Unchained', 'Luta', 2006, null, 'Adaptação portátil de Mortal Kombat: Deception, com novos modos.', 60],
    ['narutosuni', 'Naruto Shippuden: Ultimate Ninja Impact', 'Luta', 2011, 'CyberConnect2', 'Batalhas em equipe com os ninjas da Vila da Folha.', 65],
    ['spidermanfof', 'Spider-Man: Friend or Foe', 'Ação', 2007, null, 'O Homem-Aranha recruta aliados e antigos inimigos contra uma ameaça.', 55],
    ['toystory3', 'Toy Story 3: The Video Game', 'Aventura', 2010, null, 'Woody, Buzz e a turma em aventuras inspiradas no filme.', 60],
    ['wwes', 'WWE SmackDown', 'Luta', null, null, 'Lutas de wrestling com astros e movimentos assinatura.', 55],
  ],
}

let _id = 0
const baseGames = Object.entries(ROWS).flatMap(([key, rows]) => {
  const c = CONSOLES[key]
  return rows.map(([file, title, genre, year, developer, description, popularity]) => ({
    id: String(++_id),
    title,
    system: c.system,
    genre,
    year,
    developer,
    coverUrl: `/images/games/${c.folder}/${file}.svg`,
    rating: null,
    popularity,
    description,
    downloadUrl: ra(title),
    driveUrl: DRIVE_LINKS[file] || null,
    recommendedEmulator: c.emu,
  }))
})

const EMU_BY_SYSTEM = {
  'Game Boy Advance': 'mgba', 'Game Boy Color': 'mgba', 'Nintendo DS': 'melonds',
  'PlayStation 1': 'duckstation', PSP: 'ppsspp',
}

const freeCatalog = freeGames.map((g) => ({
  id: 'free-' + g.slug,
  title: g.title,
  system: g.system,
  genre: g.genre,
  year: g.year ?? null,
  developer: g.developer ?? null,
  coverUrl: g.cover,
  rating: null,
  popularity: 70,
  description: g.description,
  downloadUrl: g.sourceUrl,
  recommendedEmulator: EMU_BY_SYSTEM[g.system] || 'retroarch',
  availability: 'free',
  romUrl: g.romUrl,
  license: g.license,
  sourceUrl: g.sourceUrl,
}))

export const gamesData = [
  ...baseGames.map((g) => ({ ...g, availability: 'info' })),
  ...freeCatalog,
]

// consoles disponíveis para "Jogar com meu arquivo"
export const PLAY_SYSTEMS = [
  'Game Boy Advance', 'Game Boy Color', 'Nintendo DS', 'PlayStation 1', 'PSP',
  'SNES', 'Mega Drive', 'N64', 'Arcade',
]
export const SYSTEMS = PLAY_SYSTEMS

// consoles que realmente têm jogos no catálogo (usado no filtro)
export const CATALOG_SYSTEMS = [...new Set(gamesData.map((g) => g.system))]

export const GENRES = [
  'Ação', 'Aventura', 'Luta', 'RPG', 'Plataforma', 'Corrida',
  'Tiro', 'Terror', 'Estratégia', 'Simulação', 'Festa',
]
