import 'package:flutter/material.dart';
import 'package:front_end/ui/ramp_up_home_page/ramp_up_home_page_provider.dart';

class RampUpApp extends StatelessWidget {
  const RampUpApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Ramp Up',
      theme: ThemeData(
        primarySwatch: Colors.deepPurple,
      ),
      home: RampUpHomeScreenProvider(),
    );
  }
}
