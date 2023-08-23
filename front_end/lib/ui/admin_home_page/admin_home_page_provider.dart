import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'admin_home_page_bloc.dart';
import 'admin_home_page_view.dart';

class AdminHomePageProvider extends BlocProvider<AdminHomePageBloc> {
  AdminHomePageProvider({
    Key? key,
  }) : super(
          key: key,
          create: (context) => AdminHomePageBloc(context),
          child: const AdminHomePageView(),
        );
}
