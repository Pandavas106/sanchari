import 'package:flutter/material.dart';

class ThemeController extends InheritedWidget {
  final bool isDark;
  final void Function(bool) setTheme;

  const ThemeController({
    super.key,
    required this.isDark,
    required this.setTheme,
    required super.child,
  });

  static ThemeController of(BuildContext context) {
    final ThemeController? result =
        context.dependOnInheritedWidgetOfExactType<ThemeController>();
    assert(result != null, 'No ThemeController found in context');
    return result!;
  }

  @override
  bool updateShouldNotify(ThemeController oldWidget) =>
      isDark != oldWidget.isDark;
}
