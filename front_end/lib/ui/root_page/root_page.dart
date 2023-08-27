import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/theme/primary_theme.dart';
import 'package:front_end/ui/admin_home_page/admin_home_page_bloc.dart';
import 'package:front_end/ui/sign_in_page/sign_in_page_provider.dart';
import 'package:front_end/ui/user_home_page/user_home_page_bloc.dart';

import '../sign_in_page/sign_in_page_bloc.dart';

class RampUpApp extends StatelessWidget {
  const RampUpApp({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final materialApp = MaterialApp(
      title: 'RampUp App',
      theme: PrimaryTheme.generateTheme(context),
      debugShowCheckedModeBanner: false,
      home: SignInPageProvider(),
    );

    return MultiBlocProvider(
      providers: [
        BlocProvider<AdminHomeScreenBloc>(
          create: (context) => AdminHomeScreenBloc(context),
        ),
        BlocProvider<UserHomeScreenBloc>(
          create: (context) => UserHomeScreenBloc(context),
        ),
        BlocProvider<SignInPageScreenBloc>(
          create: (context) => SignInPageScreenBloc(),
        ),
      ],
      child: materialApp,
    );
  }
}
