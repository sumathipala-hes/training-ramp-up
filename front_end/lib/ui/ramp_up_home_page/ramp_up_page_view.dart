import 'package:flutter/material.dart';

class RampUpHomeScreen extends StatelessWidget {
  const RampUpHomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.deepPurple[300],
        elevation: 7,
        centerTitle: true,
        title: const Text('R A M P   U P'),
        actions: [
          IconButton(
            icon: const Icon(Icons.share),
            onPressed: () {},
          ),
        ],
      ),
      body: Column(
      ),
    );
  }
}
