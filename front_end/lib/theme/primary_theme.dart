import 'package:flutter/material.dart';

abstract class PrimaryTheme {
  PrimaryTheme._();

  static ThemeData generateTheme(BuildContext context) {
    MaterialColor deepPurple = MaterialColor(
      Colors.deepPurple[300]!.value,
      <int, Color>{
        50: Colors.deepPurple[50]!,
        100: Colors.deepPurple[100]!,
        200: Colors.deepPurple[200]!,
        300: Colors.deepPurple[300]!,
        400: Colors.deepPurple[400]!,
        500: Colors.deepPurple[500]!,
        600: Colors.deepPurple[600]!,
        700: Colors.deepPurple[700]!,
        800: Colors.deepPurple[800]!,
        900: Colors.deepPurple[900]!,
      },
    );

    return ThemeData(
      primarySwatch: deepPurple,
      brightness: Brightness.light,
    );
  }
}
