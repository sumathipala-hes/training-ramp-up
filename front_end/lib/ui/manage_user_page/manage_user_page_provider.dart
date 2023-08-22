import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../model/user_model.dart';
import 'manage_user_page_bloc.dart';
import 'manage_user_page_view.dart';

class UserMangeProvider extends StatelessWidget {
  final User? user;
  const UserMangeProvider({Key? key, this.user}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => UserManageBloc(),
      child: UserMangeView(
        user: user!,
      ),
    );
  }
}
