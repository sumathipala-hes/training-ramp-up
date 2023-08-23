import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'sign_up_page_bloc.dart';
import 'sign_up_page_view.dart';

class SignUpPageProvider extends BlocProvider<SignUpPageBloc> {
  SignUpPageProvider({Key? key})
      : super(
          key: key,
          create: (context) => SignUpPageBloc(),
          child: SignUpPageView(),
        );
}
