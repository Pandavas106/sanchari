// ignore_for_file: deprecated_member_use

import 'dart:ui'; // Add this import at the top
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'profile_stepper_screen.dart';
import 'theme_controller.dart';

class LoginSignupScreen extends StatefulWidget {
  const LoginSignupScreen({super.key});

  @override
  State<LoginSignupScreen> createState() => _LoginSignupScreenState();
}

class _LoginSignupScreenState extends State<LoginSignupScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  bool useBiometric = false;
  bool showOtpSignIn = false;
  bool showOtpSignUp = false;
  final TextEditingController emailController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController otpController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  @override
  void initState() {
    _tabController = TabController(length: 2, vsync: this);
    super.initState();
  }

  @override
  void dispose() {
    _tabController.dispose();
    emailController.dispose();
    phoneController.dispose();
    otpController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  Widget neumorphicField({
    required String hint,
    required IconData icon,
    TextEditingController? controller,
    bool obscure = false,
    TextInputType? keyboardType,
    required bool isDark,
    required Color navy,
  }) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      decoration: BoxDecoration(
        color: isDark ? navy.withOpacity(0.85) : Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
            color: isDark ? navy.withOpacity(0.3) : Colors.grey.shade300,
            offset: const Offset(4, 4),
            blurRadius: 12,
            spreadRadius: 1,
          ),
          BoxShadow(
            color: isDark ? navy : Colors.white,
            offset: const Offset(-4, -4),
            blurRadius: 12,
            spreadRadius: 1,
          ),
        ],
      ),
      child: TextField(
        controller: controller,
        obscureText: obscure,
        keyboardType: keyboardType,
        style: GoogleFonts.inter(
          fontSize: 16,
          color: isDark ? Colors.white : navy,
        ),
        decoration: InputDecoration(
          prefixIcon: Icon(
            icon,
            color: isDark ? Colors.amber : const Color(0xFF445DF5),
          ),
          hintText: hint,
          hintStyle: GoogleFonts.inter(
            color: isDark ? Colors.white54 : Colors.grey.shade500,
            fontWeight: FontWeight.w500,
          ),
          border: InputBorder.none,
          contentPadding: const EdgeInsets.symmetric(vertical: 18),
        ),
      ),
    );
  }

  Widget socialButton({
    required String label,
    required Widget icon, // <-- Change to Widget
    required VoidCallback onTap,
    Color? color,
    Color? iconColor,
    required bool isDark,
    required Color navy,
  }) {
    final isGoogle = label == "Google";
    return Expanded(
      child: ElevatedButton.icon(
        style: ElevatedButton.styleFrom(
          backgroundColor: color ?? (isDark ? navy : Colors.white),
          foregroundColor:
              isGoogle
                  ? Colors.black87
                  : color == null
                  ? (isDark ? Colors.white : const Color(0xFF232946))
                  : Colors.white,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
            side: BorderSide(
              color:
                  isGoogle
                      ? Colors.grey.shade300
                      : color ??
                          (isDark
                              ? navy.withOpacity(0.3)
                              : Colors.grey.shade200),
              width: 1.2,
            ),
          ),
          padding: const EdgeInsets.symmetric(vertical: 12),
        ),
        icon: icon, // <-- Use the widget directly
        label: Text(
          label,
          style: GoogleFonts.inter(fontWeight: FontWeight.w600),
        ),
        onPressed: onTap,
      ),
    );
  }

  Widget otpFields(bool isDark, Color navy) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: List.generate(
        4,
        (i) => Container(
          width: 48,
          height: 56,
          alignment: Alignment.center,
          margin: const EdgeInsets.symmetric(horizontal: 4),
          decoration: BoxDecoration(
            color: isDark ? navy.withOpacity(0.85) : Colors.white,
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: isDark ? navy.withOpacity(0.3) : Colors.grey.shade300,
                offset: const Offset(2, 2),
                blurRadius: 8,
                spreadRadius: 1,
              ),
              BoxShadow(
                color: isDark ? navy : Colors.white,
                offset: const Offset(-2, -2),
                blurRadius: 8,
                spreadRadius: 1,
              ),
            ],
          ),
          child: TextField(
            controller: i == 0 ? otpController : null,
            textAlign: TextAlign.center,
            style: GoogleFonts.inter(
              fontSize: 22,
              fontWeight: FontWeight.bold,
              color: isDark ? Colors.white : navy,
            ),
            maxLength: 1,
            keyboardType: TextInputType.number,
            decoration: const InputDecoration(
              counterText: "",
              border: InputBorder.none,
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = ThemeController.of(context);
    final isDark = theme.isDark;
    final setTheme = theme.setTheme;
    final navy = const Color(0xFF232946);
    final gold = Colors.amber; // <-- Add this line

    // Use the same gradient as ProfileStepperScreen
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
      backgroundColor: isDark ? navy : null,
      body: Container(
        decoration: BoxDecoration(gradient: bgGradient),
        child: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              child: Column(
                children: [
                  // AppBar replacement: theme toggle
                  Align(
                    alignment: Alignment.topRight,
                    child: IconButton(
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
                  ),
                  const SizedBox(height: 24),
                  // Card
                  Container(
                    margin: const EdgeInsets.symmetric(horizontal: 20),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(32),
                      child: BackdropFilter(
                        filter: ImageFilter.blur(sigmaX: 18, sigmaY: 18),
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 24,
                            vertical: 32,
                          ),
                          decoration: BoxDecoration(
                            color:
                                isDark
                                    ? navy.withOpacity(0.45)
                                    : Colors.white.withOpacity(
                                      0.38,
                                    ), // slightly more transparent for glassy look
                            borderRadius: BorderRadius.circular(32),
                            border: Border.all(
                              color: Colors.white.withOpacity(0.22),
                              width: 1.5,
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.08),
                                blurRadius: 24,
                                offset: const Offset(0, 12),
                              ),
                            ],
                          ),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              // Logo
                              CircleAvatar(
                                radius: 40,
                                backgroundColor:
                                    isDark ? gold : const Color(0xFF445DF5),
                                child: Icon(
                                  Icons.airplanemode_active,
                                  color: isDark ? navy : Colors.white,
                                  size: 40,
                                ),
                              ),
                              const SizedBox(height: 18),
                              Text(
                                "Sanchari",
                                style: GoogleFonts.playfairDisplay(
                                  fontSize: 32,
                                  fontWeight: FontWeight.bold,
                                  color:
                                      isDark ? gold : const Color(0xFF445DF5),
                                  letterSpacing: 1.5,
                                ),
                              ),
                              const SizedBox(height: 6),
                              Text(
                                "Travel. Discover. Live.",
                                style: GoogleFonts.inter(
                                  fontSize: 15,
                                  color:
                                      isDark
                                          ? Colors.white70
                                          : Colors.grey.shade700,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                              const SizedBox(height: 24),
                              // TabBar
                              Container(
                                decoration: BoxDecoration(
                                  color:
                                      isDark ? navy : const Color(0xFFF5F6FA),
                                  borderRadius: BorderRadius.circular(16),
                                ),
                                child: TabBar(
                                  controller: _tabController,
                                  indicator: BoxDecoration(
                                    color:
                                        isDark ? gold : const Color(0xFF445DF5),
                                    borderRadius: BorderRadius.circular(16),
                                  ),
                                  indicatorSize: TabBarIndicatorSize.tab,
                                  labelColor: isDark ? navy : Colors.white,
                                  unselectedLabelColor:
                                      isDark ? gold : const Color(0xFF445DF5),
                                  labelStyle: GoogleFonts.inter(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 16,
                                  ),
                                  tabs: const [
                                    Tab(text: "Sign In"),
                                    Tab(text: "Sign Up"),
                                  ],
                                ),
                              ),
                              const SizedBox(height: 24),
                              SizedBox(
                                height: 340,
                                child: TabBarView(
                                  controller: _tabController,
                                  children: [
                                    // Sign In
                                    _buildSignIn(context, isDark, navy, gold),
                                    // Sign Up
                                    _buildSignUp(context, isDark, navy, gold),
                                  ],
                                ),
                              ),
                              const SizedBox(height: 18),
                              Row(
                                children: [
                                  socialButton(
                                    label: "Google",
                                    icon: Image.asset(
                                      'assets/google_logo.png',
                                      height: 22,
                                      width: 22,
                                    ),
                                    onTap: () {},
                                    isDark: isDark,
                                    navy: navy,
                                    color: Colors.white,
                                  ),
                                  const SizedBox(width: 12),
                                  socialButton(
                                    label: "Facebook",
                                    icon: Icon(
                                      Icons.facebook,
                                      color: Colors.white,
                                    ),
                                    color: const Color(0xFF1877F3),
                                    onTap: () {},
                                    isDark: isDark,
                                    navy: navy,
                                  ),
                                ],
                              ),
                              const SizedBox(height: 12),
                              Row(
                                children: [
                                  socialButton(
                                    label: "iPhone",
                                    icon: Icon(
                                      Icons.apple,
                                      color: Colors.white,
                                    ), // ✅ This is a Widget
                                    color: Colors.black,
                                    onTap: () {
                                      // Handle Apple sign in/up
                                    },
                                    isDark: isDark,
                                    navy: navy,
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  Text(
                    "Need help?",
                    style: TextStyle(
                      color: isDark ? Colors.white54 : Colors.grey,
                      fontSize: 16,
                    ),
                  ),
                  const SizedBox(height: 24),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSignIn(
    BuildContext context,
    bool isDark,
    Color navy,
    Color gold,
  ) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        neumorphicField(
          hint: "Email",
          icon: Icons.email_outlined,
          controller: emailController,
          keyboardType: TextInputType.emailAddress,
          isDark: isDark,
          navy: navy,
        ),
        neumorphicField(
          hint: "Password",
          icon: Icons.lock_outline,
          obscure: true,
          controller: passwordController, // <-- Add this!
          isDark: isDark,
          navy: navy,
        ),
        const SizedBox(height: 10),
        SizedBox(
          width: double.infinity,
          height: 48,
          child: ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: isDark ? gold : const Color(0xFF445DF5),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(18),
              ),
              elevation: 4,
            ),
            onPressed: () async {
              try {
                final response = await Supabase.instance.client.auth
                    .signInWithPassword(
                      email: emailController.text,
                      password: passwordController.text,
                    );
                if (response.user != null) {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (_) => const ProfileStepperScreen(),
                    ),
                  );
                }
              } catch (e) {
                ScaffoldMessenger.of(
                  context,
                ).showSnackBar(SnackBar(content: Text(e.toString())));
              }
            },
            child: Text(
              "Sign In",
              style: GoogleFonts.inter(
                color: isDark ? navy : Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: 18,
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildSignUp(
    BuildContext context,
    bool isDark,
    Color navy,
    Color gold,
  ) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        neumorphicField(
          hint: "Email",
          icon: Icons.email_outlined,
          controller: emailController,
          keyboardType: TextInputType.emailAddress,
          isDark: isDark,
          navy: navy,
        ),
        neumorphicField(
          hint: "Phone",
          icon: Icons.phone_outlined,
          controller: phoneController,
          keyboardType: TextInputType.phone,
          isDark: isDark,
          navy: navy,
        ),
        neumorphicField(
          hint: "Password",
          icon: Icons.lock_outline,
          obscure: true,
          isDark: isDark,
          navy: navy,
        ),
        const SizedBox(height: 10),
        SizedBox(
          width: double.infinity,
          height: 48,
          child: ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: isDark ? gold : const Color(0xFF445DF5),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(18),
              ),
              elevation: 4,
            ),
            onPressed: () async {
              // Simple validation: check if fields are not empty
              if (emailController.text.isNotEmpty &&
                  phoneController.text.isNotEmpty &&
                  passwordController.text.isNotEmpty) {
                try {
                  final response = await Supabase.instance.client.auth.signUp(
                    email: emailController.text,
                    password: passwordController.text,
                    data: {
                      'phone':
                          phoneController
                              .text, // This stores phone in user metadata
                    },
                  );
                  if (response.user != null) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Sign up successful! Please sign in.'),
                      ),
                    );
                    _tabController.animateTo(0); // Switch to Sign In tab
                  }
                } catch (e) {
                  ScaffoldMessenger.of(
                    context,
                  ).showSnackBar(SnackBar(content: Text(e.toString())));
                }
              } else {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Please fill all fields')),
                );
              }
            },
            child: Text(
              "Sign Up",
              style: GoogleFonts.inter(
                color: isDark ? navy : Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: 18,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
