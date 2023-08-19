import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../model/student_model.dart';
import 'manage_student_page_bloc.dart';
import 'manage_student_page_view.dart';

class StudentMangeProvider extends StatelessWidget {
  final Student student;
  const StudentMangeProvider({Key? key, required this.student})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => StudentManageBloc(),
      child: StudentMangeView(
        student: student,
      ),
    );
  }
}
