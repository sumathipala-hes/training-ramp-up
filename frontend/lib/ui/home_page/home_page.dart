import 'package:flutter/material.dart';

class HomepageView extends StatelessWidget {
  const HomepageView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ramp Up'),
      ),
      body: const Center(
        child: Text('Hello World'),
      ),
    );
  }
}
