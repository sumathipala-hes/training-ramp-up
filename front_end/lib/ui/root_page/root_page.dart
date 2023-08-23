import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../theme/primary_theme.dart';
import '../admin_home_page/admin_home_page_bloc.dart';
import '../sign_in_page/sign_in_page_provider.dart';

class RampUpApp extends StatelessWidget {
  const RampUpApp({super.key});

  @override
  Widget build(BuildContext context) {
    final materialApp = MaterialApp(
      title: 'RampUp App',
      theme: appThemeData,
      debugShowCheckedModeBanner: false,
      home: SignInPageProvider(),
    );

    return BlocProvider(
      create: (context) => AdminHomePageBloc(context),
      child: materialApp,
    );
  }
}
