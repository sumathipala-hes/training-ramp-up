import 'package:flutter/material.dart';
import 'package:frontend/ui/widget/student_form/student_form_provider.dart';

class HomePageView extends StatelessWidget {
  const HomePageView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ramp Up'),
      ),
      body: Container(
        width: double.infinity,
        alignment: Alignment.center,
        child: Column(
          children: [
            ElevatedButton(
                onPressed: () {
                  showDialog(
                      context: context,
                      builder: (context) => const StudentFormProvider());
                },
                child: const Text("Add Student")),
          ],
        ),
      ),
    );
  }
}
