import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/ui/admin_home_page/admin_home_page_bloc.dart';
import 'package:front_end/ui/admin_home_page/admin_home_page_view.dart';

class AdminHomeScreenProvider extends BlocProvider<AdminHomeScreenBloc> {
  AdminHomeScreenProvider({
    Key? key,
  }) : super(
          key: key,
          create: (context) => AdminHomeScreenBloc(context),
          child: const AdminHomeScreen(),
        );
}
