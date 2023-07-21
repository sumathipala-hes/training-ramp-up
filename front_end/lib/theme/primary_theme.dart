// app_theme.dart

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:ramp_up/theme/styled_theme.dart';

final ThemeData appThemeData = ThemeData(
  primaryColor: const Color.fromARGB(255, 9, 202, 199),
  hintColor: const Color.fromARGB(255, 52, 73, 94),
  appBarTheme: const AppBarTheme(
    backgroundColor: Color(0xFF075E54),
  ),
);

final popButton = ElevatedButton.styleFrom(
  padding: const EdgeInsets.all(18),
  backgroundColor: AppColors.popButton,
  shadowColor: Colors.white,
  shape: const RoundedRectangleBorder(
    borderRadius: BorderRadius.all(
      Radius.circular(15),
    ),
  ),
);

final cancelButton = ElevatedButton.styleFrom(
  backgroundColor: AppColors.cancelButton,
  textStyle: GoogleFonts.ubuntu(
    fontSize: 16,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  ),
);

final saveButton = ElevatedButton.styleFrom(
  backgroundColor: AppColors.saveButton,
  textStyle: GoogleFonts.ubuntu(
    fontSize: 16,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  ),
);

final headerText = GoogleFonts.ubuntu(
  fontSize: 18,
  fontWeight: FontWeight.bold,
  color: Colors.blue,
);

final labelText = GoogleFonts.ubuntu(
  fontSize: 15,
  fontWeight: FontWeight.bold,
);

final textButton = GoogleFonts.ubuntu(
  fontSize: 17,
  fontWeight: FontWeight.bold,
  color: Colors.white,
);

final textRedio = GoogleFonts.ubuntu(
  fontSize: 16,
  fontWeight: FontWeight.bold,
  color: Colors.black,
);

final cardText = GoogleFonts.ubuntu(
  fontSize: 20,
  fontWeight: FontWeight.bold,
  color: Colors.white,
);

final cardTextSub = GoogleFonts.ubuntu(
  fontSize: 16,
  fontWeight: FontWeight.w400,
  color: AppColors.textColor,
);
