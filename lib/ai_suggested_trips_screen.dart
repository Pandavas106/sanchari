// ignore_for_file: deprecated_member_use

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'theme_controller.dart';
import 'trip_details.dart';

class AiSuggestedTripsScreen extends StatelessWidget {
  const AiSuggestedTripsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = ThemeController.of(context);
    final isDark = theme.isDark;
    final setTheme = theme.setTheme;
    final navy = const Color(0xFF232946);
    final gold = const Color(0xFFF4CA5E);

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

    final cardBg = isDark ? navy.withOpacity(0.85) : Colors.white;
    final subTextColor = isDark ? Colors.white70 : Colors.black54;

    return Scaffold(
      backgroundColor: isDark ? navy : const Color(0xFFF5F6FA),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        title: Text(
          "AI Suggested Trips",
          style: GoogleFonts.playfairDisplay(
            color: isDark ? Colors.white : navy,
            fontWeight: FontWeight.bold,
            fontSize: 20,
          ),
        ),
        actions: [
          IconButton(
            icon: Icon(
              isDark ? Icons.light_mode_rounded : Icons.dark_mode_rounded,
              color: isDark ? gold : navy,
            ),
            tooltip: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
            onPressed: () => setTheme(!isDark),
          ),
        ],
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: isDark ? darkGradient : welcomeGradient,
        ),
        child: ListView(
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 18),
          children: [
            // Budget Recommendation Section
            Container(
              margin: const EdgeInsets.only(bottom: 18),
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: cardBg,
                borderRadius: BorderRadius.circular(18),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Perfect for your budget",
                          style: GoogleFonts.playfairDisplay(
                            color: isDark ? Colors.white : navy,
                            fontWeight: FontWeight.bold,
                            fontSize: 17,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          "Based on \$2,500 budget preference",
                          style: GoogleFonts.inter(
                            color: subTextColor,
                            fontSize: 14,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    decoration: BoxDecoration(
                      color: gold,
                      borderRadius: BorderRadius.circular(50),
                    ),
                    padding: const EdgeInsets.all(8),
                    child: Icon(
                      Icons.edit_rounded,
                      color: cardBg,
                      size: 22,
                    ),
                  ),
                ],
              ),
            ),
            // AI Recommended Trip Card
            Container(
              margin: const EdgeInsets.only(bottom: 18),
              decoration: BoxDecoration(
                color: cardBg,
                borderRadius: BorderRadius.circular(18),
                boxShadow: [
                  BoxShadow(
                    color: navy.withOpacity(0.04),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Image with AI Recommended tag and favorite
                  Stack(
                    children: [
                      ClipRRect(
                        borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(18),
                          topRight: Radius.circular(18),
                        ),
                        child: Image.asset(
                          "assets/bali.jpg",
                          height: 140,
                          width: double.infinity,
                          fit: BoxFit.cover,
                          errorBuilder:
                              (context, error, stackTrace) => Container(
                                height: 140,
                                width: double.infinity,
                                decoration: const BoxDecoration(
                                  color: Color(0xFFE0E0E0),
                                  borderRadius: BorderRadius.only(
                                    topLeft: Radius.circular(18),
                                    topRight: Radius.circular(18),
                                  ),
                                ),
                                child: Center(
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Icon(
                                        Icons.image_not_supported_outlined,
                                        color: navy,
                                        size: 40,
                                      ),
                                      const SizedBox(height: 6),
                                      Text(
                                        "Image not found",
                                        style: GoogleFonts.inter(
                                          color: navy,
                                          fontWeight: FontWeight.w500,
                                          fontSize: 13,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                        ),
                      ),
                      Positioned(
                        top: 14,
                        left: 14,
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 10,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: gold,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            "AI Recommended",
                            style: GoogleFonts.inter(
                              color: navy,
                              fontWeight: FontWeight.bold,
                              fontSize: 12,
                            ),
                          ),
                        ),
                      ),
                      Positioned(
                        top: 14,
                        right: 14,
                        child: CircleAvatar(
                          backgroundColor: Colors.white.withOpacity(0.85),
                          radius: 16,
                          child: Icon(
                            Icons.favorite_border_rounded,
                            color: navy,
                            size: 18,
                          ),
                        ),
                      ),
                      Positioned(
                        bottom: 14,
                        left: 14,
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 10,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Row(
                            children: [
                              const Icon(
                                Icons.calendar_today_rounded,
                                size: 14,
                                color: Colors.black54,
                              ),
                              const SizedBox(width: 4),
                              Text(
                                "7 Days",
                                style: GoogleFonts.inter(
                                  color: Colors.black87,
                                  fontWeight: FontWeight.w600,
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
                    padding: const EdgeInsets.fromLTRB(18, 14, 18, 18),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Bali Adventure",
                          style: GoogleFonts.playfairDisplay(
                            color: isDark ? Colors.white : navy,
                            fontWeight: FontWeight.bold,
                            fontSize: 18,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Row(
                          children: [
                            Expanded(
                              child: Text(
                                "Temples, beaches & cultural experiences in paradise",
                                style: GoogleFonts.inter(
                                  color: subTextColor,
                                  fontSize: 14,
                                ),
                              ),
                            ),
                            Text(
                              "\$1,899",
                              style: GoogleFonts.playfairDisplay(
                                color: gold,
                                fontWeight: FontWeight.bold,
                                fontSize: 18,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        Row(
                          children: [
                            Icon(Icons.star, color: gold, size: 16),
                            const SizedBox(width: 4),
                            Text(
                              "4.9",
                              style: GoogleFonts.inter(
                                color: isDark ? Colors.white : navy,
                                fontWeight: FontWeight.w600,
                                fontSize: 14,
                              ),
                            ),
                            const SizedBox(width: 14),
                            Icon(
                              Icons.people_alt_rounded,
                              color: gold,
                              size: 16,
                            ),
                            const SizedBox(width: 4),
                            Text(
                              "2 people",
                              style: GoogleFonts.inter(
                                color: isDark ? Colors.white : navy,
                                fontWeight: FontWeight.w600,
                                fontSize: 14,
                              ),
                            ),
                            const Spacer(),
                            ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: navy,
                                foregroundColor: Colors.white,
                                elevation: 0,
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 18,
                                  vertical: 10,
                                ),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10),
                                ),
                              ),
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => TripDetailsScreen(
                                      trip: TripDetailsData(
                                        image: "assets/bali.jpg",
                                        title: "Bali Adventure",
                                        price: "\$1,899",
                                        subtitle:
                                            "Temples, beaches & cultural experiences in paradise",
                                        days: "7 Days",
                                        rating: "4.9",
                                        people: "2 people",
                                        highlights: [
                                          "Visit iconic temples and rice terraces",
                                          "Relax on Bali's pristine beaches",
                                          "Enjoy local cuisine and cultural shows",
                                          "Optional spa and wellness experiences",
                                        ],
                                      ),
                                    ),
                                  ),
                                );
                              },
                              child: Text(
                                "View Details",
                                style: GoogleFonts.inter(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 14,
                                ),
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
            // More Suggestions Section
            const SizedBox(height: 10),
            Text(
              "More Suggestions",
              style: GoogleFonts.playfairDisplay(
                color: isDark ? Colors.white : navy,
                fontWeight: FontWeight.bold,
                fontSize: 17,
              ),
            ),
            const SizedBox(height: 10),
            _SuggestionCard(
              image: "assets/tokyo.jpg",
              title: "Tokyo Explorer",
              price: "\$2,299",
              subtitle: "5 days • Urban adventure",
              rating: "4.8",
              isDark: isDark,
              navy: navy,
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => TripDetailsScreen(
                      trip: TripDetailsData(
                        image: "assets/tokyo.jpg",
                        title: "Tokyo Explorer",
                        price: "\$2,299",
                        subtitle: "5 days • Urban adventure",
                        days: "5 Days",
                        rating: "4.8",
                        people: "2 people",
                        highlights: [
                          "Explore Tokyo's vibrant city life",
                          "Experience Japanese culture",
                          "Visit famous landmarks",
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
            const SizedBox(height: 10),
            _SuggestionCard(
              image: "assets/iceland.jpg",
              title: "Iceland Northern Lights",
              price: "\$2,499",
              subtitle: "6 days • Nature & adventure",
              rating: "4.9",
              isDark: isDark,
              navy: navy,
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => TripDetailsScreen(
                      trip: TripDetailsData(
                        image: "assets/iceland.jpg",
                        title: "Iceland Northern Lights",
                        price: "\$2,499",
                        subtitle: "6 days • Nature & adventure",
                        days: "6 Days",
                        rating: "4.9",
                        people: "2 people",
                        highlights: [
                          "Chase the Northern Lights",
                          "Explore Reykjavik's culture",
                          "Relax in natural hot springs",
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
            const SizedBox(height: 10),
            _SuggestionCard(
              image: "assets/paris.jpg",
              title: "Romantic Paris",
              price: "\$1,799",
              subtitle: "4 days • Romance & culture",
              rating: "4.7",
              isDark: isDark,
              navy: navy,
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => TripDetailsScreen(
                      trip: TripDetailsData(
                        image: "assets/paris.jpg",
                        title: "Romantic Paris",
                        price: "\$1,799",
                        subtitle: "4 days • Romance & culture",
                        days: "4 Days",
                        rating: "4.7",
                        people: "2 people",
                        highlights: [
                          "Visit the Eiffel Tower",
                          "Explore the Louvre Museum",
                          "Enjoy a Seine River cruise",
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
            // ...rest of your code...
          ],
        ),
      ),
    );
  }
}

class _SuggestionCard extends StatelessWidget {
  final String image;
  final String title;
  final String price;
  final String subtitle;
  final String rating;
  final bool isDark;
  final Color navy;
  final VoidCallback? onTap;

  const _SuggestionCard({
    required this.image,
    required this.title,
    required this.price,
    required this.subtitle,
    required this.rating,
    required this.isDark,
    required this.navy,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final gold = const Color(0xFFF4CA5E);
    final subTextColor = isDark ? Colors.white70 : Colors.black54;

    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color: isDark ? navy.withOpacity(0.85) : Colors.white,
          borderRadius: BorderRadius.circular(18),
          boxShadow: [
            BoxShadow(
              color: navy.withOpacity(0.04),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
            children: [
            ClipRRect(
              borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(18),
              topRight: Radius.circular(18),
              ),
              child: Image.asset(
              image,
              height: 120,
              width: double.infinity,
              fit: BoxFit.cover,
              errorBuilder: (context, error, stackTrace) => Container(
                height: 120,
                width: double.infinity,
                decoration: const BoxDecoration(
                color: Color(0xFFE0E0E0),
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(18),
                  topRight: Radius.circular(18),
                ),
                ),
                child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(
                  Icons.image_not_supported_outlined,
                  color: Colors.grey,
                  size: 40,
                  ),
                  const SizedBox(height: 6),
                  Text(
                  "Image not found",
                  style: GoogleFonts.inter(
                    color: navy,
                    fontWeight: FontWeight.w500,
                    fontSize: 13,
                  ),
                  ),
                ],
                ),
              ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(14),
              child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                title,
                style: GoogleFonts.playfairDisplay(
                  color: isDark ? Colors.white : navy,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
                ),
                const SizedBox(height: 4),
                Text(
                subtitle,
                style: GoogleFonts.inter(color: subTextColor, fontSize: 14),
                ),
                const SizedBox(height: 10),
                Row(
                children: [
                  Text(
                  price,
                  style: GoogleFonts.playfairDisplay(
                    color: gold,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                  ),
                  const Spacer(),
                  Row(
                  children: [
                    Icon(Icons.star, color: gold, size: 16),
                    const SizedBox(width: 4),
                    Text(
                    rating,
                    style: GoogleFonts.inter(
                      color: isDark ? Colors.white : navy,
                      fontWeight: FontWeight.w600,
                      fontSize: 14,
                    ),
                    ),
                  ],
                  ),
                ],
                ),
              ],
              ),
            ),
            ],
        ),
      ),
    );
  }
}
