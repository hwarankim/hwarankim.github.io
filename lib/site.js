// Everything a visitor reads about hwaran that is not yet confirmed lives here as a bracketed placeholder.
// Replace these before launch; nothing else in the code needs to change.
export const site = {
  name: 'Hwaran Kim',
  role: 'Business Marketing · Pre-Law Track',
  // The desktop's opening paragraph, read like a resume objective. Every claim is on the resume.
  intro:
    'I am a fourth-year business marketing student at NC State, with minors in philosophy and international studies, currently on exchange at Seoul National University. As artistic director of KPACK at NC State, I led a five-month marketing push that raised showcase revenue by 30%. I am fluent in English and proficient in Korean, and I am looking for a marketing internship where I can bring organization, clear communication and generative AI tools to the work, before going on to law school.',
  // The one-line version, for search results and link previews (LinkedIn, texts), which cut off long text.
  summary:
    'Business marketing student at NC State, minoring in philosophy and international studies, on a pre-law track.',
  linkedin: 'https://www.linkedin.com/in/hwaran-kim/',
  email: 'hkim74@ncsu.edu',
  resume: '/resume.pdf',
  // The status light at the right of the desktop's menu bar.
  status: 'Open to Internships',
};

// The "About this website" window, opened from the HK mark in the menu bar.
// DRAFT for Hwaran to confirm or rewrite.
export const aboutSite = {
  title: 'About this website',
  blurb: 'A portfolio set up as my own desktop. Each folder opens into a page, and the menu bar works.',
  specs: [
    ['Designed by', 'Hwaran Kim'],
    ['Built with', 'Next.js and Claude Code'],
    ['Type', 'Prata and Work Sans'],
    ['Pictures', 'Wikimedia Commons, credited on each page'],
    ['Hosted on', 'GitHub Pages'],
    ['Updated', 'November 2026'],
  ],
};

// The outline behind the magnifying glass in the desktop's menu bar: a fixed list, not a free search.
// Quick actions run straight from the menu; every other row jumps to a spot on a page.
export const outline = [
  {
    heading: 'Quick actions',
    items: [
      { label: 'Open Resume', hint: 'PDF', action: 'resume' },
      { label: 'Copy Email Address', action: 'email' },
      { label: 'LinkedIn', action: 'linkedin' },
    ],
  },
  {
    heading: 'About me',
    items: [
      { label: 'A note from me', href: '/about-me/#letter-title' },
      { label: 'Write to me', href: '/about-me/#write' },
    ],
  },
  {
    heading: 'Academics',
    items: [
      { label: 'Marketing', href: '/academics/#marketing' },
      { label: 'Philosophy', href: '/academics/#philosophy' },
      { label: 'International studies', href: '/academics/#international-studies' },
      { label: 'Exchange in Seoul', href: '/academics/#exchange-in-seoul' },
    ],
  },
  {
    heading: 'Work experience',
    items: [
      { label: 'Front Office Assistant', hint: 'Intl. Services', href: '/work-experience/#ois' },
      { label: 'Artistic Director', hint: 'KPACK', href: '/work-experience/#kpack' },
      { label: 'Brother', hint: 'Alpha Kappa Psi', href: '/work-experience/#akpsi' },
      { label: 'Hostess / Server / Bartender', hint: 'M Restaurants', href: '/work-experience/#m-restaurants' },
    ],
  },
  {
    heading: 'Extra',
    items: [
      { label: 'East Asia, market by market', href: '/extra/#markets' },
      { label: 'Notes from Seoul', href: '/extra/#seoul' },
    ],
  },
];

export const folders = [
  { href: '/about-me/', label: 'About me', title: 'About me', key: 'about' },
  { href: '/academics/', label: 'Academics', title: 'Academics', key: 'academics' },
  { href: '/work-experience/', label: 'Work experience', title: 'Work experience', key: 'work' },
  { href: '/extra/', label: 'Extra', title: 'Extra', key: 'extra' },
];

