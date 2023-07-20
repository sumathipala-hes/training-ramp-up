import 'package:flutter/material.dart';
import 'package:frontend/ui/home_page/home_page.dart';

class RampUpApp extends StatelessWidget {
  const RampUpApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'RampUp',
      theme: ThemeData(),
      home: HomepageView(),
    );
  }
}
