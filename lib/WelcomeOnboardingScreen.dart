import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';
import 'login_signup_screen.dart';
import 'theme_controller.dart';

class WelcomeOnboarding extends StatefulWidget {
  const WelcomeOnboarding({super.key});

  @override
  State<WelcomeOnboarding> createState() => _WelcomeOnboardingState();
}

class _WelcomeOnboardingState extends State<WelcomeOnboarding> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  final List<_OnboardingPageData> _pages = [
    _OnboardingPageData(
      title: "Your Journey, Curated by AI",
      imageAsset: "assets/sitting.png",
      subtitle: "Discover premium travel experiences, tailored just for you.",
    ),
    _OnboardingPageData(
      title: "Luxury Travel, Smarter Planning",
      imageAsset: "assets/women.png",
      subtitle:
          "AI-crafted itineraries that match your dreams, not just your budget.",
    ),
    _OnboardingPageData(
      title: "Wander. Discover. Live.",
      imageAsset: "assets/vacation.png",
      subtitle: "From flights to flavors — explore every detail with elegance.",
    ),
  ];

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  void _nextPage() {
    if (_currentPage < _pages.length - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 400),
        curve: Curves.ease,
      );
    } else {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => const LoginSignupScreen()),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = ThemeController.of(context);
    final isDark = theme.isDark;
    final setTheme = theme.setTheme;
    final bgGradient = LinearGradient(
      colors:
          isDark
              ? [
                const Color.fromARGB(255, 244, 202, 94),
                const Color.fromARGB(255, 255, 255, 255),
                const Color.fromARGB(255, 169, 177, 246),
              ]
              : [
                const Color(0xFFF5F6FA),
                const Color(0xFFEDE7F6),
                const Color(0xFFD1C4E9),
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
                itemCount: _pages.length,
                onPageChanged: (i) => setState(() => _currentPage = i),
                itemBuilder: (context, i) {
                  final page = _pages[i];
                  return Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12.0,
                      vertical: 5.0,
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisSize: MainAxisSize.max,
                      children: [
                        const SizedBox(height: 80), // Space below the title
                        if (page.imageAsset.isNotEmpty)
                          Container(
                            margin: const EdgeInsets.only(bottom: 20),
                            height: MediaQuery.of(context).size.height * 0.36,
                            child: Image.asset(
                              page.imageAsset,
                              fit: BoxFit.contain,
                            ),
                          ),
                        const SizedBox(height: 10),
                        Builder(
                          builder: (context) {
                            final baseStyle = GoogleFonts.playfairDisplay(
                              fontSize: 28,
                              fontWeight: FontWeight.bold,
                              color:
                                  isDark
                                      ? const Color.fromARGB(255, 0, 0, 0)
                                      : const Color.fromARGB(255, 0, 0, 0),
                              letterSpacing: 0.5,
                            );
                            final text = page.title.replaceAllMapped(
                              RegExp(
                                r'\b(journey|AI|Luxury|Planning|Discover)\b',
                                caseSensitive: false,
                              ),
                              (match) => '§${match[0]}§',
                            );
                            final parts = text.split('§');
                            final spans = <TextSpan>[];
                            for (var i = 0; i < parts.length; i++) {
                              final part = parts[i];
                              if (i % 2 == 1) {
                                // Highlighted word
                                spans.add(
                                  TextSpan(
                                    text: part,
                                    style: baseStyle.copyWith(
                                      fontWeight: FontWeight.w900,
                                      color:
                                          isDark
                                              ? const Color.fromARGB(
                                                255,
                                                68,
                                                93,
                                                245,
                                              )
                                              : const Color.fromARGB(
                                                255,
                                                68,
                                                93,
                                                245,
                                              ),
                                      shadows: [
                                        Shadow(
                                          color:
                                              isDark
                                                  ? Colors.black.withOpacity(
                                                    0.4,
                                                  )
                                                  : Colors.amber.withOpacity(
                                                    0.3,
                                                  ),
                                          blurRadius: 12,
                                          offset: const Offset(0, 2),
                                        ),
                                      ],
                                    ),
                                  ),
                                );
                              } else {
                                spans.add(
                                  TextSpan(text: part, style: baseStyle),
                                );
                              }
                            }
                            return RichText(
                              textAlign: TextAlign.center,
                              text: TextSpan(children: spans),
                              strutStyle: const StrutStyle(height: 1.4),
                            );
                          },
                        ),
                        if (page.subtitle.isNotEmpty) ...[
                          const SizedBox(height: 10),
                          Text(
                            page.subtitle,
                            textAlign: TextAlign.center,
                            style: GoogleFonts.inter(
                              fontSize: 16,
                              color:
                                  isDark
                                      ? const Color.fromARGB(255, 0, 0, 0)
                                      : Colors.black54,
                              letterSpacing: 0.2,
                            ),
                          ),
                        ],
                      ],
                    ),
                  );
                },
              ),
              // Theme toggle button (top right)
              Positioned(
                top: 16,
                right: 16,
                child: IconButton(
                  icon: Icon(
                    isDark ? Icons.light_mode_rounded : Icons.dark_mode_rounded,
                    color:
                        isDark
                            ? const Color.fromARGB(255, 244, 202, 94)
                            : const Color.fromARGB(255, 68, 93, 245),
                  ),
                  tooltip:
                      isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
                  onPressed: () => setTheme(!isDark),
                ),
              ),
              // Indicator & Button
              Positioned(
                left: 0,
                right: 0,
                bottom: 120,
                child: Column(
                  children: [
                    SizedBox(
                      width: 160,
                      height: 48,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color.fromARGB(
                            255,
                            68,
                            93,
                            245,
                          ),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(24),
                          ),
                          elevation: 6,
                        ),
                        onPressed: _nextPage,
                        child: Text(
                          _currentPage == _pages.length - 1
                              ? "Get Started"
                              : "Next",
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 18,
                            letterSpacing: 1.1,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 40),
                    AnimatedSmoothIndicator(
                      activeIndex: _currentPage,
                      count: _pages.length,
                      effect: ExpandingDotsEffect(
                        dotHeight: 8,
                        dotWidth: 24,
                        activeDotColor: const Color.fromARGB(255, 68, 93, 245),
                        dotColor: isDark ? Colors.white24 : Colors.black12,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _OnboardingPageData {
  final String title;
  final String imageAsset;
  final String subtitle;

  const _OnboardingPageData({
    required this.title,
    required this.imageAsset,
    required this.subtitle,
  });
}
