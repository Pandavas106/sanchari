// ignore_for_file: deprecated_member_use

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'trip_planner_screen.dart';
import 'explore_screen.dart';
import 'theme_controller.dart';
import 'profile_screen.dart';
import 'saved_screen.dart';
import 'trip_details.dart';
import 'cart_screen.dart';

class DashboardScreen extends StatefulWidget {
  final String userName;
  const DashboardScreen({super.key, this.userName = "Sarah"});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    final theme = ThemeController.of(context);
    final isDark = theme.isDark;
    final setTheme = theme.setTheme;

    final navy = const Color(0xFF232946);
    final gold = const Color(0xFFF4CA5E);
    final cardBg = const Color(0xFF232946);
    final purple = const Color(0xFF6C63FF);

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

    final bgColor = null;
    final navBarColor = isDark ? cardBg : Colors.white;
    final profileHeaderBg =
        isDark ? cardBg.withOpacity(0.85) : Colors.white.withOpacity(0.85);

    final profileHeaderText = isDark ? Colors.white : navy;
    final profileHeaderSubText = isDark ? Colors.white70 : Colors.black54;

    return Scaffold(
      backgroundColor: bgColor,
      body:
          _selectedIndex == 1
              ? ExploreScreen(isDark: isDark, navy: navy, gold: gold)
              : _selectedIndex == 3
              ? SavedScreen()
              : _selectedIndex == 4
              ? ProfileScreen()
              : Container(
                decoration: BoxDecoration(
                  gradient: isDark ? darkGradient : welcomeGradient,
                ),
                child: SafeArea(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 18,
                      vertical: 18,
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Profile Header
                        Container(
                          padding: const EdgeInsets.symmetric(
                            vertical: 12,
                            horizontal: 10,
                          ),
                          decoration: BoxDecoration(
                            color: profileHeaderBg,
                            borderRadius: BorderRadius.circular(18),
                          ),
                          child: Row(
                            children: [
                              CircleAvatar(
                                radius: 22,
                                backgroundColor: gold.withOpacity(0.18),
                                backgroundImage: const AssetImage(
                                  'assets/avatar.png',
                                ),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      "Good morning,",
                                      style: GoogleFonts.inter(
                                        color: profileHeaderSubText,
                                        fontSize: 14,
                                      ),
                                    ),
                                    Text(
                                      "${widget.userName}!",
                                      style: GoogleFonts.playfairDisplay(
                                        color: profileHeaderText,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 18,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              // Notification bell
                              Stack(
                                children: [
                                  IconButton(
                                    icon: Icon(
                                      Icons.notifications_none_rounded,
                                      color: profileHeaderText,
                                      size: 26,
                                    ),
                                    onPressed: () {},
                                  ),
                                  Positioned(
                                    right: 8,
                                    top: 8,
                                    child: Container(
                                      width: 18,
                                      height: 18,
                                      decoration: BoxDecoration(
                                        color:
                                            isDark
                                                ? Colors.amber
                                                : Color.fromARGB(
                                                  255,
                                                  68,
                                                  93,
                                                  245,
                                                ),
                                        shape: BoxShape.circle,
                                      ),
                                      child: Center(
                                        child: Text(
                                          "3",
                                          style: GoogleFonts.inter(
                                            color:
                                                isDark
                                                    ? Colors.black
                                                    : Colors.white,
                                            fontWeight: FontWeight.bold,
                                            fontSize: 11,
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              // Theme toggle button (global)
                              IconButton(
                                icon: Icon(
                                  isDark
                                      ? Icons.light_mode_rounded
                                      : Icons.dark_mode_rounded,
                                  color: profileHeaderText,
                                  size: 26,
                                ),
                                tooltip:
                                    isDark
                                        ? "Switch to Light Mode"
                                        : "Switch to Dark Mode",
                                onPressed: () {
                                  setTheme(!isDark);
                                },
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 18),

                        // Location Row
                        Row(
                          children: [
                            Icon(
                              Icons.location_on_rounded,
                              color:
                                  isDark
                                      ? Colors.amber
                                      : Color.fromARGB(255, 68, 93, 245),
                              size: 20,
                            ),
                            const SizedBox(width: 4),
                            Text(
                              "New York, NY",
                              style: GoogleFonts.inter(
                                color: isDark ? Colors.white : navy,
                                fontWeight: FontWeight.w600,
                                fontSize: 15,
                              ),
                            ),
                            Icon(
                              Icons.keyboard_arrow_down_rounded,
                              color: isDark ? Colors.white : navy,
                              size: 20,
                            ),
                          ],
                        ),
                        const SizedBox(height: 18),

                        // CTA Card
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.symmetric(
                            vertical: 22,
                            horizontal: 20,
                          ),
                          decoration: BoxDecoration(
                            color:
                                isDark
                                    ? Colors.amber
                                    : Color.fromARGB(255, 68, 93, 245),
                            borderRadius: BorderRadius.circular(18),
                          ),
                          child: Row(
                            children: [
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      "Plan Your Dream Trip",
                                      style: GoogleFonts.playfairDisplay(
                                        color:
                                            isDark
                                                ? Colors.black
                                                : Colors.white,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 18,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      "Let AI create the perfect itinerary for you",
                                      style: GoogleFonts.inter(
                                        color:
                                            isDark
                                                ? Colors.black
                                                : Colors.white,
                                        fontSize: 14,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              GestureDetector(
                                onTap: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder:
                                          (context) =>
                                              const TripPlannerScreen(),
                                    ),
                                  );
                                },
                                child: Container(
                                  decoration: BoxDecoration(
                                    color: isDark ? Colors.black : Colors.white,
                                    shape: BoxShape.circle,
                                  ),
                                  child: Icon(
                                    Icons.arrow_forward_rounded,
                                    color: isDark ? Colors.white : Colors.black,
                                    size: 28,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 26),

                        // Suggested for You Section
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              "Suggested for You",
                              style: GoogleFonts.playfairDisplay(
                                color: isDark ? Colors.white : navy,
                                fontWeight: FontWeight.bold,
                                fontSize: 18,
                              ),
                            ),
                            TextButton(
                              onPressed: () {},
                              style: TextButton.styleFrom(
                                backgroundColor:
                                    !isDark
                                        ? Color.fromARGB(255, 68, 93, 245)
                                        : Colors.amber,
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 18,
                                  vertical: 8,
                                ),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                              ),
                              child: Text(
                                "View All",
                                style: GoogleFonts.inter(
                                  color: !isDark ? Colors.white : Colors.black,
                                  fontWeight: FontWeight.w600,
                                  fontSize: 14,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        SizedBox(
                          height: 180,
                          child: ListView(
                            scrollDirection: Axis.horizontal,
                            children: [
                              RecommendationCard(
                                title: "Bali Paradise",
                                subtitle: "7 days • 2 people",
                                price: "\$1,299",
                                rating: "4.8",
                                tag: "Popular",
                                image: "assets/bali.jpg",
                                navy: navy,
                                gold: gold,
                                isDark: isDark,
                                onTap: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder:
                                          (context) => TripDetailsScreen(
                                            trip: TripDetailsData(
                                              image: "assets/bali.jpg",
                                              title: "Bali Paradise",
                                              price: "\$1,299",
                                              subtitle: "7 days • 2 people",
                                              days: "7 Days",
                                              rating: "4.8",
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
                              ),
                              RecommendationCard(
                                title: "Alpine Escape",
                                subtitle: "5 days • 2 people",
                                price: "\$1,099",
                                rating: "4.7",
                                tag: "New",
                                image: "assets/alps.jpg",
                                navy: navy,
                                gold: gold,
                                isDark: isDark,
                                onTap: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder:
                                          (context) => TripDetailsScreen(
                                            trip: TripDetailsData(
                                              image: "assets/alps.jpg",
                                              title: "Alpine Escape",
                                              price: "\$1,099",
                                              subtitle: "5 days • 2 people",
                                              days: "5 Days",
                                              rating: "4.7",
                                              people: "2 people",
                                              highlights: [
                                                "Explore the beautiful Alps",
                                                "Enjoy mountain adventures",
                                                "Stay in cozy alpine lodges",
                                              ],
                                            ),
                                          ),
                                    ),
                                  );
                                },
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 28),

                        // Category Tiles Section
                        Text(
                          "What are you looking for?",
                          style: GoogleFonts.playfairDisplay(
                            color: isDark ? Colors.white : navy,
                            fontWeight: FontWeight.bold,
                            fontSize: 18,
                          ),
                        ),
                        const SizedBox(height: 14),
                        GridView.count(
                          crossAxisCount: 2,
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          crossAxisSpacing: 16,
                          mainAxisSpacing: 16,
                          childAspectRatio: 1.2,
                          children: [
                            CategoryTile(
                              icon: Icons.flight_takeoff_rounded,
                              label: "Flights",
                              color: Colors.blue,
                              isDark: isDark,
                            ),
                            CategoryTile(
                              icon: Icons.hotel_rounded,
                              label: "Hotels",
                              color: purple,
                              isDark: isDark,
                            ),
                            CategoryTile(
                              icon: Icons.emoji_events_rounded,
                              label: "Experiences",
                              color: gold,
                              isDark: isDark,
                            ),
                            CategoryTile(
                              icon: Icons.restaurant_rounded,
                              label: "Dining",
                              color: Colors.pinkAccent,
                              isDark: isDark,
                            ),
                          ],
                        ),
                        const SizedBox(height: 24),

                        // Recent Searches Section
                        const SizedBox(height: 28),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              "Recent Searches",
                              style: GoogleFonts.playfairDisplay(
                                color: isDark ? Colors.white : navy,
                                fontWeight: FontWeight.bold,
                                fontSize: 17,
                              ),
                            ),
                            TextButton(
                              onPressed: () {},
                              style: TextButton.styleFrom(
                                backgroundColor:
                                    !isDark
                                        ? Color.fromARGB(255, 68, 93, 245)
                                        : Colors.amber,
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 18,
                                  vertical: 8,
                                ),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                              ),
                              child: Text(
                                "Clear All",
                                style: GoogleFonts.inter(
                                  color: !isDark ? Colors.white : Colors.black,
                                  fontWeight: FontWeight.w600,
                                  fontSize: 14,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        Column(
                          children: [
                            RecentSearchTile(
                              location: "Tokyo, Japan",
                              details: "5 days • \$1,800",
                              isDark: isDark,
                              navy: navy,
                              gold: gold,
                            ),
                            const SizedBox(height: 10),
                            RecentSearchTile(
                              location: "Paris, France",
                              details: "7 days • \$2,200",
                              isDark: isDark,
                              navy: navy,
                              gold: gold,
                            ),
                          ],
                        ),

                        // Quick Actions Section
                        const SizedBox(height: 28),
                        Text(
                          "Quick Actions",
                          style: GoogleFonts.playfairDisplay(
                            color: isDark ? Colors.white : navy,
                            fontWeight: FontWeight.bold,
                            fontSize: 17,
                          ),
                        ),
                        const SizedBox(height: 12),
                        SizedBox(
                          height: 90, // Increased height to prevent overflow
                          child: ListView(
                            scrollDirection: Axis.horizontal,
                            children: [
                              QuickActionTile(
                                icon: Icons.card_travel_rounded,
                                label: "My Trips",
                                gold: gold,
                                navy: navy,
                                isDark: isDark,
                              ),
                              const SizedBox(width: 12),
                              QuickActionTile(
                                icon: Icons.bookmark_rounded,
                                label: "Saved",
                                gold: gold,
                                navy: navy,
                                isDark: isDark,
                              ),
                              const SizedBox(width: 12),
                              QuickActionTile(
                                icon: Icons.card_giftcard_rounded,
                                label: "Offers",
                                gold: gold,
                                navy: navy,
                                isDark: isDark,
                              ),
                              const SizedBox(width: 12),
                              QuickActionTile(
                                icon: Icons.support_agent_rounded,
                                label: "Support",
                                gold: gold,
                                navy: navy,
                                isDark: isDark,
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 24),
                      ],
                    ),
                  ),
                ),
              ),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: navBarColor,
        selectedItemColor:
            isDark ? Colors.amber : Color.fromARGB(255, 68, 93, 245),
        unselectedItemColor: isDark ? Colors.white70 : navy,
        type: BottomNavigationBarType.fixed,
        currentIndex: _selectedIndex,
        showSelectedLabels: true,
        showUnselectedLabels: true,
        selectedLabelStyle: GoogleFonts.inter(
          fontWeight: FontWeight.bold,
          fontSize: 14,
          color: isDark ? Colors.amber : Color.fromARGB(255, 68, 93, 245),
        ),
        unselectedLabelStyle: GoogleFonts.inter(
          fontWeight: FontWeight.w500,
          fontSize: 14,
          color: isDark ? Colors.white70 : navy,
        ),
        items: [
          BottomNavigationBarItem(
            icon: Icon(
              Icons.home_rounded,
              color:
                  _selectedIndex == 0
                      ? (isDark
                          ? Colors.amber
                          : Color.fromARGB(255, 68, 93, 245))
                      : (isDark ? Colors.white70 : navy),
            ),
            label: "Home",
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.explore_rounded,
              color:
                  _selectedIndex == 1
                      ? (isDark
                          ? Colors.amber
                          : Color.fromARGB(255, 68, 93, 245))
                      : (isDark ? Colors.white70 : navy),
            ),
            label: "Explore",
          ),
          BottomNavigationBarItem(
            icon: Container(
              decoration: BoxDecoration(
                color: isDark ? Colors.amber : Color.fromARGB(255, 68, 93, 245),
                shape: BoxShape.circle,
              ),
              padding: const EdgeInsets.all(10),
              child: Icon(
                Icons.auto_fix_high_rounded,
                color:
                    _selectedIndex == 2
                        ? (isDark ? navy : Color.fromARGB(255, 68, 93, 245))
                        : (isDark ? Colors.black : Colors.white),
                size: 28,
              ),
            ),
            label: "Plan Trip",
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.shopping_cart_rounded,
              color:
                  _selectedIndex == 3
                      ? (isDark
                          ? Colors.amber
                          : Color.fromARGB(255, 68, 93, 245))
                      : (isDark ? Colors.white70 : navy),
            ),
            label: "Cart",
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.person_rounded,
              color:
                  _selectedIndex == 4
                      ? (isDark
                          ? Colors.amber
                          : Color.fromARGB(255, 68, 93, 245))
                      : (isDark ? Colors.white70 : navy),
            ),
            label: "Profile",
          ),
        ],
        onTap: (index) {
          if (index == 2) {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => const TripPlannerScreen(),
              ),
            );
          } else if (index == 3) {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder:
                    (context) =>
                        const CartScreen(), // <-- Navigate to CartScreen
              ),
            );
          } else {
            setState(() {
              _selectedIndex = index;
            });
          }
        },
      ),
    );
  }
}

class RecommendationCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final String price;
  final String rating;
  final String tag;
  final String image;
  final Color navy;
  final Color gold;
  final bool isDark;
  final VoidCallback? onTap;

  const RecommendationCard({
    super.key,
    required this.title,
    required this.subtitle,
    required this.price,
    required this.rating,
    required this.tag,
    required this.image,
    required this.navy,
    required this.gold,
    required this.isDark,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final cardColor = isDark ? navy : Colors.white;
    final textColor = isDark ? Colors.white : navy;
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 260,
        margin: const EdgeInsets.only(right: 18),
        decoration: BoxDecoration(
          color: cardColor,
          borderRadius: BorderRadius.circular(22),
          image: DecorationImage(
            image: AssetImage(image),
            fit: BoxFit.cover,
            colorFilter: ColorFilter.mode(
              Colors.black.withOpacity(0.18),
              BlendMode.darken,
            ),
          ),
          boxShadow: [
            BoxShadow(
              color: navy.withOpacity(0.12),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Stack(
          children: [
            // Glass overlay
            Positioned.fill(
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(22),
                  color: Colors.black.withOpacity(0.25),
                  border: Border.all(
                    color: Colors.white.withOpacity(0.13),
                    width: 1.2,
                  ),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(18),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (tag.isNotEmpty)
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 10,
                        vertical: 4,
                      ),
                      decoration: BoxDecoration(
                        color:
                            isDark
                                ? Colors.amber
                                : Color.fromARGB(255, 68, 93, 245),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        tag,
                        style: GoogleFonts.inter(
                          color: isDark ? Colors.black : Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 12,
                        ),
                      ),
                    ),
                  const Spacer(),
                  Text(
                    title,
                    style: GoogleFonts.playfairDisplay(
                      color:
                          isDark
                              ? Colors.amber
                              : Color.fromARGB(255, 68, 93, 245),
                      fontWeight: FontWeight.bold,
                      fontSize: 18,
                    ),
                  ),
                  Text(
                    subtitle,
                    style: GoogleFonts.inter(
                      color:
                          isDark
                              ? Colors.amber
                              : Color.fromARGB(255, 68, 93, 245),
                      fontSize: 13,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Icon(
                        Icons.star,
                        color:
                            isDark
                                ? Colors.amber
                                : Color.fromARGB(255, 68, 93, 245),
                        size: 18,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        rating,
                        style: GoogleFonts.inter(
                          color:
                              isDark
                                  ? Colors.amber
                                  : Color.fromARGB(255, 68, 93, 245),
                          fontWeight: FontWeight.bold,
                          fontSize: 13,
                        ),
                      ),
                      const Spacer(),
                      Text(
                        price,
                        style: GoogleFonts.inter(
                          color:
                              isDark
                                  ? Colors.amber
                                  : Color.fromARGB(255, 68, 93, 245),
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                      const SizedBox(width: 2),
                      Text(
                        "per person", // <-- label restored as before
                        style: GoogleFonts.inter(
                          color:
                              isDark
                                  ? Colors.amber
                                  : Color.fromARGB(255, 68, 93, 245),
                          fontSize: 11,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            // Heart icon
            Positioned(
              top: 12,
              right: 12,
              child: CircleAvatar(
                backgroundColor: Colors.white.withOpacity(0.7),
                radius: 16,
                child: Icon(
                  Icons.favorite_border_rounded,
                  color: navy,
                  size: 18,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class CategoryTile extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color color;
  final bool isDark;
  const CategoryTile({
    super.key,
    required this.icon,
    required this.label,
    required this.color,
    required this.isDark,
  });

  @override
  Widget build(BuildContext context) {
    final cardColor =
        isDark ? color.withOpacity(0.18) : color.withOpacity(0.08);
    final borderColor = Colors.white.withOpacity(0.13);
    final textColor = isDark ? color : color;
    return Container(
      decoration: BoxDecoration(
        color: cardColor,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: borderColor, width: 1.2),
        boxShadow: [
          BoxShadow(
            color: color.withOpacity(0.06),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, color: textColor, size: 36),
            const SizedBox(height: 10),
            Text(
              label,
              style: GoogleFonts.playfairDisplay(
                color: textColor,
                fontWeight: FontWeight.bold,
                fontSize: 16,
                letterSpacing: 0.5,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class RecentSearchTile extends StatelessWidget {
  final String location;
  final String details;
  final bool isDark;
  final Color navy;
  final Color gold;
  const RecentSearchTile({
    super.key,
    required this.location,
    required this.details,
    required this.isDark,
    required this.navy,
    required this.gold,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 18),
      decoration: BoxDecoration(
        color: isDark ? navy.withOpacity(0.85) : Colors.white,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          Icon(
            Icons.location_on_rounded,
            color: isDark ? Colors.amber : Color.fromARGB(255, 68, 93, 245),
            size: 22,
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  location,
                  style: GoogleFonts.inter(
                    color: isDark ? Colors.white : navy,
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                  ),
                ),
                Text(
                  details,
                  style: GoogleFonts.inter(
                    color: isDark ? Colors.white70 : navy.withOpacity(0.7),
                    fontSize: 13,
                  ),
                ),
              ],
            ),
          ),
          const Icon(Icons.chevron_right_rounded, color: Colors.white38),
        ],
      ),
    );
  }
}

class QuickActionTile extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color gold;
  final Color navy;
  final bool isDark;
  const QuickActionTile({
    super.key,
    required this.icon,
    required this.label,
    required this.gold,
    required this.navy,
    required this.isDark,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 110,
      margin: const EdgeInsets.only(right: 2),
      padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 8),
      decoration: BoxDecoration(
        color: isDark ? navy : Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isDark ? Colors.white12 : navy.withOpacity(0.08),
          width: 1.2,
        ),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min, // <-- Add this line
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            icon,
            color: isDark ? Colors.amber : Color.fromARGB(255, 68, 93, 245),
            size: 28,
          ),
          const SizedBox(height: 6),
          Text(
            label,
            style: GoogleFonts.inter(
              color: isDark ? Colors.white : navy,
              fontWeight: FontWeight.w600,
              fontSize: 14,
            ),
          ),
        ],
      ),
    );
  }
}
