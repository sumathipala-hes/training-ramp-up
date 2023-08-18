import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'login_page_bloc.dart';
import 'login_page_view.dart';

class LoginPageProvider extends StatelessWidget {
  const LoginPageProvider({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => LoginPageBloc(),
      child: const LoginPageView(),
    );
  }
}
