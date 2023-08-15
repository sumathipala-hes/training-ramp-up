import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/model/student.dart';
import 'package:frontend/ui/home_page/home_page_bloc.dart';
import 'package:frontend/ui/home_page/home_page_state.dart';
import 'package:frontend/ui/widget/student_form.dart';
import '../widget/student_card.dart';

class HomePageView extends StatelessWidget {
  const HomePageView({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ramp Up'),
        toolbarHeight: MediaQuery.of(context).size.height * 0.1,
        backgroundColor: Colors.black87,
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
              SizedBox(
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
                    padding: EdgeInsetsDirectional.fromSTEB(20, 10, 20, 10),
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
              ),
              const SizedBox(
                height: 50,
              ),
              BlocBuilder<HomePageBloc, HomePageState>(
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
