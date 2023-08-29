import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/model/user.dart';
import 'package:frontend/ui/manage_user_page/manage_user_page_bloc.dart';
import 'package:frontend/ui/manage_user_page/manage_user_page_view.dart';

class ManageUserPageProvider extends BlocProvider<ManageUserPageBloc> {
  final User user;
  ManageUserPageProvider({
    Key? key,
    required this.user,
  }) : super(
          key: key,
          create: (context) => ManageUserPageBloc(),
          child: ManageUserPageView(
            user: user,
          ),
        );
}
