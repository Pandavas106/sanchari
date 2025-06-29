// ignore_for_file: deprecated_member_use

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'theme_controller.dart';

class TripPlanScreen extends StatelessWidget {
  const TripPlanScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = ThemeController.of(context);
    final isDark = theme.isDark;

    final navy = const Color(0xFF232946);
    final blue = const Color.fromARGB(255, 68, 93, 245);
    final gold = Colors.amber;

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

    final highlightColor = isDark ? gold : blue;

    return Scaffold(
      backgroundColor: isDark ? navy : const Color(0xFFF5F6FA),
      body: Container(
        decoration: BoxDecoration(
          gradient: isDark ? darkGradient : welcomeGradient,
        ),
        child: SafeArea(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Trip Info Card
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(
                    vertical: 20,
                    horizontal: 20,
                  ),
                  decoration: BoxDecoration(
                    color: isDark ? navy : Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: [
                      BoxShadow(
                        color:
                            isDark
                                ? Colors.black.withOpacity(0.18)
                                : navy.withOpacity(0.08),
                        blurRadius: 16,
                        offset: const Offset(0, 6),
                      ),
                    ],
                  ),
                  child: Row(
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "Bali Adventure",
                              style: GoogleFonts.playfairDisplay(
                                color: isDark ? Colors.white : navy,
                                fontWeight: FontWeight.bold,
                                fontSize: 20,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              "Dec 15 - Dec 22, 2024",
                              style: GoogleFonts.inter(
                                color:
                                    isDark
                                        ? Colors.white70
                                        : navy.withOpacity(0.7),
                                fontSize: 15,
                              ),
                            ),
                          ],
                        ),
                      ),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: highlightColor,
                          foregroundColor: isDark ? navy : Colors.white,
                          elevation: 0,
                          padding: const EdgeInsets.symmetric(
                            horizontal: 22,
                            vertical: 12,
                          ),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(14),
                          ),
                        ),
                        onPressed: () {},
                        child: Text(
                          "Share Trip",
                          style: GoogleFonts.inter(
                            color: isDark ? navy : Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 15,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 36),
                // Timeline
                Column(
                  children: [
                    _TimelineItem(
                      isFirst: true,
                      icon: Icons.home_rounded,
                      iconColor: Colors.green,
                      title: "Home",
                      subtitle: "Mumbai, Maharashtra",
                      cardChild: Padding(
                        padding: const EdgeInsets.only(top: 8.0),
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: isDark ? navy : blue,
                            foregroundColor: Colors.white,
                            elevation: 0,
                            padding: const EdgeInsets.symmetric(
                              horizontal: 18,
                              vertical: 10,
                            ),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                          onPressed: () {},
                          child: Text(
                            "Get Directions",
                            style: GoogleFonts.inter(
                              fontWeight: FontWeight.bold,
                              fontSize: 14,
                            ),
                          ),
                        ),
                      ),
                      isDark: isDark,
                    ),
                    _TimelineConnector(isDark: isDark),

                    _TimelineItem(
                      isFirst: false,
                      icon: Icons.flight_takeoff_rounded,
                      iconColor: isDark ? gold : blue,
                      title: "Ngurah Rai Airport",
                      subtitle: "Denpasar, Bali",
                      cardChild: Padding(
                        padding: const EdgeInsets.only(top: 8.0),
                        child: Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 12,
                                vertical: 4,
                              ),
                              decoration: BoxDecoration(
                                color: Colors.green.shade100,
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: Text(
                                "On Time",
                                style: GoogleFonts.inter(
                                  color: Colors.green.shade800,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 13,
                                ),
                              ),
                            ),
                            const Spacer(),
                            Text(
                              "14:30",
                              style: GoogleFonts.inter(
                                color: isDark ? Colors.white : navy,
                                fontWeight: FontWeight.bold,
                                fontSize: 18,
                              ),
                            ),
                          ],
                        ),
                      ),
                      bottomInfo: Padding(
                        padding: const EdgeInsets.only(top: 8.0),
                        child: Text(
                          "Terminal 2 • Gate A12",
                          style: GoogleFonts.inter(
                            color:
                                isDark ? Colors.white70 : navy.withOpacity(0.7),
                            fontSize: 13,
                          ),
                        ),
                      ),
                      isDark: isDark,
                    ),
                    _TimelineConnector(isDark: isDark),

                    // 1️⃣ Hotel Stay Section (now after airport)
                    _TimelineItem(
                      isFirst: false,
                      icon: Icons.bed_rounded,
                      iconColor: Colors.white,
                      iconBg: Colors.purple,
                      customCard: _HotelStayCard(isDark: isDark),
                      isDark: isDark,
                    ),
                    _TimelineConnector(isDark: isDark),

                    // 2️⃣ Local Food Section (now after hotel)
                    _TimelineItem(
                      isFirst: false,
                      icon: Icons.restaurant_rounded,
                      iconColor: Colors.white,
                      iconBg: Colors.orange,
                      customCard: _LocalFoodCard(isDark: isDark),
                      isDark: isDark,
                    ),
                    _TimelineConnector(isDark: isDark),

                    // Return Flight Timeline Section
                    _TimelineItem(
                      isFirst: false,
                      icon: Icons.flight_rounded,
                      iconColor: Colors.white,
                      iconBg: Colors.blue,
                      customCard: _ReturnFlightCard(isDark: isDark, navy: navy),
                      isDark: isDark,
                    ),
                    _TimelineConnector(isDark: isDark),

                    // Local Activities Timeline Section
                    _TimelineItem(
                      isFirst: false,
                      icon: Icons.terrain_rounded,
                      iconColor: Colors.white,
                      iconBg: Colors.teal,
                      customCard: _LocalActivitiesCard(
                        isDark: isDark,
                        navy: navy,
                      ),
                      isDark: isDark,
                    ),
                    _TimelineConnector(isDark: isDark),
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

