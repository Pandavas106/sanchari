// ignore_for_file: deprecated_member_use, use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'dashboard_screen.dart';
import 'theme_controller.dart';

class ProfileStepperScreen extends StatefulWidget {
  const ProfileStepperScreen({super.key});

  @override
  State<ProfileStepperScreen> createState() => _ProfileStepperScreenState();
}

class _ProfileStepperScreenState extends State<ProfileStepperScreen> {
  int _currentStep = 0;
  bool isLoading = false; // Add this at the top of your State class

  // Profile fields
  String name = '';
  String email = '';
  String phone = '';
  String gender = '';
  String dob = '';
  List<String> preferences = [];

  final List<String> allPreferences = [
    "Beach",
    "Mountains",
    "Luxury Hotels",
    "Adventure",
    "Culture",
    "Food",
  ];
  // GitHub Copilot Prompt:
  // On final step of the stepper, save the profile data to Supabase.
  // Use Supabase Flutter client to insert the data into 'profiles' table.
  // Get current user's UID using Supabase auth.
  // Parse the DOB string (DD/MM/YYYY) to a DateTime object.
  // Store preferences as a text array.
  // After successful insertion, navigate to DashboardScreen.

  final PageController _pageController = PageController();

  Future<void> _saveProfileAndNavigate() async {
    setState(() {
      isLoading = true;
    });
    final supabase = Supabase.instance.client;
    final user = supabase.auth.currentUser;
    if (user == null) {
      setState(() {
        isLoading = false;
      });
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('User not logged in!')));
      return;
    }
    try {
      // Parse DOB string (DD/MM/YYYY) to DateTime
      DateTime? dobDate;
      if (dob.isNotEmpty) {
        final parts = dob.split('/');
        if (parts.length == 3) {
          final isoString =
              '${parts[2]}-${parts[1].padLeft(2, '0')}-${parts[0].padLeft(2, '0')}';
          dobDate = DateTime.tryParse(isoString);
        }
      }
      await supabase.from('profiles').insert({
        'id': user.id,
        'name': name,
        'email': email,
        'phone': phone,
        'gender': gender,
        'dob': dobDate?.toIso8601String(),
        'preferences': preferences,
      });
      setState(() {
        isLoading = false;
      });
      Navigator.pushReplacement(
        // ignore: use_build_context_synchronously
        context,
        MaterialPageRoute(builder: (_) => const DashboardScreen()),
      );
    } catch (e) {
      setState(() {
        isLoading = false;
      });
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Failed to save profile: $e')));
    }
  }

  // ignore: unused_element
  void _nextStep() {
    if (_currentStep < 4) {
      setState(() => _currentStep += 1);
      _pageController.nextPage(
        duration: const Duration(milliseconds: 400),
        curve: Curves.ease,
      );
    } else {
      _saveProfileAndNavigate(); // <-- Save to Supabase on last step
    }
  }

  void _prevStep() {
    if (_currentStep > 0) {
      setState(() => _currentStep -= 1);
      _pageController.previousPage(
        duration: const Duration(milliseconds: 400),
        curve: Curves.ease,
      );
    }
  }

  Widget _stepContent(BuildContext context, int step) {
    final navy = const Color.fromARGB(255, 68, 93, 245);
    final isDark = ThemeController.of(context).isDark;
    switch (step) {
      case 0:
        return Column(
          children: [
            Text(
              "What's your full name?",
              style: GoogleFonts.inter(
                fontWeight: FontWeight.bold,
                fontSize: 22,
                color:
                    isDark
                        ? Colors.amber
                        : const Color.fromARGB(255, 68, 93, 245),
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            TextField(
              decoration: InputDecoration(
                labelText: "Full Name",
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
              ),
              onChanged: (v) => setState(() => name = v),
            ),
          ],
        );
      case 1:
        return Column(
          children: [
            Text(
              "What's your email address?",
              style: GoogleFonts.inter(
                fontWeight: FontWeight.bold,
                fontSize: 22,
                color:
                    isDark
                        ? Colors.amber
                        : const Color.fromARGB(255, 68, 93, 245),
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            TextField(
              decoration: InputDecoration(
                labelText: "Email",
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
              ),
              onChanged: (v) => setState(() => email = v),
              keyboardType: TextInputType.emailAddress,
            ),
          ],
        );
      case 2:
        return Column(
          children: [
            Text(
              "What's your phone number?",
              style: GoogleFonts.inter(
                fontWeight: FontWeight.bold,
                fontSize: 22,
                color:
                    isDark
                        ? Colors.amber
                        : const Color.fromARGB(255, 68, 93, 245),
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            TextField(
              decoration: InputDecoration(
                labelText: "Phone",
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
              ),
              onChanged: (v) => setState(() => phone = v),
              keyboardType: TextInputType.phone,
            ),
          ],
        );
      case 3:
        return Column(
          children: [
            Text(
              "Tell us about yourself",
              style: GoogleFonts.inter(
                fontWeight: FontWeight.bold,
                fontSize: 22,
                color:
                    isDark
                        ? Colors.amber
                        : const Color.fromARGB(255, 68, 93, 245),
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            DropdownButtonFormField<String>(
              decoration: InputDecoration(
                labelText: "Gender",
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
              ),
              value: gender.isNotEmpty ? gender : null,
              items:
                  ["Male", "Female", "Other"]
                      .map((g) => DropdownMenuItem(value: g, child: Text(g)))
                      .toList(),
              onChanged: (v) => setState(() => gender = v ?? ''),
            ),
            const SizedBox(height: 18),
            TextField(
              decoration: InputDecoration(
                labelText: "Date of Birth",
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
                suffixIcon: const Icon(Icons.calendar_today),
              ),
              onTap: () async {
                FocusScope.of(context).requestFocus(FocusNode());
                final picked = await showDatePicker(
                  context: context,
                  initialDate:
                      dob.isNotEmpty
                          ? DateTime.tryParse(
                                dob.split('/').reversed.join('-'),
                              ) ??
                              DateTime(2000, 1, 1)
                          : DateTime(2000, 1, 1),
                  firstDate: DateTime(1950),
                  lastDate: DateTime.now(),
                );
                if (picked != null) {
                  setState(() {
                    dob = "${picked.day}/${picked.month}/${picked.year}";
                  });
                }
              },
              readOnly: true,
              controller: TextEditingController(text: dob),
            ),
          ],
        );
      case 4:
        return Column(
          children: [
            Text(
              "What are your travel preferences?",
              style: GoogleFonts.inter(
                fontWeight: FontWeight.bold,
                fontSize: 22,
                color: isDark ? Colors.amber : Color.fromARGB(255, 68, 93, 245),
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            Wrap(
              spacing: 10,
              children:
                  allPreferences.map((pref) {
                    final selected = preferences.contains(pref);
                    return FilterChip(
                      label: Text(pref),
                      selected: selected,
                      selectedColor:
                          isDark
                              ? Colors.amber
                              : const Color.fromARGB(255, 68, 93, 245),
                      checkmarkColor: navy,
                      onSelected: (val) {
                        setState(() {
                          if (val) {
                            preferences.add(pref);
                          } else {
                            preferences.remove(pref);
                          }
                        });
                      },
                    );
                  }).toList(),
            ),
          ],
        );
      default:
        return const SizedBox.shrink();
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = ThemeController.of(context);
    final isDark = theme.isDark;
    final setTheme = theme.setTheme;
    final navy = const Color.fromARGB(255, 68, 93, 245);

    final bgGradient = LinearGradient(
      colors:
          isDark
              ? [
                const Color(0xFF232946),
                const Color(0xFF181A2A),
                const Color(0xFF2D3250),
              ]
              : [
                const Color.fromARGB(255, 244, 202, 94),
                const Color.fromARGB(255, 237, 231, 246),
                const Color.fromARGB(255, 169, 177, 246),
              ],
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
    );

    return Scaffold(
      body: Container(
        decoration: BoxDecoration(gradient: bgGradient),
        child: SafeArea(
          child: Stack(
            children: [
              PageView.builder(
                controller: _pageController,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: 5,
                itemBuilder: (context, index) {
                  return Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 28,
                      vertical: 48,
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        _stepContent(context, index),
                        const SizedBox(height: 60),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            if (_currentStep > 0)
                              ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                  backgroundColor:
                                      isDark
                                          ? Colors.amber
                                          : const Color.fromARGB(
                                            255,
                                            68,
                                            93,
                                            245,
                                          ),
                                  foregroundColor:
                                      isDark ? Colors.black : Colors.white,
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(16),
                                  ),
                                ),
                                onPressed: _prevStep,
                                child: const Text(
                                  "Back",
                                  style: TextStyle(fontWeight: FontWeight.bold),
                                ),
                              )
                            else
                              const SizedBox(width: 80),
                            ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                backgroundColor:
                                    isDark
                                        ? Colors.amber
                                        : const Color.fromARGB(
                                          255,
                                          68,
                                          93,
                                          245,
                                        ),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(16),
                                ),
                              ),
                              onPressed:
                                  isLoading ? null : _saveProfileAndNavigate,
                              child:
                                  isLoading
                                      ? const SizedBox(
                                        width: 22,
                                        height: 22,
                                        child: CircularProgressIndicator(
                                          strokeWidth: 2,
                                        ),
                                      )
                                      : Text(
                                        _currentStep == 4 ? "Finish" : "Next",
                                        style: GoogleFonts.inter(
                                          color:
                                              isDark
                                                  ? Colors.black
                                                  : Colors.white,

                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  );
                },
                onPageChanged: (i) {
                  setState(() {
                    _currentStep = i;
                  });
                },
              ),
              // Theme toggle button (top right) - place this after PageView.builder
              Positioned(
                top: 16,
                right: 16,
                child: IconButton(
                  icon: Icon(
                    isDark ? Icons.light_mode_rounded : Icons.dark_mode_rounded,
                    color:
                        isDark ? const Color.fromARGB(255, 244, 202, 94) : navy,
                  ),
                  tooltip:
                      isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
                  onPressed: () {
                    setTheme(!isDark);
                  },
                ),
              ),
              // Stepper indicator at the bottom
              Positioned(
                left: 0,
                right: 0,
                bottom: 40,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: List.generate(
                    5,
                    (i) => AnimatedContainer(
                      duration: const Duration(milliseconds: 300),
                      margin: const EdgeInsets.symmetric(horizontal: 6),
                      width: _currentStep == i ? 32 : 12,
                      height: 12,
                      decoration: BoxDecoration(
                        color:
                            _currentStep == i
                                ? isDark
                                    ? Colors.amber
                                    : const Color.fromARGB(255, 68, 93, 245)
                                : Colors.grey.shade300,
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
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
