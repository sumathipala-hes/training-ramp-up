import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/models/user.dart';
import 'package:front_end/ui/manage_user_page/manage_user_page_bloc.dart';
import 'package:front_end/ui/manage_user_page/manage_user_page_view.dart';

class ManageUserScreenProvider extends BlocProvider<ManageUserScreenBloc> {
  final User user;
  ManageUserScreenProvider({
    Key? key, required this.user,
  }) : super(
          key: key,
          create: (context) => ManageUserScreenBloc(context),
          child: ManageUserScreen(user: user),
        );
}
