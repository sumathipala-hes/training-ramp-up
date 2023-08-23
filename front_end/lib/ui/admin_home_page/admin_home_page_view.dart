import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/model/user_model.dart';
import 'package:front_end/theme/primary_theme.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../model/student_model.dart';
import '../manage_student_page/manage_student_page_provider.dart';
import '../manage_user_page/manage_user_page_provider.dart';
import '../widget/student_card_details.dart';
import '../widget/student_modal.dart';
import '../widget/user_card_details.dart';
import '../widget/user_modal.dart';
import 'admin_home_page_bloc.dart';
import 'admin_home_page_state.dart';

class AdminHomePageView extends StatelessWidget {
  const AdminHomePageView({Key? key}) : super(key: key);

  Widget _buildStudentCardView(BuildContext context, Student student) {
    return GestureDetector(
      onTap: () {
        studentNavigateToAnotherUI(context, student);
      },
      child: StudentCard(
        id: student.id!,
        studentName: student.name,
        studentDOB: student.dob,
      ),
    );
  }

  Widget _buildUserCardView(BuildContext context, User user) {
    return GestureDetector(
      onTap: () {
        userNavigateToAnotherUI(context, user);
      },
      child: UserCard(
        roleType: user.roleType,
        email: user.email,
        name: user.name,
        dob: user.dob,
      ),
    );
  }

  void studentNavigateToAnotherUI(BuildContext context, Student student) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => StudentMangeProvider(
          student: student,
        ),
      ),
    );
  }

  void userNavigateToAnotherUI(BuildContext context, User user) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => UserMangeProvider(
          user: user,
        ),
      ),
    );
  }

  Widget _buildAdminTabContent(BuildContext context) {
    return Stack(
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
                    builder: (context) => const UserPopupModal(),
                  );
                },
                child: Text(
                  "ADD NEW USER",
                  style: textButton,
                ),
              ),
              const SizedBox(height: 30),
              Expanded(
                child: SingleChildScrollView(
                  child: BlocBuilder<AdminHomePageBloc, AdminHomePageState>(
                    buildWhen: (previous, current) =>
                        previous.allUsers != current.allUsers,
                    builder: (context, state) {
                      final List<User> allUsers = state.allUsers;
                      return ListView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: allUsers.length,
                        itemBuilder: (context, index) {
                          final user = allUsers[index];
                          return _buildUserCardView(context, user);
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
    );
  }

  Widget _buildUsersTabContent(BuildContext context) {
    return Stack(
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
                    builder: (context) => const StudentPopupModal(),
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
                  child: BlocBuilder<AdminHomePageBloc, AdminHomePageState>(
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
    );
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          automaticallyImplyLeading: false,
          title: Text(
            "  Admin Home Page",
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontFamily: GoogleFonts.ubuntu().fontFamily,
            ),
          ),
          bottom: TabBar(
            labelStyle: textButton,
            tabs: const [
              Tab(
                text: "Users Manage",
              ),
              Tab(text: "Student Manage"),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            _buildAdminTabContent(context),
            _buildUsersTabContent(context),
          ],
        ),
      ),
    );
  }
}
