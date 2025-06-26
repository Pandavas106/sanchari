// ignore_for_file: deprecated_member_use

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'theme_controller.dart';

class ExploreScreen extends StatelessWidget {
  final bool isDark;
  final Color navy;
  final Color gold;
  final Color blue = const Color.fromARGB(255, 68, 93, 245);

  const ExploreScreen({
    super.key,
    required this.isDark,
    required this.navy,
    required this.gold,
  });

  @override
  Widget build(BuildContext context) {
    final theme = ThemeController.of(context);
    final isDark = theme.isDark;
    final setTheme = theme.setTheme;

    final welcomeGradient = const LinearGradient(
      colors: [Color(0xFFF4E2B8), Color(0xFFF5F6FA), Color(0xFFD1D9F6)],
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
    );

    final darkGradient = const LinearGradient(
      colors: [Color(0xFF232946), Color(0xFF181A2A), Color(0xFF2D3250)],
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
    );

    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: isDark ? darkGradient : welcomeGradient,
        ),
        child: SafeArea(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Top Row with Theme Toggle
                Row(
                  children: [
                    Text(
                      "Explore",
                      style: GoogleFonts.playfairDisplay(
                        color: isDark ? Colors.white : navy,
                        fontWeight: FontWeight.bold,
                        fontSize: 22,
                      ),
                    ),
                    const Spacer(),
                    IconButton(
                      icon: Icon(
                        isDark
                            ? Icons.light_mode_rounded
                            : Icons.dark_mode_rounded,
                        color: isDark ? gold : blue, // <-- changed
                      ),
                      tooltip:
                          isDark
                              ? "Switch to Light Mode"
                              : "Switch to Dark Mode",
                      onPressed: () {
                        setTheme(!isDark);
                      },
                    ),
                    Container(
                      decoration: BoxDecoration(
                        color: isDark ? navy.withOpacity(0.08) : Colors.white,
                        shape: BoxShape.circle,
                      ),
                      child: IconButton(
                        icon: Icon(
                          Icons.tune_rounded,
                          color: isDark ? gold : blue,
                        ), // <-- changed
                        onPressed: () {},
                      ),
                    ),
                    const SizedBox(width: 8),
                    Container(
                      decoration: BoxDecoration(
                        color: isDark ? navy.withOpacity(0.08) : Colors.white,
                        shape: BoxShape.circle,
                      ),
                      child: IconButton(
                        icon: Icon(
                          Icons.notifications_none_rounded,
                          color: isDark ? gold : blue,
                        ), // <-- changed
                        onPressed: () {},
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 18),
                // Search Bar
                Container(
                  decoration: BoxDecoration(
                    color: isDark ? navy.withOpacity(0.7) : Colors.white,
                    borderRadius: BorderRadius.circular(14),
                  ),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 14,
                    vertical: 8,
                  ),
                  child: Row(
                    children: [
                      Icon(
                        Icons.search_rounded,
                        color: isDark ? gold : navy.withOpacity(0.7),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: TextField(
                          decoration: InputDecoration(
                            hintText:
                                "Search destinations, hotels, activities...",
                            hintStyle: GoogleFonts.inter(
                              color:
                                  isDark
                                      ? Colors.white54
                                      : navy.withOpacity(0.5),
                              fontSize: 15,
                            ),
                            border: InputBorder.none,
                          ),
                          style: GoogleFonts.inter(
                            color: isDark ?  navy:Colors.white,
                            fontSize: 15,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 18),
                // Filter Chips
                SizedBox(
                  height: 38,
                  child: ListView(
                    scrollDirection: Axis.horizontal,
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(right: 10),
                        child: ChoiceChip(
                          label: Text(
                            "All",
                            style: GoogleFonts.inter(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          selected: true,
                          selectedColor: isDark ? gold : blue, // <-- changed
                          backgroundColor:
                              isDark ? navy.withOpacity(0.08) : Colors.white,
                          labelStyle: TextStyle(
                            color: isDark ?  navy: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                          onSelected: (_) {},
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(right: 10),
                        child: ChoiceChip(
                          label: Text("Hotels", style: GoogleFonts.inter()),
                          selected: false,
                          selectedColor: navy,
                          backgroundColor:
                              isDark ? navy.withOpacity(0.08) : Colors.white,
                          labelStyle: TextStyle(
                            color: isDark ? Colors.white : navy,
                          ),
                          onSelected: (_) {},
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(right: 10),
                        child: ChoiceChip(
                          label: Text("Activities", style: GoogleFonts.inter()),
                          selected: false,
                          selectedColor: navy,
                          backgroundColor:
                              isDark ? navy.withOpacity(0.08) : Colors.white,
                          labelStyle: TextStyle(
                            color: isDark ? Colors.white : navy,
                          ),
                          onSelected: (_) {},
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(right: 10),
                        child: ChoiceChip(
                          label: Text(
                            "Restaurants",
                            style: GoogleFonts.inter(),
                          ),
                          selected: false,
                          selectedColor: navy,
                          backgroundColor:
                              isDark ? navy.withOpacity(0.08) : Colors.white,
                          labelStyle: TextStyle(
                            color: isDark ? Colors.white : navy,
                          ),
                          onSelected: (_) {},
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 18),
                // Featured This Week
                Text(
                  "Featured This Week",
                  style: GoogleFonts.playfairDisplay(
                    color: isDark ? Colors.white : navy,
                    fontWeight: FontWeight.bold,
                    fontSize: 17,
                  ),
                ),
                const SizedBox(height: 12),
                Container(
                  decoration: BoxDecoration(
                    color: isDark ? navy : Colors.white,
                    borderRadius: BorderRadius.circular(18),
                    image: const DecorationImage(
                      image: AssetImage("assets/alps.jpg"),
                      fit: BoxFit.cover,
                    ),
                  ),
                  height: 140,
                  child: Stack(
                    children: [
                      Positioned.fill(
                        child: Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(18),
                            color: Colors.black.withOpacity(0.25),
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 8,
                                vertical: 2,
                              ),
                              decoration: BoxDecoration(
                                color: isDark ? gold : blue, // <-- changed
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Text(
                                "Featured",
                                style: GoogleFonts.inter(
                                  color: isDark ? navy : Colors.white, // <-- changed
                                  fontWeight: FontWeight.bold,
                                  fontSize: 12,
                                ),
                              ),
                            ),
                            const Spacer(),
                            Text(
                              "Swiss Alps Luxury",
                              style: GoogleFonts.playfairDisplay(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 18,
                              ),
                            ),
                            Text(
                              "5-star mountain resort • Starting from \$450/night",
                              style: GoogleFonts.inter(
                                color: Colors.white,
                                fontSize: 13,
                              ),
                            ),
                            Row(
                              children: [
                                Icon(Icons.star, color: isDark?gold:blue, size: 16),
                                const SizedBox(width: 4),
                                Text(
                                  "4.9",
                                  style: GoogleFonts.inter(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 13,
                                  ),
                                ),
                                const SizedBox(width: 8),
                                Text(
                                  "Zermatt, Switzerland",
                                  style: GoogleFonts.inter(
                                    color: Colors.white,
                                    fontSize: 13,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 22),
                // Trending Destinations
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "Trending Destinations",
                      style: GoogleFonts.playfairDisplay(
                        color: isDark ? Colors.white : navy,
                        fontWeight: FontWeight.bold,
                        fontSize: 17,
                      ),
                    ),
                    Text(
                      "See All",
                      style: GoogleFonts.inter(
                        color: isDark ? gold : blue, // <-- changed
                        fontWeight: FontWeight.w600,
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                SizedBox(
                  height: 110,
                  child: ListView(
                    scrollDirection: Axis.horizontal,
                    children: [
                      _TrendingCard(
                        image: "assets/dubai.jpg",
                        title: "Dubai",
                        properties: "2,847 properties",
                        tag: "+24%",
                        isDark: isDark,
                        navy: navy,
                        gold: gold,
                        blue: blue,
                      ),
                      const SizedBox(width: 12),
                      _TrendingCard(
                        image: "assets/tokyo.jpg",
                        title: "Tokyo",
                        properties: "3,921 properties",
                        tag: "+18%",
                        isDark: isDark,
                        navy: navy,
                        gold: gold,
                        blue: blue,
                      ),
                      // Add more cards as needed
                    ],
                  ),
                ),
                // --- Popular Hotels Section ---
                const SizedBox(height: 28),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "Popular Hotels",
                      style: GoogleFonts.playfairDisplay(
                        color: isDark ? Colors.white : navy,
                        fontWeight: FontWeight.bold,
                        fontSize: 17,
                      ),
                    ),
                    Text(
                      "See All",
                      style: GoogleFonts.inter(
                        color: isDark ? gold : blue, // <-- changed
                        fontWeight: FontWeight.w600,
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 30),
                Column(
                  children: [
                    _HotelCard(
                      image: "assets/ritz.jpg",
                      name: "The Ritz-Carlton",
                      location: "New York, USA",
                      price: "\$680/night",
                      rating: "4.8",
                      isDark: isDark,
                      navy: navy,
                    ),
                    const SizedBox(height: 30),
                    _HotelCard(
                      image: "assets/fourseasons.jpg",
                      name: "Four Seasons Resort",
                      location: "Maldives",
                      price: "\$1,250/night",
                      rating: "4.9",
                      isDark: isDark,
                      navy: navy,
                    ),
                  ],
                ),

                // --- Top Activities Section ---
                const SizedBox(height: 28),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "Top Activities",
                      style: GoogleFonts.playfairDisplay(
                        color: isDark ? Colors.white : navy,
                        fontWeight: FontWeight.bold,
                        fontSize: 17,
                      ),
                    ),
                    Text(
                      "See All",
                      style: GoogleFonts.inter(
                        color: isDark ? gold : blue, // <-- changed
                        fontWeight: FontWeight.w600,
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                SizedBox(
                  height: 170,
                  child: ListView(
                    scrollDirection: Axis.horizontal,
                    children: [
                      _ActivityCard(
                        image: "assets/balloon.jpg",
                        title: "Hot Air Balloon",
                        location: "Cappadocia, Turkey",
                        price: "\$180",
                        rating: "4.7",
                        reviews: "200",
                        isDark: isDark,
                        navy: navy,
                      ),
                      const SizedBox(width: 14),
                      _ActivityCard(
                        image: "assets/scuba.jpg",
                        title: "Scuba Diving",
                        location: "Great Barrier Reef",
                        price: "\$120",
                        rating: "4.9",
                        reviews: "400",
                        isDark: isDark,
                        navy: navy,
                      ),
                    ],
                  ),
                ),
                // --- Local Recommendations Section ---
                const SizedBox(height: 28),
                Text(
                  "Local Recommendations",
                  style: GoogleFonts.playfairDisplay(
                    color: isDark ? Colors.white : navy,
                    fontWeight: FontWeight.bold,
                    fontSize: 17,
                  ),
                ),
                const SizedBox(height: 14),
                Column(
                  children: [
                    _RecommendationCard(
                      image: "assets/marco.jpg",
                      name: "Marco Rodriguez",
                      badge: "Local Guide",
                      text:
                          "\"Best pasta in Rome is at this hidden gem near the Pantheon. Trust me, I’ve lived here for 20 years!\"",
                      location: "Rome, Italy",
                      likes: "24",
                      isDark: isDark,
                      navy: navy,
                      gold: gold,
                      blue: blue,
                    ),
                    const SizedBox(height: 16),
                    _RecommendationCard(
                      image: "assets/yuki.jpg",
                      name: "Yuki Tanaka",
                      badge: "Local Guide",
                      text:
                          "\"Skip the crowded temples in the morning. Visit Fushimi Inari at sunset for magical photos!\"",
                      location: "Kyoto, Japan",
                      likes: "38",
                      isDark: isDark,
                      navy: navy,
                      gold: gold,
                      blue: blue,
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _TrendingCard extends StatelessWidget {
  final String image;
  final String title;
  final String properties;
  final String tag;
  final bool isDark;
  final Color navy;
  final Color gold;
  final Color blue;

  const _TrendingCard({
    required this.image,
    required this.title,
    required this.properties,
    required this.tag,
    required this.isDark,
    required this.navy,
    required this.gold,
    required this.blue,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 120,
      decoration: BoxDecoration(
        color: isDark ? navy : Colors.white,
        borderRadius: BorderRadius.circular(14),
        image: DecorationImage(
          image: AssetImage(image),
          fit: BoxFit.cover,
          colorFilter: ColorFilter.mode(
            Colors.black.withOpacity(0.18),
            BlendMode.darken,
          ),
        ),
      ),
      child: Stack(
        children: [
          Positioned(
            top: 10,
            right: 10,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(
                color: isDark ? gold : blue, // <-- changed
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                tag,
                style: GoogleFonts.inter(
                  color: isDark ? navy : Colors.white, // <-- changed
                  fontWeight: FontWeight.bold,
                  fontSize: 11,
                ),
              ),
            ),
          ),
          Positioned(
            left: 10,
            bottom: 28,
            child: Text(
              title,
              style: GoogleFonts.playfairDisplay(
                color: Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: 15,
              ),
            ),
          ),
          Positioned(
            left: 10,
            bottom: 10,
            child: Text(
              properties,
              style: GoogleFonts.inter(color: Colors.white70, fontSize: 12),
            ),
          ),
        ],
      ),
    );
  }
}

class _HotelCard extends StatelessWidget {
  final String image, name, location, price, rating;
  final bool isDark;
  final Color navy;

  const _HotelCard({
    required this.image,
    required this.name,
    required this.location,
    required this.price,
    required this.rating,
    required this.isDark,
    required this.navy,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      constraints: const BoxConstraints(minHeight: 80, maxHeight: 90),
      decoration: BoxDecoration(
        color: isDark ? navy.withOpacity(0.7) : Colors.white,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.max,
        children: [
          ClipRRect(
            borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(16),
              bottomLeft: Radius.circular(16),
            ),
            child: Image.asset(
              image,
              width: 80,
              height: 80,
              fit: BoxFit.cover,
              errorBuilder:
                  (context, error, stackTrace) => Container(
                    width: 80,
                    height: 80,
                    color: Colors.grey[300],
                    child: Icon(Icons.hotel, color: navy, size: 32),
                  ),
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    name,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: GoogleFonts.playfairDisplay(
                      color: isDark ? Colors.white : navy,
                      fontWeight: FontWeight.bold,
                      fontSize: 15,
                    ),
                  ),
                  Text(
                    location,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: GoogleFonts.inter(
                      color: isDark ? Colors.white70 : Colors.black54,
                      fontSize: 13,
                    ),
                  ),
                  const Spacer(),
                  Row(
                    children: [
                      Text(
                        price,
                        style: GoogleFonts.inter(
                          color: isDark ? Colors.white : navy,
                          fontWeight: FontWeight.bold,
                          fontSize: 15,
                        ),
                      ),
                      const Spacer(),
                      Icon(Icons.star, color: isDark?Colors.amber:Color.fromARGB(255, 68, 93, 245), size: 18),
                      Text(
                        rating,
                        style: GoogleFonts.inter(
                          color: isDark ? Colors.white : navy,
                          fontWeight: FontWeight.bold,
                          fontSize: 13,
                        ),
                      ),
                      const SizedBox(width: 4),
                      SizedBox(
                        height: 32,
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: isDark ? Colors.amber : Color.fromARGB(255, 68, 93, 245), // <-- changed
                            foregroundColor: isDark ? navy : Colors.white,
                            padding: const EdgeInsets.symmetric(
                              horizontal: 12,
                              vertical: 0,
                            ),
                            minimumSize: const Size(0, 32),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(8),
                            ),
                            elevation: 0,
                          ),
                          onPressed: () {},
                          child: Text(
                            "Book",
                            style: GoogleFonts.inter(
                              fontWeight: FontWeight.bold,
                              fontSize: 13,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _ActivityCard extends StatelessWidget {
  final String image, title, location, price, rating, reviews;
  final bool isDark;
  final Color navy;

  const _ActivityCard({
    required this.image,
    required this.title,
    required this.location,
    required this.price,
    required this.rating,
    required this.reviews,
    required this.isDark,
    required this.navy,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 150,
      margin: const EdgeInsets.only(right: 10),
      decoration: BoxDecoration(
        color: isDark ? navy.withOpacity(0.7) : Colors.white,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Stack(
            children: [
              ClipRRect(
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(16),
                  topRight: Radius.circular(16),
                ),
                child: Image.asset(
                  image,
                  width: 150,
                  height: 80,
                  fit: BoxFit.cover,
                  errorBuilder:
                      (context, error, stackTrace) => Container(
                        width: 150,
                        height: 80,
                        color: Colors.grey[300],
                        child: Icon(Icons.image, color: navy, size: 32),
                      ),
                ),
              ),
              Positioned(
                top: 8,
                right: 8,
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 2,
                  ),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.85),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.star, color:isDark?Colors.amber:Color.fromARGB(255, 68, 93, 245), size: 14),
                      const SizedBox(width: 2),
                      Text(
                        rating,
                        style: GoogleFonts.inter(
                          color: navy,
                          fontWeight: FontWeight.bold,
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(10, 8, 10, 0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: GoogleFonts.playfairDisplay(
                    color: isDark ? Colors.white : navy,
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                  ),
                ),
                Text(
                  location,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: GoogleFonts.inter(
                    color: isDark ? Colors.white70 : Colors.black54,
                    fontSize: 12,
                  ),
                ),
                const SizedBox(height: 6),
                Row(
                  children: [
                    Text(
                      price,
                      style: GoogleFonts.inter(
                        color: isDark ? Colors.white : navy,
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                      ),
                    ),
                    const Spacer(),
                    Text(
                      "$reviews reviews",
                      style: GoogleFonts.inter(
                        color: isDark ? Colors.white54 : Colors.black45,
                        fontSize: 11,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// --- Local Recommendations Section ---
class _RecommendationCard extends StatelessWidget {
  final String image, name, badge, text, location, likes;
  final bool isDark;
  final Color navy, gold, blue;

  const _RecommendationCard({
    required this.image,
    required this.name,
    required this.badge,
    required this.text,
    required this.location,
    required this.likes,
    required this.isDark,
    required this.navy,
    required this.gold,
    required this.blue,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      constraints: const BoxConstraints(minHeight: 80, maxHeight: 120),
      width: double.infinity,
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: isDark ? navy.withOpacity(0.7) : Colors.white,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(32),
            child: Image.asset(
              image,
              width: 44,
              height: 44,
              fit: BoxFit.cover,
              errorBuilder:
                  (context, error, stackTrace) => Container(
                    width: 44,
                    height: 44,
                    color: Colors.grey[300],
                    child: Icon(Icons.person, color: navy, size: 28),
                  ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Flexible(
                      child: Text(
                        name,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: GoogleFonts.inter(
                          color: isDark ? Colors.white : navy,
                          fontWeight: FontWeight.bold,
                          fontSize: 15,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 2,
                      ),
                      decoration: BoxDecoration(
                        color: isDark ? gold : blue, // <-- changed
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        badge,
                        style: GoogleFonts.inter(
                          color: isDark ? navy : Colors.white, // <-- changed
                          fontWeight: FontWeight.bold,
                          fontSize: 11,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  text,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: GoogleFonts.inter(
                    color: isDark ? Colors.white70 : Colors.black87,
                    fontSize: 13,
                  ),
                ),
                const SizedBox(height: 6),
                Row(
                  children: [
                    Flexible(
                      child: Text(
                        location,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: GoogleFonts.inter(
                          color: isDark ? Colors.white54 : Colors.black54,
                          fontSize: 13,
                        ),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Icon(Icons.favorite, color: Colors.pink[300], size: 16),
                    const SizedBox(width: 2),
                    Text(
                      likes,
                      style: GoogleFonts.inter(
                        color: isDark ? Colors.white70 : Colors.black87,
                        fontSize: 13,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
