"use strict";
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ══════════════ DATA ══════════════ */
const REGIONS = [
  { id:"addis",      name:"Addis Ababa",        e:"🏙️", blurb:"Capital city — museums, parks, markets & nightlife." },
  { id:"amhara",     name:"Amhara",             e:"🏰", blurb:"Historic north — Lalibela, Gondar, Simiens & Lake Tana." },
  { id:"oromia",     name:"Oromia",             e:"🏔️", blurb:"The vast heartland — Bale Mountains, caves & crater lakes." },
  { id:"tigray",     name:"Tigray",             e:"🗿", blurb:"Cradle of empires — Axum, Gheralta & ancient temples." },
  { id:"south",      name:"Southern Ethiopia",  e:"🪘", blurb:"Omo Valley cultures, Konso terraces & rift-valley lakes." },
  { id:"sidama",     name:"Sidama",             e:"☕", blurb:"Coffee country & the shores of Lake Hawassa." },
  { id:"afar",       name:"Afar",               e:"🌋", blurb:"Danakil — volcanoes, salt caravans & the hottest place on Earth." },
  { id:"harari",     name:"Harari",             e:"🕌", blurb:"The walled city of Harar — mosques, markets & hyenas." },
  { id:"somali",     name:"Somali",             e:"🐪", blurb:"Pastoral plains, camel markets & elephant sanctuary." },
  { id:"gambella",   name:"Gambella",           e:"🦬", blurb:"Wild rivers & the great white-eared kob migration." },
  { id:"benishangul",name:"Benishangul-Gumuz",  e:"🏗️", blurb:"Blue Nile gorges & the mighty GERD dam." },
  { id:"diredawa",   name:"Dire Dawa",          e:"🚂", blurb:"Railway city of cafés & multicultural heritage." }
];

