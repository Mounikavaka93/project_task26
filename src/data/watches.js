const img = (id, w = 900) =>
  `https://images.unsplash.com/${id}?fm=jpg&fit=crop&w=${w}&q=80`

export const brands = [
  'Aureum',
  'Nocturne',
  'Meridian',
  'Solenne',
  'Imperium',
  'Lumen',
  'Orbis',
  'Aether',
]

export const categories = ['Dress', 'Sport', 'Dive', 'Chronograph', 'Limited']

export const collections = [
  {
    id: 'heritage',
    title: 'Heritage',
    subtitle: 'Dress & evening',
    image: img('photo-1523170335258-f5ed11844a49', 1400),
    category: 'Dress',
  },
  {
    id: 'midnight',
    title: 'Midnight',
    subtitle: 'Limited nocturne',
    image: img('photo-1614164185128-e4ec99c436d7', 1400),
    category: 'Limited',
  },
  {
    id: 'atelier-sport',
    title: 'Atelier Sport',
    subtitle: 'Precision in motion',
    image: img('photo-1524592094714-0f0654e20314', 1400),
    category: 'Sport',
  },
]

const reviewPool = [
  {
    author: 'Elena Voss',
    rating: 5,
    text: 'The finishing on the case is museum-grade. It feels like wearing architecture.',
  },
  {
    author: 'Marcus Hale',
    rating: 5,
    text: 'Quiet luxury at its finest. The weight, the click, the way light moves across the dial.',
  },
  {
    author: 'Priya Raman',
    rating: 4,
    text: 'Arrived in a velvet salon box. The strap is impeccable and the movement is hypnotic.',
  },
  {
    author: 'Julian Crowe',
    rating: 5,
    text: 'I have collected for twenty years. This piece sits beside my grandfather’s watch.',
  },
  {
    author: 'Sofia Klein',
    rating: 5,
    text: 'The lume, the clasp, the way it disappears under a cuff. Entirely considered.',
  },
  {
    author: 'Noah Adeyemi',
    rating: 4,
    text: 'A serious sports watch that still belongs at dinner. The bracelet is exceptional.',
  },
  {
    author: 'Clara Jensen',
    rating: 5,
    text: 'I tried three finishes in the salon. The one I chose still stops me in shop windows.',
  },
  {
    author: 'Henry Park',
    rating: 5,
    text: 'Service letter included, movement photographed, and packing worthy of the price.',
  },
]

const tones = {
  black: [
    img('photo-1614164185128-e4ec99c436d7'),
    img('photo-1547996160-81dfa63595aa'),
    img('photo-1548171915-e79a380a2a4b'),
  ],
  gold: [
    img('photo-1587836374828-4dbafa94cf0e'),
    img('photo-1523170335258-f5ed11844a49'),
    img('photo-1609587312208-cea54be969e7'),
  ],
  silver: [
    img('photo-1542496658-e33a6d0d50f6'),
    img('photo-1594534475808-b18fc33b045e'),
    img('photo-1522312346375-d1a52e2b99b3'),
  ],
  blue: [
    img('photo-1639006570490-79c0c53f1080'),
    img('photo-1524592094714-0f0654e20314'),
    img('photo-1611930022073-b7a4ba5fcccd'),
  ],
  rose: [
    img('photo-1434056886845-dac89ffe9b56'),
    img('photo-1587836374828-4dbafa94cf0e'),
    img('photo-1609587312208-cea54be969e7'),
  ],
  ivory: [
    img('photo-1523170335258-f5ed11844a49'),
    img('photo-1522312346375-d1a52e2b99b3'),
    img('photo-1609587312208-cea54be969e7'),
  ],
  green: [
    img('photo-1612817159949-195b6eb9e31a'),
    img('photo-1508685096489-7aacd43bd3b1'),
    img('photo-1524592094714-0f0654e20314'),
  ],
  meteorite: [
    img('photo-1508685096489-7aacd43bd3b1'),
    img('photo-1542496658-e33a6d0d50f6'),
    img('photo-1551816230-ef5deaed4a26'),
  ],
}

