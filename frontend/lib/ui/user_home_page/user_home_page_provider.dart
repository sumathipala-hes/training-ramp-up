import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/ui/user_home_page/user_home_page_bloc.dart';
import 'package:frontend/ui/user_home_page/user_home_page_view.dart';

class UserHomePageProvider extends StatelessWidget {
  const UserHomePageProvider({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => UserHomePageBloc(),
      child: const UserHomePageView(),
    );
  }
}