// Open-collection pictures: they show the world around hwaran's work, never hwaran's own work or people.
export const pictures = {
  snuGate: {
    src: '/images/seoul-national-university-20171026-164458.jpg', w: 1920, h: 1440,
    alt: 'The main gate of Seoul National University, a steel arch over the campus road with autumn hills behind',
    caption: 'Main gate, Seoul National University',
    credit: { title: 'Seoul National University 20171026 164458', creator: 'H. Y. Shin 000', licence: 'CC0', page: 'https://commons.wikimedia.org/wiki/File:Seoul_National_University_20171026_164458.jpg' },
  },
  winston: {
    src: '/images/postcard-depicting-winston-hall-at-north-carolina.jpg', w: 1906, h: 1192,
    alt: 'A 1911 colored postcard of Winston Hall, a brick building with a lawn in front, at NC State in Raleigh',
    caption: 'Winston Hall, NC State, on a postcard from about 1911',
    credit: { title: 'Postcard depicting Winston Hall at North Carolina State University', creator: 'State Archives of North Carolina', licence: 'no known copyright restrictions', page: 'https://commons.wikimedia.org/wiki/File:Postcard_depicting_Winston_Hall_at_North_Carolina_State_University;_Raleigh,_NC_-_PhC_205_4_145.jpg' },
  },
  belltower: {
    src: '/images/belltower-ncsu.jpg', w: 1920, h: 1277,
    alt: 'The Memorial Belltower at NC State, a stone tower between flowering trees',
    caption: 'Memorial Belltower, NC State',
    credit: { title: 'Belltower ncsu', creator: 'Suzie Tremmel', licence: 'CC BY 2.0', page: 'https://commons.wikimedia.org/wiki/File:Belltower_ncsu.jpg' },
  },
  raleigh: {
    src: '/images/raleigh-skyline.jpg', w: 1920, h: 1080,
    alt: 'The downtown Raleigh skyline over trees under a clear sky',
    caption: 'Downtown Raleigh, North Carolina',
    credit: { title: 'Raleigh Skyline', creator: 'Abhiram Juvvadi', licence: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Raleigh_Skyline.jpg' },
  },
  jongno: {
    src: '/images/night-view-of-downtown-seoul-along-jongno.jpg', w: 1600, h: 1067,
    alt: 'Glass office towers along Jongno street in Seoul at dusk, with traffic and an orange bus below',
    caption: 'Office towers along Jongno, Seoul',
    credit: { title: 'Night view of Downtown Seoul along Jongno Street in 2020', creator: '서울연구원 (Seoul Institute)', licence: 'CC BY 4.0', page: 'https://commons.wikimedia.org/wiki/File:Night_view_of_Downtown_Seoul_along_Jongno_Street_in_2020.jpg' },
  },
  hanRiver: {
    src: '/images/han-river-seoul-49531227633.jpg', w: 1920, h: 1280,
    alt: 'Arched bridges over the Han River in Seoul with apartment blocks on the far bank',
    caption: 'The Han River, Seoul',
    credit: { title: 'Han River, Seoul', creator: 'Matt Kieffer', licence: 'CC BY-SA 2.0', page: 'https://commons.wikimedia.org/wiki/File:Han_River,_Seoul_(49531227633).jpg' },
  },
  namsan: {
    src: '/images/seoul-city-skyline-at-night-from-namsan.jpg', w: 1920, h: 1280,
    alt: 'Seoul at night seen from Namsan mountain, city lights framed by dark branches',
    caption: 'Seoul at night from Namsan',
    credit: { title: 'Seoul city skyline at night from Namsan Mountain', creator: 'Matt Kieffer', licence: 'CC BY-SA 2.0', page: 'https://commons.wikimedia.org/wiki/File:Seoul_city_skyline_at_night_from_Namsan_Mountain_(49175035266).jpg' },
  },
  bukchon: {
    src: '/images/bukchon-ro-11-gil-street-with-hanok.jpg', w: 1920, h: 1234,
    alt: 'A sloping lane between tiled hanok walls in Bukchon, Seoul',
    caption: 'Bukchon-ro 11-gil, Seoul',
    credit: { title: 'Bukchon-ro 11-gil street with hanok houses', creator: 'Basile Morin', licence: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Bukchon-ro_11-gil_street_with_hanok_houses_in_Bukchon_Hanok_Village_Seoul.jpg' },
  },
  ddp: {
    src: '/images/dongdaemun-design-plaza-ddp2376.jpg', w: 1920, h: 1280,
    alt: 'The curved metal skin of Dongdaemun Design Plaza in Seoul, lit at dusk',
    caption: 'Dongdaemun Design Plaza, Seoul',
    credit: { title: 'Dongdaemun Design Plaza - DDP2376', creator: 'lumoplank', licence: 'CC0', page: 'https://commons.wikimedia.org/wiki/File:Dongdaemun_Design_Plaza_-_DDP2376.jpg' },
  },
  bund: {
    src: '/images/shanghai-bund-at-night-20260417-4.jpg', w: 1920, h: 1403,
    alt: 'Historic bank buildings on the Bund in Shanghai, lit gold at night',
    caption: 'The Bund, Shanghai',
    credit: { title: 'Shanghai Bund at night 20260417 (4)', creator: 'DvTor8303', licence: 'CC0', page: 'https://commons.wikimedia.org/wiki/File:Shanghai_Bund_at_night_20260417_(4).jpg' },
  },
  shinjuku: {
    src: '/images/buildings-with-colorful-neon-street-signs-at.jpg', w: 1920, h: 1536,
    alt: 'Buildings covered in neon signs for games, karaoke and shops in Shinjuku, Tokyo, at blue hour',
    caption: 'Neon signs in Shinjuku, Tokyo',
    credit: { title: 'Buildings with colorful neon street signs at blue hour, Shinjuku, Tokyo', creator: 'Basile Morin', licence: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Buildings_with_colorful_neon_street_signs_at_blue_hour,_Shinjuku,_Tokyo.jpg' },
  },
  cosmetics: {
    src: '/images/korean-cosmetics-on-a-shelf.jpg', w: 1920, h: 1582,
    alt: 'Korean skincare bottles and tubes on a shelf, including a peeling gel, an essence and a cleanser',
    caption: 'Korean skincare on a shelf',
    credit: { title: 'Korean cosmetics on a shelf', creator: 'Teemeah', licence: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Korean_cosmetics_on_a_shelf.jpg' },
  },
  merch: {
    src: '/images/bigbang-merchandise.jpg', w: 1920, h: 1280,
    alt: 'A yellow acrylic fan light stick from the BIGBANG Alive Tour 2012, held up in a crowd',
    caption: 'Tour light stick, BIGBANG Alive Tour 2012',
    credit: { title: 'Bigbang merchandise', creator: 'nicole voon', licence: 'CC BY 2.0', page: 'https://commons.wikimedia.org/wiki/File:Bigbang_merchandise.jpg' },
  },
  seoulStreet: {
    src: '/images/seoul-central-street.webm', poster: '/images/seoul-central-street-poster.jpg', w: 854, h: 480,
    alt: 'Traffic passing lit shop fronts and a large light display on a central Seoul street at night',
    caption: 'A central street in Seoul at night',
    credit: { title: 'Seoul, central street', creator: 'Виктор Пинчук', licence: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Seoul,_central_street.webm' },
  },
};
