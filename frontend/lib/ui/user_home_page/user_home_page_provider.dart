import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/ui/user_home_page/user_home_page_bloc.dart';
import 'package:frontend/ui/user_home_page/user_home_page_view.dart';

class UserHomePageProvider extends BlocProvider<UserHomePageBloc> {
  UserHomePageProvider({Key? key})
      : super(
          key: key,
          create: (context) => UserHomePageBloc(context),
          child: const UserHomePageView(),
        );
}
