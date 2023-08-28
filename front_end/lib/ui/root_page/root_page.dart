import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/ui/admin_home_page/admin_home_page_view.dart';
import 'package:front_end/ui/user_home_page/user_home_page_view.dart';
import 'package:front_end/ui/sign_in_page/sign_in_page_view.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../theme/primary_theme.dart';
import '../admin_home_page/admin_home_page_bloc.dart';
import '../user_home_page/user_home_page_bloc.dart';
import '../sign_in_page/sign_in_page_bloc.dart';

class RampUpApp extends StatelessWidget {
  const RampUpApp({Key? key, required this.isAuthenticate}) : super(key: key);

  final bool isAuthenticate;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<SharedPreferences>(
      future: SharedPreferences.getInstance(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const CircularProgressIndicator();
        } else if (snapshot.hasError) {
          return const Text('Error loading preferences');
        } else {
          final prefs = snapshot.data!;
          final roleType = prefs.getString('roleType');

          final homePage = isAuthenticate
              ? roleType == 'USER'
                  ? UserHomePageView()
                  : (roleType == 'ADMIN'
                      ? const AdminHomePageView()
                      : const SignInPageView())
              : const SignInPageView();

          return MultiBlocProvider(
            providers: [
              BlocProvider<UserHomePageBloc>(
                create: (context) => UserHomePageBloc(),
              ),
              BlocProvider<AdminHomePageBloc>(
                create: (context) => AdminHomePageBloc(context),
              ),
              BlocProvider<SignInPageBloc>(
                create: (context) => SignInPageBloc(context),
              ),
            ],
            child: MaterialApp(
              title: 'RampUp App',
              theme: appThemeData,
              debugShowCheckedModeBanner: false,
              home: homePage,
            ),
          );
        }
      },
    );
  }
}
