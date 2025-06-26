// ignore_for_file: deprecated_member_use

import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'theme_controller.dart';
import 'ai_suggested_trips_screen.dart';

class TripPlannerScreen extends StatefulWidget {
  const TripPlannerScreen({super.key});

  @override
  State<TripPlannerScreen> createState() => _TripPlannerScreenState();
}

class _TripPlannerScreenState extends State<TripPlannerScreen> {
  double budget = 55000;
  int budgetType = 1; // 0: Budget, 1: Comfort, 2: Luxury
  int selectedDays = 7;
  int selectedType = 0;
  int selectedCompanion = 0;
  int adults = 2;
  int children = 0;
  bool autoLocation = false;
  String currentLocation = "Mumbai, Maharashtra";

  @override
  Widget build(BuildContext context) {
    final theme = ThemeController.of(context);
    final isDark = theme.isDark;
    final setTheme = theme.setTheme;
    final navy = const Color(0xFF232946);
    final gold =
        isDark
            ? const Color(0xFFF4CA5E)
            : const Color.fromARGB(255, 68, 93, 245); // <-- updated
    final darkGradient = const LinearGradient(
      colors: [Color(0xFF232946), Color(0xFF181A2A), Color(0xFF2D3250)],
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
    );
    final lightGradient = const LinearGradient(
      colors: [Color(0xFFF4E2B8), Color(0xFFF5F6FA), Color(0xFFD1D9F6)],
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
    );

    final bgGradient = isDark ? darkGradient : lightGradient;
    final cardColor = isDark ? navy.withOpacity(0.85) : Colors.white;
    final textColor = isDark ? Colors.white : navy;
    final subTextColor = isDark ? Colors.white70 : Colors.black87;

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Container(
        decoration: BoxDecoration(gradient: bgGradient),
        child: SafeArea(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Header Row
                Row(
                  children: [
                    IconButton(
                      icon: Icon(Icons.arrow_back_rounded, color: textColor),
                      onPressed: () => Navigator.pop(context),
                    ),
                    const SizedBox(width: 4),
                    Text(
                      "AI Trip Planner",
                      style: GoogleFonts.playfairDisplay(
                        color: textColor,
                        fontWeight: FontWeight.bold,
                        fontSize: 18,
                      ),
                    ),
                    const Spacer(),
                    IconButton(
                      icon: Icon(
                        isDark
                            ? Icons.light_mode_rounded
                            : Icons.dark_mode_rounded,
                        color: textColor,
                      ),
                      tooltip:
                          isDark
                              ? "Switch to Light Mode"
                              : "Switch to Dark Mode",
                      onPressed: () => setTheme(!isDark),
                    ),
                  ],
                ),
                const SizedBox(height: 10),

                // Title
                Text(
                  "Plan Your Dream Trip",
                  style: GoogleFonts.playfairDisplay(
                    color: textColor,
                    fontWeight: FontWeight.bold,
                    fontSize: 26,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  "Tell us what you prefer, and we'll handle the magic.",
                  style: GoogleFonts.inter(color: subTextColor, fontSize: 15),
                ),
                const SizedBox(height: 18),

                // Progress bar (static for now)
                Stack(
                  children: [
                    Container(
                      height: 4,
                      decoration: BoxDecoration(
                        color: isDark ? Colors.white12 : Colors.black12,
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                    Container(
                      height: 4,
                      width: 80,
                      decoration: BoxDecoration(
                        color: gold,
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Align(
                  alignment: Alignment.centerRight,
                  child: Text(
                    "0/6",
                    style: GoogleFonts.inter(color: subTextColor, fontSize: 13),
                  ),
                ),
                const SizedBox(height: 18),

                // Budget Range Card
                Container(
                  width: double.infinity,
                  margin: const EdgeInsets.only(bottom: 18),
                  padding: const EdgeInsets.all(18),
                  decoration: BoxDecoration(
                    color: cardColor,
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(
                      color: isDark ? Colors.white12 : Colors.black12,
                      width: 1.2,
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: gold.withOpacity(0.15),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Icon(
                              Icons.wallet_rounded,
                              color: gold,
                              size: 24,
                            ),
                          ),
                          const SizedBox(width: 12),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "Budget Range",
                                style: GoogleFonts.playfairDisplay(
                                  color: textColor,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                ),
                              ),
                              Text(
                                "What's your ideal spending range?",
                                style: GoogleFonts.inter(
                                  color: subTextColor,
                                  fontSize: 13,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      const SizedBox(height: 18),
                      Center(
                        child: Text(
                          "₹${budget.toStringAsFixed(0)}",
                          style: GoogleFonts.playfairDisplay(
                            color: gold,
                            fontWeight: FontWeight.bold,
                            fontSize: 28,
                          ),
                        ),
                      ),
                      Center(
                        child: Text(
                          "per person",
                          style: GoogleFonts.inter(
                            color: subTextColor,
                            fontSize: 13,
                          ),
                        ),
                      ),
                      const SizedBox(height: 10),
                      Slider(
                        value: budget,
                        min: 10000,
                        max: 100000,
                        divisions: 9,
                        activeColor: gold,
                        inactiveColor: isDark ? Colors.white12 : Colors.black12,
                        onChanged: (v) => setState(() => budget = v),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            "₹10,000",
                            style: GoogleFonts.inter(
                              color: subTextColor,
                              fontSize: 13,
                            ),
                          ),
                          Text(
                            "₹1,00,000+",
                            style: GoogleFonts.inter(
                              color: subTextColor,
                              fontSize: 13,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          ChoiceChip(
                            label: Text(
                              "Budget",
                              style: GoogleFonts.inter(
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            selected: budgetType == 0,
                            selectedColor: gold,
                            backgroundColor:
                                isDark ? Colors.white12 : Colors.black12,
                            labelStyle: TextStyle(
                              color: budgetType == 0 ? navy : textColor,
                            ),
                            onSelected: (_) => setState(() => budgetType = 0),
                          ),
                          ChoiceChip(
                            label: Text(
                              "Comfort",
                              style: GoogleFonts.inter(
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            selected: budgetType == 1,
                            selectedColor: gold,
                            backgroundColor:
                                isDark ? Colors.white12 : Colors.black12,
                            labelStyle: TextStyle(
                              color: budgetType == 1 ? navy : textColor,
                            ),
                            onSelected: (_) => setState(() => budgetType = 1),
                          ),
                          ChoiceChip(
                            label: Text(
                              "Luxury",
                              style: GoogleFonts.inter(
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            selected: budgetType == 2,
                            selectedColor: gold,
                            backgroundColor:
                                isDark ? Colors.white12 : Colors.black12,
                            labelStyle: TextStyle(
                              color: budgetType == 2 ? navy : textColor,
                            ),
                            onSelected: (_) => setState(() => budgetType = 2),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),

                // Duration of Trip Card (replace the previous duration section with this)
                Container(
                  width: double.infinity,
                  margin: const EdgeInsets.only(bottom: 18),
                  padding: const EdgeInsets.all(18),
                  decoration: BoxDecoration(
                    color: cardColor,
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(
                      color: isDark ? Colors.white12 : Colors.black12,
                      width: 1.2,
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: gold.withOpacity(0.15),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Icon(
                              Icons.calendar_today_rounded,
                              color: gold,
                              size: 24,
                            ),
                          ),
                          const SizedBox(width: 12),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "Duration of Trip",
                                style: GoogleFonts.playfairDisplay(
                                  color: textColor,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                ),
                              ),
                              Text(
                                "How many days would you like to travel?",
                                style: GoogleFonts.inter(
                                  color: subTextColor,
                                  fontSize: 13,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      const SizedBox(height: 18),
                      // Day selection chips
                      StatefulBuilder(
                        builder: (context, setStateSB) {
                          List<int> options = [3, 7, 10, 14];

                          void updateDays(int days) {
                            setState(() {
                              selectedDays = days.clamp(1, 30);
                            });
                          }

                          return Column(
                            children: [
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceEvenly,
                                children:
                                    options.map((d) {
                                      final selected = selectedDays == d;
                                      return GestureDetector(
                                        onTap: () => updateDays(d),
                                        child: Container(
                                          padding: const EdgeInsets.symmetric(
                                            vertical: 12,
                                            horizontal: 18,
                                          ),
                                          margin: const EdgeInsets.symmetric(
                                            horizontal: 4,
                                          ),
                                          decoration: BoxDecoration(
                                            color:
                                                selected
                                                    ? gold
                                                    : (isDark
                                                        ? Colors.white12
                                                        : Colors.black12),
                                            borderRadius: BorderRadius.circular(
                                              12,
                                            ),
                                            border: Border.all(
                                              color:
                                                  selected
                                                      ? gold
                                                      : Colors.transparent,
                                              width: 1.5,
                                            ),
                                          ),
                                          child: Column(
                                            children: [
                                              Text(
                                                "$d",
                                                style:
                                                    GoogleFonts.playfairDisplay(
                                                      color:
                                                          selected
                                                              ? navy
                                                              : textColor,
                                                      fontWeight:
                                                          FontWeight.bold,
                                                      fontSize: 17,
                                                    ),
                                              ),
                                              Text(
                                                "Days",
                                                style: GoogleFonts.inter(
                                                  color:
                                                      selected
                                                          ? navy
                                                          : subTextColor,
                                                  fontWeight: FontWeight.w600,
                                                  fontSize: 12,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      );
                                    }).toList(),
                              ),
                              const SizedBox(height: 18),
                              // Counter for manual days selection
                              Column(
                                children: [
                                  Text(
                                    selectedDays.toString().padLeft(3, '0'),
                                    style: GoogleFonts.playfairDisplay(
                                      color: gold,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 48,
                                      letterSpacing: 6,
                                    ),
                                  ),
                                  const SizedBox(height: 12),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      IconButton(
                                        icon: Icon(
                                          Icons.remove,
                                          color: isDark ? Colors.white : navy,
                                        ),
                                        iconSize: 28,
                                        splashRadius: 24,
                                        style: IconButton.styleFrom(
                                          backgroundColor:
                                              isDark
                                                  ? Colors.white12
                                                  : Colors.black12,
                                          shape: RoundedRectangleBorder(
                                            borderRadius: BorderRadius.circular(
                                              10,
                                            ),
                                          ),
                                        ),
                                        onPressed:
                                            selectedDays > 1
                                                ? () => setState(
                                                  () =>
                                                      selectedDays =
                                                          (selectedDays - 1)
                                                              .clamp(1, 30),
                                                )
                                                : null,
                                      ),
                                      const SizedBox(width: 18),
                                      IconButton(
                                        icon: Icon(
                                          Icons.add,
                                          color: isDark ? Colors.white : navy,
                                        ),
                                        iconSize: 28,
                                        splashRadius: 24,
                                        style: IconButton.styleFrom(
                                          backgroundColor:
                                              isDark
                                                  ? Colors.white12
                                                  : Colors.black12,
                                          shape: RoundedRectangleBorder(
                                            borderRadius: BorderRadius.circular(
                                              10,
                                            ),
                                          ),
                                        ),
                                        onPressed:
                                            selectedDays < 30
                                                ? () => setState(
                                                  () =>
                                                      selectedDays =
                                                          (selectedDays + 1)
                                                              .clamp(1, 30),
                                                )
                                                : null,
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                              const SizedBox(height: 18),
                              Container(
                                width: double.infinity,
                                padding: const EdgeInsets.symmetric(
                                  vertical: 18,
                                ),
                                decoration: BoxDecoration(
                                  color:
                                      isDark
                                          ? Colors.white10
                                          : Colors.black.withOpacity(0.04),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Column(
                                  children: [
                                    Text(
                                      "$selectedDays",
                                      style: GoogleFonts.playfairDisplay(
                                        color: gold,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 28,
                                      ),
                                    ),
                                    Text(
                                      "days",
                                      style: GoogleFonts.inter(
                                        color: subTextColor,
                                        fontSize: 15,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          );
                        },
                      ),
                    ],
                  ),
                ),

                // Type of Destination Section
                Container(
                  width: double.infinity,
                  margin: const EdgeInsets.only(bottom: 18),
                  padding: const EdgeInsets.all(18),
                  decoration: BoxDecoration(
                    color: cardColor,
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(
                      color: isDark ? Colors.white12 : Colors.black12,
                      width: 1.2,
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: gold.withOpacity(0.15),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Icon(
                              Icons.map_rounded,
                              color: gold,
                              size: 24,
                            ),
                          ),
                          const SizedBox(width: 12),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "Type of Destination",
                                style: GoogleFonts.playfairDisplay(
                                  color: textColor,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                ),
                              ),
                              Text(
                                "What kind of experience are you seeking?",
                                style: GoogleFonts.inter(
                                  color: subTextColor,
                                  fontSize: 13,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      const SizedBox(height: 18),
                      // Destination type grid
                      GridView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: 6, // Now 6 options
                        gridDelegate:
                            const SliverGridDelegateWithFixedCrossAxisCount(
                              crossAxisCount: 2,
                              crossAxisSpacing: 14,
                              mainAxisSpacing: 14,
                              childAspectRatio: 1.3,
                            ),
                        itemBuilder: (context, i) {
                          final types = [
                            {
                              "icon": Icons.beach_access_rounded,
                              "title": "Beach",
                              "subtitle": "Coastal paradise",
                            },
                            {
                              "icon": Icons.terrain_rounded,
                              "title": "Mountains",
                              "subtitle": "Scenic heights",
                            },
                            {
                              "icon": Icons.location_city_rounded,
                              "title": "City",
                              "subtitle": "Urban exploration",
                            },
                            {
                              "icon": Icons.directions_run_rounded,
                              "title": "Adventure",
                              "subtitle": "Thrill seeking",
                            },
                            {
                              "icon": Icons.account_balance_rounded,
                              "title": "Heritage",
                              "subtitle": "Cultural sites",
                            },
                            {
                              "icon": Icons.emoji_events_rounded,
                              "title": "Luxury",
                              "subtitle": "Premium resorts",
                            },
                          ];
                          final selected = selectedType == i;
                          return GestureDetector(
                            onTap: () => setState(() => selectedType = i),
                            child: Container(
                              decoration: BoxDecoration(
                                color:
                                    selected
                                        ? gold
                                        : (isDark
                                            ? Colors.white12
                                            : Colors.black12),
                                borderRadius: BorderRadius.circular(14),
                                border: Border.all(
                                  color: selected ? gold : Colors.transparent,
                                  width: 1.5,
                                ),
                              ),
                              child: Stack(
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.all(14),
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Icon(
                                          types[i]["icon"] as IconData,
                                          color: selected ? navy : textColor,
                                          size: 28,
                                        ),
                                        const SizedBox(height: 10),
                                        Text(
                                          types[i]["title"] as String,
                                          style: GoogleFonts.playfairDisplay(
                                            color: selected ? navy : textColor,
                                            fontWeight: FontWeight.bold,
                                            fontSize: 16,
                                          ),
                                        ),
                                        Text(
                                          types[i]["subtitle"] as String,
                                          style: GoogleFonts.inter(
                                            color:
                                                selected ? navy : subTextColor,
                                            fontSize: 12,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  if (selected)
                                    Positioned(
                                      top: 10,
                                      right: 10,
                                      child: Icon(
                                        Icons.check_circle_rounded,
                                        color: navy,
                                        size: 22,
                                      ),
                                    ),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
                    ],
                  ),
                ),

                // Travel Companions Section
                Container(
                  width: double.infinity,
                  margin: const EdgeInsets.only(bottom: 18),
                  padding: const EdgeInsets.all(18),
                  decoration: BoxDecoration(
                    color: cardColor,
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(
                      color: isDark ? Colors.white12 : Colors.black12,
                      width: 1.2,
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: gold.withOpacity(0.15),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Icon(
                              Icons.groups_rounded,
                              color: gold,
                              size: 24,
                            ),
                          ),
                          const SizedBox(width: 12),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "Travel Companions",
                                style: GoogleFonts.playfairDisplay(
                                  color: textColor,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                ),
                              ),
                              Text(
                                "Who will be joining you?",
                                style: GoogleFonts.inter(
                                  color: subTextColor,
                                  fontSize: 13,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      const SizedBox(height: 18),
                      // Use parent state for selection and counters
                      SizedBox(
                        height: 220,
                        child: GridView.builder(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          itemCount: 4,
                          gridDelegate:
                              const SliverGridDelegateWithFixedCrossAxisCount(
                                crossAxisCount: 2,
                                crossAxisSpacing: 14,
                                mainAxisSpacing: 14,
                                childAspectRatio: 1.5,
                              ),
                          itemBuilder: (context, i) {
                            final companions = [
                              {
                                "icon": Icons.person_outline_rounded,
                                "title": "Solo",
                                "subtitle": "Just me",
                              },
                              {
                                "icon": Icons.favorite_rounded,
                                "title": "Couple",
                                "subtitle": "Romantic getaway",
                              },
                              {
                                "icon": Icons.home_rounded,
                                "title": "Family",
                                "subtitle": "With relatives",
                              },
                              {
                                "icon": Icons.group_rounded,
                                "title": "Friends",
                                "subtitle": "Group trip",
                              },
                            ];
                            final selected = selectedCompanion == i;
                            return GestureDetector(
                              onTap:
                                  () => setState(() => selectedCompanion = i),
                              child: Container(
                                decoration: BoxDecoration(
                                  color:
                                      selected
                                          ? gold
                                          : (isDark
                                              ? Colors.white12
                                              : Colors.black12),
                                  borderRadius: BorderRadius.circular(14),
                                  border: Border.all(
                                    color: selected ? gold : Colors.transparent,
                                    width: 1.5,
                                  ),
                                ),
                                child: Stack(
                                  children: [
                                    Padding(
                                      padding: const EdgeInsets.all(14),
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Icon(
                                            companions[i]["icon"] as IconData,
                                            color: selected ? navy : textColor,
                                            size: 22,
                                          ),
                                          const SizedBox(height: 4),
                                          Text(
                                            companions[i]["title"] as String,
                                            style: GoogleFonts.playfairDisplay(
                                              color:
                                                  selected ? navy : textColor,
                                              fontWeight: FontWeight.bold,
                                              fontSize: 15,
                                            ),
                                          ),
                                          Text(
                                            companions[i]["subtitle"] as String,
                                            style: GoogleFonts.inter(
                                              color:
                                                  selected
                                                      ? navy
                                                      : subTextColor,
                                              fontSize: 12,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                    if (selected)
                                      Positioned(
                                        top: 10,
                                        right: 10,
                                        child: Icon(
                                          Icons.check_circle_rounded,
                                          color: navy,
                                          size: 22,
                                        ),
                                      ),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
                      ),
                      const SizedBox(height: 18),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          // Adults Counter
                          Column(
                            children: [
                              Text(
                                "Adults",
                                style: GoogleFonts.inter(
                                  color: textColor,
                                  fontWeight: FontWeight.w600,
                                  fontSize: 14,
                                ),
                              ),
                              const SizedBox(height: 6),
                              Row(
                                children: [
                                  IconButton(
                                    icon: Icon(
                                      Icons.remove,
                                      color: isDark ? Colors.white : navy,
                                    ),
                                    iconSize: 22,
                                    splashRadius: 20,
                                    style: IconButton.styleFrom(
                                      backgroundColor:
                                          isDark
                                              ? Colors.white12
                                              : Colors.black12,
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                    ),
                                    onPressed:
                                        adults > 0
                                            ? () => setState(() => adults--)
                                            : null,
                                  ),
                                  Container(
                                    width: 28,
                                    alignment: Alignment.center,
                                    child: Text(
                                      adults.toString(),
                                      style: GoogleFonts.playfairDisplay(
                                        color: gold,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20,
                                      ),
                                    ),
                                  ),
                                  IconButton(
                                    icon: Icon(
                                      Icons.add,
                                      color: isDark ? Colors.white : navy,
                                    ),
                                    iconSize: 22,
                                    splashRadius: 20,
                                    style: IconButton.styleFrom(
                                      backgroundColor:
                                          isDark
                                              ? Colors.white12
                                              : Colors.black12,
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                    ),
                                    onPressed:
                                        adults < 10
                                            ? () => setState(() => adults++)
                                            : null,
                                  ),
                                ],
                              ),
                            ],
                          ),
                          // Children Counter
                          Column(
                            children: [
                              Text(
                                "Children",
                                style: GoogleFonts.inter(
                                  color: textColor,
                                  fontWeight: FontWeight.w600,
                                  fontSize: 14,
                                ),
                              ),
                              const SizedBox(height: 6),
                              Row(
                                children: [
                                  IconButton(
                                    icon: Icon(
                                      Icons.remove,
                                      color: isDark ? Colors.white : navy,
                                    ),
                                    iconSize: 22,
                                    splashRadius: 20,
                                    style: IconButton.styleFrom(
                                      backgroundColor:
                                          isDark
                                              ? Colors.white12
                                              : Colors.black12,
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                    ),
                                    onPressed:
                                        children > 0
                                            ? () => setState(() => children--)
                                            : null,
                                  ),
                                  Container(
                                    width: 28,
                                    alignment: Alignment.center,
                                    child: Text(
                                      children.toString(),
                                      style: GoogleFonts.playfairDisplay(
                                        color: gold,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20,
                                      ),
                                    ),
                                  ),
                                  IconButton(
                                    icon: Icon(
                                      Icons.add,
                                      color: isDark ? Colors.white : navy,
                                    ),
                                    iconSize: 22,
                                    splashRadius: 20,
                                    style: IconButton.styleFrom(
                                      backgroundColor:
                                          isDark
                                              ? Colors.white12
                                              : Colors.black12,
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                    ),
                                    onPressed:
                                        children < 10
                                            ? () => setState(() => children++)
                                            : null,
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                    ],
                  ),
                ),

                // Traveling with Kids? Section
                Container(
                  width: double.infinity,
                  margin: const EdgeInsets.only(bottom: 18),
                  padding: const EdgeInsets.all(18),
                  decoration: BoxDecoration(
                    color: cardColor,
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(
                      color: isDark ? Colors.white12 : Colors.black12,
                      width: 1.2,
                    ),
                  ),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: gold.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Icon(
                          Icons.child_friendly_rounded,
                          color: gold,
                          size: 24,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "Traveling with Kids?",
                              style: GoogleFonts.playfairDisplay(
                                color: textColor,
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                            Text(
                              "Kid-friendly accommodations & activities",
                              style: GoogleFonts.inter(
                                color: subTextColor,
                                fontSize: 13,
                              ),
                            ),
                          ],
                        ),
                      ),
                      Switch(
                        value:
                            children > 0, // or use a separate bool if you want
                        activeColor: gold,
                        inactiveThumbColor:
                            isDark ? Colors.white24 : Colors.black26,
                        onChanged: (val) {
                          setState(() {
                            if (val) {
                              if (children == 0) children = 1;
                            } else {
                              children = 0;
                            }
                          });
                        },
                      ),
                    ],
                  ),
                ),

                // Additional Preferences Section
                Container(
                  width: double.infinity,
                  margin: const EdgeInsets.only(bottom: 18),
                  padding: const EdgeInsets.all(18),
                  decoration: BoxDecoration(
                    color: cardColor,
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(
                      color: isDark ? Colors.white12 : Colors.black12,
                      width: 1.2,
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: gold.withOpacity(0.15),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Icon(
                              Icons.tune_rounded,
                              color: gold,
                              size: 24,
                            ),
                          ),
                          const SizedBox(width: 12),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "Additional Preferences",
                                style: GoogleFonts.playfairDisplay(
                                  color: textColor,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                ),
                              ),
                              Text(
                                "Customize your travel experience",
                                style: GoogleFonts.inter(
                                  color: subTextColor,
                                  fontSize: 13,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      const SizedBox(height: 18),
                      ListTile(
                        contentPadding: EdgeInsets.zero,
                        leading: Icon(
                          Icons.restaurant_menu_rounded,
                          color: gold,
                        ),
                        title: Text(
                          "Food Preferences",
                          style: GoogleFonts.inter(
                            color: textColor,
                            fontWeight: FontWeight.w600,
                            fontSize: 15,
                          ),
                        ),
                        trailing: Icon(
                          Icons.chevron_right_rounded,
                          color: subTextColor,
                        ),
                        onTap: () {
                          // TODO: Navigate to food preferences screen or show dialog
                        },
                      ),
                      Divider(
                        color: isDark ? Colors.white12 : Colors.black12,
                        height: 1,
                      ),
                      ListTile(
                        contentPadding: EdgeInsets.zero,
                        leading: Icon(Icons.hotel_rounded, color: gold),
                        title: Text(
                          "Accommodation Type",
                          style: GoogleFonts.inter(
                            color: textColor,
                            fontWeight: FontWeight.w600,
                            fontSize: 15,
                          ),
                        ),
                        trailing: Icon(
                          Icons.chevron_right_rounded,
                          color: subTextColor,
                        ),
                        onTap: () {
                          // TODO: Navigate to accommodation type screen or show dialog
                        },
                      ),
                    ],
                  ),
                ),

                // Auto-Location Detection Section
                Container(
                  width: double.infinity,
                  margin: const EdgeInsets.only(bottom: 18),
                  padding: const EdgeInsets.all(18),
                  decoration: BoxDecoration(
                    color: cardColor,
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(
                      color: isDark ? Colors.white12 : Colors.black12,
                      width: 1.2,
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: gold.withOpacity(0.15),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Icon(
                              Icons.location_on_rounded,
                              color: gold,
                              size: 24,
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  "Auto-Location\nDetection",
                                  style: GoogleFonts.playfairDisplay(
                                    color: textColor,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 16,
                                  ),
                                ),
                                Text(
                                  "Find trips near your current location",
                                  style: GoogleFonts.inter(
                                    color: subTextColor,
                                    fontSize: 13,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Switch(
                            value: autoLocation,
                            activeColor: gold,
                            inactiveThumbColor:
                                isDark ? Colors.white24 : Colors.black26,
                            onChanged: (val) {
                              setState(() {
                                autoLocation = val;
                                // Here you can add logic to fetch location if enabled
                              });
                            },
                          ),
                        ],
                      ),
                      if (autoLocation)
                        Container(
                          margin: const EdgeInsets.only(top: 16),
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: gold.withOpacity(0.13),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Row(
                            children: [
                              Icon(
                                Icons.location_on_rounded,
                                color: gold,
                                size: 20,
                              ),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Text(
                                  "Current Location: $currentLocation",
                                  style: GoogleFonts.inter(
                                    color: gold,
                                    fontWeight: FontWeight.w600,
                                    fontSize: 15,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
      bottomNavigationBar: SizedBox(
        height: 90,
        child: Stack(
          children: [
            Positioned.fill(
              child: IgnorePointer(
                child: Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors:
                          isDark
                              ? [
                                navy,
                                Colors.transparent,
                                navy.withOpacity(0.85),
                              ]
                              : [
                                const Color(0xFFF5F6FA),
                                const Color(0xFFF5F6FA).withOpacity(0.85),
                                Colors.transparent,
                              ],
                      stops: const [0.0, 0.55, 1.0],
                    ),
                  ),
                ),
              ),
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Padding(
                padding: const EdgeInsets.fromLTRB(12, 0, 12, 18),
                child: SizedBox(
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
                      Icons.search_rounded,
                      color: Colors.black87,
                    ),
                    label: Text(
                      "Show Me Trips",
                      style: GoogleFonts.inter(
                        color: navy,
                        fontWeight: FontWeight.bold,
                        fontSize: 18,
                      ),
                    ),
                    onPressed: () async {
                      final trips = await _sendTripData() ?? [];
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder:
                              (context) => AiSuggestedTripsScreen(trips: trips),
                        ),
                      );
                    },
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<List<TripCardData>> _sendTripData() async {
    final url = Uri.parse(
      'https://n8n-190p.onrender.com/webhook/generateTripCard',
    );
    final data = {
      "budget": budget,
      "budgetType": budgetType,
      "selectedDays": selectedDays,
      "selectedType": selectedType,
      "selectedCompanion": selectedCompanion,
      "adults": adults,
      "children": children,
      "autoLocation": autoLocation,
      "currentLocation": currentLocation,
    };
    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(data),
      );
      print('Webhook response: ${response.statusCode} ${response.body}');
      if (response.statusCode == 200 && response.body.isNotEmpty) {
        final decoded = json.decode(response.body);
        if (decoded is List) {
          return decoded
              .map<TripCardData>((e) => TripCardData.fromJson(e))
              .toList();
        } else if (decoded is Map) {
          return [TripCardData.fromJson(decoded as Map<String, dynamic>)];
        }
      }
      return [];
    } catch (e) {
      print('Error sending trip data: $e');
      return [];
    }
  }
}
