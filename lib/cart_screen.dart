import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'theme_controller.dart';

class CartScreen extends StatelessWidget {
  const CartScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = ThemeController.of(context);
    final isDark = theme.isDark;
    final setTheme = theme.setTheme;

    final navy = const Color(0xFF232946);
    final gold = const Color(0xFFF4CA5E);

    final cardBg = isDark ? navy.withOpacity(0.85) : Colors.white;
    final bgGradient = LinearGradient(
      colors:
          isDark
              ? [
                const Color(0xFF232946),
                const Color(0xFF181A2A),
                const Color(0xFF2D3250),
              ]
              : [
                const Color(0xFFF4E2B8),
                const Color(0xFFF5F6FA),
                const Color(0xFFD1D9F6),
              ],
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
    );

    return Scaffold(
      backgroundColor: isDark ? navy : const Color(0xFFF5F6FA),
      body: Container(
        decoration: BoxDecoration(gradient: bgGradient),
        child: SafeArea(
          child: Column(
            children: [
              // Header
              Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 18,
                  vertical: 16,
                ),
                child: Row(
                  children: [
                    IconButton(
                      icon: Icon(
                        Icons.arrow_back_rounded,
                        color: isDark ? Colors.white : navy,
                      ),
                      onPressed: () => Navigator.pop(context),
                    ),
                    Text(
                      "My Cart",
                      style: GoogleFonts.playfairDisplay(
                        color: isDark ? Colors.white : navy,
                        fontWeight: FontWeight.bold,
                        fontSize: 20,
                      ),
                    ),
                    const Spacer(),
                    Container(
                      width: 28,
                      height: 28,
                      decoration: BoxDecoration(
                        color: gold,
                        shape: BoxShape.circle,
                      ),
                      child: Center(
                        child: Text(
                          "2",
                          style: GoogleFonts.inter(
                            color: navy,
                            fontWeight: FontWeight.bold,
                            fontSize: 15,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    IconButton(
                      icon: Icon(
                        isDark
                            ? Icons.light_mode_rounded
                            : Icons.dark_mode_rounded,
                        color: isDark ? gold : navy,
                      ),
                      tooltip:
                          isDark
                              ? "Switch to Light Mode"
                              : "Switch to Dark Mode",
                      onPressed: () => setTheme(!isDark),
                    ),
                  ],
                ),
              ),
              // Make all scrollable content up to savings banner in a single section
              Expanded(
                child: ListView(
                  padding: EdgeInsets.zero,
                  children: [
                    // Cart Items
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 18),
                      child: Column(
                        children: [
                          _CartItemCard(
                            imageUrl:
                                "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
                            title: "Maldives Luxury Retreat",
                            date: "Dec 15-22, 2024",
                            people: "2 adults",
                            price: "₹1,44,000",
                            oldPrice: "₹1,60,000",
                            isDark: isDark,
                            navy: navy,
                            gold: gold,
                          ),
                          const SizedBox(height: 14),
                          _CartItemCard(
                            imageUrl:
                                "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=400&q=80",
                            title: "Bali Private Villa",
                            date: "Jan 10-18, 2025",
                            people: "2 adults",
                            price: "₹1,30,000",
                            oldPrice: null,
                            isDark: isDark,
                            navy: navy,
                            gold: gold,
                          ),
                          // Add extra space after the last cart item
                          const SizedBox(height: 28),
                        ],
                      ),
                    ),
                    // Promo Code & Apply Button
                    Padding(
                      padding: const EdgeInsets.fromLTRB(18, 0, 18, 10),
                      child: Row(
                        children: [
                          Expanded(
                            child: Container(
                              decoration: BoxDecoration(
                                color: isDark ? navy : Colors.white,
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(
                                  color:
                                      isDark
                                          ? Colors.white12
                                          : navy.withOpacity(0.08),
                                  width: 1.2,
                                ),
                              ),
                              height: 48,
                              child: Stack(
                                alignment: Alignment.center,
                                children: [
                                  // Centered hint text
                                  TextField(
                                    style: GoogleFonts.inter(
                                      color: isDark ? Colors.white : navy,
                                    ),
                                    textAlign: TextAlign.center,
                                    decoration: InputDecoration(
                                      hintText: "Enter promo code",
                                      hintStyle: GoogleFonts.inter(
                                        color:
                                            isDark
                                                ? Colors.white54
                                                : navy.withOpacity(0.5),
                                      ),
                                      border: InputBorder.none,
                                      contentPadding:
                                          const EdgeInsets.symmetric(
                                            vertical: 0,
                                          ),
                                      alignLabelWithHint: true,
                                    ),
                                  ),
                                  // Left icon (overlaid)
                                  Positioned(
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    child: Padding(
                                      padding: const EdgeInsets.only(left: 8),
                                      child: Icon(
                                        Icons.local_offer_rounded,
                                        color: isDark ? gold : navy,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(width: 10),
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: gold,
                              foregroundColor: navy,
                              padding: const EdgeInsets.symmetric(
                                horizontal: 24,
                                vertical: 16,
                              ),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                              elevation: 0,
                            ),
                            onPressed: () {},
                            child: Text(
                              "Apply",
                              style: GoogleFonts.inter(
                                color: navy,
                                fontWeight: FontWeight.bold,
                                fontSize: 15,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    // Price Breakdown Section
                    Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 18,
                        vertical: 6,
                      ),
                      child: Container(
                        width: double.infinity,
                        decoration: BoxDecoration(
                          color:
                              isDark
                                  ? const Color(0xFF232946)
                                  : const Color(0xFFD1D9F6),
                          borderRadius: BorderRadius.circular(18),
                        ),
                        padding: const EdgeInsets.all(18),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "Price Breakdown",
                              style: GoogleFonts.playfairDisplay(
                                color: isDark ? Colors.white : navy,
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                            const SizedBox(height: 10),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  "Subtotal",
                                  style: GoogleFonts.inter(
                                    color: isDark ? Colors.white70 : navy,
                                    fontSize: 15,
                                  ),
                                ),
                                Text(
                                  "₹2,74,000",
                                  style: GoogleFonts.inter(
                                    color: isDark ? Colors.white : navy,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 15,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 4),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  "Taxes & Fees",
                                  style: GoogleFonts.inter(
                                    color: isDark ? Colors.white70 : navy,
                                    fontSize: 15,
                                  ),
                                ),
                                Text(
                                  "₹21,920",
                                  style: GoogleFonts.inter(
                                    color: isDark ? Colors.white : navy,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 15,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 4),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  "Discount (FIRST10)",
                                  style: GoogleFonts.inter(
                                    color: Colors.greenAccent.shade400,
                                    fontWeight: FontWeight.w600,
                                    fontSize: 15,
                                  ),
                                ),
                                Text(
                                  "-₹27,400",
                                  style: GoogleFonts.inter(
                                    color: Colors.greenAccent.shade400,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 15,
                                  ),
                                ),
                              ],
                            ),
                            const Divider(
                              height: 18,
                              color: Colors.transparent,
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  "Total",
                                  style: GoogleFonts.inter(
                                    color: isDark ? Colors.white : navy,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 17,
                                  ),
                                ),
                                Text(
                                  "₹2,68,520",
                                  style: GoogleFonts.inter(
                                    color: gold,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 18,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                    // Savings Banner
                    Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 18,
                        vertical: 6,
                      ),
                      child: Container(
                        width: double.infinity,
                        decoration: BoxDecoration(
                          color: Colors.green.shade900.withOpacity(0.85),
                          borderRadius: BorderRadius.circular(14),
                        ),
                        padding: const EdgeInsets.symmetric(
                          vertical: 10,
                          horizontal: 16,
                        ),
                        child: Row(
                          children: [
                            Icon(
                              Icons.savings_rounded,
                              color: Colors.greenAccent.shade400,
                              size: 22,
                            ),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                "You're saving ₹43,400!",
                                style: GoogleFonts.inter(
                                  color: Colors.greenAccent.shade400,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 15,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              // Total Amount & Checkout Button (remains fixed at the bottom)
              Padding(
                padding: const EdgeInsets.fromLTRB(18, 6, 18, 18),
                child: Container(
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: isDark ? Colors.amber : Colors.white,
                    borderRadius: BorderRadius.circular(18),
                  ),
                  padding: const EdgeInsets.all(18),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Text(
                            "Total Amount",
                            style: GoogleFonts.inter(
                              color:
                                  isDark
                                      ? Colors.black
                                      : Color.fromARGB(255, 68, 93, 245),
                              fontWeight: FontWeight.bold,
                              fontSize: 18,
                            ),
                          ),
                          const Spacer(),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              Text(
                                "For 2 people",
                                style: GoogleFonts.inter(
                                  color:
                                      isDark
                                          ? Colors.black
                                          : Color.fromARGB(255, 68, 93, 245),
                                  fontSize: 13,
                                ),
                              ),
                              Text(
                                "2 destinations",
                                style: GoogleFonts.inter(
                                  color:
                                      isDark
                                          ? Colors.black
                                          : Color.fromARGB(255, 68, 93, 245),
                                  fontSize: 13,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(
                        "₹2,68,520",
                        style: GoogleFonts.playfairDisplay(
                          color:
                              isDark
                                  ? Colors.black
                                  : Color.fromARGB(255, 68, 93, 245),
                          fontWeight: FontWeight.bold,
                          fontSize: 28,
                        ),
                      ),
                      const SizedBox(height: 12),
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton.icon(
                          style: ElevatedButton.styleFrom(
                            backgroundColor:
                                isDark
                                    ? const Color(0xFF232946)
                                    : Color.fromARGB(255, 68, 93, 245),
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                            elevation: 0,
                          ),
                          onPressed: () {},
                          icon: Icon(Icons.lock_rounded, color: navy),
                          label: Text(
                            "Proceed to Checkout",
                            style: GoogleFonts.inter(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 16,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _CartItemCard extends StatelessWidget {
  final String imageUrl;
  final String title;
  final String date;
  final String people;
  final String price;
  final String? oldPrice;
  final bool isDark;
  final Color navy;
  final Color gold;

  const _CartItemCard({
    required this.imageUrl,
    required this.title,
    required this.date,
    required this.people,
    required this.price,
    this.oldPrice,
    required this.isDark,
    required this.navy,
    required this.gold,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: isDark ? navy : Colors.white,
        borderRadius: BorderRadius.circular(18),
      ),
      padding: const EdgeInsets.all(12),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: Image.network(
              imageUrl,
              width: 70,
              height: 70,
              fit: BoxFit.cover,
              errorBuilder:
                  (context, error, stackTrace) => Container(
                    width: 70,
                    height: 70,
                    color: Colors.grey[300],
                    child: Icon(Icons.broken_image, color: navy),
                  ),
              loadingBuilder: (context, child, progress) {
                if (progress == null) return child;
                return Container(
                  width: 70,
                  height: 70,
                  alignment: Alignment.center,
                  child: CircularProgressIndicator(
                    value:
                        progress.expectedTotalBytes != null
                            ? progress.cumulativeBytesLoaded /
                                (progress.expectedTotalBytes ?? 1)
                            : null,
                    color: gold,
                  ),
                );
              },
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
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
                    fontSize: 16,
                  ),
                ),
                const SizedBox(height: 4),
                Row(
                  children: [
                    Icon(Icons.calendar_today_rounded, color: gold, size: 16),
                    const SizedBox(width: 4),
                    Expanded(
                      child: Text(
                        date,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: GoogleFonts.inter(
                          color: isDark ? Colors.white70 : navy,
                          fontSize: 13,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 2),
                Row(
                  children: [
                    Icon(Icons.people_rounded, color: gold, size: 16),
                    const SizedBox(width: 4),
                    Expanded(
                      child: Text(
                        people,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: GoogleFonts.inter(
                          color: isDark ? Colors.white70 : navy,
                          fontSize: 13,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              IconButton(
                icon: Icon(Icons.close_rounded, color: isDark ? gold : navy),
                onPressed: () {},
                constraints: const BoxConstraints(),
                padding: EdgeInsets.zero,
                splashRadius: 18,
              ),
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  IconButton(
                    icon: Icon(
                      Icons.remove_circle_rounded,
                      color: isDark ? gold : navy,
                    ),
                    onPressed: () {},
                    constraints: const BoxConstraints(),
                    padding: EdgeInsets.zero,
                    splashRadius: 18,
                  ),
                  Text(
                    "1",
                    style: GoogleFonts.inter(
                      color: isDark ? Colors.white : navy,
                      fontWeight: FontWeight.bold,
                      fontSize: 15,
                    ),
                  ),
                  IconButton(
                    icon: Icon(
                      Icons.add_circle_rounded,
                      color: isDark ? gold : navy,
                    ),
                    onPressed: () {},
                    constraints: const BoxConstraints(),
                    padding: EdgeInsets.zero,
                    splashRadius: 18,
                  ),
                ],
              ),
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    price,
                    style: GoogleFonts.inter(
                      color: gold,
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                  if (oldPrice != null) ...[
                    const SizedBox(width: 6),
                    Text(
                      oldPrice!,
                      style: GoogleFonts.inter(
                        color: isDark ? Colors.white38 : navy.withOpacity(0.4),
                        fontSize: 13,
                        decoration: TextDecoration.lineThrough,
                      ),
                    ),
                  ],
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}