const colorPalettes = {
  Dress: [
    { name: 'Ivory', hex: '#f3ede2', tone: 'ivory', dial: 'Ivory enamel', caseFinish: 'Polished steel', strap: 'Cognac calfskin' },
    { name: 'Champagne Gold', hex: '#c6a15b', tone: 'gold', dial: 'Champagne sunburst', caseFinish: '18k yellow gold', strap: 'Honey alligator' },
    { name: 'Rose Gold', hex: '#b76e79', tone: 'rose', dial: 'Pearl blush', caseFinish: 'Rose gold', strap: 'Blush satin' },
    { name: 'Onyx', hex: '#1a1a1c', tone: 'black', dial: 'Matte noir', caseFinish: 'DLC steel', strap: 'Black nubuck' },
  ],
  Sport: [
    { name: 'Steel', hex: '#c5c8ce', tone: 'silver', dial: 'Silver sunburst', caseFinish: 'Brushed steel', strap: 'Integrated bracelet' },
    { name: 'Black DLC', hex: '#141416', tone: 'black', dial: 'Carbon black', caseFinish: 'DLC titanium', strap: 'Technical rubber' },
    { name: 'Ocean Blue', hex: '#1f4e79', tone: 'blue', dial: 'Deep navy', caseFinish: 'Steel & ceramic', strap: 'Integrated steel' },
    { name: 'Racing Green', hex: '#1f3d2b', tone: 'green', dial: 'Olive', caseFinish: 'Sandblasted steel', strap: 'Vintage canvas' },
  ],
  Dive: [
    { name: 'Arctic Black', hex: '#111111', tone: 'black', dial: 'Arctic black', caseFinish: 'Marine-grade steel', strap: 'Nato & bracelet' },
    { name: 'Ocean Blue', hex: '#1f4e79', tone: 'blue', dial: 'Ocean sunburst', caseFinish: 'Marine-grade steel', strap: 'Rubber & steel' },
    { name: 'Sunburst', hex: '#c6a15b', tone: 'gold', dial: 'Champagne sunburst', caseFinish: 'Gold-tone steel', strap: 'Honey rubber' },
    { name: 'Silver', hex: '#d0d4da', tone: 'silver', dial: 'Ice silver', caseFinish: 'Brushed steel', strap: 'Oyster bracelet' },
  ],
  Chronograph: [
    { name: 'Panda Silver', hex: '#e8e4dc', tone: 'silver', dial: 'Silver panda', caseFinish: 'Brushed steel', strap: 'Racing leather' },
    { name: 'Anthracite', hex: '#2b2b2e', tone: 'meteorite', dial: 'Smoked anthracite', caseFinish: 'Blackened steel', strap: 'Ink calfskin' },
    { name: 'Racing Black', hex: '#121214', tone: 'black', dial: 'Matte racing black', caseFinish: 'Forged carbon', strap: 'Technical rubber' },
    { name: 'Champagne', hex: '#c6a15b', tone: 'gold', dial: 'Champagne chrono', caseFinish: 'Yellow gold', strap: 'Cognac racing leather' },
  ],
  Limited: [
    { name: 'Obsidian', hex: '#141416', tone: 'black', dial: 'Obsidian smoke', caseFinish: 'DLC-coated gold', strap: 'Midnight alligator' },
    { name: 'Midnight Blue', hex: '#1e2a4a', tone: 'blue', dial: 'Midnight blue', caseFinish: 'Platinum-coated steel', strap: 'Navy alligator' },
    { name: 'Champagne Gold', hex: '#c6a15b', tone: 'gold', dial: 'Champagne sunburst', caseFinish: '18k champagne gold', strap: 'Honey alligator' },
    { name: 'Meteorite', hex: '#8b8476', tone: 'meteorite', dial: 'Meteorite silver', caseFinish: 'Platinum-coated steel', strap: 'Moon-grey alligator' },
  ],
}

