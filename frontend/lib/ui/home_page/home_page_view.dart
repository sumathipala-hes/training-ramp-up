import 'package:flutter/material.dart';
import 'package:frontend/ui/widget/student_card.dart';
import 'package:frontend/ui/widget/student_form/student_form_provider.dart';

class HomePageView extends StatelessWidget {
  const HomePageView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ramp Up'),
        toolbarHeight: MediaQuery.of(context).size.height * 0.1,
      ),
      body: Container(
        width: double.infinity,
        alignment: Alignment.center,
        padding: const EdgeInsetsDirectional.fromSTEB(10, 20, 10, 20),
        child: Column(
          children: [
            ElevatedButton(
              onPressed: () {
                showDialog(
                    context: context,
                    builder: (context) {
                      return Dialog(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const StudentFormProvider(),
                      );
                    });
              },
              child: const Padding(
                padding: EdgeInsetsDirectional.fromSTEB(20, 10, 20, 10),
                child: Text(
                  "Add Student",
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.normal,
                  ),
                ),
              ),
            ),
            const SizedBox(
              height: 50,
            ),
            const SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Column(
                children: [
                  StudentCard(),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
