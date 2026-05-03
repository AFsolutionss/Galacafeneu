// Shared data for GALA prototype

const GALA_DATA = {
  brand: {
    name: "GALA",
    tagline: "Restaurant · Bar · Café",
    motto: "Essen, Trinken, Genießen — am Postplatz.",
    address: "Am Postplatz 4, 79822 Titisee-Neustadt",
    instagram: "@galarestaurantbar",
    instagramUrl: "https://www.instagram.com/galarestaurantbar/",
    mapsUrl: "https://www.google.com/maps/place/GALA+Restaurant%26Lounge/@47.9101904,8.2124005,17z",
  },

  // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  hours: [
    { day: "Montag",     short: "Mo", open: 12, close: 24 },
    { day: "Dienstag",   short: "Di", open: null, close: null }, // closed
    { day: "Mittwoch",   short: "Mi", open: 12, close: 24 },
    { day: "Donnerstag", short: "Do", open: 12, close: 24 },
    { day: "Freitag",    short: "Fr", open: 12, close: 24 },
    { day: "Samstag",    short: "Sa", open: 12, close: 26 }, // 02:00 next day
    { day: "Sonntag",    short: "So", open: 12, close: 24 },
  ],

  hoursDisplay: [
    { day: "Mo / Mi – Fr", time: "12:00 – 00:00" },
    { day: "Samstag", time: "12:00 – 02:00" },
    { day: "Sonntag", time: "12:00 – 00:00" },
    { day: "Dienstag", time: "Geschlossen" },
  ],

  nav: [
    { label: "Über uns", href: "GALA Webseite.html#about" },
    { label: "Speisekarte", href: "speisekarte.html" },
    { label: "Drinks", href: "drinks.html" },
    { label: "Galerie", href: "GALA Webseite.html#gallery" },
  ],

  menu: [
    {
      id: "snacks", label: "Snacks & Beilagen",
      items: [
        { name: "Pommes Frites", description: "Serviert mit Ketchup, Mayonnaise und unseren speziellen Saucen.", price: "5,50 €", img: "img/food-pommes.jpg" },
        { name: "Cheese Fries", description: "Knusprige Pommes, überzogen mit cremiger Cheddar-Käsesauce.", price: "6,50 €", img: "img/food-cheese.jpg" },
        { name: "Trüffel Pommes", description: "Knusprige Pommes mit feinem Trüffelaroma und frisch geriebenem Parmesan.", price: "7,50 €", img: "img/food-trueffel.jpg" },
        { name: "Süßkartoffel Pommes", description: "Knusprige Süßkartoffel-Pommes, serviert mit unserer Spezialsoße.", price: "6,00 €", img: "img/food-suesskartoffel.jpg" },
        { name: "Chicken Crispy Butter Strips", description: "6 Stück. Serviert mit Ketchup, Mayonnaise und unseren Saucen.", price: "8,90 €", img: "img/food-chicken.jpg" },
        { name: "Mozzarella Sticks", description: "Serviert mit Ketchup, Mayonnaise und unseren speziellen Saucen.", price: "6,20 €", img: "img/food-mozzarella.jpg" },
      ],
    },
    {
      id: "burger", label: "Burger",
      items: [
        { name: "Classic Burger mit Pommes", description: "125g Rindfleisch, Brioche-Brötchen, Tomaten, Gewürzgurken, Burgersauce.", price: "12,90 €" },
        { name: "Double Burger mit Pommes", description: "2× 125g Rindfleisch, Brioche-Brötchen, Tomaten, Gewürzgurken, Burgersauce.", price: "14,90 €" },
        { name: "Cheese Lover Burger mit Pommes", description: "125g Rindfleisch, Brioche-Brötchen, doppelt Käse, Tomaten, Gewürzgurken, Burgersauce.", price: "14,00 €" },
        { name: "BBQ Bacon Burger mit Pommes", description: "125g Rindfleisch, Brioche-Brötchen, Jalapeño-Käse, Zwiebeln, Champignons, Trüffel-Mayo.", price: "14,90 €" },
        { name: "Gala Burger mit Pommes", description: "125g Rindfleisch, Brioche-Brötchen, karamellisierte Zwiebeln, Champignons, Trüffel-Mayo.", price: "16,00 €" },
        { name: "Spicy Burger mit Pommes", description: "125g Rindfleisch, Brioche-Brötchen, Cheddar, Jalapeños, Sriracha-Mayo.", price: "14,90 €" },
      ],
    },
    {
      id: "chicken-burger", label: "Chicken Burger",
      items: [
        { name: "Chicken Burger mit Pommes", description: "Knuspriges Hühnchen, Brioche-Brötchen, Tomaten, Gewürzgurken, Burgersauce.", price: "13,90 €" },
        { name: "Double Chicken Burger mit Pommes", description: "2× 150g knuspriges Hühnchen, Brioche-Brötchen, Tomaten, Gewürzgurken, Burgersauce.", price: "15,90 €" },
        { name: "Hot Chicken Burger mit Pommes", description: "150g Knusperhähnchen, Brioche-Brötchen, Jalapeños, Gewürzgurken, Tomaten, Sriracha-Mayo.", price: "15,90 €" },
      ],
    },
    {
      id: "veggie", label: "Veggie Burger",
      items: [
        { name: "Veggie Burger mit Pommes", description: "Veggie-Patty, Brioche-Brötchen, Tomaten, Gewürzgurken, Burgersauce.", price: "13,90 €" },
      ],
    },
    {
      id: "extras", label: "Extras",
      items: [
        { name: "Extra Patty", description: "Zusätzliches Rindfleisch-Patty.", price: "2,00 €" },
        { name: "Extra Käse", description: "Zusätzliche Scheibe Käse.", price: "1,00 €" },
        { name: "Extra Bacon", description: "Knuspriger Bacon.", price: "1,50 €" },
        { name: "Jalapeños", description: "Scharfe Jalapeño-Scheiben.", price: "1,00 €" },
      ],
    },
    {
      id: "schnitzel", label: "Schnitzel",
      items: [
        { name: "Putenschnitzel mit Pommes", description: "Zartes Putenschnitzel, goldbraun gebraten, serviert mit Pommes Frites.", price: "15,90 €" },
        { name: "Schweineschnitzel mit Pommes", description: "Klassisches Schnitzel vom Schwein, serviert mit Pommes Frites.", price: "14,90 €" },
      ],
    },
    {
      id: "hotdogs", label: "Hot Dogs",
      items: [
        { name: "Classic Hot Dog (×2)", description: "Wiener, Senf, Ketchup, im Hot-Dog-Brötchen, mit Pommes.", price: "8,90 €" },
        { name: "New York Style Hot Dog (×2)", description: "Wiener, Senf, Zwiebeln, Sauerkraut, mit Pommes.", price: "9,50 €" },
        { name: "Chicago Style Hot Dog (×2)", description: "Wiener, Senf, Tomaten, Gurken, Jalapeños, mit Pommes.", price: "9,50 €" },
        { name: "Spicy Diablo Hot Dog (×2)", description: "Scharf & würzig — für alle, die es heiß mögen.", price: "9,50 €" },
      ],
    },
    {
      id: "salate", label: "Salate",
      items: [
        { name: "Gemischter Salat", description: "Frischer gemischter Salat mit Dressing nach Wahl.", price: "6,50 €" },
        { name: "Knuspriger Hähnchensalat", description: "Gemischter Salat mit knusprigen Hähnchenstreifen.", price: "9,50 €" },
        { name: "Thunfischsalat", description: "Frischer Salat mit Thunfisch und mediterranen Zutaten.", price: "7,50 €" },
      ],
    },
    {
      id: "desserts", label: "Desserts",
      items: [
        { name: "Käsekuchen / Schwarzwälder Kirschtorte", description: "Hausgemachtes Gebäck — Tageskuchen je nach Verfügbarkeit.", price: "4,50 €" },
        { name: "Gemischtes Eis (3 Kugeln)", description: "Auswahl nach Verfügbarkeit.", price: "4,90 €" },
        { name: "Tagessorbet", description: "Täglich wechselndes Fruchtsorbet.", price: "5,90 €" },
      ],
    },
  ],

  cocktails: [
    {
      group: "Warme Getränke",
      items: [
        { name: "Kaffee Crema", description: "", price: "3,20 €" },
        { name: "Milchkaffee", description: "", price: "3,50 €" },
        { name: "Espresso", description: "", price: "2,20 €" },
        { name: "Doppel Espresso", description: "", price: "2,80 €" },
        { name: "Latte Macchiato", description: "", price: "3,40 €" },
        { name: "Cappuccino", description: "", price: "3,40 €" },
      ],
    },
    {
      group: "Tee (verschiedene Sorten)",
      items: [
        { name: "Schwarzer Tee", description: "", price: "3,20 €" },
        { name: "Früchtetee", description: "", price: "3,20 €" },
        { name: "Pfefferminztee", description: "", price: "3,20 €" },
        { name: "Fencheltee", description: "", price: "3,20 €" },
        { name: "Kamillentee", description: "", price: "3,20 €" },
        { name: "Kräutertee", description: "", price: "3,20 €" },
      ],
    },
    {
      group: "Softdrinks",
      items: [
        { name: "Bad Dürkheimer Still / Medium 0,5 l", description: "", price: "3,50 €" },
        { name: "Coca Cola 0,33 l / 0,50 l", description: "", price: "3,00 / 3,50 €" },
        { name: "Coca Cola Zero 0,33 l / 0,50 l", description: "", price: "3,00 / 3,50 €" },
        { name: "Mezzo Mix 0,33 l / 0,50 l", description: "", price: "3,00 / 3,50 €" },
        { name: "Sprite 0,33 l / 0,50 l", description: "", price: "3,00 / 3,50 €" },
        { name: "Fanta 0,33 l / 0,50 l", description: "", price: "3,00 / 3,50 €" },
        { name: "Fanta Exotic 0,2 l", description: "", price: "3,00 €" },
        { name: "Elephant Bay Ice Tea 0,33 l", description: "", price: "3,00 €" },
        { name: "Paulaner Spezi 0,33 l", description: "", price: "3,00 €" },
        { name: "Red Bull 0,25 l", description: "", price: "3,50 €" },
        { name: "Red Bull (versch. Sorten) 0,25 l", description: "", price: "3,50 €" },
        { name: "Maloko 0,25 l", description: "", price: "3,50 €" },
        { name: "Orangina (Gelb & Rot) 0,2 l", description: "", price: "3,00 €" },
        { name: "Schweppes Bitter Lemon 0,2 l", description: "", price: "3,00 €" },
        { name: "Schweppes Tonic Water 0,2 l", description: "", price: "3,00 €" },
      ],
    },
    {
      group: "Fruchtsäfte (0,2 l)",
      items: [
        { name: "Apfelsaft / Schorle", description: "", price: "3,20 €" },
        { name: "Orangensaft / Schorle", description: "", price: "3,20 €" },
        { name: "Ananassaft / Schorle", description: "", price: "3,20 €" },
        { name: "Mangosaft / Schorle", description: "", price: "3,20 €" },
        { name: "Kirschnektar / Schorle", description: "", price: "3,20 €" },
        { name: "Maracujanektar / Schorle", description: "", price: "3,20 €" },
        { name: "Bananennektar / Schorle", description: "", price: "3,20 €" },
        { name: "KiBa (Kirsch-Bananennektar)", description: "", price: "3,20 €" },
      ],
    },
    {
      group: "Bier",
      items: [
        { name: "Fürstenberg Pils 0,33 l", description: "", price: "3,20 €" },
        { name: "Rothaus Tannenzäpfle 0,33 l", description: "", price: "3,20 €" },
        { name: "Heineken 0,33 l", description: "", price: "3,20 €" },
        { name: "Desperados 0,33 l", description: "", price: "3,50 €" },
        { name: "Weizen 0,5 l", description: "", price: "3,80 €" },
        { name: "Radler 0,33 l", description: "", price: "3,20 €" },
        { name: "Alkoholfreies Bier 0,33 l", description: "", price: "3,20 €" },
        { name: "Vom Fass 0,3 l", description: "", price: "3,20 €" },
        { name: "Vom Fass 0,5 l", description: "", price: "3,80 €" },
      ],
    },
    {
      group: "Alkoholische Cocktails",
      items: [
        { name: "Mojito", description: "", price: "6,50 €" },
        { name: "Piña Colada", description: "", price: "6,50 €" },
        { name: "Caipirinha", description: "", price: "6,50 €" },
        { name: "Malibu Beach", description: "", price: "6,50 €" },
        { name: "Sex on the Beach", description: "", price: "6,50 €" },
        { name: "Swimming Pool", description: "", price: "6,50 €" },
        { name: "Zombie", description: "", price: "6,50 €" },
      ],
    },
    {
      group: "Alkoholfreie Getränke",
      items: [
        { name: "Exotic Dream", description: "", price: "5,90 €" },
        { name: "Memphis", description: "", price: "5,90 €" },
        { name: "Virgin Mojito", description: "", price: "5,90 €" },
        { name: "Ipanema", description: "", price: "5,90 €" },
      ],
    },
    {
      group: "Wein",
      items: [
        { name: "Weißwein 0,25 l", description: "", price: "4,00 €" },
        { name: "Rotwein 0,25 l", description: "", price: "4,00 €" },
        { name: "Roséwein 0,25 l", description: "", price: "4,00 €" },
        { name: "Weinschorle 0,25 l", description: "", price: "3,50 €" },
        { name: "Wildberry Lillet 0,25 l", description: "", price: "6,50 €" },
        { name: "Hugo 0,25 l", description: "", price: "6,50 €" },
      ],
    },
    {
      group: "Longdrinks",
      items: [
        { name: "Wodka Redbull", description: "", price: "6,20 €" },
        { name: "Wodka Lemon", description: "", price: "5,90 €" },
        { name: "Wodka Orange", description: "", price: "5,90 €" },
        { name: "Gin Tonic", description: "", price: "5,90 €" },
        { name: "Jacky Cola", description: "", price: "5,90 €" },
      ],
    },
    {
      group: "Whisky / Longdrink (4 cl)",
      items: [
        { name: "Jack Daniel's", description: "", price: "5,00 €" },
        { name: "Captain Morgan", description: "", price: "5,00 €" },
        { name: "Jonnie Walker", description: "", price: "5,00 €" },
      ],
    },
    {
      group: "Shots & Liköre (2 cl)",
      items: [
        { name: "Jägermeister", description: "", price: "2,50 €" },
        { name: "Ramazzotti", description: "", price: "2,50 €" },
        { name: "Ficken", description: "", price: "2,00 €" },
        { name: "Tequila Silber", description: "", price: "2,50 €" },
        { name: "Tequila Gold", description: "", price: "2,50 €" },
        { name: "Wodka", description: "", price: "2,50 €" },
        { name: "Baileys", description: "", price: "2,50 €" },
        { name: "Marille", description: "", price: "2,50 €" },
        { name: "Gala Special", description: "", price: "2,50 €" },
      ],
    },
    {
      group: "Sekt / Prosecco",
      items: [
        { name: "Sekt (Hausmarke) 0,1 l", description: "", price: "3,50 €" },
        { name: "Prosecco Rosé 0,1 l", description: "", price: "3,50 €" },
        { name: "Aperol Spritz 0,25 l", description: "", price: "6,50 €" },
        { name: "Campari Soda 0,25 l", description: "", price: "5,00 €" },
      ],
    },
  ],

  testimonials: [
    { name: "Sarah M.", source: "Google", date: "vor 3 Wochen", rating: 5, text: "Tolles Ambiente, freundliches Personal und der Burger war einer der besten, die ich seit Langem hatte. Wir kommen wieder!" },
    { name: "Markus T.", source: "Google", date: "vor 1 Monat", rating: 5, text: "Perfekter Ort am Postplatz. Mittags zum Kaffee, abends auf einen Cocktail — passt einfach immer." },
    { name: "Lena K.", source: "Google", date: "vor 6 Wochen", rating: 5, text: "Die Trüffel Pommes sind ein Traum. Lounge-Atmosphäre am Wochenende richtig stimmig, gute Drinks." },
    { name: "Andreas H.", source: "Google", date: "vor 2 Monaten", rating: 5, text: "Endlich mal etwas Modernes in Titisee. Service aufmerksam, Karte nicht überladen — alles, was draufsteht, schmeckt." },
  ],
};

window.GALA_DATA = GALA_DATA;
