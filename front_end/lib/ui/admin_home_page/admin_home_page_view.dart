import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/models/student.dart';
import 'package:front_end/models/user.dart';
import 'package:front_end/ui/admin_home_page/admin_home_page_bloc.dart';
import 'package:front_end/ui/admin_home_page/admin_home_page_state.dart';
import 'package:front_end/ui/manage_student_page/manage_student_page_provider.dart';
import 'package:front_end/ui/manage_user_page/manage_user_page_provider.dart';
import 'package:front_end/ui/sign_in_page/sign_in_page_provider.dart';
import 'package:front_end/ui/widget/student_card.dart';
import 'package:front_end/ui/widget/student_manage_form.dart';
import 'package:front_end/ui/widget/user_card.dart';
import 'package:front_end/ui/widget/user_manage_form.dart';

class AdminHomeScreen extends StatefulWidget {
  const AdminHomeScreen({Key? key}) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _AdminHomeScreenState createState() => _AdminHomeScreenState();
}

class _AdminHomeScreenState extends State<AdminHomeScreen> {
  int _selectedIndex = 0;

  void _onItemTapped(int index) {
    if (_selectedIndex != index) {
      setState(() {
        _selectedIndex = index;
      });
    }
  }

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

  Widget _buildStudentsContent(BuildContext context) {
    return Stack(
      children: [
        Container(
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
      ],
    );
  }

  Widget _buildUserCardView(BuildContext context, User user) {
    return GestureDetector(
      onTap: () {
        navigateToManageUser(context, user);
      },
      child: UserCard(
        user: user,
      ),
    );
  }

  void navigateToManageUser(BuildContext context, User user) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => ManageUserScreenProvider(
          user: user,
        ),
      ),
    );
  }

  Widget _buildUsersContent(BuildContext context) {
    return Stack(
      children: [
        Container(
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
                      builder: (context) => const UserPopupModel(),
                    );
                  },
                  child: const Text(
                    '+ ADD NEW USER',
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
                        previous.userEntries != current.userEntries,
                    builder: (context, state) {
                      return Column(
                        children: state.userEntries
                            .map(
                              (entry) => _buildUserCardView(context, entry),
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
      ],
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
                MaterialPageRoute(builder: (context) => SignInPageProvider()),
              );
            },
          ),
        ],
      ),
      body: _selectedIndex == 0
          ? _buildUsersContent(context)
          : _buildStudentsContent(context),
      bottomNavigationBar: BottomNavigationBar(
        items: const [
          BottomNavigationBarItem(
            icon: Icon(
              Icons.people,
            ),
            label: 'Manage Users',
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.school,
            ),
            label: 'Manage Students',
          ),
        ],
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
        selectedItemColor: Colors.white,
        unselectedItemColor: Colors.grey[400],
        mouseCursor: SystemMouseCursors.click,
        backgroundColor: const Color.fromARGB(255, 169, 133, 231),
        elevation: 10.0,
        selectedIconTheme: const IconThemeData(size: 30.0),
        unselectedIconTheme: const IconThemeData(size: 25.0),
        selectedLabelStyle: const TextStyle(fontSize: 16.0),
        unselectedLabelStyle: const TextStyle(fontSize: 13.0),
      ),
    );
  }
}
