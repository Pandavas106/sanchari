import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'theme_controller.dart';
import 'trip_details.dart';

// TripCardData model
class TripCardData {
  final String title;
  final String description;
  final String price;
  final String duration;
  final String rating;
  final String imageUrl;

  TripCardData({
    required this.title,
    required this.description,
    required this.price,
    required this.duration,
    required this.rating,
    required this.imageUrl,
  });

  factory TripCardData.fromJson(Map<String, dynamic> json) {
    return TripCardData(
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      price: json['price'] ?? '',
      duration: json['duration'] ?? '',
      rating: json['rating'] ?? '',
      imageUrl: json['image_url'] ?? '',
    );
  }
}

// Fetch trips from API
Future<List<TripCardData>> fetchTrips() async {
  final url = Uri.parse(
    'https://sirajmohammad.app.n8n.cloud/webhook/generateTripCard',
  );
  final response = await http.post(url);
  print(response.body);
  
    final body = response.body;
    final decoded = json.decode(body);
    if (decoded is List) {
      return decoded
          .map<TripCardData>((e) => TripCardData.fromJson(e))
          .toList();
    } else if (decoded is Map) {
      // If API returns a single object
      return [TripCardData.fromJson(decoded as Map<String, dynamic>)];
    } else {
      throw Exception('Unexpected response format');
    }
  } 

class AiSuggestedTripsScreen extends StatelessWidget {
  final List<TripCardData>? trips;
  const AiSuggestedTripsScreen({super.key, required this.trips});

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
        child: trips == null
            ? ListView.builder(
                padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 18),
                itemCount: 3,
                itemBuilder: (context, i) => _ShimmerTripCard(isDark: isDark, navy: navy),
              )
            : ListView(
                padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 18),
                children: [
                  // Budget Recommendation Section (static for now)
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
                  // Dynamic Trip Cards
                  ...trips!.map(
                    (trip) => _TripCard(
                      trip: trip,
                      isDark: isDark,
                      navy: navy,
                      gold: gold,
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => TripDetailsScreen(
                              trip: TripDetailsData(
                                image: trip.imageUrl,
                                title: trip.title,
                                price: trip.price,
                                subtitle: trip.description,
                                days: trip.duration,
                                rating: trip.rating,
                                people: "3 people",
                                highlights: [
                                  "Private houseboat stay in Alleppey",
                                  "Ayurvedic spa treatments",
                                  "Cultural performances",
                                  "Premium tea estate resort in Munnar",
                                  "Explore tea plantations & waterfalls",
                                  "Private transportation & curated experiences",
                                ],
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
      ),
    );
  }
}

// Trip Card Widget
class _TripCard extends StatelessWidget {
  final TripCardData trip;
  final bool isDark;
  final Color navy;
  final Color gold;
  final VoidCallback onTap;

  const _TripCard({
    required this.trip,
    required this.isDark,
    required this.navy,
    required this.gold,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final subTextColor = isDark ? Colors.white70 : Colors.black54;
    return Container(
      margin: const EdgeInsets.only(bottom: 18),
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
          // Image with rounded corners and fallback
          ClipRRect(
            borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(18),
              topRight: Radius.circular(18),
            ),
            child:
                trip.imageUrl.startsWith('http')
                    ? Image.network(
                      trip.imageUrl,
                      height: 140,
                      width: double.infinity,
                      fit: BoxFit.cover,
                      errorBuilder:
                          (context, error, stackTrace) => Container(
                            height: 140,
                            width: double.infinity,
                            color: Colors.grey[300],
                            child: const Icon(
                              Icons.image_not_supported_outlined,
                              color: Colors.grey,
                              size: 40,
                            ),
                          ),
                    )
                    : Image.asset(
                      trip.imageUrl,
                      height: 140,
                      width: double.infinity,
                      fit: BoxFit.cover,
                      errorBuilder:
                          (context, error, stackTrace) => Container(
                            height: 140,
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
          Padding(
            padding: const EdgeInsets.fromLTRB(18, 14, 18, 18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  trip.title,
                  style: GoogleFonts.playfairDisplay(
                    color: isDark ? Colors.white : navy,
                    fontWeight: FontWeight.bold,
                    fontSize: 18,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  trip.description,
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                  style: GoogleFonts.inter(color: subTextColor, fontSize: 14),
                ),
                const SizedBox(height: 10),
                Row(
                  children: [
                    Icon(Icons.calendar_today_rounded, color: gold, size: 16),
                    const SizedBox(width: 4),
                    Text(
                      trip.duration,
                      style: GoogleFonts.inter(
                        color: isDark ? Colors.white : navy,
                        fontWeight: FontWeight.w600,
                        fontSize: 14,
                      ),
                    ),
                    const SizedBox(width: 14),
                    Icon(Icons.star, color: gold, size: 16),
                    const SizedBox(width: 4),
                    Text(
                      trip.rating,
                      style: GoogleFonts.inter(
                        color: isDark ? Colors.white : navy,
                        fontWeight: FontWeight.w600,
                        fontSize: 14,
                      ),
                    ),
                    const Spacer(),
                    Text(
                      trip.price,
                      style: GoogleFonts.playfairDisplay(
                        color: gold,
                        fontWeight: FontWeight.bold,
                        fontSize: 18,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
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
                    onPressed: onTap,
                    child: Text(
                      "View Details",
                      style: GoogleFonts.inter(
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// Shimmer/Loader Card Widget
class _ShimmerTripCard extends StatelessWidget {
  final bool isDark;
  final Color navy;
  const _ShimmerTripCard({required this.isDark, required this.navy});

  @override
  Widget build(BuildContext context) {
    final baseColor = isDark ? Colors.grey[800]! : Colors.grey[300]!;
    final highlightColor = isDark ? Colors.grey[700]! : Colors.grey[100]!;

    return Container(
      margin: const EdgeInsets.only(bottom: 18),
      decoration: BoxDecoration(
        color: isDark ? navy.withOpacity(0.85) : Colors.white,
        borderRadius: BorderRadius.circular(18),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 140,
            width: double.infinity,
            decoration: BoxDecoration(
              color: baseColor,
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(18),
                topRight: Radius.circular(18),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(18, 14, 18, 18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  height: 18,
                  width: 180,
                  color: baseColor,
                  margin: const EdgeInsets.only(bottom: 8),
                ),
                Container(
                  height: 14,
                  width: double.infinity,
                  color: highlightColor,
                  margin: const EdgeInsets.only(bottom: 8),
                ),
                Container(
                  height: 14,
                  width: 120,
                  color: baseColor,
                  margin: const EdgeInsets.only(bottom: 8),
                ),
                Row(
                  children: [
                    Container(
                      height: 14,
                      width: 60,
                      color: highlightColor,
                      margin: const EdgeInsets.only(right: 8),
                    ),
                    Container(height: 14, width: 40, color: baseColor),
                  ],
                ),
                const SizedBox(height: 12),
                Container(
                  height: 38,
                  width: double.infinity,
                  color: highlightColor,
                  margin: const EdgeInsets.only(top: 8),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
