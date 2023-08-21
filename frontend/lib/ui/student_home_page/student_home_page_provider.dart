import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/ui/student_home_page/student_home_page_bloc.dart';
import 'package:frontend/ui/student_home_page/student_home_page_view.dart';

class StudentHomePageProvider extends StatelessWidget {
  const StudentHomePageProvider({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => StudentHomePageBloc(context),
      child: const StudentHomePageView(),
    );
  }
}