const watchCatalog = [
  {
    id: 'aur-nocturne-01',
    name: 'Nocturne Or',
    brand: 'Aureum',
    category: 'Limited',
    price: 12800,
    originalPrice: 14600,
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 38,
    stock: 6,
    images: [
      img('photo-1614164185128-e4ec99c436d7'),
      img('photo-1547996160-81dfa63595aa'),
      img('photo-1508685096489-7aacd43bd3b1'),
    ],
    description:
      'A midnight salon piece: smoked sapphire, hand-brushed gold, and a movement finished like a private concert. Designed for evenings that refuse to end quietly.',
    specs: {
      caseMaterial: '18k Champagne Gold',
      strapMaterial: 'Alligator, midnight',
      movement: 'In-house automatic A-92',
      waterResistance: '50m',
      dialColor: 'Obsidian smoke',
    },
    reviews: reviewPool,
  },
  {
    id: 'aur-heritage-02',
    name: 'Salon 1924',
    brand: 'Aureum',
    category: 'Dress',
    price: 8900,
    originalPrice: 8900,
    isNew: false,
    isBestSeller: true,
    rating: 4.8,
    reviewsCount: 64,
    stock: 12,
    images: [
      img('photo-1523170335258-f5ed11844a49'),
      img('photo-1587836374828-4dbafa94cf0e'),
      img('photo-1522312346375-d1a52e2b99b3'),
    ],
    description:
      'The house signature. A slim dress watch with a cream enamel dial, feuille hands, and a case thin enough to disappear under a tuxedo cuff.',
    specs: {
      caseMaterial: 'Polished stainless steel',
      strapMaterial: 'Cognac calfskin',
      movement: 'Manual-wind Calibre 24',
      waterResistance: '30m',
      dialColor: 'Ivory enamel',
    },
    reviews: reviewPool,
  },
  {
    id: 'noc-veil-03',
    name: 'Veil Black',
    brand: 'Nocturne',
    category: 'Dress',
    price: 6400,
    originalPrice: 7200,
    isNew: true,
    isBestSeller: false,
    rating: 4.7,
    reviewsCount: 21,
    stock: 9,
    images: [
      img('photo-1547996160-81dfa63595aa'),
      img('photo-1614164185128-e4ec99c436d7'),
      img('photo-1551816230-ef5deaed4a26'),
    ],
    description:
      'Matte black DLC with a secret gold chapter ring. Built for collectors who prefer their statements whispered.',
    specs: {
      caseMaterial: 'DLC-coated steel',
      strapMaterial: 'Black nubuck',
      movement: 'Automatic N-7',
      waterResistance: '50m',
      dialColor: 'Matte noir',
    },
    reviews: reviewPool,
  },
  {
    id: 'mer-atlas-04',
    name: 'Atlas Chrono',
    brand: 'Meridian',
    category: 'Chronograph',
    price: 11200,
    originalPrice: 11200,
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 47,
    stock: 8,
    images: [
      img('photo-1594534475808-b18fc33b045e'),
      img('photo-1542496658-e33a6d0d50f6'),
      img('photo-1524592094714-0f0654e20314'),
    ],
    description:
      'A column-wheel chronograph with panda registers and a flyback complication. Built to measure the hours that matter.',
    specs: {
      caseMaterial: 'Brushed steel',
      strapMaterial: 'Perforated racing leather',
      movement: 'Column-wheel chrono M-88',
      waterResistance: '100m',
      dialColor: 'Silver panda',
    },
    reviews: reviewPool,
  },
  {
    id: 'sol-gilded-05',
    name: 'Gilded Hour',
    brand: 'Solenne',
    category: 'Dress',
    price: 15600,
    originalPrice: 17200,
    isNew: false,
    isBestSeller: true,
    rating: 5,
    reviewsCount: 19,
    stock: 4,
    images: [
      img('photo-1587836374828-4dbafa94cf0e'),
      img('photo-1523170335258-f5ed11844a49'),
      img('photo-1609587312208-cea54be969e7'),
    ],
    description:
      'Warm gold, open-worked bridges, and a champagne sunburst that changes with every chandelier. A salon watch for golden hours.',
    specs: {
      caseMaterial: '18k yellow gold',
      strapMaterial: 'Honey alligator',
      movement: 'Open-worked automatic',
      waterResistance: '30m',
      dialColor: 'Champagne sunburst',
    },
    reviews: reviewPool,
  },
  {
    id: 'imp-forge-06',
    name: 'Forge GMT',
    brand: 'Imperium',
    category: 'Sport',
    price: 9800,
    originalPrice: 9800,
    isNew: true,
    isBestSeller: false,
    rating: 4.6,
    reviewsCount: 33,
    stock: 14,
    images: [
      img('photo-1524592094714-0f0654e20314'),
      img('photo-1639006570490-79c0c53f1080'),
      img('photo-1612817159949-195b6eb9e31a'),
    ],
    description:
      'Dual-time traveler with a ceramic bezel and a lume that lasts until dawn. Designed for boardrooms and boarding gates.',
    specs: {
      caseMaterial: 'Titanium & ceramic',
      strapMaterial: 'Integrated bracelet',
      movement: 'GMT automatic I-21',
      waterResistance: '200m',
      dialColor: 'Deep navy',
    },
    reviews: reviewPool,
  },
  {
    id: 'lum-halo-07',
    name: 'Halo Moon',
    brand: 'Lumen',
    category: 'Limited',
    price: 18400,
    originalPrice: 18400,
    isNew: true,
    isBestSeller: false,
    rating: 4.9,
    reviewsCount: 12,
    stock: 3,
    images: [
      img('photo-1508685096489-7aacd43bd3b1'),
      img('photo-1614164185128-e4ec99c436d7'),
      img('photo-1547996160-81dfa63595aa'),
    ],
    description:
      'A meteorite dial under a moon-phase aperture. Only forty-eight pieces, each numbered on the caseback like a sonnet.',
    specs: {
      caseMaterial: 'Platinum-coated steel',
      strapMaterial: 'Moon-grey alligator',
      movement: 'Moon-phase Calibre L-4',
      waterResistance: '30m',
      dialColor: 'Meteorite silver',
    },
    reviews: reviewPool,
  },
  {
    id: 'orb-abyss-08',
    name: 'Abyss 300',
    brand: 'Orbis',
    category: 'Dive',
    price: 7200,
    originalPrice: 7900,
    isNew: false,
    isBestSeller: true,
    rating: 4.8,
    reviewsCount: 81,
    stock: 16,
    images: [
      img('photo-1639006570490-79c0c53f1080'),
      img('photo-1524592094714-0f0654e20314'),
      img('photo-1612817159949-195b6eb9e31a'),
    ],
    description:
      'A tool watch dressed for the salon. Unidirectional bezel, helium valve, and a sunburst blue that recalls a winter sea.',
    specs: {
      caseMaterial: 'Marine-grade steel',
      strapMaterial: 'Rubber & steel',
      movement: 'Automatic dive O-300',
      waterResistance: '300m',
      dialColor: 'Ocean sunburst',
    },
    reviews: reviewPool,
  },
  {
    id: 'aet-vapor-09',
    name: 'Vapor Skeleton',
    brand: 'Aether',
    category: 'Limited',
    price: 21400,
    originalPrice: 23800,
    isNew: true,
    isBestSeller: false,
    rating: 5,
    reviewsCount: 9,
    stock: 2,
    images: [
      img('photo-1542496658-e33a6d0d50f6'),
      img('photo-1594534475808-b18fc33b045e'),
      img('photo-1548171915-e79a380a2a4b'),
    ],
    description:
      'Almost no dial — only bridges, jewels, and light. A kinetic sculpture for the wrist, assembled by two watchmakers over eleven days.',
    specs: {
      caseMaterial: 'Sapphire & titanium',
      strapMaterial: 'Hand-stitched calf',
      movement: 'Full skeleton AE-1',
      waterResistance: '30m',
      dialColor: 'Open-worked',
    },
    reviews: reviewPool,
  },
  {
    id: 'aur-line-10',
    name: 'Linea Dama',
    brand: 'Aureum',
    category: 'Dress',
    price: 5400,
    originalPrice: 5400,
    isNew: false,
    isBestSeller: false,
    rating: 4.7,
    reviewsCount: 27,
    stock: 11,
    images: [
      img('photo-1434056886845-dac89ffe9b56'),
      img('photo-1523170335258-f5ed11844a49'),
      img('photo-1587836374828-4dbafa94cf0e'),
    ],
    description:
      'An oval case, diamond hour markers, and a silk-smooth quartz movement for those who measure days in conversations.',
    specs: {
      caseMaterial: 'Rose gold PVD',
      strapMaterial: 'Blush satin',
      movement: 'High-precision quartz',
      waterResistance: '30m',
      dialColor: 'Pearl white',
    },
    reviews: reviewPool,
  },
  {
    id: 'mer-field-11',
    name: 'Field No. 7',
    brand: 'Meridian',
    category: 'Sport',
    price: 4100,
    originalPrice: 4600,
    isNew: false,
    isBestSeller: false,
    rating: 4.5,
    reviewsCount: 54,
    stock: 20,
    images: [
      img('photo-1612817159949-195b6eb9e31a'),
      img('photo-1524592094714-0f0654e20314'),
      img('photo-1639006570490-79c0c53f1080'),
    ],
    description:
      'A modern field watch with railway minutes and a sandwich dial. Rugged enough for travel, refined enough for dinner.',
    specs: {
      caseMaterial: 'Sandblasted steel',
      strapMaterial: 'Vintage canvas',
      movement: 'Automatic M-12',
      waterResistance: '100m',
      dialColor: 'Olive',
    },
    reviews: reviewPool,
  },
  {
    id: 'sol-opera-12',
    name: 'Opéra Date',
    brand: 'Solenne',
    category: 'Dress',
    price: 9900,
    originalPrice: 9900,
    isNew: false,
    isBestSeller: true,
    rating: 4.8,
    reviewsCount: 41,
    stock: 7,
    images: [
      img('photo-1609587312208-cea54be969e7'),
      img('photo-1587836374828-4dbafa94cf0e'),
      img('photo-1522312346375-d1a52e2b99b3'),
    ],
    description:
      'A pointer-date dress watch with Breguet numerals and a case that catches opera-house light like jewelry.',
    specs: {
      caseMaterial: 'Polished gold-tone steel',
      strapMaterial: 'Bordeaux alligator',
      movement: 'Automatic date S-19',
      waterResistance: '30m',
      dialColor: 'Opaline silver',
    },
    reviews: reviewPool,
  },
  {
    id: 'imp-pulse-13',
    name: 'Pulse Carbon',
    brand: 'Imperium',
    category: 'Sport',
    price: 13400,
    originalPrice: 13400,
    isNew: true,
    isBestSeller: false,
    rating: 4.6,
    reviewsCount: 18,
    stock: 5,
    images: [
      img('photo-1551816230-ef5deaed4a26'),
      img('photo-1594534475808-b18fc33b045e'),
      img('photo-1542496658-e33a6d0d50f6'),
    ],
    description:
      'Forged carbon, neon-lume indices, and a 72-hour power reserve. For those who treat weekends like a circuit.',
    specs: {
      caseMaterial: 'Forged carbon',
      strapMaterial: 'Technical rubber',
      movement: 'Automatic sport I-90',
      waterResistance: '150m',
      dialColor: 'Carbon weave',
    },
    reviews: reviewPool,
  },
  {
    id: 'orb-tide-14',
    name: 'Tide Master',
    brand: 'Orbis',
    category: 'Dive',
    price: 8600,
    originalPrice: 8600,
    isNew: false,
    isBestSeller: false,
    rating: 4.7,
    reviewsCount: 29,
    stock: 10,
    images: [
      img('photo-1611930022073-b7a4ba5fcccd', 900),
      img('photo-1639006570490-79c0c53f1080'),
      img('photo-1508685096489-7aacd43bd3b1'),
    ],
    description:
      'A professional diver with a snowflake handset and a bezel that clicks like a vault. Winter waters, summer yachts.',
    specs: {
      caseMaterial: 'Brushed steel',
      strapMaterial: 'Nato & bracelet',
      movement: 'Automatic O-72',
      waterResistance: '200m',
      dialColor: 'Arctic black',
    },
    reviews: reviewPool,
  },
  {
    id: 'noc-sonnet-15',
    name: 'Sonnet Dual',
    brand: 'Nocturne',
    category: 'Chronograph',
    price: 14900,
    originalPrice: 16200,
    isNew: false,
    isBestSeller: false,
    rating: 4.8,
    reviewsCount: 15,
    stock: 4,
    images: [
      img('photo-1548171915-e79a380a2a4b'),
      img('photo-1547996160-81dfa63595aa'),
      img('photo-1614164185128-e4ec99c436d7'),
    ],
    description:
      'A dual-register chronograph with a smoked sapphire caseback. Poetry in pusher feel — short, decisive, unforgettable.',
    specs: {
      caseMaterial: 'Blackened gold',
      strapMaterial: 'Ink calfskin',
      movement: 'Manual chrono N-2',
      waterResistance: '50m',
      dialColor: 'Smoked anthracite',
    },
    reviews: reviewPool,
  },
  {
    id: 'aet-cirrus-16',
    name: 'Cirrus GMT',
    brand: 'Aether',
    category: 'Sport',
    price: 11900,
    originalPrice: 11900,
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 22,
    stock: 6,
    images: [
      img('photo-1522312346375-d1a52e2b99b3'),
      img('photo-1542496658-e33a6d0d50f6'),
      img('photo-1524592094714-0f0654e20314'),
    ],
    description:
      'A sky-blue GMT with a two-tone bezel and an extra-thin profile. First-class cabins, last-light arrivals.',
    specs: {
      caseMaterial: 'Polished steel',
      strapMaterial: 'Integrated steel',
      movement: 'GMT automatic AE-6',
      waterResistance: '100m',
      dialColor: 'Cirrus blue',
    },
    reviews: reviewPool,
  },
]

