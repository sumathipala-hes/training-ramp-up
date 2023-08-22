import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/ui/sign_in_page/sign_in_page_bloc.dart';
import 'package:front_end/ui/sign_in_page/sign_in_page_view.dart';


class SignInPageProvider extends StatelessWidget {
  const SignInPageProvider({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => SignInPageScreenBloc(),
      child: const SignInPageScreen(),
    );
  }
}
