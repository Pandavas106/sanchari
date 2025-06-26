// ignore_for_file: deprecated_member_use

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'theme_controller.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

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

    return Scaffold(
      backgroundColor: isDark ? navy : const Color(0xFFF5F6FA),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back_ios_new_rounded,
            color: isDark ? Colors.white : navy,
          ),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          "Settings",
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
            // Profile Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color:
                    isDark
                        ? const Color(0xFF232946).withOpacity(0.95)
                        : const Color(0xFF232946).withOpacity(0.08),
                borderRadius: BorderRadius.circular(18),
              ),
              child: Row(
                children: [
                  CircleAvatar(
                    radius: 28,
                    backgroundColor: gold.withOpacity(0.18),
                    backgroundImage: const AssetImage('assets/avatar.png'),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Sarah Johnson",
                          style: GoogleFonts.inter(
                            fontWeight: FontWeight.bold,
                            fontSize: 17,
                            color: isDark ? Colors.white : navy,
                          ),
                        ),
                        Text(
                          "sarah.johnson@email.com",
                          style: GoogleFonts.inter(
                            color: isDark ? Colors.white70 : Colors.black54,
                            fontSize: 14,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Row(
                          children: [
                            Icon(Icons.star, color: gold, size: 16),
                            const SizedBox(width: 4),
                            Text(
                              "Premium Member",
                              style: GoogleFonts.inter(
                                color: gold,
                                fontWeight: FontWeight.w600,
                                fontSize: 13,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  Icon(
                    Icons.chevron_right_rounded,
                    color: isDark ? Colors.white54 : navy,
                    size: 28,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            Text(
              "Account",
              style: GoogleFonts.playfairDisplay(
                color: isDark ? Colors.white : navy,
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 12),
            _SettingsTile(
              icon: Icons.person_rounded,
              title: "Personal Information",
              subtitle: "Name, email, phone number",
              isDark: isDark,
              navy: navy,
              iconBg: Colors.amber[700]!,
            ),
            _SettingsTile(
              icon: Icons.credit_card_rounded,
              title: "Payment Methods",
              subtitle: "Cards, wallets, billing",
              isDark: isDark,
              navy: navy,
              iconBg: Colors.blue[700]!,
            ),
            _SettingsTile(
              icon: Icons.security_rounded,
              title: "Privacy & Security",
              subtitle: "Password, biometrics, data",
              isDark: isDark,
              navy: navy,
              iconBg: Colors.deepPurple[700]!,
            ),
            // Preferences Section
            const SizedBox(height: 24),
            Text(
              "Preferences",
              style: GoogleFonts.playfairDisplay(
                color: isDark ? Colors.white : navy,
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 12),
            // Theme
            _SettingsTile(
              icon: Icons.palette_rounded,
              title: "Theme",
              subtitle: "Dark mode",
              isDark: isDark,
              navy: navy,
              iconBg: Colors.amber[700]!,
              trailing: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    isDark ? "Dark" : "Light",
                    style: GoogleFonts.inter(
                      color: isDark ? Colors.white : navy,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Switch(
                    value: isDark,
                    activeColor: Colors.amber[700],
                    onChanged: (val) => setTheme(val),
                  ),
                ],
              ),
              onTap: null,
            ),
            // Language
            _SettingsTile(
              icon: Icons.language_rounded,
              title: "Language",
              subtitle: "English (US)",
              isDark: isDark,
              navy: navy,
              iconBg: Colors.brown[400]!,
              onTap: () {},
            ),
            // Currency
            _SettingsTile(
              icon: Icons.attach_money_rounded,
              title: "Currency",
              subtitle: "USD (\$)",
              isDark: isDark,
              navy: navy,
              iconBg: Colors.green[700]!,
              onTap: () {},
            ),
            // Location Services
            _SettingsTile(
              icon: Icons.location_on_rounded,
              title: "Location Services",
              subtitle: "Always allow",
              isDark: isDark,
              navy: navy,
              iconBg: Colors.blue[700]!,
              trailing: Switch(
                value: true,
                activeColor: Colors.amber[700],
                onChanged: (val) {},
              ),
              onTap: null,
            ),
            // Support & About Section
            const SizedBox(height: 24),
            Text(
              "Support & About",
              style: GoogleFonts.playfairDisplay(
                color: isDark ? Colors.white : navy,
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 12),
            _SettingsTile(
              icon: Icons.headset_mic_rounded,
              title: "Help & Support",
              subtitle: "",
              isDark: isDark,
              navy: navy,
              iconBg: Colors.amber[700]!,
              onTap: () {},
            ),
            _SettingsTile(
              icon: Icons.description_rounded,
              title: "Terms & Conditions",
              subtitle: "",
              isDark: isDark,
              navy: navy,
              iconBg: Colors.brown[400]!,
              onTap: () {},
            ),
            _SettingsTile(
              icon: Icons.privacy_tip_rounded,
              title: "Privacy Policy",
              subtitle: "",
              isDark: isDark,
              navy: navy,
              iconBg: Colors.green[700]!,
              onTap: () {},
            ),
            _SettingsTile(
              icon: Icons.info_rounded,
              title: "About Sanchari",
              subtitle: "Version 2.4.1",
              isDark: isDark,
              navy: navy,
              iconBg: Colors.blue[700]!,
              onTap: () {},
            ),
            const SizedBox(height: 18),
            // Sign Out Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.red[700],
                  foregroundColor: Colors.white,
                  elevation: 0,
                  padding: const EdgeInsets.symmetric(vertical: 16),
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
          ],
        ),
      ),
    );
  }
}

class _SettingsTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final bool isDark;
  final Color navy;
  final Color iconBg;
  final Widget? trailing;
  final VoidCallback? onTap;

  const _SettingsTile({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.isDark,
    required this.navy,
    required this.iconBg,
    this.trailing,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 14),
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
        leading: CircleAvatar(
          backgroundColor: iconBg,
          child: Icon(icon, color: Colors.white),
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
        trailing:
            trailing ??
            Icon(
              Icons.chevron_right_rounded,
              color: isDark ? Colors.white38 : navy,
              size: 24,
            ),
        onTap: onTap,
      ),
    );
  }
}
