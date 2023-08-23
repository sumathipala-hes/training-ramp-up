import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/model/student.dart';
import 'package:frontend/ui/manage_student_page/manage_student_page_bloc.dart';
import 'package:frontend/ui/manage_student_page/manage_student_page_view.dart';

class StudentPageProvider extends BlocProvider<ManageStudentPageBloc> {
  final Student student;
  StudentPageProvider({
    Key? key,
    required this.student,
  }) : super(
          key: key,
          create: (context) => ManageStudentPageBloc(),
          child: ManageStudentPageView(
            student: student,
          ),
        );
}
