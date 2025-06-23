// ignore_for_file: deprecated_member_use

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'theme_controller.dart';
import 'my_bookings_screen.dart';
import 'settings_screen.dart';
import 'saved_screen.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = ThemeController.of(context);
    final isDark = theme.isDark;
    final setTheme = theme.setTheme;
    final navy = const Color(0xFF232946);
    final gold = const Color(0xFFF4CA5E);
    final cardBg = isDark ? navy.withOpacity(0.85) : Colors.white;
    final bgColor = isDark ? navy : const Color(0xFFF5F6FA);

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
      backgroundColor: bgColor,
      appBar: AppBar(
        backgroundColor: bgColor,
        elevation: 0,
        centerTitle: true,
        title: Text(
          "Profile",
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
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 18),
          child: Column(
            children: [
              // Profile Card
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(18),
                decoration: BoxDecoration(
                  color: cardBg,
                  borderRadius: BorderRadius.circular(20),
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
                    Row(
                      children: [
                        CircleAvatar(
                          radius: 32,
                          backgroundColor: gold.withOpacity(0.18),
                          backgroundImage: const AssetImage(
                            'assets/avatar.png',
                          ),
                        ),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      "Sarah Johnson",
                                      style: GoogleFonts.inter(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 18,
                                        color: isDark ? Colors.white : navy,
                                      ),
                                    ),
                                  ),
                                  Icon(Icons.edit, color: gold, size: 18),
                                ],
                              ),
                              const SizedBox(height: 2),
                              Text(
                                "sarah.johnson@email.com",
                                style: GoogleFonts.inter(
                                  color:
                                      isDark ? Colors.white70 : Colors.black54,
                                  fontSize: 14,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Row(
                      children: [
                        Icon(Icons.star, color: gold, size: 18),
                        const SizedBox(width: 4),
                        Text(
                          "4.9  Premium Member",
                          style: GoogleFonts.inter(
                            color: isDark ? Colors.white : navy,
                            fontWeight: FontWeight.w600,
                            fontSize: 13,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    const Divider(height: 1, thickness: 1),
                    const SizedBox(height: 10),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _ProfileStat(
                          value: "24",
                          label: "Trips",
                          isDark: isDark,
                          navy: navy,
                        ),
                        _ProfileStat(
                          value: "156",
                          label: "Reviews",
                          isDark: isDark,
                          navy: navy,
                        ),
                        _ProfileStat(
                          value: "89",
                          label: "Photos",
                          isDark: isDark,
                          navy: navy,
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 18),
              // Points & Upcoming Trips
              Row(
                children: [
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.all(18),
                      decoration: BoxDecoration(
                        color: gold,
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Icon(
                                Icons.card_travel_rounded,
                                color: navy,
                                size: 22,
                              ),
                              const Spacer(),
                              Container(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 8,
                                  vertical: 2,
                                ),
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Text(
                                  "+15%",
                                  style: GoogleFonts.inter(
                                    color: gold,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 11,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 10),
                          Text(
                            "2,450",
                            style: GoogleFonts.playfairDisplay(
                              color: navy,
                              fontWeight: FontWeight.bold,
                              fontSize: 22,
                            ),
                          ),
                          Text(
                            "Travel Points",
                            style: GoogleFonts.inter(
                              color: navy,
                              fontWeight: FontWeight.w600,
                              fontSize: 13,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.all(18),
                      decoration: BoxDecoration(
                        color:
                            isDark
                                ? const Color.fromARGB(255, 68, 93, 245)
                                : const Color.fromARGB(255, 68, 93, 245),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Icon(
                                Icons.flight_takeoff_rounded,
                                color: gold,
                                size: 22,
                              ),
                              const Spacer(),
                              Container(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 8,
                                  vertical: 2,
                                ),
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Text(
                                  "Active",
                                  style: GoogleFonts.inter(
                                    color: navy,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 11,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 10),
                          Text(
                            "3",
                            style: GoogleFonts.playfairDisplay(
                              color: gold,
                              fontWeight: FontWeight.bold,
                              fontSize: 22,
                            ),
                          ),
                          Text(
                            "Upcoming Trips",
                            style: GoogleFonts.inter(
                              color: gold,
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
              const SizedBox(height: 18),
              // My Bookings
              _ProfileMenuTile(
                icon: Icons.calendar_month_rounded,
                title: "My Bookings",
                subtitle: "View and manage trips",
                isDark: isDark,
                navy: navy,
                iconColor: Colors.orange,
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const MyBookingsScreen(),
                    ),
                  );
                },
              ),
              // Favorites
              _ProfileMenuTile(
                icon: Icons.favorite_rounded,
                title: "Favorites",
                subtitle: "Saved places & activities",
                isDark: isDark,
                navy: navy,
                iconColor: Colors.red,
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const SavedScreen(),
                    ),
                  );
                },
              ),
              // Payment Methods
              _ProfileMenuTile(
                icon: Icons.credit_card_rounded,
                title: "Payment Methods",
                subtitle: "Cards & payment options",
                isDark: isDark,
                navy: navy,
                iconColor: Colors.green,
              ),
              _ProfileMenuTile(
                icon: Icons.card_giftcard_rounded,
                title: "Referral Program",
                subtitle: "Invite friends & earn rewards",
                isDark: isDark,
                navy: navy,
                iconColor: Colors.purple,
              ),
              _ProfileMenuTile(
                icon: Icons.support_agent_rounded,
                title: "Help & Support",
                subtitle: "Get assistance",
                isDark: isDark,
                navy: navy,
                iconColor: Colors.blue,
              ),
              _ProfileMenuTile(
                icon: Icons.settings_rounded,
                title: "Settings",
                subtitle: "Privacy & preferences",
                isDark: isDark,
                navy: navy,
                iconColor: Colors.grey,
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const SettingsScreen(),
                    ),
                  );
                },
              ),

              // Sign Out Button
              const SizedBox(height: 18),
              Container(
                width: double.infinity,
                margin: const EdgeInsets.only(top: 6, bottom: 8),
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.red[50],
                    foregroundColor: Colors.red[700],
                    elevation: 0,
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                  ),
                  icon: const Icon(Icons.logout_rounded),
                  label: Text(
                    "Sign Out",
                    style: GoogleFonts.inter(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                  onPressed: () {
                    // Add your sign out logic here
                  },
                ),
              ),

              // App Version
              const SizedBox(height: 8),
              Text(
                "Sanchari v2.1.0",
                style: GoogleFonts.inter(
                  color: isDark ? Colors.white54 : Colors.black38,
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ProfileStat extends StatelessWidget {
  final String value;
  final String label;
  final bool isDark;
  final Color navy;
  const _ProfileStat({
    required this.value,
    required this.label,
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
            fontSize: 16,
          ),
        ),
        Text(
          label,
          style: GoogleFonts.inter(
            color: isDark ? Colors.white70 : Colors.black54,
            fontSize: 13,
          ),
        ),
      ],
    );
  }
}

class _ProfileMenuTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final bool isDark;
  final Color navy;
  final Color? iconColor;
  final VoidCallback? onTap;
  const _ProfileMenuTile({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.isDark,
    required this.navy,
    this.iconColor,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 14),
      decoration: BoxDecoration(
        color: isDark ? navy.withOpacity(0.85) : Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: navy.withOpacity(0.04),
            blurRadius: 6,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: ListTile(
        leading: Icon(
          icon,
          color: iconColor ?? (isDark ? Colors.white : navy),
          size: 28,
        ),
        title: Text(
          title,
          style: GoogleFonts.inter(
            color: isDark ? Colors.white : navy,
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
        ),
        subtitle: Text(
          subtitle,
          style: GoogleFonts.inter(
            color: isDark ? Colors.white70 : Colors.black54,
            fontSize: 13,
          ),
        ),
        trailing: Icon(
          Icons.chevron_right_rounded,
          color: isDark ? Colors.white38 : navy,
          size: 24,
        ),
        onTap: onTap,
      ),
    );
  }
}
