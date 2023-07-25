import 'package:flutter/material.dart';
import 'package:front_end/theme/primary_theme.dart';
import 'package:front_end/ui/home_page/home_page_provider.dart';

class RampUpApp extends StatelessWidget {
  const RampUpApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Ramp Up',
      theme: PrimaryTheme.generateTheme(context),
      home: RampUpHomeScreenProvider(),
    );
  }
}
