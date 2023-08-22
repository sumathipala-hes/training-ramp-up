import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/ui/register_page/register_page_bloc.dart';
import 'package:front_end/ui/register_page/register_page_view.dart';

class RegisterScreenProvider extends StatelessWidget {
  const RegisterScreenProvider({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => RegisterScreenBloc(context),
      child: RegisterScreen(),
    );
  }
}