/* Pinterest images — one per card, matched by card title */
const PIN = {
  "Yeha Temple":"img/yeha-temple.jpg",
  "Blue Nile Valley":"img/blue-nile-valley.jpg",
  "Aksum":"img/aksum.jpg",
  "Harar Jugol":"img/harar-jugol.jpg",
  "Beyaynetu":"img/beyaynetu.jpg",
  "Timket (Epiphany)":"img/timket-epiphany.jpg",
  "Awash National Park":"img/awash-national-park.jpg",
  "Genfo":"img/genfo.jpg",
  "Gambella National Park":"img/gambella-national-park.jpg",
  "Injera":"img/injera.jpg",
  "Oromia":"img/oromia.jpg",
  "Tibs":"img/tibs.jpg",
  "Shiro":"img/shiro.jpg",
  "Ethio–Djibouti Railway":"img/ethio-djibouti-railway.jpg",
  "Arba Minch — Lakes Abaya & Chamo":"img/arba-minch-lakes-abaya-chamo.jpg",
  "Erta Ale Volcano":"img/erta-ale-volcano.jpg",
  "Abijatta–Shalla Lakes":"img/abijatta-shalla-lakes.jpg",
  "Kocho":"img/kocho.jpg",
  "National Museum":"img/national-museum.jpg",
  "Amhara":"img/amhara.jpg",
  "Blue Nile Falls (Tis Issat)":"img/blue-nile-falls-tis-issat.jpg",
  "Dallol":"img/dallol.jpg",
  "Lake Hawassa":"img/lake-hawassa.jpg",
  "Ashenda":"img/ashenda.jpg",
  "Axum":"img/axum.jpg",
  "Gheralta Mountains":"img/gheralta-mountains.jpg",
  "Meskel Square":"img/meskel-square.jpg",
  "Lake Tana":"img/lake-tana.jpg",
  "Sidama Coffee Farms":"img/sidama-coffee-farms.jpg",
  "Bale Mountains National Park":"img/bale-mountains-national-park.jpg",
  "Lalibela Rock-Hewn Churches":"img/lalibela-rock-hewn-churches.jpg",
  "Baro River":"img/baro-river.jpg",
  "Gedeo Cultural Landscape":"img/gedeo-cultural-landscape.jpg",
  "Genna":"img/genna.jpg",
  "Holy Trinity Cathedral":"img/holy-trinity-cathedral.jpg",
  "Firfir":"img/firfir.jpg",
  "Jijiga":"img/jijiga.jpg",
  "Tigray":"img/tigray.jpg",
  "Fasika":"img/fasika.jpg",
  "Doro Wat":"img/doro-wat.jpg",
  "Debre Damo Monastery":"img/debre-damo-monastery.jpg",
  "Lower Valley of the Omo":"img/lower-valley-of-the-omo.jpg",
  "Enkutatash":"img/enkutatash.jpg",
  "Konso Cultural Landscape":"img/konso-cultural-landscape.jpg",
  "Gondar — Fasil Ghebbi":"img/gondar-fasil-ghebbi.jpg",
  "Entoto Park":"img/entoto-park.jpg",
  "Addis Ababa":"img/addis-ababa.jpg",
  "Sof Omar Cave":"img/sof-omar-cave.jpg",
  "Gambella":"img/gambella.jpg",
  "Eid al-Fitr & Eid al-Adha":"img/eid-al-fitr-eid-al-adha.jpg",
  "Simien Mountains National Park":"img/simien-mountains-national-park.jpg",
  "Harari":"img/harari.jpg",
  "Southern Ethiopia":"img/southern-ethiopia.jpg",
  "Danakil Depression":"img/danakil-depression.jpg",
  "Lower Valley of the Awash":"img/lower-valley-of-the-awash.jpg",
  "Wenchi Crater Lake":"img/wenchi-crater-lake.jpg",
  "Sidama":"img/sidama.jpg",
  "Afar":"img/afar.jpg",
  "Kitfo":"img/kitfo.jpg",
  "Nechisar National Park":"img/nechisar-national-park.jpg",
  "Meskel":"img/meskel.jpg",
  "Dorze Village":"img/dorze-village.jpg",
  "Dire Dawa":"img/dire-dawa.jpg",
  "Fasil Ghebbi, Gondar":"img/fasil-ghebbi-gondar.jpg",
  "Somali":"img/somali.jpg",
  "Kezira District":"img/kezira-district.jpg",
  "Hyena Feeding":"img/hyena-feeding.jpg",
  "Babille Elephant Sanctuary":"img/babille-elephant-sanctuary.jpg",
  "Irreecha":"img/irreecha.jpg",
  "Benishangul-Gumuz":"img/benishangul-gumuz.jpg",
  "Grand Ethiopian Renaissance Dam":"img/grand-ethiopian-renaissance-dam.jpg",
  "Merkato":"img/merkato.jpg",
  "Omo Valley Tribes":"img/omo-valley-tribes.jpg",
  "Tiya Stelae":"img/tiya-stelae.jpg",
  "Ethiopian Wolf":"img/ethiopian-wolf.jpg",
  "Gelada":"img/gelada.jpg",
  "Walia Ibex":"img/walia-ibex.jpg",
  "Mountain Nyala":"img/mountain-nyala.jpg",
  "Lion":"img/lion.jpg",
  "Leopard":"img/leopard.jpg",
  "Elephant":"img/elephant.jpg",
  "Buffalo":"img/buffalo.jpg",
  "Zebra":"img/zebra.jpg",
  "Hippo":"img/hippo.jpg",
  "Crocodile":"img/crocodile.jpg",
  "Hyena":"img/hyena.jpg",
  "Gazelle":"img/gazelle.jpg",
  "Blue-winged Goose":"img/blue-winged-goose.jpg",
  "Wattled Ibis":"img/wattled-ibis.jpg",
  "Thick-billed Raven":"img/thick-billed-raven.jpg",
  "Flamingo":"img/flamingo.jpg",
  "Pelican":"img/pelican.jpg",
  "Fish Eagle":"img/fish-eagle.jpg",
  "Hornbill":"img/hornbill.jpg"
};
const HERO_IMAGES = [
  "img/abijatta-shalla-lakes.jpg",
  "img/addis-ababa.jpg",
  "img/afar.jpg",
  "img/aksum.jpg",
  "img/amhara.jpg",
  "img/arba-minch-lakes-abaya-chamo.jpg",
  "img/ashenda.jpg",
  "img/awash-national-park.jpg",
  "img/axum.jpg",
  "img/babille-elephant-sanctuary.jpg",
  "img/bale-mountains-national-park.jpg",
  "img/baro-river.jpg",
  "img/benishangul-gumuz.jpg",
  "img/beyaynetu.jpg",
  "img/blue-nile-falls-tis-issat.jpg",
  "img/blue-nile-valley.jpg",
  "img/blue-winged-goose.jpg",
  "img/buffalo.jpg",
  "img/crocodile.jpg",
  "img/dallol.jpg",
  "img/danakil-depression.jpg",
  "img/debre-damo-monastery.jpg",
  "img/dire-dawa.jpg",
  "img/doro-wat.jpg",
  "img/dorze-village.jpg",
  "img/eid-al-fitr-eid-al-adha.jpg",
  "img/elephant.jpg",
  "img/enkutatash.jpg",
  "img/entoto-park.jpg",
  "img/erta-ale-volcano.jpg",
  "img/ethio-djibouti-railway.jpg",
  "img/ethiopian-wolf.jpg",
  "img/fasika.jpg",
  "img/fasil-ghebbi-gondar.jpg",
  "img/firfir.jpg",
  "img/fish-eagle.jpg",
  "img/flamingo.jpg",
  "img/gambella.jpg",
  "img/gambella-national-park.jpg",
  "img/gazelle.jpg",
  "img/gedeo-cultural-landscape.jpg",
  "img/gelada.jpg",
  "img/genfo.jpg",
  "img/genna.jpg",
  "img/gheralta-mountains.jpg",
  "img/gondar-fasil-ghebbi.jpg",
  "img/grand-ethiopian-renaissance-dam.jpg",
  "img/harari.jpg",
  "img/harar-jugol.jpg",
  "img/hippo.jpg",
  "img/holy-trinity-cathedral.jpg",
  "img/hornbill.jpg",
  "img/hyena.jpg",
  "img/hyena-feeding.jpg",
  "img/injera.jpg",
  "img/irreecha.jpg",
  "img/jijiga.jpg",
  "img/kezira-district.jpg",
  "img/kitfo.jpg",
  "img/kocho.jpg",
  "img/konso-cultural-landscape.jpg",
  "img/lake-hawassa.jpg",
  "img/lake-tana.jpg",
  "img/lalibela-rock-hewn-churches.jpg",
  "img/leopard.jpg",
  "img/lion.jpg",
  "img/lower-valley-of-the-awash.jpg",
  "img/lower-valley-of-the-omo.jpg",
  "img/merkato.jpg",
  "img/meskel.jpg",
  "img/meskel-square.jpg",
  "img/mountain-nyala.jpg",
  "img/national-museum.jpg",
  "img/nechisar-national-park.jpg",
  "img/omo-valley-tribes.jpg",
  "img/oromia.jpg",
  "img/pelican.jpg",
  "img/shiro.jpg",
  "img/sidama.jpg",
  "img/sidama-coffee-farms.jpg",
  "img/simien-mountains-national-park.jpg",
  "img/sof-omar-cave.jpg",
  "img/somali.jpg",
  "img/southern-ethiopia.jpg",
  "img/thick-billed-raven.jpg",
  "img/tibs.jpg",
  "img/tigray.jpg",
  "img/timket-epiphany.jpg",
  "img/tiya-stelae.jpg",
  "img/walia-ibex.jpg",
  "img/wattled-ibis.jpg",
  "img/wenchi-crater-lake.jpg",
  "img/yeha-temple.jpg",
  "img/zebra.jpg"
];
const PIN_UNESCO = { "Lalibela Rock-Hewn Churches": "https://i.pinimg.com/736x/e4/9d/72/e49d7219a33fabcb27c98100e616d65c.jpg" };
const pinImg = (name, cls, url) => (url || PIN[name]) ? `<img class="${cls || ""}" src="${url || PIN[name]}" alt="${name}" loading="lazy" onerror="this.remove()">` : "";

