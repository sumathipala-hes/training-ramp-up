import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/ui/admin_home_page/admin_home_page_view.dart';
import 'package:front_end/ui/user_home_page/user_home_page_view.dart';
import 'package:front_end/ui/sign_in_page/sign_in_page_view.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../theme/primary_theme.dart';
import '../../util/notification_util.dart';
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
        if (snapshot.hasError) {
          showFieldError("Error: ${snapshot.error}");
          return const Text('Error loading preferences');
        } else {
          final prefs = snapshot.data!;
          final roleType = prefs.getString('roleType');

          Widget homePage;
          if (isAuthenticate) {
            if (roleType == 'USER') {
              homePage = UserHomePageView();
            } else if (roleType == 'ADMIN') {
              homePage = const AdminHomePageView();
            } else {
              homePage = const SignInPageView();
            }
          } else {
            homePage = const SignInPageView();
          }

          final materialApp = MaterialApp(
            title: 'RampUp App',
            theme: appThemeData,
            debugShowCheckedModeBanner: false,
            home: homePage,
          );

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
            child: materialApp,
          );
        }
      },
    );
  }
}
