import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../theme/primary_theme.dart';
import '../home_page/home_page_bloc.dart';
import '../sign_in_page/sign_in_page_provider.dart';
import '../sign_up_page/sign_up_page_provider.dart';

class RampUpApp extends StatelessWidget {
  const RampUpApp({super.key});

  @override
  Widget build(BuildContext context) {
    final materialApp = MaterialApp(
      title: 'RampUp App',
      theme: appThemeData,
      debugShowCheckedModeBanner: false,
      // home: const SignInPageProvider(),
      home: const SignUpPageProvider(),
    );

    return BlocProvider(
      create: (context) => HomePageBloc(context),
      child: materialApp,
    );
  }
}