const initHeroSlideshow = () => {
  const container = $(".hero-media");
  if (!container) return;
  HERO_IMAGES.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Ethiopia scene ${index + 1}`;
    img.loading = 'lazy';
    if (index === 0) img.classList.add('active');
    container.appendChild(img);
  });

  let current = 0;
  const slides = [...container.querySelectorAll('img')];
  const changeSlide = () => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  };

  setInterval(changeSlide, 6000);
};

const DESTS = [
  /* ── Addis Ababa ── */
  { n:"National Museum", r:"addis", e:"🦴", g:"g6", c:["historical","culture"],
    d:"Home of 'Lucy' (Dinkinesh), the 3.2-million-year-old human ancestor, alongside royal treasures, religious icons and modern Ethiopian art.",
    h:["Lucy fossil","Royal artifacts","Religious treasures","Modern art gallery"], a:["Guided tours","Photography"] },
  { n:"Entoto Park", r:"addis", e:"🌲", g:"g1", c:["nature","urban"],
    d:"Forest park on Mount Entoto with panoramic views over Addis Ababa, cycling tracks, horseback riding and picnic spots.",
    a:["Hiking","Cycling","Horse riding","Picnics"] },
  { n:"Holy Trinity Cathedral", r:"addis", e:"⛪", g:"g6", c:["religious","historical"],
    d:"One of Ethiopia's most sacred Orthodox churches and the resting place of Emperor Haile Selassie.",
    a:["Architecture tours","History"] },
  { n:"Meskel Square", r:"addis", e:"🎆", g:"g2", c:["culture","urban"],
    d:"The heart of the city — host of the great Meskel bonfire festival, concerts and national celebrations.",
    a:["Festivals","People-watching"] },
  { n:"Merkato", r:"addis", e:"🛍️", g:"g5", c:["culture","urban"],
    d:"Africa's largest open-air market — spices, coffee, handicrafts and everything in between.",
    a:["Shopping","Street food","Photography"] },
  /* ── Amhara ── */
  { n:"Lalibela Rock-Hewn Churches", r:"amhara", e:"⛪", g:"g6", c:["historical","religious","unesco"],
    d:"Eleven medieval monolithic churches carved straight down into volcanic rock — the 'New Jerusalem' and a living pilgrimage site.",
    h:["11 rock churches","Underground tunnels","Night ceremonies"], a:["Pilgrimage tours","Photography"] },
  { n:"Simien Mountains National Park", r:"amhara", e:"🏔️", g:"g1", c:["nature","wildlife","adventure","unesco"],
    d:"Africa's most dramatic highlands: sheer cliffs, gelada troops, walia ibex and the rare Ethiopian wolf.",
    h:["Ras Dashen peak","Gelada baboons","Walia ibex"], a:["Trekking","Camping","Wildlife photography"] },
  { n:"Gondar — Fasil Ghebbi", r:"amhara", e:"🏰", g:"g5", c:["historical","unesco"],
    d:"The 'Camelot of Africa' — royal castles of the Fasil Ghebbi and the painted Debre Berhan Selassie church.",
    h:["Fasil Ghebbi castles","Debre Berhan Selassie","Royal baths"], a:["Castle tours","History walks"] },
  { n:"Lake Tana", r:"amhara", e:"🚤", g:"g3", c:["water","nature","religious"],
    d:"Ethiopia's largest lake and source of the Blue Nile, dotted with 30+ ancient island monasteries.",
    h:["Island monasteries","Blue Nile source","Rich birdlife"], a:["Boat trips","Birdwatching"] },
  { n:"Blue Nile Falls (Tis Issat)", r:"amhara", e:"💦", g:"g3", c:["water","nature"],
    d:"'The smoking water' — a thundering 42m cascade a short hop from Bahir Dar.",
    a:["Hiking","Photography"] },
  /* ── Oromia ── */
  { n:"Bale Mountains National Park", r:"oromia", e:"🐺", g:"g1", c:["nature","wildlife","adventure"],
    d:"Afro-alpine wilderness of the Sanetti Plateau — the best place on Earth to see the Ethiopian wolf.",
    h:["Ethiopian wolf","Mountain nyala","Giant lobelias"], a:["Hiking","Horse riding","Birdwatching","Camping"] },
  { n:"Sof Omar Cave", r:"oromia", e:"🕳️", g:"g4", c:["adventure","nature"],
    d:"Ethiopia's longest cave system, where the Web River flows beneath towering limestone chambers.",
    a:["Cave tours","Photography"] },
  { n:"Wenchi Crater Lake", r:"oromia", e:"🛶", g:"g3", c:["water","nature"],
    d:"A volcanic crater lake ringed by forest and waterfalls, with hot springs and an island church.",
    a:["Boat rides","Horse riding","Hiking"] },
  { n:"Awash National Park", r:"oromia", e:"🦁", g:"g2", c:["wildlife","nature"],
    d:"Ethiopia's oldest national park — oryx and kudu on the savanna, Awash Falls and steaming hot springs.",
    h:["Awash Falls","Hot springs","Oryx"], a:["Game drives","Camping"] },
  { n:"Abijatta–Shalla Lakes", r:"oromia", e:"🦩", g:"g3", c:["water","wildlife"],
    d:"Twin rift-valley lakes famous for flamingo flocks, pelicans and hot springs.",
    a:["Birdwatching","Photography"] },
  /* ── Tigray ── */
  { n:"Axum", r:"tigray", e:"🗿", g:"g5", c:["historical","religious","unesco"],
    d:"Ancient capital of the Axumite Empire — towering obelisks, royal tombs and the sacred Church of St. Mary of Zion.",
    h:["Obelisk field","Royal tombs","St. Mary of Zion"], a:["Archaeology tours"] },
  { n:"Gheralta Mountains", r:"tigray", e:"⛰️", g:"g2", c:["adventure","religious","nature"],
    d:"Sandstone massif hiding 30+ cliff-top rock churches with breathtaking climbs and views.",
    a:["Hiking","Climbing","Photography"] },
  { n:"Debre Damo Monastery", r:"tigray", e:"🧗", g:"g6", c:["religious","adventure"],
    d:"A 6th-century monastery atop a flat-topped amba, reached only by climbing a leather belt rope.",
    a:["Climbing","History"] },
  { n:"Yeha Temple", r:"tigray", e:"🏛️", g:"g5", c:["historical"],
    d:"Ethiopia's oldest standing building — a 2,700-year-old pre-Axumite temple.",
    a:["Archaeology"] },
  /* ── Southern Ethiopia ── */
  { n:"Konso Cultural Landscape", r:"south", e:"🌾", g:"g1", c:["culture","unesco"],
    d:"UNESCO-listed terraced landscape, fortified villages and carved waka grave statues.",
    h:["Stone terraces","Waka statues","Fortified villages"], a:["Village tours","Photography"] },
  { n:"Dorze Village", r:"south", e:"🎋", g:"g1", c:["culture"],
    d:"Famous for beehive-shaped bamboo houses that resemble elephant heads and master weavers.",
    a:["Weaving demos","Cultural stays"] },
  { n:"Arba Minch — Lakes Abaya & Chamo", r:"south", e:"🐊", g:"g3", c:["water","wildlife"],
    d:"Gateway to two great rift lakes — boat safaris past giant crocodiles and hippos at the 'Crocodile Market'.",
    a:["Boat safari","Birdwatching","Sunset cruises"] },
  { n:"Nechisar National Park", r:"south", e:"🦓", g:"g2", c:["wildlife","nature"],
    d:"Savanna plains between two lakes, home to zebras, gazelles and flamingo shores.",
    a:["Game drives","Camping"] },
  { n:"Omo Valley Tribes", r:"south", e:"🪘", g:"g5", c:["culture"],
    d:"Homeland of the Hamer, Mursi, Karo and Dassanech — living traditions, body paint and vibrant ceremonies.",
    h:["Hamer bull-jumping","Mursi lip plates","Karo body paint"], a:["Cultural tours","Market days"] },
  /* ── Sidama ── */
  { n:"Lake Hawassa", r:"sidama", e:"🐟", g:"g3", c:["water","wildlife","urban"],
    d:"A clean rift-valley lake with a lively fish market, hippos, monkeys and lakeside resorts.",
    a:["Boat tours","Birdwatching","Seafood"] },
  { n:"Sidama Coffee Farms", r:"sidama", e:"☕", g:"g1", c:["culture"],
    d:"Sidama and nearby Yirgacheffe grow some of the world's finest coffee — join a traditional ceremony at the source.",
    h:["Coffee ceremony","Farm tours","Cupping sessions"], a:["Coffee tasting","Village walks"] },
  /* ── Afar ── */
  { n:"Danakil Depression", r:"afar", e:"🌋", g:"g2", c:["adventure","nature"],
    d:"One of the hottest places on Earth — salt pans, acid pools and surreal geology below sea level.",
    h:["Salt flats","Camel caravans","Acid pools"], a:["Desert expeditions","Camping"] },
  { n:"Erta Ale Volcano", r:"afar", e:"🔥", g:"g6", c:["adventure"],
    d:"A persistent lava lake in a live volcano — an unforgettable night trek across black lava fields.",
    a:["Volcano trekking","Night hikes"] },
  { n:"Dallol", r:"afar", e:"🎨", g:"g5", c:["nature"],
    d:"The planet's most surreal landscape: neon yellow, green and orange mineral springs and salt crusts.",
    a:["Photography","4x4 tours"] },
  /* ── Harari ── */
  { n:"Harar Jugol", r:"harari", e:"🕌", g:"g6", c:["historical","culture","unesco"],
    d:"The walled old city — Islam's fourth-holiest city with 82 mosques, colorful houses and bustling markets.",
    h:["Ancient walls","82 mosques","Harari coffee"], a:["Walking tours","Shopping"] },
  { n:"Hyena Feeding", r:"harari", e:"🐾", g:"g4", c:["wildlife","culture"],
    d:"A nightly tradition outside the city walls: hand-feed wild hyenas with a fearless local guide.",
    a:["Night tours","Photography"] },
  /* ── Somali ── */
  { n:"Babille Elephant Sanctuary", r:"somali", e:"🐘", g:"g1", c:["wildlife","nature"],
    d:"Sanctuary for Ethiopia's remaining elephants, set among dramatic sandstone spires.",
    a:["Wildlife viewing","Hiking"] },
  { n:"Jijiga", r:"somali", e:"🐪", g:"g2", c:["culture","urban"],
    d:"A lively Somali city of camel markets, spicy cuisine and proud pastoral traditions.",
    a:["Markets","Food tours"] },
  /* ── Gambella ── */
  { n:"Gambella National Park", r:"gambella", e:"🦬", g:"g1", c:["wildlife","nature"],
    d:"Wild savanna on the Baro River — elephants, hippos and the thundering white-eared kob migration.",
    a:["Game drives","River safaris"] },
  { n:"Baro River", r:"gambella", e:"🚣", g:"g3", c:["water","adventure"],
    d:"Ethiopia's most navigable river — sunset boat trips past hippos and fishing villages.",
    a:["Boating","Fishing"] },
  /* ── Benishangul-Gumuz ── */
  { n:"Grand Ethiopian Renaissance Dam", r:"benishangul", e:"🏗️", g:"g3", c:["culture"],
    d:"Africa's largest hydroelectric dam on the Blue Nile — a monument of modern Ethiopia with panoramic viewpoints.",
    a:["Viewpoints","Guided tours"] },
  { n:"Blue Nile Valley", r:"benishangul", e:"🏞️", g:"g1", c:["nature","water"],
    d:"Lush river scenery along the Blue Nile — birdlife, gorges and golden-hour views.",
    a:["Nature walks","Photography"] },
  /* ── Dire Dawa ── */
  { n:"Ethio–Djibouti Railway", r:"diredawa", e:"🚂", g:"g5", c:["historical","culture"],
    d:"Colonial-era station and relics of the historic railway that built the city.",
    a:["History walks","Photography"] },
  { n:"Kezira District", r:"diredawa", e:"☕", g:"g2", c:["culture","urban"],
    d:"Tree-lined boulevards, art-deco facades, coffee houses and a beautifully mixed culture.",
    a:["Cafés","Markets"] }
];

const CAT_LABEL = {unesco:"UNESCO",historical:"Historical",religious:"Religious",nature:"Nature",
  water:"Water",wildlife:"Wildlife",adventure:"Adventure",culture:"Culture",urban:"City"};
const CATS = [
  ["all","All"],
  ["unesco","UNESCO"],
  ["historical","Historical"],
  ["religious","Religious"],
  ["nature","Nature"],
  ["water","Water"],
  ["wildlife","Wildlife"],
  ["adventure","Adventure"],
  ["culture","Culture"],
  ["urban","City"]
];
const mapsUrl = name => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' Ethiopia')}`;
const TRANSLATIONS = {
  en: {
    home:"Home",
    regions:"Regions",
    explore:"Explore",
    unesco:"UNESCO",
    festivals:"Festivals",
    cuisine:"Cuisine",
    wildlife:"Wildlife",
    contact:"Contact",
    heroKicker:"🌍 The Cradle of Humanity",
    heroTitle:"Discover Ethiopia, Land of Origins",
    heroSub:"Thirteen months of sunshine. Rock-hewn churches, smoking volcanoes, rare wildlife, ancient coffee ceremonies and festivals older than empires — across 12 unforgettable regions.",
    heroExplore:"Explore Regions",
    heroBrowse:"Browse Attractions",
    statsRegions:"Regions",
    statsAttractions:"Attractions",
    statsUNESCO:"UNESCO Sites",
    statsBirds:"Bird Species",
    quickBrowse:"Browse by Theme",
    unescoDesc:"Explore Ethiopia’s world heritage treasures.",
    festivalsDesc:"Join the country’s colorful faith and harvest celebrations.",
    cuisineDesc:"Taste iconic dishes from injera to doro wat.",
    wildlifeDesc:"Discover endemic mammals, birds and national parks.",
    regionsTitle:"Explore by Region",
    regionsSub:"From the Danakil Desert to the Omo Valley — tap a region to see its must-see places.",
    attractionsTitle:"Tourist Attractions",
    searchPlaceholder:"🔍 Search attractions… (e.g. Lalibela, volcano, coffee)",
    showingResult:"Showing {count} of {total} attractions — click a card for details, ♥ to save.",
    viewMap:"View on Google Maps",
    toastSaved:"♥ Saved “{name}” to your trip!",
    toastRemoved:"Removed “{name}”",
    toastThanks:"✉️ Thank you! We'll reply soon. (Static demo)"
  },
  am: {
    home:"መነሻ",
    regions:"ክልሎች",
    explore:"እየተመለከተ",
    unesco:"ዩኔስኮ",
    festivals:"በዓላት",
    cuisine:"ምግብ",
    wildlife:"የዱር እንስሳ",
    contact:"እያነጋገርን",
    heroKicker:"🌍 የሰው ልጅ መነሻ ቦታ",
    heroTitle:"ኢትዮጵያን ያውቁ, የመነሻ ምድር",
    heroSub:"12 ክልሎች በሙሉ የፀዳል ጊዜ፣ የድንጋይ ቤቶች፣ እሳት የተሞላ ተራሮች፣ እንስሳት እና ቡና በተጣፋጭ በዓላት ላይ.",
    heroExplore:"ክልሎችን ይመልከቱ",
    heroBrowse:"ቦታዎችን ይመልከቱ",
    statsRegions:"ክልሎች",
    statsAttractions:"ቦታዎች",
    statsUNESCO:"ዩኔስኮ ሳይቶች",
    statsBirds:"የወፎች ዝርያ",
    quickBrowse:"በርካታ ይመልከቱ",
    unescoDesc:"የዩኔስኮ ተለዋዋጭ ሥነ ቅድሚያዎችን ይጎብኙ.",
    festivalsDesc:"በቀለም የተሞላ የባህላዊ በዓላትን ይሳተፉ.",
    cuisineDesc:"ከእንጀራ እስከ ዶሮ ወት ድርጅት ይጣዩ.",
    wildlifeDesc:"ልዩ እንስሳትን እና የዱር ቦታዎችን ይገናኙ.",
    regionsTitle:"እንደ ክልል ይጎብኙ",
    regionsSub:"ከዳናኪል ክረባ እስከ ኦሞ ግራንድ — የሚገባውን ቦታ ይምረጡ.",
    attractionsTitle:"የቱሪስት ቦታዎች",
    searchPlaceholder:"🔍 ቦታዎችን ፈልጉ… (ለምሳሌ ላሊበላ, ተራራ, ቡና)",
    showingResult:"ከ{total} ቦታዎች ውስጥ {count} እየታየ ነው — ካርድ ለማየት ጠቅ ያድርጉ.",
    viewMap:"በጉግል ካርታ ይመልከቱ",
    toastSaved:"♥ “{name}” ወደ ጉዞ ተጨምሯል!",
    toastRemoved:"“{name}” ተሰርዟል",
    toastThanks:"✉️ አመሰግናለን! በቀጣይ እንመለሳለን."
  }
};
const LANG_KEY = "et-lang";
let currentLang = localStorage.getItem(LANG_KEY) || "en";
const fillTemplate = (template, values = {}) => template.replace(/\{(\w+)\}/g, (_, key) => values[key] || "");
const translateString = (key, vars = {}) => {
  const value = (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || TRANSLATIONS.en[key] || "";
  return fillTemplate(value, vars);
};
const setLanguage = lang => {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  $$("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (key) el.textContent = translateString(key);
  });
  $$("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (key) el.placeholder = translateString(key);
  });
  $$(".lang-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.lang === lang));
  renderDests();
};
const UNESCO = [["Lalibela Rock-Hewn Churches","⛪"],["Simien Mountains National Park","🏔️"],["Aksum","🗿"],
  ["Fasil Ghebbi, Gondar","🏰"],["Harar Jugol","🕌"],["Konso Cultural Landscape","🌾"],
  ["Lower Valley of the Awash","🦴"],["Lower Valley of the Omo","🪘"],["Tiya Stelae","🗿"],["Gedeo Cultural Landscape","☕"]];

const FESTIVALS = [
  ["Timket (Epiphany)","💦","January — colorful processions and the blessing of water."],
  ["Meskel","🔥","September — the great Demera bonfire marks the finding of the True Cross."],
  ["Genna","🎄","January 7 — Ethiopian Christmas with church processions and games."],
  ["Fasika","🙏","Orthodox Easter after the long fasting season — joy everywhere."],
  ["Irreecha","🌼","Oromo thanksgiving at Lake Hora — a sea of color and song."],
  ["Ashenda","👗","Girls' festival of the north with new dresses, drumming and dance."],
  ["Enkutatash","🌻","Ethiopian New Year in September — yellow adey ababa flowers everywhere."],
  ["Eid al-Fitr & Eid al-Adha","🌙","Joyful Muslim celebrations, especially vibrant in Harar."]];

const DISHES = [["Injera","🫓","Sourdough teff flatbread — the base of every meal."],
  ["Doro Wat","🍗","Spicy chicken stew, the national dish."],["Kitfo","🥩","Minced beef with mitmita & niter kibbeh."],
  ["Tibs","🍖","Sautéed beef or lamb with rosemary."],["Shiro","🥘","The beloved chickpea stew."],
  ["Beyaynetu","🥗","Colorful fasting platter of veggies."],["Firfir","🍲","Torn injera in berbere sauce."],
  ["Kocho","🌿","Southern staple from enset (false banana)."],["Genfo","🥣","Hearty porridge with spiced butter."]];

const COFFEE = ["☕ Traditional Ceremony","Sidama","Yirgacheffe","Limu","Harar","☕ 3 Rounds: Abol • Tona • Baraka"];

const MAMMALS = [
  { n:"Ethiopian Wolf", e:"🐺", en:true, f:"World's rarest canid — fewer than 500 survive on the highlands." },
  { n:"Gelada", e:"🐒", en:true, f:"The 'bleeding-heart' monkey, grazing in troops of 800." },
  { n:"Walia Ibex", e:"🐐", en:true, f:"Wild goat that clings to the sheer Simien cliffs." },
  { n:"Mountain Nyala", e:"🦌", en:true, f:"A shy antelope found only in the Bale highlands." },
  { n:"Lion", e:"🦁", f:"The king still roams Ethiopia's savannas." },
  { n:"Leopard", e:"🐆", f:"Nocturnal climber that hoists prey into trees." },
  { n:"Elephant", e:"🐘", f:"Small herds live in Babille and Gambella." },
  { n:"Buffalo", e:"🐃", f:"Powerful herds graze the Gambella savannas." },
  { n:"Zebra", e:"🦓", f:"Every individual's stripes are unique." },
  { n:"Hippo", e:"🦛", f:"Submerged days in lakes Tana, Hawassa & Chamo." },
  { n:"Crocodile", e:"🐊", f:"Nile giants sunbathe at the Crocodile Market." },
  { n:"Hyena", e:"🐾", f:"Harar's spotted hyenas are hand-fed at night." },
  { n:"Gazelle", e:"🦌", f:"Graceful speedsters of the Awash plains." }
];
const BIRDS = [
  { n:"Blue-winged Goose", e:"🪿", en:true, f:"A rare goose that grazes like a duck — endemic." },
  { n:"Wattled Ibis", e:"🐦", en:true, f:"Ethiopia's endemic cliff-dwelling ibis." },
  { n:"Thick-billed Raven", e:"🐦‍⬛", en:true, f:"One of the largest songbirds on Earth." },
  { n:"Flamingo", e:"🦩", f:"Pink clouds gather on the Rift Valley lakes." },
  { n:"Pelican", e:"🐦", f:"Great whites fish in the shallows of Lake Tana." },
  { n:"Fish Eagle", e:"🦅", f:"Its cry is the 'voice of the lake' across Africa." },
  { n:"Hornbill", e:"🦜", f:"Big-billed acrobat of the lowland forests." }
];

const TIPS = [["🗓️","Best time to visit","October–March: dry skies, perfect for trekking and northern festivals."],
  ["🛂","Visa","E-visa available online for most nationalities — check before travel."],
  ["💵","Currency","Ethiopian Birr (ETB). Carry cash outside big cities."],
  ["🗣️","Languages","Amharic is widely spoken; English is common in tourism."],
  ["✈️","Getting around","Ethiopian Airlines connects Addis to all regions; rail to Dire Dawa."],
  ["☕","Etiquette","Accept coffee when offered — it is hospitality in person."]];

/* ══════════════ STATE ══════════════ */
const state = { q:"", region:"all", cat:"all" };
let favs = new Set(JSON.parse(localStorage.getItem("et-favs") || "[]"));
const regionName = id => (REGIONS.find(r => r.id === id) || {}).name || id;

/* ══════════════ RENDERERS ══════════════ */
function renderRegions(){
  $("#regionGrid").innerHTML = REGIONS.map(r => {
    const n = DESTS.filter(d => d.r === r.id).length;
    return `<article class="region-card reveal" data-region="${r.id}" tabindex="0">
      <div class="card-img">${pinImg(r.name)}</div>
      <div class="card-body"><span class="region-emoji">${r.e}</span><h3>${r.name}</h3><p>${r.blurb}</p>
      <span class="region-count">${n} attraction${n !== 1 ? "s" : ""} →</span></div></article>`;
  }).join("");
}
function renderSelect(){
  $("#regionSelect").innerHTML = `<option value="all">🌍 All Regions</option>` +
    REGIONS.map(r => `<option value="${r.id}">${r.name}</option>`).join("");
}
function renderChips(){
  $("#catChips").innerHTML = CATS.map(([id, label]) =>
    `<button class="chip ${state.cat === id ? "active" : ""}" data-cat="${id}">${label}</button>`).join("");
}
function renderDests(){
  const q = state.q.trim().toLowerCase();
  const list = DESTS.map((d, i) => ({ ...d, i })).filter(d =>
    (state.region === "all" || d.r === state.region) &&
    (state.cat === "all" || d.c.includes(state.cat)) &&
    (!q || (d.n + " " + d.d + " " + regionName(d.r)).toLowerCase().includes(q)));
  $("#resultCount").textContent = translateString("showingResult", { count:list.length, total:DESTS.length });
  $("#emptyState").hidden = list.length > 0;
  $("#destGrid").innerHTML = list.map(d => `
    <article class="dest reveal" data-i="${d.i}">
      <div class="banner ${d.g}">${pinImg(d.n, "banner-img")}
        ${PIN[d.n] ? "" : `<span class="dest-emoji">${d.e}</span>`}
        ${d.c.includes("unesco") ? '<span class="unesco-badge" title="UNESCO World Heritage">🏅</span>' : ""}
        <button class="fav ${favs.has(d.i) ? "active" : ""}" data-fav="${d.i}" aria-label="Save">♥</button>
      </div>
      <div class="body"><span class="region-tag">${regionName(d.r)}</span><h3>${d.n}</h3><p>${d.d}</p>
        <div class="tags">${d.c.map(c => `<span>#${CAT_LABEL[c]}</span>`).join("")}</div>
        <a class="map-link" href="${mapsUrl(d.n)}" target="_blank" rel="noopener noreferrer" data-i18n="viewMap">${translateString("viewMap")}</a>
      </div>
    </article>`).join("");
  observeReveals();
}
function renderStatic(){
  $("#unescoGrid").innerHTML = UNESCO.map(([n, e]) => `<div class="unesco-card reveal">${pinImg(n, "card-thumb", PIN_UNESCO[n])}<span>${e}</span>${n}</div>`).join("");
  $("#festGrid").innerHTML = FESTIVALS.map(([n, e, d]) => `<div class="fest-card reveal">${pinImg(n, "card-thumb")}<span>${e}</span><h3>${n}</h3><p>${d}</p></div>`).join("");
  $("#dishGrid").innerHTML = DISHES.map(([n, e, d]) => `<div class="dish-card reveal">${pinImg(n, "card-thumb")}<span>${e}</span><h3>${n}</h3><p>${d}</p></div>`).join("");
  $("#coffeeList").innerHTML = COFFEE.map(c => `<span>${c}</span>`).join("");
  const animalCard = a => `<div class="animal-card reveal">
    <div class="animal-photo">${pinImg(a.n, "photo")}${a.en ? '<span class="endemic">⭐ Endemic</span>' : ""}</div>
    <div class="animal-info"><h4>${a.e} ${a.n}</h4><p>${a.f}</p></div>
  </div>`;
  $("#mammalList").innerHTML = MAMMALS.map(animalCard).join("");
  $("#birdList").innerHTML = BIRDS.map(animalCard).join("");
  $("#tipsGrid").innerHTML = TIPS.map(([e, t, d]) => `<div class="tip-card reveal"><span>${e}</span><h3>${t}</h3><p>${d}</p></div>`).join("");
}

/* ══════════════ MODAL ══════════════ */
function openModal(i){
  const d = DESTS[i];
  $("#modalBanner").className = "modal-banner " + d.g;
  $("#modalBanner").innerHTML = `${pinImg(d.n, "banner-img")}${PIN[d.n] ? "" : `<span>${d.e}</span>`}`;
  $("#modalRegion").textContent = regionName(d.r);
  $("#modalCategory").textContent = d.c.map(c => CAT_LABEL[c] || c).join(" · ");
  $("#modalMapLink").href = mapsUrl(d.n);
  $("#modalMapLink").textContent = translateString("viewMap");
  $("#modalTitle").textContent = d.n;
  $("#modalDesc").textContent = d.d;
  $("#modalHWrap").style.display = d.h ? "block" : "none";
  $("#modalHighlights").innerHTML = (d.h || []).map(x => `<li>${x}</li>`).join("");
  $("#modalActs").innerHTML = (d.a || []).map(x => `<span class="act">${x}</span>`).join("");
  $("#modal").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal(){ $("#modal").classList.remove("open"); document.body.style.overflow = ""; }

/* ══════════════ FAVORITES ══════════════ */
function updateFavCount(){ $("#favCount").textContent = `♥ ${favs.size}`; }
function toggleFav(i, btn){
  favs.has(i) ? favs.delete(i) : favs.add(i);
  localStorage.setItem("et-favs", JSON.stringify([...favs]));
  btn.classList.toggle("active", favs.has(i));
  updateFavCount();
  toast(favs.has(i) ? translateString("toastSaved", { name: DESTS[i].n }) : translateString("toastRemoved", { name: DESTS[i].n }));
}

/* ══════════════ UTILITIES ══════════════ */
let toastTimer;
function toast(msg){
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}
const io = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting){ en.target.classList.add("visible"); io.unobserve(en.target); }
}), { threshold:.12 });
function observeReveals(){ $$(".reveal:not(.visible)").forEach(el => io.observe(el)); }

/* ══════════════ EVENTS ══════════════ */
$("#regionGrid").addEventListener("click", e => {
  const card = e.target.closest(".region-card"); if (!card) return;
  state.region = card.dataset.region;
  $("#regionSelect").value = state.region;
  renderDests();
  $("#explore").scrollIntoView({ behavior:"smooth" });
});
$("#regionSelect").addEventListener("change", e => { state.region = e.target.value; renderDests(); });
$("#search").addEventListener("input", e => { state.q = e.target.value; renderDests(); });
$("#catChips").addEventListener("click", e => {
  const chip = e.target.closest(".chip"); if (!chip) return;
  state.cat = chip.dataset.cat; renderChips(); renderDests();
});
$("#destGrid").addEventListener("click", e => {
  if (e.target.closest("a")) return;
  const favBtn = e.target.closest("[data-fav]");
  if (favBtn){ e.stopPropagation(); toggleFav(+favBtn.dataset.fav, favBtn); return; }
  const card = e.target.closest(".dest");
  if (card) openModal(+card.dataset.i);
});
$("#modal").addEventListener("click", e => { if (e.target.closest("[data-close]")) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

$("#burger").addEventListener("click", () => $("#navLinks").classList.toggle("open"));
$$("#navLinks a").forEach(a => a.addEventListener("click", () => $("#navLinks").classList.remove("open")));

/* ══════════════ THEME ══════════════ */
const applyTheme = t => {
  document.documentElement.setAttribute("data-theme", t);
  $("#themeToggle").textContent = t === "dark" ? "☀️" : "🌙";
};
applyTheme(document.documentElement.getAttribute("data-theme") || "light");
$("#themeToggle").addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  localStorage.setItem("et-theme", next);
  applyTheme(next);
  toast(next === "dark" ? "🌙 Dark mode on" : "☀️ Light mode on");
});
$("#langSwitcher").addEventListener("click", e => {
  const btn = e.target.closest(".lang-btn");
  if (!btn) return;
  setLanguage(btn.dataset.lang);
});
setLanguage(currentLang);

$("#contactForm").addEventListener("submit", e => {
  e.preventDefault(); e.target.reset();
  toast("✉️ Thank you! We'll reply soon. (Static demo)");
});

window.addEventListener("scroll", () => {
  $("#navbar").classList.toggle("scrolled", scrollY > 40);
  $("#toTop").classList.toggle("show", scrollY > 600);
});
$("#toTop").addEventListener("click", () => scrollTo({ top:0, behavior:"smooth" }));

/* ══════════════ INIT ══════════════ */
renderRegions(); renderSelect(); renderChips(); renderDests(); renderStatic();
updateFavCount(); observeReveals();
initHeroSlideshow();
$("#year").textContent = new Date().getFullYear();