import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/ui/widget/student_form/student_form_bloc.dart';
import 'package:frontend/ui/widget/student_form/student_form_view.dart';

class StudentFormProvider extends StatelessWidget {
  const StudentFormProvider({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => StudentFormBloc(),
      child: const StudentFormView(),
    );
  }
}
