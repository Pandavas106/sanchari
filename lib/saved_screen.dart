// ignore_for_file: deprecated_member_use

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'theme_controller.dart';

class SavedScreen extends StatelessWidget {
  const SavedScreen({super.key});

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

    final bgColor = isDark ? navy : const Color(0xFFF5F6FA);
    final cardBg = isDark ? navy.withOpacity(0.85) : Colors.white;

    return Scaffold(
      backgroundColor: bgColor,
      appBar: AppBar(
        backgroundColor: bgColor,
        elevation: 0,
        centerTitle: true,

        title: Text(
          "Saved",
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
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Filter Tabs
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  _SavedTab(
                    label: "All",
                    selected: true,
                    isDark: isDark,
                    navy: navy,
                  ),
                  _SavedTab(
                    label: "Places",
                    selected: false,
                    isDark: isDark,
                    navy: navy,
                  ),
                  _SavedTab(
                    label: "Hotels",
                    selected: false,
                    isDark: isDark,
                    navy: navy,
                  ),
                  _SavedTab(
                    label: "Activities",
                    selected: false,
                    isDark: isDark,
                    navy: navy,
                  ),
                ],
              ),
              const SizedBox(height: 16),
              // Stats Row
              Container(
                decoration: BoxDecoration(
                  color: cardBg,
                  borderRadius: BorderRadius.circular(18),
                ),
                padding: const EdgeInsets.symmetric(
                  vertical: 14,
                  horizontal: 10,
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    _SavedStat(
                      label: "Total Saved",
                      value: "24",
                      isDark: isDark,
                      navy: navy,
                    ),
                    _SavedStat(
                      label: "Places",
                      value: "8",
                      isDark: isDark,
                      navy: navy,
                    ),
                    _SavedStat(
                      label: "Hotels",
                      value: "12",
                      isDark: isDark,
                      navy: navy,
                    ),
                    _SavedStat(
                      label: "Activities",
                      value: "4",
                      isDark: isDark,
                      navy: navy,
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 18),
              // Saved Cards
              _SavedCard(
                image: "assets/santorini.jpg",
                tag: "Place",
                title: "Santorini, Greece",
                subtitle: "4.8  •  Island",
                price: "From \$299",
                isDark: isDark,
                navy: navy,
                gold: gold,
              ),
              const SizedBox(height: 16),
              _SavedCard(
                image: "assets/ocean_paradise.jpg",
                tag: "Hotel",
                title: "Ocean Paradise Resort",
                subtitle: "4.9  •  Maldives",
                price: "\$450/night",
                isDark: isDark,
                navy: navy,
                gold: gold,
              ),
              const SizedBox(height: 16),
              _SavedCard(
                image: "assets/balloon.jpg",
                tag: "Activity",
                title: "Hot Air Balloon Ride",
                subtitle: "4.7  •  2 hours",
                price: "\$180",
                isDark: isDark,
                navy: navy,
                gold: gold,
              ),
              const SizedBox(height: 16),
              _SavedCard(
                image: "assets/kyoto.jpg",
                tag: "Place",
                title: "Kyoto, Japan",
                subtitle: "4.9  •  Cultural",
                price: "From \$199",
                isDark: isDark,
                navy: navy,
                gold: gold,
              ),
              const SizedBox(height: 16),
              _SavedCard(
                image: "assets/alps_hotel.jpg",
                tag: "Hotel",
                title: "Alpine Chalet Resort",
                subtitle: "4.8  •  Swiss Alps",
                price: "\$320/night",
                isDark: isDark,
                navy: navy,
                gold: gold,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _SavedTab extends StatelessWidget {
  final String label;
  final bool selected;
  final bool isDark;
  final Color navy;
  const _SavedTab({
    required this.label,
    required this.selected,
    required this.isDark,
    required this.navy,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(right: 8, bottom: 8),
      padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 8),
      decoration: BoxDecoration(
        color:
            selected
                ? (isDark ? navy : Colors.white)
                : (isDark ? navy.withOpacity(0.5) : Colors.grey[100]),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color:
              selected
                  ? (isDark ? Colors.white24 : navy.withOpacity(0.15))
                  : Colors.transparent,
          width: 1.2,
        ),
      ),
      child: Text(
        label,
        style: GoogleFonts.inter(
          color:
              selected
                  ? (isDark ? Colors.white : navy)
                  : (isDark ? Colors.white54 : navy.withOpacity(0.6)),
          fontWeight: FontWeight.bold,
          fontSize: 15,
        ),
      ),
    );
  }
}

class _SavedStat extends StatelessWidget {
  final String label;
  final String value;
  final bool isDark;
  final Color navy;
  const _SavedStat({
    required this.label,
    required this.value,
    required this.isDark,
    required this.navy,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          value,
          style: GoogleFonts.playfairDisplay(
            color: isDark ? Colors.white : navy,
            fontWeight: FontWeight.bold,
            fontSize: 17,
          ),
        ),
        Text(
          label,
          style: GoogleFonts.inter(
            color: isDark ? Colors.white54 : Colors.black54,
            fontSize: 13,
          ),
        ),
      ],
    );
  }
}

class _SavedCard extends StatelessWidget {
  final String image;
  final String tag;
  final String title;
  final String subtitle;
  final String price;
  final bool isDark;
  final Color navy;
  final Color gold;
  const _SavedCard({
    required this.image,
    required this.tag,
    required this.title,
    required this.subtitle,
    required this.price,
    required this.isDark,
    required this.navy,
    required this.gold,
  });

  @override
  Widget build(BuildContext context) {
    final cardBg = isDark ? navy.withOpacity(0.85) : Colors.white;
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
            color: navy.withOpacity(0.06),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        children: [
          // Image with tag and heart
          Stack(
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
                  errorBuilder:
                      (context, error, stackTrace) => Container(
                        height: 120,
                        width: double.infinity,
                        decoration: BoxDecoration(
                          color: Colors.grey[300],
                          borderRadius: const BorderRadius.only(
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
                                  fontSize: 13,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                ),
              ),
              Positioned(
                top: 12,
                left: 12,
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color:
                        tag == "Place"
                            ? Colors.blueAccent
                            : tag == "Hotel"
                            ? Colors.deepPurple
                            : gold,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Text(
                    tag,
                    style: GoogleFonts.inter(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
                  ),
                ),
              ),
              Positioned(
                top: 12,
                right: 12,
                child: CircleAvatar(
                  backgroundColor: Colors.white.withOpacity(0.85),
                  radius: 16,
                  child: Icon(
                    Icons.favorite,
                    color: Colors.redAccent,
                    size: 18,
                  ),
                ),
              ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: GoogleFonts.playfairDisplay(
                    color: isDark ? Colors.white : navy,
                    fontWeight: FontWeight.bold,
                    fontSize: 17,
                  ),
                ),
                const SizedBox(height: 4),
                Row(
                  children: [
                    Icon(Icons.star, color: gold, size: 16),
                    const SizedBox(width: 4),
                    Text(
                      subtitle,
                      style: GoogleFonts.inter(
                        color: isDark ? Colors.white70 : Colors.black87,
                        fontSize: 13,
                      ),
                    ),
                    const Spacer(),
                    Text(
                      price,
                      style: GoogleFonts.inter(
                        color: isDark ? gold : navy,
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
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
