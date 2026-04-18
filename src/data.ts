import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // HOT DRINKS
  {
    id: 'h1',
    name: 'Espresso Single',
    nameKu: 'ئێسپریسۆ تاک',
    nameAr: 'إسبريسو سينجل',
    price: '3,000 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/nsB7m1BH/la-monte-espresso-single-1.png',
    description: 'A classic single shot of our premium rich espresso.',
    descKu: 'تەقەیەکی تاکە کلاسیک لە ئێسپریسۆ دەوڵەمەندە نایابەکەمان.',
    descAr: 'جرعة واحدة كلاسيكية من الإسبريسو الغني المتميز.'
  },
  {
    id: 'h2',
    name: 'Double Espresso',
    nameKu: 'ئێسپریسۆ دوو هێندە',
    nameAr: 'إسبريسو دبل',
    price: '4,000 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/HLqYwFHt/la-monte-espresso-double.png',
    description: 'A concentrated double shot of our premium roast.',
    descKu: 'تەقەیەکی دوو هێندەی چڕکراوە لە برژاوی نایابمان.',
    descAr: 'جرعة مزدوجة مركزة من التحميص المتميز لدينا.',
    rank: 'Rank #1',
    isRecommended: true
  },
  {
    id: 'h3',
    name: 'Americano',
    price: '4,500 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/7dWCGJ3c/la-monte-americano-1.png',
    description: 'Espresso shots topped with hot water for a smooth finish.'
  },
  {
    id: 'h4',
    name: 'Cappuccino',
    price: '5,000 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/svFTHJvq/la-monte-cappuccino.png',
    description: 'Perfect balance of espresso, steamed milk, and foam.'
  },
  {
    id: 'h5',
    name: 'Café Mocha',
    price: '6,000 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/Fkt2SMn6/la-monte-mocha-1.png',
    description: 'Rich espresso mixed with chocolate and steamed milk.',
    isSeasonal: true
  },
  {
    id: 'h6',
    name: 'Hot Chocolate',
    price: '4,500 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/Zp0N1N4c/la-monte-hot-chocolate.png',
    description: 'Creamy and decadent chocolate drink.'
  },
  {
    id: 'h7',
    name: 'Café Latte',
    price: '5,000 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/Y4yLvkBN/la-monte-latte.png',
    description: 'Smooth espresso with plenty of steamed milk.',
    isRecommended: true
  },
  {
    id: 'h8',
    name: 'Vanila Latte',
    price: '5,500 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/C5dt1CNt/la-monte-vanilla-latte-1.png',
    description: 'Our classic latte with a touch of sweet vanilla.'
  },
  {
    id: 'h9',
    name: 'IRISH CARAMEL LATTE',
    price: '5,500 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/TD9FRgkR/la-monte-irish-caramel-latte.png',
    description: 'Unique blend of Irish flavor and sweet caramel.'
  },
  {
    id: 'h10',
    name: 'ESPPRESO MACCHIATO Single',
    price: '3,500 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/SDnp5HGH/la-monte-espresso-macchiato-single-2.png',
    description: 'Espresso marked with a dollop of foam.'
  },
  {
    id: 'h11',
    name: 'milk',
    price: '2,000 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/Nds04xBn/la-monte-milk.png',
    description: 'Pure, fresh steamed milk.'
  },
  {
    id: 'h12',
    name: 'CARAMEL LATTE',
    price: '5,500 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/21rnh8c7/la-monte-latte-caramel.png',
    description: 'Sweet caramel swirled into our smooth latte.'
  },
  {
    id: 'h13',
    name: 'SPANISH LATTE',
    price: '6,000 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/LXqCb5vz/la-monte-la-monte-latte.png',
    description: 'Sweetened condensed milk mixed with espresso and milk.'
  },
  {
    id: 'h14',
    name: 'CORTADO',
    price: '5,000 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/v6QnG1dp/la-monte-cortado-2.png',
    description: 'Equal parts espresso and warm milk.'
  },
  {
    id: 'h15',
    name: 'COCONUT LATTE',
    price: '5,500 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/mF4M4vpw/la-monte-coconut-latte.png',
    description: 'Tropical coconut flavor in a creamy latte.'
  },
  {
    id: 'h16',
    name: 'CANNELA LATTE',
    price: '5,500 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/BKgVbKFZ/la-monte-cannela-latte.png',
    description: 'Warm cinnamon spice in a smooth latte.'
  },
  {
    id: 'h17',
    name: 'LAMONTE',
    price: '6,000 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/q35zJq4X/la-monte-la-monte-latte-1.png',
    description: 'Our signature house special hot drink.'
  },
  {
    id: 'h18',
    name: 'Turkish Coffee',
    nameKu: 'قاوەی تورکی',
    nameAr: 'قهوة تركية',
    price: '3,000 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/W4rHNNz8/la-monte-turkish-coffee-1.png',
    description: 'Traditional, strong, and finely ground coffee.',
    descKu: 'قاوەی نەریتی، بەهێز، و ورد هاڕاو.',
    descAr: 'قهوة تقليدية قوية ومطحونة ناعماً.'
  },
  {
    id: 'h19',
    name: 'PISTACHIO COFFEE',
    price: '3,000 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/VpYfFm1W/la-monte-pistachio-coffee.png',
    description: 'Unique coffee blend with rich pistachio notes.'
  },
  {
    id: 'h20',
    name: 'MENENGIÇ COFFEE',
    price: '3,000 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/VpYfFm1W/la-monte-pistachio-coffee.png',
    description: 'Traditional wild pistachio coffee.'
  },
  {
    id: 'h21',
    name: 'V60',
    price: '6,000 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/WvHF2V6c/la-monte-v60.png',
    description: 'Precision pour-over coffee for the true connoisseur.'
  },
  {
    id: 'h22',
    name: 'HIBISCUS TEA',
    price: '3,000 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/hx0dhmcS/la-monte-hibiscus-tea.png',
    description: 'Vibrant and tart herbal tea served hot.'
  },
  {
    id: 'h23',
    name: 'HOT CHOCOLATE MARSHMALLOW',
    price: '6,000 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/Zp0N1N4c/la-monte-hot-chocolate.png',
    description: 'Our hot chocolate topped with fluffy marshmallows.'
  },
  {
    id: 'h24',
    name: 'ESPRESSO AFFOGATO',
    price: '5,000 IQD',
    category: 'Hot Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/nsB7m1BH/la-monte-espresso-single-1.png',
    description: 'Espresso poured over a scoop of vanilla gelato.'
  },

  // COLD DRINKS
  {
    id: 'c1',
    name: 'ICED AMERICANO',
    price: '5,000 IQD',
    category: 'Cold Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/GfKvsfGG/la-monte-iced-americano.png',
    description: 'Chilled espresso with cold water and ice.'
  },
  {
    id: 'c2',
    name: 'COOKIES ICED LATTE',
    price: '6,000 IQD',
    category: 'Cold Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/nNs9Sns0/la-monte-cookies-iced-latte.png',
    description: 'Iced latte with a delicious cookie flavor.'
  },
  {
    id: 'c3',
    name: 'ROSA ICED LATTE',
    price: '6,000 IQD',
    category: 'Cold Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/CrL94YD/la-monte-rosa-iced-latte.png',
    description: 'Floral and sweet iced latte.'
  },
  {
    id: 'c4',
    name: 'IRISH CARAMEL ICED',
    price: '6,000 IQD',
    category: 'Cold Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/Tqppc4tg/la-monte-irish-cramel-iced.png',
    description: 'Irish cream and caramel over ice.'
  },
  {
    id: 'c5',
    name: 'HAZELNUT ICED COFFEE',
    price: '6,000 IQD',
    category: 'Cold Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/zhHWpR9R/la-monte-hazelnut-iced-coffee.png',
    description: 'Nutty hazelnut flavor in a chilled coffee.'
  },
  {
    id: 'c6',
    name: 'ICED LATTE CLASSIC',
    price: '5,000 IQD',
    category: 'Cold Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/6JnX0pP2/la-monte-iced-latte-classic.png',
    description: 'The classic iced latte experience.'
  },
  {
    id: 'c7',
    name: 'WHITE MOCHA ICED LATTE',
    price: '6,000 IQD',
    category: 'Cold Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/pB3RFpJc/la-monte-white-mocha-iced-latte.png',
    description: 'Sweet white chocolate in an iced latte.'
  },
  {
    id: 'c8',
    name: 'ICED SPANSH LATTE',
    price: '6,000 IQD',
    category: 'Cold Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/7xXFM6z4/la-monte-iced-spansh-latte.png',
    description: 'Sweet and creamy iced Spanish latte.'
  },
  {
    id: 'c9',
    name: 'ICED LATTE MACRON',
    price: '6,000 IQD',
    category: 'Cold Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/7xXFM6z4/la-monte-iced-spansh-latte.png',
    description: 'Iced latte with a hint of macaron sweetness.'
  },
  {
    id: 'c10',
    name: 'ICED MOCHA',
    price: '6,000 IQD',
    category: 'Cold Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/VW91NzPG/la-monte-iced-mocha.png',
    description: 'Chocolate and espresso over ice.'
  },
  {
    id: 'c11',
    name: 'ICED CINAMON LATTE',
    price: '6,000 IQD',
    category: 'Cold Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/FbsJQrH3/la-monte-iced-cinamon-latte.png',
    description: 'Spiced cinnamon in a cold latte.'
  },
  {
    id: 'c12',
    name: 'ICED VANILA LATTE',
    price: '6,000 IQD',
    category: 'Cold Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/8g9g91Nj/la-monte-iced-vanila-latte.png',
    description: 'Sweet vanilla in a refreshing iced latte.'
  },
  {
    id: 'c13',
    name: 'ICED COCONUT LATTE',
    price: '6,000 IQD',
    category: 'Cold Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/NnJygSHq/la-monte-iced-coconut-latte.png',
    description: 'Tropical coconut notes in an iced drink.'
  },
  {
    id: 'c14',
    name: 'ICED LATTE STRAWBERRY',
    price: '6,000 IQD',
    category: 'Cold Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/5PKKTbk/la-monte-iced-latte-strawberry-1.png',
    description: 'Fruity strawberry twist in an iced latte.'
  },
  {
    id: 'c15',
    name: 'ROSA MORANGO ICED LATTE',
    price: '6,000 IQD',
    category: 'Cold Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/MxRM50VV/la-monte-rosa-morango-iced-latte.png',
    description: 'Unique floral and strawberry iced latte.',
    isSeasonal: true
  },
  {
    id: 'c16',
    name: 'BUTTER POP CORN ICED LATTE',
    price: '6,000 IQD',
    category: 'Cold Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/xtBCshKc/la-monte-butter-pop-corn-iced-latte.png',
    description: 'Surprising butter popcorn flavor in an iced latte.'
  },
  {
    id: 'c17',
    name: 'LAMONTE COLD',
    price: '6,000 IQD',
    category: 'Cold Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/Z4PQtBs/la-monte-lamonte.png',
    description: 'Our signature house special iced drink.'
  },
  {
    id: 'c18',
    name: 'ICED CARAMEL LATTE',
    price: '6,000 IQD',
    category: 'Cold Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/rN7ZQXd/la-monte-iced-caramel-latte.png',
    description: 'Sweet caramel in a chilled latte.'
  },
  {
    id: 'c19',
    name: 'V60 ICED',
    price: '6,000 IQD',
    category: 'Cold Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/5xKmp0Zd/la-monte-v60.png',
    description: 'Precision pour-over coffee served over ice.'
  },

  // COLD BREW
  {
    id: 'cb1',
    name: 'ORANGE COLD BREW',
    price: '6,000 IQD',
    category: 'Cold Brew',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/VczB26s1/la-monte-cold-brew-1.png',
    description: 'Cold brew coffee with a zesty orange finish.'
  },
  {
    id: 'cb2',
    name: 'COLD BREW',
    price: '5,000 IQD',
    category: 'Cold Brew',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/VczB26s1/la-monte-cold-brew-1.png',
    description: 'Smooth, long-steeped cold coffee.'
  },

  // COFFEE FRAPPE
  {
    id: 'f1',
    name: 'Frappe Classic',
    price: '6,000 IQD',
    category: 'Coffee Frappe',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/pvbkL1qY/la-monte-frappe-classic.png',
    description: 'Classic blended coffee frappe.'
  },
  {
    id: 'f2',
    name: 'FRAPPE MOCHA DARK',
    price: '6,000 IQD',
    category: 'Coffee Frappe',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/jZf24P8v/la-monte-frappe-mocha-dark.png',
    description: 'Blended dark chocolate and coffee frappe.'
  },
  {
    id: 'f3',
    name: 'FRAPPE CARAMEL',
    price: '6,000 IQD',
    category: 'Coffee Frappe',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/BVFBt6Hs/la-monte-frappe-caramel.png',
    description: 'Sweet blended caramel coffee frappe.'
  },
  {
    id: 'f4',
    name: 'FRAPPE CHOCOLATE',
    price: '6,000 IQD',
    category: 'Coffee Frappe',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/6JHT2xV2/la-monte-frappe-chocolate.png',
    description: 'Rich chocolate blended frappe.'
  },
  {
    id: 'f5',
    name: 'LAMONTE FRAPPE',
    price: '6,000 IQD',
    category: 'Coffee Frappe',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/7xtmPDny/la-monte-lamonte-frappe.png',
    description: 'Our signature house special frappe.'
  },
  {
    id: 'f6',
    name: 'FRAPPE CHOCO COCONUT',
    price: '6,000 IQD',
    category: 'Coffee Frappe',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/jPtyFHCr/la-monte-frappe-choco-coconut.png',
    description: 'Chocolate and coconut blended frappe.'
  },
  {
    id: 'f7',
    name: 'POP CORN CARAMEL',
    price: '6,000 IQD',
    category: 'Coffee Frappe',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/B2BhDTT2/la-monte-pop-corn-caramel-frappe.png',
    description: 'Popcorn and caramel blended frappe.',
    isCombination: true
  },

  // MOJITO
  {
    id: 'm1',
    name: 'MOJITO STRAWBERRY',
    price: '6,000 IQD',
    category: 'Mojito',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/3y0ZHGQX/la-monte-mojito-strawberry.png',
    description: 'Refreshing strawberry mojito with mint and lime.'
  },
  {
    id: 'm2',
    name: 'CLASSIC MOJITO',
    price: '5,500 IQD',
    category: 'Mojito',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/jZDnRx6n/la-monte-classic-mojito.png',
    description: 'The original mint and lime refresher.'
  },
  {
    id: 'm3',
    name: 'MOHITO GRENADINE',
    price: '6,000 IQD',
    category: 'Mojito',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/jkCnfWWV/la-monte-mohito-grenadine.png',
    description: 'Sweet grenadine twist on the classic mojito.'
  },
  {
    id: 'm4',
    name: 'MOJITO BLUEBERRY',
    price: '6,000 IQD',
    category: 'Mojito',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/9Sxg6KD/la-monte-mojito-blueberry.png',
    description: 'Fresh blueberry mojito.'
  },
  {
    id: 'm5',
    name: 'MOJITO MONGO',
    price: '6,000 IQD',
    category: 'Mojito',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/39K3ddmF/la-monte-mojito-mongo.png',
    description: 'Tropical mango mojito.'
  },
  {
    id: 'm6',
    name: 'MOJITO CHERRY',
    price: '6,000 IQD',
    category: 'Mojito',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/jkjPVBnK/la-monte-mojito-cherry.png',
    description: 'Sweet cherry mojito.'
  },
  {
    id: 'm7',
    name: 'MOJITO TANGRENA CINNAMON',
    price: '6,000 IQD',
    category: 'Mojito',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/B2vHdvK4/la-monte-mojito-tangrena-cinnamon.png',
    description: 'Unique tangerine and cinnamon mojito.'
  },
  {
    id: 'm8',
    name: 'MOJITO PEACH APRICOT',
    price: '6,000 IQD',
    category: 'Mojito',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/tMsnnVkP/la-monte-mojito-peach-apricot.png',
    description: 'Peach and apricot mojito.'
  },
  {
    id: 'm9',
    name: 'MOJITO LA MONTE',
    price: '6,000 IQD',
    category: 'Mojito',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/FkLRz4jK/la-monte-mojito-la-monte.png',
    description: 'Our signature house special mojito.'
  },

  // SMOOTHIES
  {
    id: 's1',
    name: 'SMOOTHIE STRAWBERRY',
    price: '6,000 IQD',
    category: 'Smoothies',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/wh4GHhzm/la-monte-smoothie-strawberry.png',
    description: 'Fresh and fruity strawberry smoothie.'
  },
  {
    id: 's2',
    name: 'SMOOTHIE PASSION FRUIT',
    price: '6,000 IQD',
    category: 'Smoothies',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/fRnGdHr/la-monte-smoothie-passion-fruit.png',
    description: 'Tropical passion fruit smoothie.'
  },
  {
    id: 's3',
    name: 'SMOOTHIE MANGO',
    price: '6,000 IQD',
    category: 'Smoothies',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/hJyyfLGb/la-monte-smoothie-mango.png',
    description: 'Sweet and creamy mango smoothie.'
  },
  {
    id: 's4',
    name: 'SMOOTHIE PINEAPPLE',
    price: '6,000 IQD',
    category: 'Smoothies',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/wh4GHhzm/la-monte-smoothie-strawberry.png',
    description: 'Refreshing pineapple smoothie.'
  },
  {
    id: 's5',
    name: 'SMOOTHIE GREEN APPLE',
    price: '6,000 IQD',
    category: 'Smoothies',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/Qj7Hj12Y/la-monte-smoothie-green-apple.png',
    description: 'Tart and crisp green apple smoothie.'
  },
  {
    id: 's6',
    name: 'SMOOTHIE BLUEBERRY',
    price: '6,000 IQD',
    category: 'Smoothies',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/KjzhQj7X/la-monte-smoothie-blueberry.png',
    description: 'Antioxidant-rich blueberry smoothie.'
  },
  {
    id: 's7',
    name: 'JABUTICABA',
    price: '6,000 IQD',
    category: 'Smoothies',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/fVX38JSL/la-monte-jabuticaba.png',
    description: 'Unique Brazilian grape smoothie.'
  },
  {
    id: 's8',
    name: 'SMOOTHIE BLUEBERRY POMEGRANET',
    price: '6,000 IQD',
    category: 'Smoothies',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/5xvFF7Lm/la-monte-smoothie-blueberry-pomegranet.png',
    description: 'Blueberry and pomegranate blend.'
  },
  {
    id: 's9',
    name: 'SMOOTHIE JABUTICABA PEACH',
    price: '6,000 IQD',
    category: 'Smoothies',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/nNXc3swb/la-monte-smoothie-jabuticaba-peach.png',
    description: 'Jabuticaba and peach blend.'
  },
  {
    id: 's10',
    name: 'SMOOTHIE LA MONTE',
    price: '6,000 IQD',
    category: 'Smoothies',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/Psk4B1jk/la-monte-smoothie-la-monte.png',
    description: 'Our signature house special smoothie.'
  },

  // MILKSHAKE
  {
    id: 'ms1',
    name: 'MILKSHAKE Chocolate',
    price: '6,000 IQD',
    category: 'Milkshake',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/WvgMKbVZ/la-monte-milkshake-chocolate.png',
    description: 'Classic rich chocolate milkshake.'
  },
  {
    id: 'ms2',
    name: 'milkshake lotus',
    price: '6,000 IQD',
    category: 'Milkshake',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/5g3x8wZn/la-monte-milkshake-lotus.png',
    description: 'Biscoff Lotus cookie flavored milkshake.'
  },
  {
    id: 'ms3',
    name: 'milkshake kinder chocolate',
    price: '6,000 IQD',
    category: 'Milkshake',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/5WpdYJWD/la-monte-milkshake-kinder.png',
    description: 'Kinder chocolate flavored milkshake.'
  },
  {
    id: 'ms4',
    name: 'milkshake caramel',
    price: '6,000 IQD',
    category: 'Milkshake',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/pvb0XWgd/la-monte-milkshake-caramel.png',
    description: 'Sweet caramel milkshake.'
  },
  {
    id: 'ms5',
    name: 'MILKSHAKE VANILA SCOTCH',
    price: '6,000 IQD',
    category: 'Milkshake',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/zWT8k0wB/la-monte-milkshake-vanilla-scotch.png',
    description: 'Vanilla scotch flavored milkshake.'
  },
  {
    id: 'ms6',
    name: 'MILKSHAKE PISSION VANILA SHAKE',
    price: '6,000 IQD',
    category: 'Milkshake',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/Ndjd63N1/la-monte-milkshake-pission-vanila-shake.png',
    description: 'Passion fruit and vanilla blend shake.'
  },
  {
    id: 'ms7',
    name: 'MILKSHAKE LA MONTE',
    price: '6,000 IQD',
    category: 'Milkshake',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/ZvVkG4t/la-monte-milkshake-la-monte.png',
    description: 'Our signature house special milkshake.'
  },
  {
    id: 'ms8',
    name: 'MILKSHAKE STRAWBERRY',
    price: '6,000 IQD',
    category: 'Milkshake',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/nsVjKWMh/la-monte-milkshake-strawberry.png',
    description: 'Classic fresh strawberry milkshake.'
  },

  // RED BULL
  {
    id: 'rb1',
    name: 'REDBULL PEACH CURACAO',
    price: '6,000 IQD',
    category: 'Red Bull',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/sJp223JX/la-monte-red-bull-blueberry.png',
    description: 'Red Bull with peach and blue curacao.'
  },
  {
    id: 'rb2',
    name: 'REDBULL STRAWBERRY',
    price: '6,000 IQD',
    category: 'Red Bull',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/jqNdvnh/la-monte-red-bull-strawberry.png',
    description: 'Red Bull with fresh strawberry flavor.'
  },
  {
    id: 'rb3',
    name: 'REDBULL LA MONTE',
    price: '6,000 IQD',
    category: 'Red Bull',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/hJQSX7np/la-monte-red-bull-la-monte.png',
    description: 'Our signature house special Red Bull mix.'
  },
  {
    id: 'rb4',
    name: 'RED BULL BLUEBERRY',
    price: '6,000 IQD',
    category: 'Red Bull',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/sJp223JX/la-monte-red-bull-blueberry.png',
    description: 'Red Bull with vibrant blueberry flavor.'
  },
  {
    id: 'rb5',
    name: 'CLASSIC REDBULL',
    price: '4,000 IQD',
    category: 'Red Bull',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/7t66FFF7/la-monte-classic-redbull.png',
    description: 'The original energy boost.'
  },

  // REFRESHING DRINKS
  {
    id: 'rd1',
    name: 'PESCA FRAGOLA',
    price: '6,000 IQD',
    category: 'Refreshing Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/MxFF1TKK/la-monte-pesca-fragola.png',
    description: 'Peach and strawberry refreshing blend.'
  },
  {
    id: 'rd2',
    name: 'VERDE FRIZZANTE MATCHA',
    price: '6,000 IQD',
    category: 'Refreshing Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/1GpMx473/la-monte-verde-frizzante-matcha.png',
    description: 'Sparkling green matcha refresher.'
  },
  {
    id: 'rd3',
    name: 'MARGETA LARANGA',
    price: '6,000 IQD',
    category: 'Refreshing Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/rRTn46tB/la-monte-margeta-laranga.png',
    description: 'Orange-based refreshing drink.'
  },
  {
    id: 'rd4',
    name: 'RUBER AESTIVUS',
    price: '6,000 IQD',
    category: 'Refreshing Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/wFRspgxD/la-monte-ruber-aestivus.png',
    description: 'Summer red refreshing blend.'
  },
  {
    id: 'rd5',
    name: 'TROPSIK',
    price: '6,000 IQD',
    category: 'Refreshing Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/wZWStNdw/la-monte-tropsik.png',
    description: 'Tropical fruit refreshing mix.'
  },
  {
    id: 'rd6',
    name: 'WATERMELON STRAWBERRY LEMONADA',
    price: '6,000 IQD',
    category: 'Refreshing Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/hxB89mk4/la-monte-watermelon-strawberry-lemonada.png',
    description: 'Watermelon, strawberry, and lemon blend.'
  },
  {
    id: 'rd7',
    name: 'MABELLA',
    price: '6,000 IQD',
    category: 'Refreshing Drinks',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/Hf6WcZyT/la-monte-mabella.png',
    description: 'Unique house special refreshing drink.'
  },

  // FRESH JUICE
  {
    id: 'fj1',
    name: 'LEMON & MINT',
    price: '5,000 IQD',
    category: 'Fresh Juice',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/VYN9FXSg/la-monte-lemon-mint.png',
    description: 'Classic refreshing lemon and mint juice.'
  },
  {
    id: 'fj2',
    name: 'ORANGE',
    price: '5,000 IQD',
    category: 'Fresh Juice',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/s9DxhGTw/la-monte-orange-and-mango.png',
    description: 'Freshly squeezed orange juice.'
  },
  {
    id: 'fj3',
    name: 'ORANGE AND MANGO',
    price: '6,000 IQD',
    category: 'Fresh Juice',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/s9DxhGTw/la-monte-orange-and-mango.png',
    description: 'Fresh orange and mango blend.'
  },
  {
    id: 'fj4',
    name: 'AVOCADO JUICE',
    price: '6,000 IQD',
    category: 'Fresh Juice',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/FLVw68x2/la-monte-avocado-juice.png',
    description: 'Creamy and nutritious fresh avocado juice.'
  },
  {
    id: 'fj5',
    name: 'COCTAIL',
    price: '6,000 IQD',
    category: 'Fresh Juice',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/PsX5T7Gc/la-monte-coctail.png',
    description: 'Mixed fresh fruit cocktail juice.'
  },

  // DETOX
  {
    id: 'dx1',
    name: 'CLEAR SKIN DETOX',
    price: '5,000 IQD',
    category: 'Detox',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/prRb6yG4/la-monte-clear-skin-detox.png',
    description: 'Refreshing detox for clear skin.'
  },
  {
    id: 'dx2',
    name: 'BLOOD FLOW DETOX',
    price: '6,000 IQD',
    category: 'Detox',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/FbX0GhrC/la-monte-blood-flow-detox.png',
    description: 'Detox blend to support healthy blood flow.'
  },
  {
    id: 'dx3',
    name: 'Bloom cleanse',
    price: '6,000 IQD',
    category: 'Detox',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/wh2Ctq9R/la-monte-bloom-cleanse.png',
    description: 'Refreshing floral detox cleanse.'
  },

  // ICED TEA
  {
    id: 'it1',
    name: 'ROUGE ICED TEA',
    price: '5,000 IQD',
    category: 'Iced Tea',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/GvQkGqht/la-monte-rouge-iced-tea.png',
    description: 'Vibrant red iced tea.'
  },
  {
    id: 'it2',
    name: 'RASPBERRY ICED TEA',
    price: '5,000 IQD',
    category: 'Iced Tea',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/dw1Md3rp/la-monte-raspberry-iced-tea.png',
    description: 'Sweet and tart raspberry iced tea.'
  },
  {
    id: 'it3',
    name: 'PEACH ICED TEA',
    price: '5,000 IQD',
    category: 'Iced Tea',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/3yMGnM13/la-monte-peach-iced-tea.png',
    description: 'Classic refreshing peach iced tea.'
  },

  // TEA
  {
    id: 't1',
    name: 'Tea Single',
    price: '3,000 IQD',
    category: 'Tea',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/PGNyQdBS/la-monte-tea-single.png',
    description: 'A single cup of our premium tea.'
  },
  {
    id: 't2',
    name: 'TEA',
    price: '5,000 IQD',
    category: 'Tea',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/sJs5gXzy/la-monte-tea.png',
    description: 'Our selection of premium hot teas.'
  },
  {
    id: 't3',
    name: 'Hibiscus Tea',
    price: '5,000 IQD',
    category: 'Tea',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/hx0dhmcS/la-monte-hibiscus-tea.png',
    description: 'Vibrant and tart herbal tea.'
  },
  {
    id: 't4',
    name: 'Herbs Tea',
    price: '5,000 IQD',
    category: 'Tea',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/35tQ9krd/la-monte-herbs-tea.png',
    description: 'A soothing blend of various herbs.'
  },

  // WATER
  {
    id: 'w1',
    name: 'water',
    price: '1,000 IQD',
    category: 'Water',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/MQVQv7Q/la-monte-water.png',
    description: 'Pure bottled water.'
  },
  {
    id: 'w2',
    name: 'TONIC',
    price: '2,000 IQD',
    category: 'Water',
    mainCategory: 'Drinks',
    image: 'https://i.ibb.co/5gPWT5X3/la-monte-tonic.png',
    description: 'Refreshing tonic water.'
  },

  // SHISHA
  {
    id: 'sh1',
    name: 'SHISHA',
    price: '10,000 IQD',
    category: 'Shisha',
    mainCategory: 'Shisha',
    image: 'https://i.ibb.co/PGNyQdBS/la-monte-tea-single.png',
    description: 'Our classic shisha experience.'
  },
  {
    id: 'sh2',
    name: 'Lemon shisha',
    price: '10,000 IQD',
    category: 'Shisha',
    mainCategory: 'Shisha',
    image: 'https://i.ibb.co/d4LS0H5B/la-monte-lemon-shisha.png',
    description: 'Zesty lime flavored shisha.'
  },
  {
    id: 'sh3',
    name: 'LAMONTE SHISHA',
    price: '10,000 IQD',
    category: 'Shisha',
    mainCategory: 'Shisha',
    image: 'https://i.ibb.co/ccJXrr3q/la-monte-lamonte.png',
    description: 'Our signature house special shisha.'
  },
  {
    id: 'sh4',
    name: 'APPLE',
    price: '10,000 IQD',
    category: 'Shisha',
    mainCategory: 'Shisha',
    image: 'https://i.ibb.co/Ps6mxWf7/la-monte-shisha.png',
    description: 'Classic double apple shisha.'
  },
  {
    id: 'sh5',
    name: 'mint',
    price: '10,000 IQD',
    category: 'Shisha',
    mainCategory: 'Shisha',
    image: 'https://i.ibb.co/PGD5fTPH/la-monte-mint-1.png',
    description: 'Cool and refreshing mint shisha.'
  },
  {
    id: 'sh6',
    name: 'natural',
    price: '15,000 IQD',
    category: 'Shisha',
    mainCategory: 'Shisha',
    image: 'https://i.ibb.co/KxGmpg75/la-monte-natural.png',
    description: 'Premium natural tobacco shisha.'
  },
  {
    id: 'sh7',
    name: 'SHESHA',
    price: '5,000 IQD',
    category: 'Shisha',
    mainCategory: 'Shisha',
    image: 'https://i.ibb.co/Ps6mxWf7/la-monte-shisha.png',
    description: 'Standard shisha option.'
  },

  // SWEETS AND CAKE
  {
    id: 'sw1',
    name: 'CLASSIC CROISSANT',
    price: '5,000 IQD',
    category: 'Sweets & Cake',
    mainCategory: 'Food',
    image: 'https://i.ibb.co/5WhHB0gG/la-monte-croissant-classic.png',
    description: 'Buttery, flaky classic croissant.'
  },
  {
    id: 'sw2',
    name: 'PISTACHIO CROISSANT',
    price: '6,000 IQD',
    category: 'Sweets & Cake',
    mainCategory: 'Food',
    image: 'https://i.ibb.co/7JmGLdkk/la-monte-croissant-pistachio.png',
    description: 'Croissant filled with rich pistachio cream.'
  },
  {
    id: 'sw3',
    name: 'NUTELLA CROISSANT',
    price: '6,000 IQD',
    category: 'Sweets & Cake',
    mainCategory: 'Food',
    image: 'https://i.ibb.co/S76BKSWG/la-monte-croissant-nutella-1.png',
    description: 'Croissant filled with sweet Nutella.'
  },

  // TOASTS
  {
    id: 'tst1',
    name: 'CHEESE TOAST',
    price: '6,000 IQD',
    category: 'Toasts',
    mainCategory: 'Food',
    image: 'https://i.ibb.co/xK48sgVV/la-monte-toast-cheese.png',
    description: 'Melted cheese on perfectly toasted bread.'
  },
  {
    id: 'tst2',
    name: 'AVOCADO TOAST',
    price: '6,000 IQD',
    category: 'Toasts',
    mainCategory: 'Food',
    image: 'https://i.ibb.co/6d0049r/la-monte-avocado-toast.png',
    description: 'Smashed avocado on toasted sourdough.'
  },
  {
    id: 'tst3',
    name: 'TUNA TOAST',
    price: '6,000 IQD',
    category: 'Toasts',
    mainCategory: 'Food',
    image: 'https://i.ibb.co/MkbXjsr0/la-monte-tuna-toast.png',
    description: 'Savory tuna salad on toasted bread.'
  },
  {
    id: 'tst4',
    name: 'SMOKED TURKEY SANDWICH',
    price: '7,000 IQD',
    category: 'Toasts',
    mainCategory: 'Food',
    image: 'https://i.ibb.co/pBSMWtJX/la-monte-smoked-turkey.png',
    description: 'Premium smoked turkey with fresh greens.'
  }
];