class _TimelineItem extends StatelessWidget {
  final bool isFirst;
  final IconData icon;
  final Color iconColor;
  final String? title;
  final String? subtitle;
  final Widget? cardChild;
  final Widget? bottomInfo;
  final bool isDark;
  final Color? iconBg;
  final Widget? customCard;

  const _TimelineItem({
    required this.isFirst,
    required this.icon,
    required this.iconColor,
    this.title,
    this.subtitle,
    this.cardChild,
    this.bottomInfo,
    required this.isDark,
    this.iconBg,
    this.customCard,
  });

  @override
  Widget build(BuildContext context) {
    final navy = const Color(0xFF232946);
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Timeline + Icon
        Container(
          width: 38,
          child: Stack(
            alignment: Alignment.topCenter,
            children: [
              // Draw the vertical line behind the icon
              Positioned.fill(
                child: Align(
                  alignment: Alignment.topCenter,
                  child: _VerticalConnectorLine(
                    isDark: isDark,
                    isFirst: isFirst,
                  ),
                ),
              ),
              // Icon in circle
              Align(
                alignment: Alignment.topCenter,
                child: Container(
                  width: 38,
                  height: 38,
                  decoration: BoxDecoration(
                    color: iconBg ?? (isDark ? navy : Colors.white),
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color:
                            isDark
                                ? Colors.black.withOpacity(0.12)
                                : navy.withOpacity(0.08),
                        blurRadius: 8,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Center(child: Icon(icon, color: iconColor, size: 22)),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(width: 16),
        // Card
        Expanded(
          child:
              customCard ??
              Container(
                margin: const EdgeInsets.only(bottom: 18),
                padding: const EdgeInsets.all(18),
                decoration: BoxDecoration(
                  color: isDark ? navy : Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  boxShadow: [
                    BoxShadow(
                      color:
                          isDark
                              ? Colors.black.withOpacity(0.10)
                              : navy.withOpacity(0.07),
                      blurRadius: 12,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (title != null)
                      Text(
                        title!,
                        style: GoogleFonts.playfairDisplay(
                          color: isDark ? Colors.white : navy,
                          fontWeight: FontWeight.bold,
                          fontSize: 17,
                        ),
                      ),
                    if (subtitle != null) ...[
                      const SizedBox(height: 2),
                      Text(
                        subtitle!,
                        style: GoogleFonts.inter(
                          color:
                              isDark ? Colors.white70 : navy.withOpacity(0.7),
                          fontSize: 14,
                        ),
                      ),
                    ],
                    if (cardChild != null) cardChild!,
                    if (bottomInfo != null) bottomInfo!,
                  ],
                ),
              ),
        ),
      ],
    );
  }
}

class _VerticalConnectorLine extends StatelessWidget {
  final bool isDark;
  final bool isFirst;
  const _VerticalConnectorLine({required this.isDark, required this.isFirst});

  @override
  Widget build(BuildContext context) {
    final navy = const Color(0xFF232946);
    return LayoutBuilder(
      builder: (context, constraints) {
        return CustomPaint(
          size: Size(2.5, constraints.maxHeight),
          painter: _DashedLinePainter(
            color: isDark ? Colors.white38 : navy.withOpacity(0.18),
            topPadding: isFirst ? 19 : 0, // leave space above the first icon
            bottomPadding: 19, // leave space below the icon
          ),
        );
      },
    );
  }
}

class _DashedLinePainter extends CustomPainter {
  final Color color;
  final double topPadding;
  final double bottomPadding;
  _DashedLinePainter({
    required this.color,
    this.topPadding = 0,
    this.bottomPadding = 0,
  });

  @override
  void paint(Canvas canvas, Size size) {
    const dashHeight = 6.0;
    const dashSpace = 4.0;
    double startY = topPadding;
    final endY = size.height - bottomPadding;
    final paint =
        Paint()
          ..color = color
          ..strokeWidth = size.width
          ..strokeCap = StrokeCap.round;
    while (startY < endY) {
      final currentDashEnd = (startY + dashHeight).clamp(0, endY);
      canvas.drawLine(
        Offset(size.width / 2, startY),
        Offset(size.width / 2, currentDashEnd.toDouble()),
        paint,
      );
      startY += dashHeight + dashSpace;
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _HotelStayCard extends StatelessWidget {
  final bool isDark;
  const _HotelStayCard({required this.isDark});

  @override
  Widget build(BuildContext context) {
    final highlight = isDark ? Colors.amber : const Color(0xFF445DF5);
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF232946) : Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
            color:
                isDark
                    ? Colors.black.withOpacity(0.10)
                    : const Color(0xFF232946).withOpacity(0.07),
            blurRadius: 12,
            offset: const Offset(0, 4),
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
            child: Image.network(
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
              height: 110,
              width: double.infinity,
              fit: BoxFit.cover,
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "Alaya Resort Ubud",
                  style: GoogleFonts.playfairDisplay(
                    color: isDark ? Colors.white : const Color(0xFF232946),
                    fontWeight: FontWeight.bold,
                    fontSize: 17,
                  ),
                ),
                const SizedBox(height: 4),
                Row(
                  children: [
                    Icon(Icons.star, color: Colors.orange, size: 18),
                    const SizedBox(width: 4),
                    Text(
                      "4.8",
                      style: GoogleFonts.inter(
                        color: Colors.orange.shade800,
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                      ),
                    ),
                    const Spacer(),
                    Text(
                      "\$120/night",
                      style: GoogleFonts.inter(
                        color: isDark ? Colors.amber : const Color(0xFF445DF5),
                        fontWeight: FontWeight.bold,
                        fontSize: 15,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                Text(
                  "Luxury resort with infinity pool & spa",
                  style: GoogleFonts.inter(
                    color:
                        isDark
                            ? Colors.white70
                            : const Color(0xFF232946).withOpacity(0.7),
                    fontSize: 14,
                  ),
                ),
                const SizedBox(height: 14),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: highlight,
                      foregroundColor:
                          isDark ? const Color(0xFF232946) : Colors.white,
                      elevation: 0,
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    onPressed: () {},
                    child: Text(
                      "Book Now",
                      style: GoogleFonts.inter(
                        fontWeight: FontWeight.bold,
                        fontSize: 15,
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

class _TimelineConnector extends StatelessWidget {
  final bool isDark;
  const _TimelineConnector({required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 19.0),
      child: SizedBox(
        height: 32,
        child: Align(
          alignment: Alignment.topCenter,
          child: _VerticalConnectorLine(isDark: isDark, isFirst: false),
        ),
      ),
    );
  }
}

class _LocalFoodCard extends StatelessWidget {
  final bool isDark;
  const _LocalFoodCard({required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF232946) : Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
            color:
                isDark
                    ? Colors.black.withOpacity(0.10)
                    : const Color(0xFF232946).withOpacity(0.07),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Local Food",
              style: GoogleFonts.playfairDisplay(
                color: isDark ? Colors.white : const Color(0xFF232946),
                fontWeight: FontWeight.bold,
                fontSize: 17,
              ),
            ),
            const SizedBox(height: 10),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: Image.network(
                    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80",
                    width: 48,
                    height: 48,
                    fit: BoxFit.cover,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Warung Babi Guling",
                        style: GoogleFonts.inter(
                          color:
                              isDark ? Colors.white : const Color(0xFF232946),
                          fontWeight: FontWeight.bold,
                          fontSize: 15,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Row(
                        children: [
                          Icon(Icons.star, color: Colors.orange, size: 16),
                          const SizedBox(width: 2),
                          Text(
                            "4.6",
                            style: GoogleFonts.inter(
                              color: Colors.orange.shade800,
                              fontWeight: FontWeight.bold,
                              fontSize: 13,
                            ),
                          ),
                          const SizedBox(width: 8),
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 2,
                            ),
                            decoration: BoxDecoration(
                              color: Colors.red.shade100,
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              "Non-Veg",
                              style: GoogleFonts.inter(
                                color: Colors.red.shade800,
                                fontWeight: FontWeight.bold,
                                fontSize: 12,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      TextButton(
                        onPressed: () {},
                        style: TextButton.styleFrom(
                          foregroundColor:
                              isDark ? Colors.amber : const Color(0xFF445DF5),
                          padding: EdgeInsets.zero,
                          textStyle: GoogleFonts.inter(
                            fontWeight: FontWeight.bold,
                            fontSize: 13,
                          ),
                        ),
                        child: const Text("View Menu"),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

// Return Flight Card
class _ReturnFlightCard extends StatelessWidget {
  final bool isDark;
  final Color navy;
  const _ReturnFlightCard({required this.isDark, required this.navy});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF232946) : Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
            color:
                isDark
                    ? Colors.black.withOpacity(0.10)
                    : navy.withOpacity(0.07),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Return Flight",
              style: GoogleFonts.playfairDisplay(
                color: isDark ? Colors.white : navy,
                fontWeight: FontWeight.bold,
                fontSize: 17,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              "Ngurah Rai Airport → Mumbai",
              style: GoogleFonts.inter(
                color: isDark ? Colors.white70 : navy.withOpacity(0.7),
                fontSize: 14,
              ),
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color: Colors.yellow.shade100,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Text(
                    "Boarding Soon",
                    style: GoogleFonts.inter(
                      color: Colors.orange.shade800,
                      fontWeight: FontWeight.bold,
                      fontSize: 13,
                    ),
                  ),
                ),
                const Spacer(),
                Text(
                  "18:45",
                  style: GoogleFonts.inter(
                    color: isDark ? Colors.white : navy,
                    fontWeight: FontWeight.bold,
                    fontSize: 18,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              "Terminal 2 • Gate B8",
              style: GoogleFonts.inter(
                color: isDark ? Colors.white70 : navy.withOpacity(0.7),
                fontSize: 13,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Local Activities Card
class _LocalActivitiesCard extends StatelessWidget {
  final bool isDark;
  final Color navy;
  const _LocalActivitiesCard({required this.isDark, required this.navy});

  @override
  Widget build(BuildContext context) {
    TextStyle entryStyle = GoogleFonts.inter(
      color: Colors.orange.shade800,
      fontWeight: FontWeight.bold,
      fontSize: 14,
    );
    TextStyle linkStyle = GoogleFonts.inter(
      color: isDark ? Colors.amber : const Color(0xFF445DF5),
      fontWeight: FontWeight.bold,
      fontSize: 13,
      decoration: TextDecoration.underline,
    );
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF232946) : Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
            color:
                isDark
                    ? Colors.black.withOpacity(0.10)
                    : navy.withOpacity(0.07),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Local Activities",
              style: GoogleFonts.playfairDisplay(
                color: isDark ? Colors.white : navy,
                fontWeight: FontWeight.bold,
                fontSize: 17,
              ),
            ),
            const SizedBox(height: 10),
            _ActivityItem(
              title: "Ubud Monkey Forest",
              subtitle: "Sacred sanctuary with playful monkeys",
              entry: "\$5 entry",
              linkStyle: linkStyle,
              entryStyle: entryStyle,
            ),
            Divider(
              height: 22,
              color: isDark ? Colors.white12 : navy.withOpacity(0.08),
            ),
            _ActivityItem(
              title: "Tegallalang Rice Terrace",
              subtitle: "Stunning terraced rice fields & swing",
              entry: "\$3 entry",
              linkStyle: linkStyle,
              entryStyle: entryStyle,
            ),
            Divider(
              height: 22,
              color: isDark ? Colors.white12 : navy.withOpacity(0.08),
            ),
            _ActivityItem(
              title: "Bali Swing Adventure",
              subtitle: "Epic jungle swings with valley views",
              entry: "\$25 entry",
              linkStyle: linkStyle,
              entryStyle: entryStyle,
            ),
          ],
        ),
      ),
    );
  }
}

class _ActivityItem extends StatelessWidget {
  final String title;
  final String subtitle;
  final String entry;
  final TextStyle linkStyle;
  final TextStyle entryStyle;
  const _ActivityItem({
    required this.title,
    required this.subtitle,
    required this.entry,
    required this.linkStyle,
    required this.entryStyle,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: GoogleFonts.inter(
                  fontWeight: FontWeight.bold,
                  fontSize: 15,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                subtitle,
                style: GoogleFonts.inter(color: Colors.black54, fontSize: 13),
              ),
              const SizedBox(height: 2),
              Text(entry, style: entryStyle),
            ],
          ),
        ),
        Align(
          alignment: Alignment.centerRight,
          child: TextButton(
            onPressed: () {},
            style: TextButton.styleFrom(
              padding: EdgeInsets.zero,
              minimumSize: const Size(0, 0),
              tapTargetSize: MaterialTapTargetSize.shrinkWrap,
            ),
            child: Text("Learn More", style: linkStyle),
          ),
        ),
      ],
    );
  }
}
