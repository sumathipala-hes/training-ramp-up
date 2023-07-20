import 'package:flutter/material.dart';

ThemeData rampUpTheme() {
  return ThemeData(
    primaryColor: Colors.blue,
    colorScheme: ColorScheme.fromSwatch(primarySwatch: Colors.blue)
        .copyWith(secondary: Colors.blueAccent),
  );
}
