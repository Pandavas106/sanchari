// ignore_for_file: deprecated_member_use

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'theme_controller.dart';

class TripDetailsData {
  final String image;
  final String title;
  final String price;
  final String subtitle;
  final String days;
  final String rating;
  final String people;
  final List<String> highlights;

  TripDetailsData({
    required this.image,
    required this.title,
    required this.price,
    required this.subtitle,
    required this.days,
    required this.rating,
    required this.people,
    required this.highlights,
  });
}

class TripDetailsScreen extends StatelessWidget {
  final TripDetailsData trip;
  const TripDetailsScreen({super.key, required this.trip});

  @override
  Widget build(BuildContext context) {
    final theme = ThemeController.of(context);
    final isDark = theme.isDark;
    final setTheme = theme.setTheme;
    final navy = const Color(0xFF232946);
    final gold =
        isDark
            ? const Color(0xFFF4CA5E)
            : const Color.fromARGB(255, 68, 93, 245);

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

    final subTextColor = isDark ? Colors.white70 : Colors.black54;

    return Scaffold(
      backgroundColor: isDark ? navy : const Color(0xFFF5F6FA),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back_rounded,
            color: isDark ? Colors.white : navy,
          ),
          onPressed: () => Navigator.pop(context),
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
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 0),
          children: [
            // Trip Image with overlay
            Container(
              margin: const EdgeInsets.only(bottom: 18),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(22),
                boxShadow: [
                  BoxShadow(
                    color: navy.withOpacity(0.07),
                    blurRadius: 12,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Stack(
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(22),
                    child: Image.asset(
                      trip.image,
                      height: 220,
                      width: double.infinity,
                      fit: BoxFit.cover,
                      errorBuilder:
                          (context, error, stackTrace) => Container(
                            height: 220,
                            width: double.infinity,
                            decoration: BoxDecoration(
                              color: Colors.grey[300],
                              borderRadius: BorderRadius.circular(22),
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
                    top: 18,
                    left: 18,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 5,
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
                          fontSize: 13,
                        ),
                      ),
                    ),
                  ),
                  Positioned(
                    top: 18,
                    right: 18,
                    child: CircleAvatar(
                      backgroundColor: Colors.white.withOpacity(0.85),
                      radius: 18,
                      child: Icon(
                        Icons.favorite_border_rounded,
                        color: navy,
                        size: 20,
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: 18,
                    left: 18,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 5,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Row(
                        children: [
                          const Icon(
                            Icons.calendar_today_rounded,
                            size: 15,
                            color: Colors.black54,
                          ),
                          const SizedBox(width: 4),
                          Text(
                            trip.days,
                            style: GoogleFonts.inter(
                              color: Colors.black87,
                              fontWeight: FontWeight.w600,
                              fontSize: 13,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            // Trip Title and Price
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Text(
                    trip.title,
                    style: GoogleFonts.playfairDisplay(
                      color: isDark ? Colors.white : navy,
                      fontWeight: FontWeight.bold,
                      fontSize: 24,
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 14,
                    vertical: 8,
                  ),
                  decoration: BoxDecoration(
                    color: gold,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    trip.price,
                    style: GoogleFonts.playfairDisplay(
                      color: navy,
                      fontWeight: FontWeight.bold,
                      fontSize: 18,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              trip.subtitle,
              style: GoogleFonts.inter(color: subTextColor, fontSize: 15),
            ),
            const SizedBox(height: 18),
            // Ratings and People
            Row(
              children: [
                Icon(Icons.star, color: gold, size: 18),
                const SizedBox(width: 4),
                Text(
                  trip.rating,
                  style: GoogleFonts.inter(
                    color: isDark ? Colors.white : navy,
                    fontWeight: FontWeight.w600,
                    fontSize: 15,
                  ),
                ),
                const SizedBox(width: 14),
                Icon(Icons.people_alt_rounded, color: gold, size: 18),
                const SizedBox(width: 4),
                Text(
                  trip.people,
                  style: GoogleFonts.inter(
                    color: isDark ? Colors.white : navy,
                    fontWeight: FontWeight.w600,
                    fontSize: 15,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            // Section: What's Included
            Text(
              "What's Included",
              style: GoogleFonts.playfairDisplay(
                color: isDark ? Colors.white : navy,
                fontWeight: FontWeight.bold,
                fontSize: 18,
              ),
            ),
            const SizedBox(height: 10),
            Wrap(
              spacing: 12,
              runSpacing: 10,
              children: [
                _IncludedChip(
                  icon: Icons.flight_rounded,
                  label: "Flights",
                  isDark: isDark,
                  navy: navy,
                ),
                _IncludedChip(
                  icon: Icons.hotel_rounded,
                  label: "Hotels",
                  isDark: isDark,
                  navy: navy,
                ),
                _IncludedChip(
                  icon: Icons.restaurant_rounded,
                  label: "Meals",
                  isDark: isDark,
                  navy: navy,
                ),
                _IncludedChip(
                  icon: Icons.directions_car_rounded,
                  label: "Transfers",
                  isDark: isDark,
                  navy: navy,
                ),
                _IncludedChip(
                  icon: Icons.beach_access_rounded,
                  label: "Activities",
                  isDark: isDark,
                  navy: navy,
                ),
                _IncludedChip(
                  icon: Icons.verified_rounded,
                  label: "AI Assistance",
                  isDark: isDark,
                  navy: navy,
                ),
              ],
            ),
            const SizedBox(height: 24),
            // Section: Highlights
            Text(
              "Highlights",
              style: GoogleFonts.playfairDisplay(
                color: isDark ? Colors.white : navy,
                fontWeight: FontWeight.bold,
                fontSize: 18,
              ),
            ),
            const SizedBox(height: 10),
            ...trip.highlights.map(
              (h) => _HighlightTile(
                icon: Icons.check_circle_rounded,
                text: h,
                isDark: isDark,
                navy: navy,
              ),
            ),
            const SizedBox(height: 32),
            // Media Section
            const SizedBox(height: 18),
            Container(
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 0),
              child: Row(
                children: [
                  Expanded(
                    child: Container(
                      decoration: BoxDecoration(
                        color: isDark ? gold : navy,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(vertical: 8),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.photo_library_rounded,
                              color: isDark ? navy : Colors.white,
                              size: 20,
                            ),
                            const SizedBox(width: 6),
                            Text(
                              "Photos (184)",
                              style: GoogleFonts.inter(
                                color: isDark ? navy : Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 15,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Container(
                      decoration: BoxDecoration(
                        color:
                            isDark ? navy.withOpacity(0.7) : Colors.grey[200],
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(vertical: 8),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.videocam_rounded,
                              color: isDark ? Colors.white : navy,
                              size: 20,
                            ),
                            const SizedBox(width: 6),
                            Text(
                              "Videos (63)",
                              style: GoogleFonts.inter(
                                color: isDark ? Colors.white : navy,
                                fontWeight: FontWeight.bold,
                                fontSize: 15,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            // Media Grid Section
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              mainAxisSpacing: 14,
              crossAxisSpacing: 14,
              childAspectRatio: 0.95,
              children: [
                _MediaCard(
                  image: "assets/dubai1.jpg",
                  user: "Alex",
                  likes: 47,
                  liked: false,
                ),
                _MediaCard(
                  image: "assets/hongkong1.jpg",
                  user: "Sarah",
                  likes: 32,
                  liked: true,
                ),
                _MediaCard(
                  image: "assets/camel.jpg",
                  user: "Mike",
                  likes: 89,
                  liked: false,
                ),
                _MediaCard(
                  image: "assets/dubai2.jpg",
                  user: "Emma",
                  likes: 156,
                  liked: true,
                ),
                _MediaCard(
                  image: "assets/burj.jpg",
                  user: "John",
                  likes: 73,
                  liked: false,
                ),
                _MediaCard(
                  image: "assets/mall.jpg",
                  user: "Lisa",
                  likes: 94,
                  liked: true,
                ),
                _MediaCard(
                  image: "assets/sunset.jpg",
                  user: "David",
                  likes: 61,
                  liked: false,
                ),
                _MediaCard(
                  image: "assets/market.jpg",
                  user: "Anna",
                  likes: 28,
                  liked: true,
                ),
              ],
            ),
            const SizedBox(height: 24),
            // Book Now Button
            SizedBox(
              width: double.infinity,
              height: 54,
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: gold,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(14),
                  ),
                  elevation: 0,
                  shadowColor: Colors.transparent,
                  padding: const EdgeInsets.symmetric(horizontal: 0),
                ),
                icon: const Icon(
                  Icons.shopping_cart_rounded,
                  color: Colors.black87,
                ),
                label: Text(
                  "Book Now",
                  style: GoogleFonts.inter(
                    color: navy,
                    fontWeight: FontWeight.bold,
                    fontSize: 18,
                  ),
                ),
                onPressed: () {
                  // TODO: Add booking logic
                },
              ),
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }
}

class _IncludedChip extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool isDark;
  final Color navy;

  const _IncludedChip({
    required this.icon,
    required this.label,
    required this.isDark,
    required this.navy,
  });

  @override
  Widget build(BuildContext context) {
    return Chip(
      avatar: Icon(icon, color: isDark ? navy : Colors.white, size: 18),
      label: Text(
        label,
        style: GoogleFonts.inter(
          color: isDark ? navy : Colors.white,
          fontWeight: FontWeight.w600,
        ),
      ),
      backgroundColor: isDark ? Colors.white : navy,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 2),
    );
  }
}

class _HighlightTile extends StatelessWidget {
  final IconData icon;
  final String text;
  final bool isDark;
  final Color navy;

  const _HighlightTile({
    required this.icon,
    required this.text,
    required this.isDark,
    required this.navy,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: CircleAvatar(
        backgroundColor: isDark ? navy.withOpacity(0.13) : Colors.blue[100],
        child: Icon(icon, color: isDark ? Colors.white : navy, size: 22),
      ),
      title: Text(
        text,
        style: GoogleFonts.inter(
          color: isDark ? Colors.white : navy,
          fontSize: 15,
        ),
      ),
    );
  }
}

// Add this widget below your TripDetailsScreen class
class _MediaCard extends StatelessWidget {
  final String image;
  final String user;
  final int likes;
  final bool liked;

  const _MediaCard({
    required this.image,
    required this.user,
    required this.likes,
    required this.liked,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Image.asset(
            image,
            height: double.infinity,
            width: double.infinity,
            fit: BoxFit.cover,
            errorBuilder:
                (context, error, stackTrace) => Container(
                  height: double.infinity,
                  width: double.infinity,
                  color: Colors.grey[300],
                  child: const Icon(
                    Icons.image_not_supported_outlined,
                    color: Colors.grey,
                    size: 40,
                  ),
                ),
          ),
        ),
        Positioned(
          top: 10,
          left: 10,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.85),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 10,
                  backgroundColor: Colors.grey[300],
                  child: Text(
                    user[0],
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                      color: Colors.black87,
                    ),
                  ),
                ),
                const SizedBox(width: 6),
                Text(
                  user,
                  style: const TextStyle(
                    fontWeight: FontWeight.w600,
                    fontSize: 12,
                    color: Colors.black87,
                  ),
                ),
              ],
            ),
          ),
        ),
        Positioned(
          bottom: 10,
          left: 10,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
            decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.45),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Row(
              children: [
                Text(
                  "$likes likes",
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w500,
                    fontSize: 12,
                  ),
                ),
              ],
            ),
          ),
        ),
        Positioned(
          bottom: 10,
          right: 10,
          child: CircleAvatar(
            backgroundColor: Colors.white,
            radius: 16,
            child: Icon(
              liked ? Icons.favorite : Icons.favorite_border,
              color: liked ? Colors.red : Colors.grey,
              size: 20,
            ),
          ),
        ),
      ],
    );
  }
}
