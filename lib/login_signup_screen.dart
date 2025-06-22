import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
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
          prefixIcon: Icon(icon, color: isDark ? Colors.amber : const Color(0xFF445DF5)),
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
    required IconData icon,
    required VoidCallback onTap,
    Color? color,
    required bool isDark,
    required Color navy,
  }) {
    return Expanded(
      child: ElevatedButton.icon(
        style: ElevatedButton.styleFrom(
          backgroundColor: color ?? (isDark ? navy : Colors.white),
          foregroundColor: color == null
              ? (isDark ? Colors.white : const Color(0xFF232946))
              : Colors.white,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
            side: BorderSide(
              color: color ?? (isDark ? navy.withOpacity(0.3) : Colors.grey.shade200),
              width: 1.2,
            ),
          ),
          padding: const EdgeInsets.symmetric(vertical: 12),
        ),
        icon: Icon(icon, size: 22),
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
    final gold = const Color(0xFFF4CA5E);

    final bgGradient = LinearGradient(
      colors: isDark
          ? [
              const Color(0xFF232946),
              const Color(0xFF181A2A),
              const Color(0xFF2D3250),
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
      backgroundColor: isDark ? navy : null,
      appBar: AppBar(
        backgroundColor: isDark ? navy : Colors.white,
        elevation: 0,
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
        decoration: BoxDecoration(gradient: bgGradient),
        child: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              child: Column(
                children: [
                  const SizedBox(height: 32),
                  Text(
                    "Sanchari",
                    style: GoogleFonts.playfairDisplay(
                      fontSize: 36,
                      fontWeight: FontWeight.bold,
                      color: isDark ? gold : const Color(0xFF445DF5),
                      letterSpacing: 1.5,
                      shadows: [
                        Shadow(
                          color: Colors.black.withOpacity(0.08),
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    "Travel. Discover. Live.",
                    style: GoogleFonts.inter(
                      fontSize: 16,
                      color: isDark ? Colors.white70 : Colors.grey.shade700,
                      fontWeight: FontWeight.w500,
                      letterSpacing: 1.1,
                    ),
                  ),
                  const SizedBox(height: 28),
                  TabBar(
                    controller: _tabController,
                    indicator: BoxDecoration(
                      color: isDark ? gold : const Color(0xFF445DF5),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    indicatorSize: TabBarIndicatorSize.tab,
                    labelPadding: const EdgeInsets.symmetric(horizontal: 32),
                    labelColor: isDark ? navy : Colors.white,
                    unselectedLabelColor: isDark ? gold : const Color(0xFF445DF5),
                    labelStyle: GoogleFonts.inter(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                    tabs: const [Tab(text: "Sign In"), Tab(text: "Sign Up")],
                  ),
                  const SizedBox(height: 24),
                  SizedBox(
                    height: 420,
                    child: TabBarView(
                      controller: _tabController,
                      children: [
                        // Sign In State
                        SingleChildScrollView(
                          child: Column(
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
                                isDark: isDark,
                                navy: navy,
                              ),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Row(
                                    children: [
                                      Switch(
                                        value: useBiometric,
                                        onChanged: (val) {
                                          setState(() => useBiometric = val);
                                        },
                                        activeColor: isDark ? gold : const Color(0xFF445DF5),
                                      ),
                                      Text(
                                        "Biometric Login",
                                        style: GoogleFonts.inter(
                                          fontWeight: FontWeight.w500,
                                          color: isDark ? Colors.white70 : Colors.grey.shade700,
                                        ),
                                      ),
                                    ],
                                  ),
                                  TextButton(
                                    onPressed: () {},
                                    child: Text(
                                      "Forgot Password?",
                                      style: GoogleFonts.inter(
                                        color: isDark ? gold : const Color(0xFF445DF5),
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  ),
                                ],
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
                                  onPressed: () {
                                    setState(() => showOtpSignIn = true);
                                    Navigator.pushReplacement(
                                      context,
                                      MaterialPageRoute(
                                        builder: (_) => const ProfileStepperScreen(),
                                      ),
                                    );
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
                              if (showOtpSignIn) ...[
                                const SizedBox(height: 18),
                                otpFields(isDark, navy),
                                const SizedBox(height: 10),
                                SizedBox(
                                  width: double.infinity,
                                  height: 44,
                                  child: ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: isDark ? gold : const Color(0xFF445DF5),
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(14),
                                      ),
                                    ),
                                    onPressed: () {},
                                    child: Text(
                                      "Verify OTP",
                                      style: GoogleFonts.inter(
                                        color: isDark ? navy : Colors.white,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ],
                          ),
                        ),
                        // Sign Up State
                        SingleChildScrollView(
                          child: Column(
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
                                  onPressed: () {
                                    setState(() => showOtpSignUp = true);
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
                              if (showOtpSignUp) ...[
                                const SizedBox(height: 18),
                                otpFields(isDark, navy),
                                const SizedBox(height: 10),
                                SizedBox(
                                  width: double.infinity,
                                  height: 44,
                                  child: ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: isDark ? gold : const Color(0xFF445DF5),
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(14),
                                      ),
                                    ),
                                    onPressed: () {},
                                    child: Text(
                                      "Verify OTP",
                                      style: GoogleFonts.inter(
                                        color: isDark ? navy : Colors.white,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 18),
                  Row(
                    children: [
                      socialButton(
                        label: "Google",
                        icon: Icons.g_mobiledata,
                        onTap: () {},
                        isDark: isDark,
                        navy: navy,
                      ),
                      const SizedBox(width: 12),
                      socialButton(
                        label: "Facebook",
                        icon: Icons.facebook,
                        color: const Color(0xFF1877F3),
                        onTap: () {},
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
    );
  }
}
