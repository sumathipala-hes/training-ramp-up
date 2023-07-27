import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/model/student.dart';
import 'package:frontend/ui/student_page/student_page_bloc.dart';
import 'package:frontend/ui/student_page/student_page_view.dart';

class StudentPageProvider extends StatelessWidget {
  final Student student;
  const StudentPageProvider({
    Key? key,
    required this.student,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => StudentPageBloc(),
      child: StudentPageView(
        student: student,
      ),
    );
  }
}
