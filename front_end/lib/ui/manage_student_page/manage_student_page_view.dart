import 'package:flutter/material.dart';
import 'package:front_end/models/student.dart';

class ManageStudentScreen extends StatelessWidget {
  const ManageStudentScreen({super.key, required Student student});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 7,
        centerTitle: true,
        title: const Text('M A N A G E    S T U D E N T'),
      ),
      body: Container(
        height: double.infinity,
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/img/background.jpg'),
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }
}