import 'package:flutter/material.dart';
import 'package:ramp_up/ui/home_page/home_page_provider.dart';
import 'package:ramp_up/ui/home_page/home_page_view.dart';

import '../../theme/primary_theme.dart';

class RampUpApp extends StatelessWidget {
  const RampUpApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'RampUp App',
      theme: appThemeData,
      debugShowCheckedModeBanner: false,
      home: const HomePageProvider(),
    );
  }
}
