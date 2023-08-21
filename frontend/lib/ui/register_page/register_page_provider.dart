import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/ui/register_page/register_page_bloc.dart';
import 'package:frontend/ui/register_page/register_page_view.dart';

class RegisterPageProvider extends StatelessWidget {
  const RegisterPageProvider({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => RegisterPageBloc(),
      child: const RegisterPageView(),
    );
  }
}
