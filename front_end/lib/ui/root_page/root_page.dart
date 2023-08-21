import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/ui/admin_home_page/admin_home_page_view.dart';

import '../../theme/primary_theme.dart';
import '../admin_home_page/admin_home_page_bloc.dart';

class RampUpApp extends StatelessWidget {
  const RampUpApp({super.key});

  @override
  Widget build(BuildContext context) {
    final materialApp = MaterialApp(
      title: 'RampUp App',
      theme: appThemeData,
      debugShowCheckedModeBanner: false,
      // home: const SignInPageProvider(),
      home:  const AdminHomePageView(),
    );

    return BlocProvider(
      create: (context) => AdminHomePageBloc(context),
      child: materialApp,
    );
  }
}