const slug = (value) => value.toLowerCase().replace(/\s+/g, '-')

export const watches = watchCatalog.map((watch, watchIndex) => {
  const palette = colorPalettes[watch.category] || colorPalettes.Limited
  const colors = palette.map((color, index) => ({
    ...color,
    id: slug(color.name),
    images: tones[color.tone],
    ref: `${watch.brand.slice(0, 3).toUpperCase()}-${watch.id.slice(-2).toUpperCase()}-${String(index + 1).padStart(2, '0')}`,
  }))

  return {
    ...watch,
    colors,
    images: colors[0].images,
    reviews: [0, 1, 2, 3].map((offset) => reviewPool[(watchIndex + offset) % reviewPool.length]),
  }
})

export const getColorById = (watch, colorId) =>
  watch?.colors?.find((color) => color.id === colorId) || watch?.colors?.[0] || null

export const testimonials = [
  {
    id: 1,
    quote:
      'Walking into Aureum felt like entering a private library of time. The Nocturne Or is the most beautiful object I own.',
    name: 'Amelia Hart',
    role: 'Collector, Geneva',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'They did not sell me a watch. They composed a piece around how I live. That is a maison, not a store.',
    name: 'Rafael Ortega',
    role: 'Architect, Madrid',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'The Atlas Chrono arrived in a hand-tied salon box. Every detail — from the winding feel to the clasp — is considered.',
    name: 'Sloane Park',
    role: 'Editor, New York',
    rating: 5,
  },
]

export const getWatchById = (id) => watches.find((watch) => watch.id === id)

export const getRelatedWatches = (watch, limit = 4) => {
  const ranked = watches.filter((item) => item.id !== watch.id)
  const preferred = ranked.filter((item) => item.brand === watch.brand || item.category === watch.category)
  const extra = ranked.filter((item) => !preferred.some((match) => match.id === item.id))
  return [...preferred, ...extra].slice(0, limit)
}

export const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
