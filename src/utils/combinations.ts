import { MenuItem } from '../types';

/**
 * Generates daily shuffled combinations containing:
 * 1) A Drink (from Drinks)
 * 2) A Food Meal (from Toasts or Breakfast)
 * 3) A Sweet or Cake (from Sweets & Cake or Cookies)
 *
 * The selection shuffles automatically every day based on the calendar date.
 */
export function generateDailyCombinations(allItems: MenuItem[]): MenuItem[] {
  const drinks = allItems.filter(i => i.mainCategory === 'Drinks');
  const foodMeals = allItems.filter(i => i.category === 'Toasts' || i.category === 'Breakfast');
  const sweetsAndCakes = allItems.filter(i => i.category === 'Sweets & Cake' || i.category === 'COOKIES');

  if (drinks.length === 0 || foodMeals.length === 0 || sweetsAndCakes.length === 0) {
    return [];
  }

  // Derive date key (YYYY-MM-DD) in local time
  const now = new Date();
  const dateKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  
  let seed = 0;
  for (let i = 0; i < dateKey.length; i++) {
    seed = ((seed << 5) - seed + dateKey.charCodeAt(i)) >>> 0;
  }

  // Mulberry32 PRNG
  function random() {
    seed = (seed + 0x6D2B79F5) >>> 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  function shuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  const shuffledDrinks = shuffle(drinks);
  const shuffledMeals = shuffle(foodMeals);
  const shuffledSweets = shuffle(sweetsAndCakes);

  const comboTitles = [
    {
      en: 'Morning Awakening Trio',
      ku: 'تێکەڵەی بەیانیانی تایبەت',
      ar: 'توليفة إشراقة الصباح',
      rank: 'Daily Combo #1'
    },
    {
      en: 'Signature Gourmet Trio',
      ku: 'تێکەڵەی تایبەتی لا مۆنتی',
      ar: 'توليفة لا مونتي المميزة',
      rank: 'Daily Combo #2'
    },
    {
      en: 'Sweet & Savory Harmony',
      ku: 'تێکەڵەی شیرین و سوێر',
      ar: 'توليفة التناغم واللذة',
      rank: 'Daily Combo #3'
    },
    {
      en: 'Chef’s Daily Delight',
      ku: 'تێکەڵەی تایبەتی شێف',
      ar: 'توليفة الشيف اليومية',
      rank: 'Daily Combo #4'
    }
  ];

  const combos: MenuItem[] = [];
  const numCombos = Math.min(comboTitles.length, shuffledMeals.length);

  for (let idx = 0; idx < numCombos; idx++) {
    const food = shuffledMeals[idx % shuffledMeals.length];
    const drink = shuffledDrinks[idx % shuffledDrinks.length];
    const sweet = shuffledSweets[idx % shuffledSweets.length];

    // Compute prices
    const drinkPrice = parseInt(drink.price.replace(/[^0-9]/g, '')) || 0;
    const foodPrice = parseInt(food.price.replace(/[^0-9]/g, '')) || 0;
    const sweetPrice = parseInt(sweet.price.replace(/[^0-9]/g, '')) || 0;
    const totalPrice = drinkPrice + foodPrice + sweetPrice;

    // Compute calories
    const drinkCal = parseInt((drink.calories || '0').replace(/[^0-9]/g, '')) || 0;
    const foodCal = parseInt((food.calories || '0').replace(/[^0-9]/g, '')) || 0;
    const sweetCal = parseInt((sweet.calories || '0').replace(/[^0-9]/g, '')) || 0;
    const totalCal = drinkCal + foodCal + sweetCal;

    const titleMeta = comboTitles[idx];

    combos.push({
      id: `daily-combo-${idx + 1}`,
      name: `${titleMeta.en}`,
      nameKu: `${titleMeta.ku}`,
      nameAr: `${titleMeta.ar}`,
      price: `${totalPrice.toLocaleString()} IQD`,
      category: 'Breakfast',
      mainCategory: 'Food',
      image: food.image,
      thumbnail: food.thumbnail || food.image,
      description: `• Food: ${food.name} (${food.price})\n• Drink: ${drink.name} (${drink.price})\n• Sweet: ${sweet.name} (${sweet.price})`,
      descKu: `• خواردن: ${food.nameKu || food.name} (${food.price})\n• خواردنەوە: ${drink.nameKu || drink.name} (${drink.price})\n• شیرینی: ${sweet.nameKu || sweet.name} (${sweet.price})`,
      descAr: `• وجبة: ${food.nameAr || food.name} (${food.price})\n• مشروب: ${drink.nameAr || drink.name} (${drink.price})\n• حلا: ${sweet.nameAr || sweet.name} (${sweet.price})`,
      rank: titleMeta.rank,
      calories: totalCal > 0 ? `${totalCal.toLocaleString()} kcal` : undefined,
      isCombination: true,
      comboItems: [food, drink, sweet]
    });
  }

  return combos;
}
