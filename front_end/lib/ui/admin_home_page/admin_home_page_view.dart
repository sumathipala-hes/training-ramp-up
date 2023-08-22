import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/models/student.dart';
import 'package:front_end/ui/admin_home_page/admin_home_page_bloc.dart';
import 'package:front_end/ui/admin_home_page/admin_home_page_state.dart';
import 'package:front_end/ui/manage_student_page/manage_student_page_provider.dart';
import 'package:front_end/ui/sign_in_page/sign_in_page_provider.dart';
import 'package:front_end/ui/widget/student_card.dart';
import 'package:front_end/ui/widget/student_manage_form.dart';

class AdminHomeScreen extends StatelessWidget {
  const AdminHomeScreen({Key? key}) : super(key: key);

  Widget _buildStudentCardView(BuildContext context, Student student) {
    return GestureDetector(
      onTap: () {
        navigateToManageStudent(context, student);
      },
      child: StudentCard(
        student: student,
      ),
    );
  }

  void navigateToManageStudent(BuildContext context, Student student) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => ManageStudentScreenProvider(
          student: student,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 7,
        centerTitle: true,
        title: const Text('R A M P   U P   A D M I N'),
        actions: [
          IconButton(
            icon: const Icon(Icons.share),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => const SignInPageProvider()),
              );
            },
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
                  '+ ADD NEW STUDENT',
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
                child: BlocBuilder<AdminHomeScreenBloc, AdminHomeState>(
                  buildWhen: (previous, current) =>
                      previous.entries != current.entries,
                  builder: (context, state) {
                    return Column(
                      children: state.entries
                          .map(
                            (entry) => _buildStudentCardView(context, entry),
                          )
                          .toList(),
                    );
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
