import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'theme_controller.dart';
import 'WelcomeOnboardingScreen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Supabase.initialize(
    url: 'https://dcijlrzttcyovimjbnvw.supabase.co', // <-- Replace with your Supabase URL
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjaWpscnp0dGN5b3ZpbWpibnZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NTI2OTUsImV4cCI6MjA2NjUyODY5NX0.NWIzUUuqHlmbVPkML5TtHlraGD7cbYMcVKk2nad4HsM', // <-- Replace with your Supabase anon key
  );
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});
  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  bool isDark = true;

  void setTheme(bool value) {
    setState(() {
      isDark = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return ThemeController(
      isDark: isDark,
      setTheme: setTheme,
      child: Builder(
        builder: (context) => MaterialApp(
          debugShowCheckedModeBanner: false,
          theme: ThemeData.light(),
          darkTheme: ThemeData.dark(),
          themeMode: ThemeController.of(context).isDark ? ThemeMode.dark : ThemeMode.light,
          home: const WelcomeOnboarding(),
        ),
      ),
    );
  }
}

final supabase = Supabase.instance.client;

// Remove the duplicate WelcomeOnboarding and MyHomePage classes from here if they exist elsewhere

// --- WelcomeOnboardingScreen.dart ---
// Update your WelcomeOnboardingScreen to accept a callback for "Get Started":

/*
class WelcomeOnboarding extends StatefulWidget {
  const WelcomeOnboarding({Key? key}) : super(key: key);

  @override
  _WelcomeOnboardingState createState() => _WelcomeOnboardingState();
}

class _WelcomeOnboardingState extends State<WelcomeOnboarding> {
  // ... your onboarding logic ...
  void _onGetStarted() {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (_) => const LoginSignupScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    // When "Get Started" button is pressed, call _onGetStarted()
    // Example:
    // ElevatedButton(
    //   onPressed: _onGetStarted,
    //   child: Text("Get Started"),
    // )
  }
}
*/

// Now, when the user clicks "Get Started" on the onboarding screen, they will be navigated to the login/signup screen.


