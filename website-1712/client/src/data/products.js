import prisma from "../../../server/src/config/prisma.js";

const createProduct = async (products) => {
    console.log('createProduct!!!');
    const {
      name,
      description,
      photo,
      price,
      quantity,
      inStock,
      categoryName,
      tagNames = []
    } = products;
    console.log("categoryName being passed:", categoryName);
  
    try {
      // 1. Find or create category
      let category = await prisma.category.findUnique({ where: { name: categoryName } });
  
      if (!category) {
        console.log(`Category '${categoryName}' not found in DB. Creating it...`);
        category = await prisma.category.create({
          data: { name: categoryName },
        });
      }
  
      // 2. Create product
      console.log('Creating product with categoryId:', category.id);
      const product = await prisma.product.create({
        data: {
          name,
          description,
          photo,
          price,
          quantity,
          inStock,
          categoryId: category.id,
        },
      });
  
      // 3. Handle tags
      for (const tagName of tagNames) {
        const tag = await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        });
  
        await prisma.productTag.create({
          data: {
            productId: product.id,
            tagId: tag.id,
          },
        });
      }
  
      return ({ results: product });
  
    } catch (error) {
      console.error("❌ Error creating product with tags:", error.message);
    }
  };
const products = [
    // i have a felling tha i can get chewed or sued for those descriptions?
    // short description and long one + *disclaimer
    {
        name: "Protein Shake Formula 1 Vanilla Cream - 550 g",
        description: "A delicious and nutritious meal replacement shake designed to support a calorie-controlled diet. Packed with essential vitamins, minerals, high-quality protein, and fiber to help you feel satisfied and energized throughout your day.",
        price: 95,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Protein", "Meal Replacement", "Weight Loss", "Vitamins", "Fiber"]
    },
    {
        name: "Protein Shake Formula 1 Vanilla Cream - 780 g",
        description: "A delicious and nutritious meal replacement shake designed to support a calorie-controlled diet. Packed with essential vitamins, minerals, high-quality protein, and fiber to help you feel satisfied and energized throughout your day.",
        price: 127,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Protein", "Meal Replacement", "Weight Loss", "Vitamins", "Fiber"]
    },
   
    {
        name: "Xtra-Cal - 90 tablets",
        description: "Xtra-Cal® is a daily food supplement that’s exclusively formulated with Calcium and a blend of other carefully selected minerals such as Magnesium, Copper, Manganese and Zinc. Xtra-Cal® also contains Vitamin D, which helps support normal calcium absorption and its normal blood level. In addition, Vitamin D contributes to the maintenance of normal muscle function. Getting enough calcium is needed for the maintenance of normal bones and teeth. This Calcium-rich dietary supplement comes in convenient tablets that you can incorporate into your daily routine with ease. Simply take one tablet with each main meal. A daily serving of 3 tablets provides you with over 100 % of your Calcium RI.",
        price: 41,
        quantity: 50,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Vitamins", "Minerals", "Calcium", "Bone Health"]
    },
    {
        name: "Night Mode",
        description: "Enjoy a relaxing evening with Night Mode, a food supplement infused with scientifically studied saffron extract, created for your night-time routine. Night Mode is expertly formulated with a blend of carefully selected vitamins to help support normal psychological function and the maintenance of the normal function of the nervous system. Immerse yourself in a moment of mindfulness with Night Mode. Savour the warm subtle flavours of chamomile and peach as you wind down for the evening. Vitamin B6 and Vitamins B6 and Riboflavin.",
        price: 114,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Sleep Support", "Wellness", "Vitamins"]
    },
    {
        name: "Immune Booster - 21 sachet",
        description: "Immune Booster is a powdered supplement formulated with EpiCor®, a leading whole food fermentate, plus essential vitamins and minerals like Vitamin C, Selenium, Zinc, and Vitamin D. It supports your immune system, protects cells from oxidative stress, and boosts your daily defence. Enjoy a delicious berry flavour in convenient sachets—perfect for on-the-go use.",
        price: 75,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Immunity", "Vitamins", "Detox"]
    },
    {
        name: "Microbiotic Max - 20 sachet",
        description: "Microbiotic Max is a powdered supplement with live bacteria and fibre to support your nutrition goals. It contains 2 billion live bacteria from Bifidobacterium lactis and Lactobacillus helveticus strains, and is high in fibre.",
        price: 96,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Probiotics", "Fiber", "Gut Health"]
    },
    {
        name: "H24 Achieve Protein bars - Dark chocolate - 6 bars",
        description: `A protein-packed, low-sugar bar designed for active lifestyles. Each bar provides 20g of high-quality whey and milk protein to support muscle growth and recovery — the perfect snack pre- or post-workout.`,
        price: 42,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Protein", "Post-Workout", "Fitness"]
    },
    {
        name: "F2 Vitamin & Mineral Complex WOMEN - 60 tablets",
        description: "Specially formulated to meet the daily nutritional needs of women, this expert-developed supplement delivers 24 essential micronutrients to support overall wellbeing. Key nutrients such as Vitamin B6 contribute to hormonal balance, Vitamin B12 supports energy metabolism, and Zinc helps maintain healthy bones, skin, hair, and nails — all in one convenient daily tablet.",
        price: 54,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Vitamins", "Minerals", "Immunity", "Wellness"]
    },
    {
        name: "F2 Vitamin & Mineral Complex MEN - 60 tablets",
        description: "Designed to support the unique nutritional requirements of men, this comprehensive formula provides 24 vital micronutrients. It includes nutrients like Vitamin C and A to support immune health, Magnesium for muscle function, Vitamin B12 for energy production, and Vitamin B5 for mental performance — helping you stay sharp, strong, and active every day.",
        price: 54,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Vitamins", "Minerals", "Immunity", "Energy Boost"]
    },
    {
        name: "Protein Drink Mix Vegan - 560 g",
        description: "Plant-powered protein to complement your shake or enjoy on its own. A clean, vegan-friendly source of protein designed to satisfy hunger and support energy throughout the day.",
        price: 109,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Protein", "Vegan"]
    },
    {
        name: "Protein Drink Mix Vegan sashets - 7 pcs",
        description: "Plant-powered protein to complement your shake or enjoy on its own. A clean, vegan-friendly source of protein designed to satisfy hunger and support energy throughout the day.",
        price: 48,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Protein", "Vegan"]
    },
    {
        name: "Protein Drink Mix",
        description: "Boost your daily protein intake with 15g of high-quality soy protein per serving. Enjoy it alone or add it to your Formula 1 shake to reach 24g of protein, helping you stay full and energized.",
        price: 114,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Protein", "Energy Boost"]
    },
    {
        name: "Formula 1 Express Bars - 7 bars",
        description: `Great-tasting meal replacement with protein and fiber Enjoy the Formula 1 experience in a convenient bar option. Contains 21 vitamins and minerals  15 g of protein per serving  4 g of fiber to help support weight management. Individually wrapped for on-the-go use`,
        price: 48,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Protein", "Meal Replacement", "Weight Loss"]
    },
    {
        name: "Formula 3 Personalized Protein Powder",
        description: `Personalized Protein Powder is a high-quality,
        nutrient-dense protein blend that supports your weight-
        management and fitness goals. Increased protein intake
        helps you feel fuller longer and maintain your energy level
        between meals. Helps build and maintain
        lean muscle mass. 5 g of soy and whey
        protein, providing all
        9 essential amino acids. And low glycemic`,
        price: 76,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Protein", "Muscle Building", "Fitness"]
    },
    {
        name: "Herbal Aloe Concentrate",
        description: `A refreshing aloe-based drink that soothes the stomach, promotes digestion, and supports nutrient absorption. Mix with water for a delicious, low-glycemic way to stay hydrated and balanced.`,
        price: 81,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Detox", "Digestion", "Hydration"]
    },
    {
        name: "Instant Herbal Tea Drink - Original - 102 g",
        description: "A revitalizing herbal tea with 87.5mg of caffeine per serving to boost alertness and focus. Ideal for mornings or an afternoon pick-me-up — low in calories and bursting with flavor.",
        price: 118,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Energy Boost", "Hydration", "Wellness"]
    },
    {
        name: "Instant Herbal Tea Drink - Original - 51 g",
        description: "A revitalizing herbal tea with 87.5mg of caffeine per serving to boost alertness and focus. Ideal for mornings or an afternoon pick-me-up — low in calories and bursting with flavor. ",
        price: 82,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Energy Boost", "Hydration", "Wellness"]
    },
    {
        name: "Oat Apple Fiber",
        description: ` Deliciously boost your fiber intake with 6g of fiber per serving. A blend of oat and apple fibers to support digestive health, regularity, and gut balance. `,
        price: 76,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Fiber", "Digestion", "Gut Health"]
    },
    {
        name: "Phyto complete - 60 pills",
        description: `A premium blend of phytonutrients, Fiit-NS™ plant extracts, and key vitamins. Formulated with natural caffeine, Vitamin C, B3, and chromium to support metabolism, energy, and glucose balance.`,
        price: 130,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Detox", "Metabolism", "Energy Boost", "Vitamins"]
    },
    {
        name: "Herbalifeline Max - 30 pills",
        description: `A potent omega-3 supplement with EPA and DHA to support heart health, brain function, and vision. Promotes healthy triglyceride levels.`,
        price: 62,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Omega-3", "Heart Health", "Brain Support"]
    },
    {
        name: "Beta heart",
        description: `Support your heart health with Beta Heart® — a sugar-free blend rich in fiber and protein, including 3g of oat beta-glucans per serving. Beta-glucans help lower or maintain healthy cholesterol levels.`,
        price: 100,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Heart Health", "Fiber", "Cholesterol Support"]
    },
    {
        name: "LiftOff - Lemonlime - 10",
        description: `An energy-boosting tablet infused with Panax ginseng, guarana, caffeine, and B vitamins. Designed to enhance mental focus, reduce fatigue, and support cognitive performance.`,
        price: 81,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Energy Boost", "Focus", "Vitamins"]
    },
    {
        name: "CR7 Drive Canister - 20 Servings - Acai Berry 540g ",
        description: `Hydrate and refuel with electrolytes and B12 for active performance. Developed to enhance endurance and support metabolism, this refreshing drink keeps you going during intense activity.`,
        price: 48,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Hydration", "Fitness", "Exercise", "Energy Boost"]
    },
    {
        name: "Protein Bar - Choco Peanut - 14 bars",
        description: `A chewy, chocolate-covered snack bar with 10g of milk protein and essential vitamins. Perfect for curbing cravings while boosting your protein intake — a guilt-free way to stay energized.`,
        price: 58,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Protein", "Snack", "Fitness", "Muscle Building"]
    },


    // Cosmetics Products except the first one - Collagen Skin Booster is drinkable
    {
        name: "Collagen Skin Booster",
        description: "Experience beauty from the inside out. A blend of science and taste, Collagen Skin Booster is expertly formulated using high-grade collagen peptides* called VERISOL® P*, that help to reduce eye wrinkles and improve skin elasticity after four weeks. Collagen Skin Booster is not just a quick fix, it’s expert nutrition for your skin that is backed by science. With a refreshing strawberry and lemon flavour, Collagen Skin Booster is a powdered food supplement that is high in key vitamins and minerals, such as Biotin, Iodine, Vitamin A, Niacin and Zinc, which contribute to the maintenance of normal skin. Collagen Skin Booster also contains Selenium which, in combination with Zinc, contributes to the maintenance of normal hair and nails. Collagen Skin Booster is designed to complement your beauty regime so you can use it alongside your existing skincare routine. Try it today and turn this delicious beauty drink into your new favourite beauty secret.",
        price: 124,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Supplements",
        tagNames: ["Protein", "Meal Replacement", "Healthy"]
    },
    {
        name: "Soothing Aloe Cleanser",
        description: " ",
        price: 52,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Cosmetics",
        tagNames: ["Protein", "Meal Replacement", "Healthy"]
    },
    {
        name: "Polishing Citrus Cleanser",
        description: " ",
        price: 52,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Cosmetics",
        tagNames: ["Protein", "Meal Replacement", "Healthy"]
    },
    {
        name: "Energizing Herbal Toner",
        description: " ",
        price: 39,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Cosmetics",
        tagNames: ["Protein", "Meal Replacement", "Healthy"]
    },
    {
        name: "Line Minimizing Serum (50 ml)",
        description: " ",
        price: 134,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Cosmetics",
        tagNames: ["Protein", "Meal Replacement", "Healthy"]
    },
    {
        name: "Daily Glow Moisturizer (50 ml)",
        description: " ",
        price: 101,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Cosmetics",
        tagNames: ["Protein", "Meal Replacement", "Healthy"]
    },
    {
        name: "Firming Eye Gel",
        description: " ",
        price: 81,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Cosmetics",
        tagNames: ["Protein", "Meal Replacement", "Healthy"]
    },
    {
        name: "Hydrating Eye Cream",
        description: " ",
        price: 81,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Cosmetics",
        tagNames: ["Protein", "Meal Replacement", "Healthy"]
    },
    {
        name: "Purifying Mint Clay Mask",
        description: " ",
        price: 44,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Cosmetics",
        tagNames: ["Protein", "Meal Replacement", "Healthy"]
    },
    {
        name: "Replenishing Night Cream (50 ml)",
        description: " ",
        price: 101,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Cosmetics",
        tagNames: ["Protein", "Meal Replacement", "Healthy"]
    },
    {
        name: "Protective Moisturizer SPF 30 (50 ml)",
        description: " ",
        price: 101,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Cosmetics",
        tagNames: ["Protein", "Meal Replacement", "Healthy"]
    },
    {
        name: "Herbal Aloe Soothing Gel",
        description: `Moisturizes and
        soothes skin
        • Shown to leave skin smoother
        and softer 
        • Infused with aloe vera and
        skin-conditioning botanicals to
        moisturize and soothe skin
        • No added fragrance`,
        price: 28,
        quantity: 0,
        inStock: true,
        photo: "...",
        categoryName: "Cosmetics",
        tagNames: ["Protein", "Meal Replacement", "Healthy"]
    },

];


const addAll= async(products)=> {
    for (const p of products) {
        await createProduct(p);
    }  
}
// addAll(products)