import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/ui/user_home_page/user_home_page_bloc.dart';
import 'package:front_end/ui/user_home_page/user_home_page_event.dart';
import 'package:front_end/ui/user_home_page/user_home_page_state.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../model/student_model.dart';
import '../widget/card_details.dart';

class UserHomePageView extends StatelessWidget {
  UserHomePageView({super.key});

  final TextEditingController searchController = TextEditingController();

  Widget _buildStudentCardView(BuildContext context, Student student) {
    return GestureDetector(
      onTap: () {
        // navigateToAnotherUI(context, student);
      },
      child: StudentCard(
        id: student.id!,
        studentName: student.name,
        studentDOB: student.dob,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final userHomePage = BlocProvider.of<UserHomePageBloc>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Student View",
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
                Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: SizedBox(
                    height: 50,
                    width: MediaQuery.of(context).size.width.toDouble(),
                    child: DecoratedBox(
                      decoration: BoxDecoration(
                        color: Colors.white70,
                        border: Border.all(
                          color: Colors.black,
                          width: 1,
                        ),
                        borderRadius: const BorderRadius.all(
                          Radius.circular(10),
                        ),
                      ),
                      child: TextField(
                        controller: searchController,
                        onSubmitted: (value) => {
                          userHomePage.add(
                            GetStudentByOne(
                              searchController.text.trim(),
                            ),
                          ),
                        },
                        decoration: const InputDecoration(
                          prefixIcon: Icon(Icons.search),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(
                              Radius.circular(10),
                            ),
                          ),
                          hintText: 'Search by ID, Name, Address, Mobile No',
                          hintStyle: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: SingleChildScrollView(
                    child: BlocBuilder<UserHomePageBloc, UserHomePageState>(
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
