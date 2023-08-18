import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/ui/sign_in_page/sign_in_page_bloc.dart';
import 'package:frontend/ui/sign_in_page/sign_in_page_view.dart';

class SignInPageProvider extends StatelessWidget {
  const SignInPageProvider({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => SignInPageBloc(context),
      child: const SignInPageView(),
    );
  }
}
