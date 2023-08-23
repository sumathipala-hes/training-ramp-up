import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/ui/register_page/register_page_bloc.dart';
import 'package:frontend/ui/register_page/register_page_view.dart';

class RegisterPageProvider extends BlocProvider<RegisterPageBloc> {
  RegisterPageProvider({
    Key? key,
  }) : super(
          key: key,
          create: (context) => RegisterPageBloc(),
          child: const RegisterPageView(),
        );
}
