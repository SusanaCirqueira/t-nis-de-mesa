export interface NavItem {
  label: string;
  to: string;
}

export interface GalleryPhoto {
  src: string;
  alt: string;
  caption: string;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  photo: string;
  actionPhoto?: string;
  actionAlt?: string;
}

export const SITE_INFO = {
  name: 'Arapongas Tênis de Mesa',
  city: 'Arapongas',
  state: 'PR',
  participants: '120+',
  schools: '6 escolas',
  volunteers: '14 voluntários',
  weeklyHours: '12h / sem',
  schedule: 'Terças e Quintas, 18h30 às 20h30 · Sábados, 9h às 11h30',
  address: 'Ginásio Municipal Luiz Augusto Zin — Centro',
  partnerSpace: 'Ginásio Municipal Luiz Augusto Zin',
  whatsapp: '(43) 98861-0027',
  whatsappUrl: 'https://wa.me/5543988610027',
  instagram: '@pontomesaarapongas',
  instagramUrl: 'https://instagram.com/pontomesaarapongas',
  email: 'contato@pontomesaarapongas.org.br',
};

export const NAV_ITEMS: NavItem[] = [
  {label: 'Início', to: '/'},
  {label: 'Sobre', to: '/sobre'},
  {label: 'Como funciona', to: '/como-funciona'},
  {label: 'Contato', to: '/contato'},
];

export const SITE_IMAGES = {
  logo: '/assets/aistudio/lo_951e321a.png',
  heroYoung: '/src/assets/images/hero_jovem_1794935921074.png',
  heroPaddle: '/src/assets/images/hero_raquete_1794935921835.png',
  heroCommunity: '/src/assets/images/hero_comunidade_1794935923184.png',
  aboutSpace: '/src/assets/images/sobre_espaco_1794935923219.png',
  galleryHighFive: '/src/assets/images/galeria_dupla_1794935923628.png',
  galleryCoach: '/src/assets/images/galeria_tecnico_1794935924531.png',
  galleryHall: '/src/assets/images/sobre_espaco_1794935923219.png',
  galleryServe: '/src/assets/images/galeria_saque_1794935924792.png',
  galleryFamilies: '/src/assets/images/galeria_familias_1794935924517.png',
  galleryBall: '/src/assets/images/hero_raquete_1794935921835.png',
  personMother: '/src/assets/images/depoimento_mae_1794935924755.png',
  personMotherAction: '/src/assets/images/filho_patricia_pov_1795026082802.png',
  personPlayer: '/src/assets/images/depoimento_aluno_1794935924719.png',
  personPlayerAction: '/src/assets/images/lucas_ajudando_dupla_1795026743415.png',
  personCoach: '/src/assets/images/depoimento_voluntario_1794935926247.png',
  personCoachAction: '/src/assets/images/ricardo_roda_conversa_1795026469917.png',
};

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: SITE_IMAGES.galleryHighFive,
    alt: 'Dois participantes se cumprimentando depois de um ponto, sorrindo ao lado da mesa',
    caption: 'Respeito e amizade no fim de cada partida no campeonato interno.',
  },
  {
    src: SITE_IMAGES.galleryCoach,
    alt: 'Voluntário orientando um adolescente sobre a empunhadura da raquete',
    caption: 'Acompanhamento de perto dos voluntários para quem está começando.',
  },
  {
    src: SITE_IMAGES.galleryHall,
    alt: 'Salão comunitário com mesas de tênis de mesa em atividade',
    caption: 'Mesas montadas e famílias acompanhando os treinos em Arapongas.',
  },
  {
    src: SITE_IMAGES.galleryServe,
    alt: 'Jovem participante concentrada na hora do saque',
    caption: 'Foco e disciplina nos fundamentos durante a semana.',
  },
  {
    src: SITE_IMAGES.galleryFamilies,
    alt: 'Famílias acompanhando e jogando junto com as crianças durante o treino',
    caption: 'Encontros abertos de sábado com pais, mães e filhos na mesma mesa.',
  },
  {
    src: SITE_IMAGES.galleryBall,
    alt: 'Detalhe da raquete e bola sobre a mesa azul durante uma partida',
    caption: 'Todo o material básico é emprestado gratuitamente pelo projeto.',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      'Meu filho era muito tímido e passava a tarde toda no celular. Desde que começou nas mesas, ganhou amigos no bairro, melhorou a concentração na escola e espera a terça-feira chegar com alegria.',
    name: 'Patrícia Almeida',
    role: 'Mãe de participante',
    photo: SITE_IMAGES.personMother,
    actionPhoto: SITE_IMAGES.personMotherAction,
    actionAlt: 'Filho de Patrícia Almeida jogando tênis de mesa feliz com um amigo no ginásio',
  },
  {
    quote:
      'Eu nunca tinha segurado uma raquete antes. No primeiro dia já joguei em dupla, aprendi a sacar e hoje ajudo os mais novos que chegam com vergonha de errar.',
    name: 'Lucas Henrique',
    role: 'Participante · 14 anos',
    photo: SITE_IMAGES.personPlayer,
    actionPhoto: SITE_IMAGES.personPlayerAction,
    actionAlt: 'Lucas Henrique ajudando um participante mais novo na mesa de tênis de mesa',
  },
  {
    quote:
      'A gente acha que vem só ensinar efeito e movimentação, mas o que transforma mesmo é a roda de conversa depois do treino. Cada ponto aqui vira confiança fora da quadra.',
    name: 'Ricardo Ferreira',
    role: 'Voluntário e treinador',
    photo: SITE_IMAGES.personCoach,
    actionPhoto: SITE_IMAGES.personCoachAction,
    actionAlt: 'Ricardo Ferreira conversando e orientando um grupo de alunos ao redor da mesa',
  },
];

export const INTERESSES_LIST = [
  'Participar',
  'Voluntariado',
  'Doar materiais',
  'Patrocínio',
  'Apoiar o projeto',
  'Outro',
] as const;

export type InteresseOption = (typeof INTERESSES_LIST)[number];
