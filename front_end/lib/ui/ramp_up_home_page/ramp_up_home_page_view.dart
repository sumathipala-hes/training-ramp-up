import 'package:flutter/material.dart';
import 'package:front_end/db/model/student.dart';
import 'package:front_end/ui/widget/student_card.dart';
import 'package:front_end/ui/widget/student_manage_form.dart';

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
        titleTextStyle: const TextStyle(
          fontSize: 25.0,
          // fontWeight: FontWeight.bold,
          // color: Colors.white,
          fontFamily: ''
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.share),
            onPressed: () {},
          ),
        ],
      ),
      body: Container(
        height: double.infinity,
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/img/background.jpg'),
            fit: BoxFit.cover,
          ),
        ),
        child: Column(
          children: [
            const SizedBox(height: 30),
            Center(
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.grey[700],
                  elevation: 5,
                  fixedSize: const Size(170, 40),
                  shape: const RoundedRectangleBorder(
                    borderRadius: BorderRadius.all(
                      Radius.circular(10),
                    ),
                  ),
                ),
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (context) => const PopupModel(),
                  );
                },
                child: const Text(
                  'ADD NEW STUDENT',
                  style: TextStyle(
                    fontSize: 15.0,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
             const SizedBox(height: 30),
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    StudentCard(
                      student: Student(
                        studentId: '1',
                        studentName: 'Gune',
                        studentAddress: 'Galle Road, Colombo 03',
                        studentMobile: '071 2588 963',
                        studentDob: DateTime.now(),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
