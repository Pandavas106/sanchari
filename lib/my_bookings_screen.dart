import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'theme_controller.dart';

class MyBookingsScreen extends StatelessWidget {
  const MyBookingsScreen({super.key});

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

    return Scaffold(
      backgroundColor: isDark ? navy : const Color(0xFFF5F6FA),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        leading: IconButton(
          icon: Icon(Icons.arrow_back_ios_new_rounded, color: isDark ? Colors.white : navy),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          "My Bookings",
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
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 18),
          children: [
            _BookingCard(
              status: "ACTIVE",
              statusColor: Colors.green,
              date: "Dec 15–22, 2024",
              title: "Maldives Luxury Retreat",
              location: "Conrad Maldives Rangali",
              image: "assets/maldives.jpg",
              price: "₹1,44,000",
              buttonLabel: "View Details",
              buttonColor: isDark ? const Color(0xFF232946) : Colors.deepPurple,
              isDark: isDark,
              navy: navy,
            ),
            const SizedBox(height: 16),
            _BookingCard(
              status: "UPCOMING",
              statusColor: Colors.orange,
              date: "Jan 10–18, 2025",
              title: "Bali Private Villa",
              location: "Ubud, Bali",
              image: "assets/bali.jpg",
              price: "₹1,30,000",
              buttonLabel: "Manage",
              buttonColor: isDark ? const Color(0xFF232946) : Colors.deepPurple,
              isDark: isDark,
              navy: navy,
            ),
            const SizedBox(height: 16),
            _BookingCard(
              status: "COMPLETED",
              statusColor: Colors.purple,
              date: "Oct 5–12, 2024",
              title: "Dubai Luxury Experience",
              location: "Burj Al Arab, Dubai",
              image: "assets/dubai.jpg",
              price: "₹2,10,000",
              buttonLabel: "Review",
              buttonColor: gold,
              isDark: isDark,
              navy: navy,
              showStars: true,
            ),
            const SizedBox(height: 16),
            _BookingCard(
              status: "COMPLETED",
              statusColor: Colors.purple,
              date: "Aug 20–28, 2024",
              title: "Santorini Greek Islands",
              location: "Oia, Santorini",
              image: "assets/santorini.jpg",
              price: "₹1,85,000",
              buttonLabel: "Review",
              buttonColor: gold,
              isDark: isDark,
              navy: navy,
              showStars: true,
            ),
          ],
        ),
      ),
    );
  }
}

class _BookingCard extends StatelessWidget {
  final String status;
  final Color statusColor;
  final String date;
  final String title;
  final String location;
  final String image;
  final String price;
  final String buttonLabel;
  final Color buttonColor;
  final bool isDark;
  final Color navy;
  final bool showStars;

  const _BookingCard({
    required this.status,
    required this.statusColor,
    required this.date,
    required this.title,
    required this.location,
    required this.image,
    required this.price,
    required this.buttonLabel,
    required this.buttonColor,
    required this.isDark,
    required this.navy,
    this.showStars = false,
  });

  @override
  Widget build(BuildContext context) {
    final cardBg = isDark ? navy.withOpacity(0.85) : Colors.white;
    return Container(
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(16),
      ),
      padding: const EdgeInsets.all(14),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Image
          ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: Image.asset(
              image,
              width: 70,
              height: 70,
              fit: BoxFit.cover,
              errorBuilder: (context, error, stackTrace) => Container(
                width: 70,
                height: 70,
                color: Colors.grey[300],
                child: Icon(Icons.image, color: navy, size: 32),
              ),
            ),
          ),
          const SizedBox(width: 14),
          // Details
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Status and Date
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(
                        color: statusColor,
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text(
                        status,
                        style: GoogleFonts.inter(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 11,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      date,
                      style: GoogleFonts.inter(
                        color: isDark ? Colors.white70 : Colors.black54,
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  title,
                  style: GoogleFonts.inter(
                    color: isDark ? Colors.white : navy,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  location,
                  style: GoogleFonts.inter(
                    color: isDark ? Colors.white54 : Colors.black54,
                    fontSize: 13,
                  ),
                ),
                const SizedBox(height: 8),
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
                    if (showStars)
                      Row(
                        children: List.generate(
                          5,
                          (i) => Icon(Icons.star, color: Colors.amber, size: 16),
                        ),
                      ),
                    if (showStars) const SizedBox(width: 6),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: buttonColor,
                        foregroundColor: buttonLabel == "Review"
                            ? Colors.black
                            : Colors.white,
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                        elevation: 0,
                      ),
                      onPressed: () {},
                      child: Text(
                        buttonLabel,
                        style: GoogleFonts.inter(
                          fontWeight: FontWeight.bold,
                          fontSize: 13,
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
    );
  }
}