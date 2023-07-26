import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/models/student.dart';
import 'package:front_end/ui/manage_student_page/manage_student_page_bloc.dart';
import 'package:front_end/ui/manage_student_page/manage_student_page_view.dart';

class ManageStudentScreenProvider extends BlocProvider<ManageStudentScreenBloc> {
  final Student student;
  ManageStudentScreenProvider({
    Key? key, required this.student,
  }) : super(
          key: key,
          create: (context) => ManageStudentScreenBloc(context),
          child: ManageStudentScreen(student: student),
        );
}
