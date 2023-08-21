import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../model/student_model.dart';
import '../../model/user_model.dart';
import 'manage_student_page_bloc.dart';
import 'manage_student_page_view.dart';

class StudentMangeProvider extends StatelessWidget {
  final Student? student;
  final User? user;
  const StudentMangeProvider({Key? key, this.student, this.user})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => StudentManageBloc(),
      child: StudentMangeView(
        student: student!,
        user: user!,
      ),
    );
  }
}
