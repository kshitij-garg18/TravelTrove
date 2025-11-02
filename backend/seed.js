const mongoose = require("mongoose");
require("dotenv").config();
const DestinationGuide = require("./models/DestinationGuide");
const TripItinerary = require("./models/TripItinerary");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/traveltrove");
    console.log("✅ Connected to MongoDB");

    // Clear existing data (optional - comment out if you want to keep existing data)
    await DestinationGuide.deleteMany({});
    await TripItinerary.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Create a test admin user (optional)
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser = await User.findOneAndUpdate(
      { email: "admin@traveltrove.com" },
      {
        email: "admin@traveltrove.com",
        password: hashedPassword,
        role: "admin",
      },
      { upsert: true, new: true }
    );

    // Create a test regular user
    const regularPassword = await bcrypt.hash("user123", 10);
    const regularUser = await User.findOneAndUpdate(
      { email: "user@test.com" },
      {
        email: "user@test.com",
        password: regularPassword,
        role: "user",
      },
      { upsert: true, new: true }
    );

    console.log("👤 Created test users");

    // Sample Destination Guides
    const destinations = [
      {
        title: "Bali, Indonesia",
        summary: "The Island of Gods offers stunning beaches, rich culture, and spiritual experiences. Perfect for relaxation and adventure seekers.",
        description: "Bali is a province of Indonesia and is located between Java to the west and Lombok to the east. It's famous for its volcanic mountains, iconic rice paddies, beaches, and coral reefs. The island is home to religious sites like the cliffside Uluwatu Temple. To the south, the beachside city of Kuta has lively bars, while Seminyak, Sanur, and Nusa Dua are popular resort towns.",
        location: "Bali, Indonesia",
        photos: [
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
          "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800",
          "https://images.unsplash.com/photo-1539622106114-0b712f1b1fea?w=800",
        ],
        lodging: [
          {
            name: "The St. Regis Bali Resort",
            type: "Luxury Resort",
            description: "Beachfront luxury resort with private villas, spa, and world-class dining. Perfect for couples and honeymooners.",
            priceRange: "$300-500/night",
            address: "Strand Beach, Nusa Dua, Bali",
          },
          {
            name: "Bambu Indah",
            type: "Boutique Hotel",
            description: "Eco-friendly boutique hotel with unique bamboo architecture. Offers a serene and sustainable stay.",
            priceRange: "$100-200/night",
            address: "Banjar Baung, Sayan, Ubud, Bali",
          },
          {
            name: "Kosta Hostel",
            type: "Hostel",
            description: "Budget-friendly hostel in the heart of Seminyak. Great for backpackers and solo travelers.",
            priceRange: "$15-30/night",
            address: "Seminyak, Bali",
          },
        ],
        dining: [
          {
            name: "Locavore",
            cuisine: "Modern Indonesian",
            description: "Award-winning restaurant serving innovative Indonesian cuisine with locally sourced ingredients.",
            priceRange: "$$$",
            address: "Jalan Dewi Sita, Ubud, Bali",
          },
          {
            name: "Warung Nia",
            cuisine: "Traditional Balinese",
            description: "Authentic Balinese food in a traditional warung setting. Try the babi guling (roast pork).",
            priceRange: "$",
            address: "Ubud, Bali",
          },
          {
            name: "La Laguna Bali",
            cuisine: "Mediterranean",
            description: "Romantic beachfront restaurant with Mediterranean-inspired dishes and sunset views.",
            priceRange: "$$",
            address: "Canggu, Bali",
          },
        ],
      },
      {
        title: "Paris, France",
        summary: "The City of Light captivates with its iconic landmarks, world-class museums, and culinary excellence. A timeless destination for romance and culture.",
        description: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré.",
        location: "Paris, France",
        photos: [
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
          "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
          "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800",
        ],
        lodging: [
          {
            name: "Hôtel Plaza Athénée",
            type: "Luxury Hotel",
            description: "Iconic 5-star hotel on Avenue Montaigne with elegant rooms, Michelin-starred restaurant, and spa.",
            priceRange: "$400-800/night",
            address: "25 Avenue Montaigne, 75008 Paris",
          },
          {
            name: "Hotel des Grands Boulevards",
            type: "Boutique Hotel",
            description: "Charming boutique hotel in the heart of Paris with stylish rooms and a trendy bar.",
            priceRange: "$150-300/night",
            address: "17 Boulevard Poissonnière, 75002 Paris",
          },
          {
            name: "Generator Paris",
            type: "Hostel",
            description: "Modern hostel with private and shared rooms. Great location near Gare du Nord.",
            priceRange: "$30-80/night",
            address: "11 Place du Colonel Fabien, 75010 Paris",
          },
        ],
        dining: [
          {
            name: "Le Comptoir du Relais",
            cuisine: "French Bistro",
            description: "Cozy bistro serving traditional French cuisine. Famous for its duck confit and wine selection.",
            priceRange: "$$",
            address: "9 Carrefour de l'Odéon, 75006 Paris",
          },
          {
            name: "L'Ambroisie",
            cuisine: "Haute Cuisine",
            description: "Three-Michelin-starred restaurant offering refined French gastronomy in an elegant setting.",
            priceRange: "$$$$",
            address: "9 Place des Vosges, 75004 Paris",
          },
          {
            name: "Breizh Cafe",
            cuisine: "Japanese-French Fusion",
            description: "Modern café known for creative galettes (savory crepes) and Japanese-inspired French cuisine.",
            priceRange: "$$",
            address: "Multiple locations in Paris",
          },
        ],
      },
      {
        title: "Tokyo, Japan",
        summary: "A vibrant blend of ancient tradition and cutting-edge modernity. Experience unique culture, incredible food, and technological wonders.",
        description: "Tokyo, Japan's bustling capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens. The city's many museums offer exhibits ranging from classical art (in the Tokyo National Museum) to a reconstructed kabuki theater (in the Edo-Tokyo Museum).",
        location: "Tokyo, Japan",
        photos: [
          "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
          "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
        ],
        lodging: [
          {
            name: "The Ritz-Carlton Tokyo",
            type: "Luxury Hotel",
            description: "World-class hotel in the heart of Roppongi with panoramic city views, Michelin-starred dining, and exceptional service.",
            priceRange: "$400-700/night",
            address: "9-7-1 Akasaka, Minato-ku, Tokyo",
          },
          {
            name: "Capsule Hotel Shibuya",
            type: "Capsule Hotel",
            description: "Unique Japanese capsule hotel experience. Compact but comfortable pods with shared facilities.",
            priceRange: "$30-50/night",
            address: "Shibuya, Tokyo",
          },
          {
            name: "Sakura Hotel Hatagaya",
            type: "Budget Hotel",
            description: "Clean and affordable hotel perfect for budget travelers. Excellent location with good transport links.",
            priceRange: "$60-100/night",
            address: "2-21-4 Hatagaya, Shibuya-ku, Tokyo",
          },
        ],
        dining: [
          {
            name: "Sukiyabashi Jiro",
            cuisine: "Sushi",
            description: "Legendary three-Michelin-starred sushi restaurant. Reservation required months in advance.",
            priceRange: "$$$$",
            address: "Ginza, Tokyo",
          },
          {
            name: "Ichiran Ramen",
            cuisine: "Ramen",
            description: "Famous tonkotsu ramen chain. Individual booths allow you to focus on your meal. Available 24/7.",
            priceRange: "$",
            address: "Multiple locations in Tokyo",
          },
          {
            name: "Nabezo Shibuya",
            cuisine: "Hot Pot (Shabu-shabu)",
            description: "All-you-can-eat shabu-shabu restaurant with high-quality meat and fresh vegetables.",
            priceRange: "$$",
            address: "Shibuya, Tokyo",
          },
        ],
      },
      {
        title: "Santorini, Greece",
        summary: "Stunning sunsets, white-washed buildings, and crystal-clear waters. A romantic paradise in the Aegean Sea.",
        description: "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera. They overlook the sea, small islands to the west, and beaches made up of black, red, and white lava pebbles.",
        location: "Santorini, Greece",
        photos: [
          "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
          "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800",
          "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=800",
        ],
        lodging: [
          {
            name: "Katikies Hotel",
            type: "Luxury Resort",
            description: "Breathtaking cliffside resort with infinity pools, spa, and private terraces overlooking the caldera.",
            priceRange: "$400-800/night",
            address: "Oia, Santorini",
          },
          {
            name: "Aegina Hotel",
            type: "Boutique Hotel",
            description: "Charming boutique hotel with traditional architecture and stunning sunset views from the terrace.",
            priceRange: "$150-300/night",
            address: "Fira, Santorini",
          },
          {
            name: "Bedspot Hostel",
            type: "Hostel",
            description: "Budget-friendly option with shared and private rooms. Great base for exploring the island.",
            priceRange: "$25-50/night",
            address: "Fira, Santorini",
          },
        ],
        dining: [
          {
            name: "Ambrosia Restaurant",
            cuisine: "Greek Mediterranean",
            description: "Fine dining with panoramic caldera views. Serves modern Greek cuisine with local ingredients.",
            priceRange: "$$$",
            address: "Oia, Santorini",
          },
          {
            name: "To Psaraki",
            cuisine: "Seafood",
            description: "Family-run seafood taverna serving the freshest catch of the day. Authentic Greek flavors.",
            priceRange: "$$",
            address: "Vlichada, Santorini",
          },
          {
            name: "Lucky's Souvlakis",
            cuisine: "Greek Street Food",
            description: "Quick and delicious souvlaki and gyros. Perfect for a budget-friendly lunch or dinner.",
            priceRange: "$",
            address: "Fira, Santorini",
          },
        ],
      },
      {
        title: "New York City, USA",
        summary: "The city that never sleeps offers world-class museums, Broadway shows, diverse neighborhoods, and iconic landmarks.",
        description: "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that's among the world's major commercial, financial, and cultural centers. Its iconic sites include skyscrapers such as the Empire State Building and sprawling Central Park. Broadway theater is staged in neon-lit Times Square.",
        location: "New York City, USA",
        photos: [
          "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
          "https://images.unsplash.com/photo-1485875437342-9b39470b3d95?w=800",
          "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800",
        ],
        lodging: [
          {
            name: "The Plaza Hotel",
            type: "Luxury Hotel",
            description: "Iconic 5-star hotel on Central Park South. Historic elegance with modern amenities.",
            priceRange: "$500-1000/night",
            address: "768 5th Ave, New York, NY 10019",
          },
          {
            name: "The Jane Hotel",
            type: "Boutique Hotel",
            description: "Quirky boutique hotel in the West Village with unique cabin-style rooms.",
            priceRange: "$150-300/night",
            address: "113 Jane St, New York, NY 10014",
          },
          {
            name: "HI NYC Hostel",
            type: "Hostel",
            description: "Large, clean hostel on the Upper West Side. Great for budget travelers and groups.",
            priceRange: "$40-80/night",
            address: "891 Amsterdam Ave, New York, NY 10025",
          },
        ],
        dining: [
          {
            name: "Eleven Madison Park",
            cuisine: "Fine Dining",
            description: "Three-Michelin-starred restaurant offering innovative plant-based cuisine in an elegant setting.",
            priceRange: "$$$$",
            address: "11 Madison Ave, New York, NY 10010",
          },
          {
            name: "Joe's Pizza",
            cuisine: "Pizza",
            description: "New York institution serving classic NY-style pizza by the slice. A must-try!",
            priceRange: "$",
            address: "Multiple locations in NYC",
          },
          {
            name: "Katz's Delicatessen",
            cuisine: "Jewish Deli",
            description: "Famous deli serving massive pastrami sandwiches and matzo ball soup since 1888.",
            priceRange: "$$",
            address: "205 E Houston St, New York, NY 10002",
          },
        ],
      },
      {
        title: "Dubai, UAE",
        summary: "Luxury shopping, ultramodern architecture, and vibrant nightlife. A dazzling desert metropolis of superlatives.",
        description: "Dubai is a city and emirate in the United Arab Emirates known for luxury shopping, ultramodern architecture, and a lively nightlife scene. Burj Khalifa, an 830m-tall tower, dominates the skyscraper-filled skyline. At its foot lies Dubai Fountain, with jets and lights choreographed to music. On man-made islands just offshore is Atlantis, The Palm, a resort with water and marine-animal parks.",
        location: "Dubai, UAE",
        photos: [
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
        ],
        lodging: [
          {
            name: "Burj Al Arab",
            type: "Luxury Resort",
            description: "Iconic 7-star hotel shaped like a sail. The ultimate luxury experience with butler service and opulent suites.",
            priceRange: "$800-2000/night",
            address: "Jumeirah Beach, Dubai",
          },
          {
            name: "Armani Hotel Dubai",
            type: "Luxury Hotel",
            description: "Sophisticated hotel in Burj Khalifa designed by Giorgio Armani. Modern elegance with stunning city views.",
            priceRange: "$400-800/night",
            address: "Burj Khalifa, Downtown Dubai",
          },
          {
            name: "Backpacker 16 Hostel",
            type: "Hostel",
            description: "Budget-friendly hostel in Bur Dubai. Clean facilities and good location for exploring.",
            priceRange: "$25-50/night",
            address: "Bur Dubai, Dubai",
          },
        ],
        dining: [
          {
            name: "At.mosphere",
            cuisine: "International Fine Dining",
            description: "Restaurant on the 122nd floor of Burj Khalifa. Breathtaking views with gourmet international cuisine.",
            priceRange: "$$$$",
            address: "Burj Khalifa, Downtown Dubai",
          },
          {
            name: "Al Ustad Special Kabab",
            cuisine: "Persian/Iranian",
            description: "Authentic Persian restaurant serving delicious kebabs and traditional Middle Eastern dishes since 1978.",
            priceRange: "$$",
            address: "Al Mankhool Road, Bur Dubai",
          },
          {
            name: "Ravi Restaurant",
            cuisine: "Pakistani",
            description: "Popular local spot for authentic Pakistani food. Famous for its curry and naan bread.",
            priceRange: "$",
            address: "Al Satwa, Dubai",
          },
        ],
      },
    ];

    // Insert destinations
    const insertedDestinations = await DestinationGuide.insertMany(destinations);
    console.log(`✅ Inserted ${insertedDestinations.length} destination guides`);

    // Sample Trip Itineraries
    const itineraries = [
      {
        destination: "Bali, Indonesia",
        duration: 7,
        activities: [
          {
            name: "Visit Tanah Lot Temple",
            description: "Explore the iconic sea temple at sunset. One of Bali's most photographed landmarks.",
            date: "Day 1",
            time: "5:00 PM",
          },
          {
            name: "Tegalalang Rice Terrace",
            description: "Walk through stunning rice paddies and learn about traditional Balinese agriculture.",
            date: "Day 2",
            time: "9:00 AM",
          },
          {
            name: "Ubud Monkey Forest",
            description: "Encounter playful long-tailed macaques in a sacred forest sanctuary.",
            date: "Day 2",
            time: "2:00 PM",
          },
          {
            name: "Snorkeling in Amed",
            description: "Discover vibrant coral reefs and marine life in the crystal-clear waters of Amed Bay.",
            date: "Day 3",
            time: "10:00 AM",
          },
          {
            name: "Mount Batur Sunrise Trek",
            description: "Early morning hike to witness a spectacular sunrise from an active volcano.",
            date: "Day 4",
            time: "2:00 AM",
          },
          {
            name: "Balinese Cooking Class",
            description: "Learn to prepare traditional Balinese dishes with a local chef.",
            date: "Day 5",
            time: "3:00 PM",
          },
          {
            name: "Relax at Seminyak Beach",
            description: "Enjoy the beach, try water sports, or simply relax with a drink at a beach club.",
            date: "Day 6",
            time: "All day",
          },
          {
            name: "Spa Day & Departure",
            description: "Traditional Balinese spa treatment before heading to the airport.",
            date: "Day 7",
            time: "10:00 AM",
          },
        ],
        lodging: [
          {
            name: "Bambu Indah",
            type: "Boutique Hotel",
            description: "Eco-friendly boutique hotel for the first 3 nights in Ubud.",
            priceRange: "$100-200/night",
            address: "Ubud, Bali",
          },
          {
            name: "Seminyak Beach Resort",
            type: "Beach Resort",
            description: "Beachfront resort for the remaining nights near the beach and nightlife.",
            priceRange: "$150-250/night",
            address: "Seminyak, Bali",
          },
        ],
        dining: [
          {
            name: "Locavore",
            cuisine: "Modern Indonesian",
            description: "Fine dining experience for a special dinner.",
            priceRange: "$$$",
            address: "Ubud, Bali",
          },
          {
            name: "Warung Nia",
            cuisine: "Traditional Balinese",
            description: "Daily authentic Balinese meals.",
            priceRange: "$",
            address: "Ubud, Bali",
          },
        ],
        userId: regularUser._id,
      },
      {
        destination: "Paris, France",
        duration: 5,
        activities: [
          {
            name: "Eiffel Tower Visit",
            description: "Climb or take the elevator to the top for panoramic views of Paris.",
            date: "Day 1",
            time: "10:00 AM",
          },
          {
            name: "Louvre Museum",
            description: "Explore the world's largest art museum, home to the Mona Lisa.",
            date: "Day 1",
            time: "2:00 PM",
          },
          {
            name: "Notre-Dame & Île de la Cité",
            description: "Visit the iconic cathedral and stroll through the historic island.",
            date: "Day 2",
            time: "9:00 AM",
          },
          {
            name: "Montmartre & Sacré-Cœur",
            description: "Explore the artistic neighborhood and climb to the basilica for city views.",
            date: "Day 2",
            time: "3:00 PM",
          },
          {
            name: "Seine River Cruise",
            description: "Evening cruise along the Seine to see Paris illuminated.",
            date: "Day 3",
            time: "8:00 PM",
          },
          {
            name: "Versailles Day Trip",
            description: "Full-day trip to the magnificent Palace of Versailles.",
            date: "Day 4",
            time: "9:00 AM",
          },
          {
            name: "Shopping & Departure",
            description: "Final day for shopping on Champs-Élysées and souvenir hunting.",
            date: "Day 5",
            time: "All day",
          },
        ],
        lodging: [
          {
            name: "Hotel des Grands Boulevards",
            type: "Boutique Hotel",
            description: "Central location perfect for exploring all Paris attractions.",
            priceRange: "$150-300/night",
            address: "Paris, France",
          },
        ],
        dining: [
          {
            name: "Le Comptoir du Relais",
            cuisine: "French Bistro",
            description: "Authentic French bistro meals throughout the trip.",
            priceRange: "$$",
            address: "Paris, France",
          },
          {
            name: "Breizh Cafe",
            cuisine: "Crepes",
            description: "Quick and delicious crepes for breakfast and lunch.",
            priceRange: "$$",
            address: "Paris, France",
          },
        ],
        userId: regularUser._id,
      },
      {
        destination: "Tokyo, Japan",
        duration: 6,
        activities: [
          {
            name: "Senso-ji Temple & Asakusa",
            description: "Visit Tokyo's oldest temple and explore the traditional Asakusa district.",
            date: "Day 1",
            time: "9:00 AM",
          },
          {
            name: "Shibuya Crossing & Hachiko Statue",
            description: "Experience the world's busiest pedestrian crossing.",
            date: "Day 1",
            time: "2:00 PM",
          },
          {
            name: "Tsukiji Outer Market",
            description: "Early morning visit to sample fresh sushi and Japanese street food.",
            date: "Day 2",
            time: "7:00 AM",
          },
          {
            name: "Harajuku & Takeshita Street",
            description: "Explore youth culture and quirky fashion boutiques.",
            date: "Day 2",
            time: "11:00 AM",
          },
          {
            name: "Tokyo Skytree",
            description: "Visit Japan's tallest tower for breathtaking city views.",
            date: "Day 3",
            time: "3:00 PM",
          },
          {
            name: "Meiji Shrine & Yoyogi Park",
            description: "Peaceful shrine dedicated to Emperor Meiji surrounded by a beautiful forest.",
            date: "Day 3",
            time: "10:00 AM",
          },
          {
            name: "Day Trip to Mount Fuji",
            description: "Full-day trip to see Japan's iconic mountain (if weather permits).",
            date: "Day 4",
            time: "7:00 AM",
          },
          {
            name: "Akihabara Electric Town",
            description: "Explore the hub for electronics, anime, and gaming culture.",
            date: "Day 5",
            time: "All day",
          },
          {
            name: "Final Shopping & Departure",
            description: "Last chance for souvenirs, snacks, and Japanese gifts.",
            date: "Day 6",
            time: "Morning",
          },
        ],
        lodging: [
          {
            name: "Sakura Hotel Hatagaya",
            type: "Budget Hotel",
            description: "Central location with easy access to all Tokyo attractions.",
            priceRange: "$60-100/night",
            address: "Tokyo, Japan",
          },
        ],
        dining: [
          {
            name: "Ichiran Ramen",
            cuisine: "Ramen",
            description: "Must-try tonkotsu ramen experience in individual booths.",
            priceRange: "$",
            address: "Multiple locations",
          },
          {
            name: "Nabezo Shibuya",
            cuisine: "Hot Pot",
            description: "All-you-can-eat shabu-shabu with premium ingredients.",
            priceRange: "$$",
            address: "Shibuya, Tokyo",
          },
        ],
        userId: regularUser._id,
      },
    ];

    // Insert itineraries
    const insertedItineraries = await TripItinerary.insertMany(itineraries);
    console.log(`✅ Inserted ${insertedItineraries.length} trip itineraries`);

    console.log("\n🎉 Seed data successfully added!");
    console.log("\nTest Users Created:");
    console.log("Admin: admin@traveltrove.com / admin123");
    console.log("User: user@test.com / user123");
    console.log("\nYou can now log in with these credentials to test the application.");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedData();
