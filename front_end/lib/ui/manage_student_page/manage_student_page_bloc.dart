import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/ui/manage_student_page/manage_student_page_event.dart';
import 'package:front_end/ui/manage_student_page/manage_student_page_state.dart';

class ManageStudentScreenBloc
    extends Bloc<ManageStudentScreenEvent, ManageStudentScreenState> {
  ManageStudentScreenBloc(BuildContext context)
      : super(ManageStudentScreenState());
}
