import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/enum/role_enum.dart';
import 'package:frontend/model/student.dart';
import 'package:frontend/ui/sign_in_page/sign_in_page_provider.dart';
import 'package:frontend/ui/student_home_page/student_home_page_bloc.dart';
import 'package:frontend/ui/student_home_page/student_home_page_state.dart';
import 'package:frontend/ui/user_home_page/user_home_page_bloc.dart';
import 'package:frontend/ui/user_home_page/user_home_page_event.dart';
import 'package:frontend/ui/widget/student_form.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../widget/student_card.dart';

class StudentHomePageView extends StatelessWidget {
  const StudentHomePageView({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    UserHomePageBloc userHomePageBloc =
        BlocProvider.of<UserHomePageBloc>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Ramp Up'),
        toolbarHeight: MediaQuery.of(context).size.height * 0.1,
        backgroundColor: Colors.black87,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              userHomePageBloc.add(
                SignOutEvent(),
              );
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => SignInPageProvider(),
                ),
              );
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Container(
          height: MediaQuery.of(context).size.height,
          width: double.infinity,
          alignment: Alignment.center,
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage(
                'assets/images/background.jpg',
              ),
              fit: BoxFit.cover,
            ),
          ),
          padding: const EdgeInsetsDirectional.fromSTEB(10, 20, 10, 20),
          child: Column(
            children: [
              FutureBuilder<SharedPreferences>(
                future: SharedPreferences.getInstance(),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const CircularProgressIndicator();
                  }

                  final sharedPreferences = snapshot.data;
                  final userRole = sharedPreferences?.getString('role');

                  if (userRole ==
                      RoleEnum.admin.toString().split('.').last.toLowerCase()) {
                    return SizedBox(
                      width: MediaQuery.of(context).size.width * 0.9,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(40),
                          ),
                          backgroundColor: Colors.black87,
                        ),
                        onPressed: () {
                          showDialog(
                            context: context,
                            builder: (context) {
                              return const StudentForm();
                            },
                          );
                        },
                        child: const Padding(
                          padding:
                              EdgeInsetsDirectional.fromSTEB(20, 10, 20, 10),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.add,
                                color: Colors.white,
                              ),
                              SizedBox(
                                width: 10,
                              ),
                              Text(
                                "Add Student",
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.normal,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    );
                  } else {
                    return Container();
                  }
                },
              ),
              const SizedBox(
                height: 50,
              ),
              BlocBuilder<StudentHomePageBloc, StudentHomePageState>(
                buildWhen: (
                  previous,
                  current,
                ) =>
                    current.students != previous.students,
                builder: (
                  context,
                  state,
                ) {
                  final List<Student> studentList = state.students;
                  return SizedBox(
                    height: MediaQuery.of(context).size.height * 0.58,
                    child: ListView.builder(
                      shrinkWrap: true,
                      itemCount: studentList.length,
                      itemBuilder: (
                        context,
                        index,
                      ) {
                        return StudentCard(
                          student: studentList[index],
                        );
                      },
                    ),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
