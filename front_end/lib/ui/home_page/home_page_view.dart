import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:ramp_up/ui/widget/card_details.dart';
import 'package:ramp_up/ui/widget/student_modal.dart';

import '../../model/student_model.dart';
import '../../theme/primary_theme.dart';
import '../manage_student_page/manage_student_page_provider.dart';
import 'home_page_bloc.dart';
import 'home_page_state.dart';

class HomePageView extends StatelessWidget {
  const HomePageView({super.key});

  Widget _buildStudentCardView(BuildContext context, Student student) {
    return GestureDetector(
      onTap: () {
        navigateToAnotherUI(context, student);
      },
      child: StudentCard(
        id: student.id,
        studentName: student.name,
        studentDOB: student.dob,
      ),
    );
  }

  void navigateToAnotherUI(BuildContext context, Student student) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => StudentMangeProvider(student: student),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Manage Student",
          style: TextStyle(
              fontWeight: FontWeight.bold,
              fontFamily: GoogleFonts.ubuntu().fontFamily),
        ),
      ),
      body: Stack(
        children: [
          Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/bg.png'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 5, sigmaY: 5),
            child: Container(
              color: Colors.black.withOpacity(0.3),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(height: 30),
                ElevatedButton(
                  style: popButton,
                  onPressed: () {
                    showDialog(
                      context: context,
                      builder: (context) => const PopupModal(),
                    );
                  },
                  child: Text(
                    "ADD NEW STUDENT",
                    style: textButton,
                  ),
                ),
                const SizedBox(height: 30),
                Expanded(
                  child: SingleChildScrollView(
                    child: BlocBuilder<HomePageBloc, HomePageState>(
                      buildWhen: (previous, current) =>
                          previous.allStudents != current.allStudents,
                      builder: (context, state) {
                        final List<Student> allStudents = state.allStudents;
                        return ListView.builder(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          itemCount: allStudents.length,
                          itemBuilder: (context, index) {
                            final student = allStudents[index];
                            return _buildStudentCardView(context, student);
                          },
                        );
                      },
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
