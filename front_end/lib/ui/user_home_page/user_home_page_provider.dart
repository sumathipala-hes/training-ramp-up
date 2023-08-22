import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/ui/user_home_page/user_home_page_bloc.dart';
import 'package:front_end/ui/user_home_page/user_home_page_view.dart';

class UserHomeScreenProvider extends BlocProvider<UserHomeScreenBloc> {
  UserHomeScreenProvider({
    Key? key,
  }) : super(
          key: key,
          create: (context) => UserHomeScreenBloc(context),
          child: const UserHomeScreen(),
        );
}
