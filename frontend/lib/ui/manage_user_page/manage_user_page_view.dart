import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/enum/role_enum.dart';
import 'package:frontend/model/user.dart';
import 'package:frontend/ui/manage_user_page/manage_user_page_bloc.dart';
import 'package:frontend/ui/manage_user_page/manage_user_page_event.dart';
import 'package:frontend/ui/manage_user_page/manage_user_page_state.dart';
import 'package:frontend/ui/sign_in_page/sign_in_page_provider.dart';
import 'package:frontend/ui/user_home_page/user_home_page_bloc.dart';
import 'package:frontend/ui/user_home_page/user_home_page_event.dart';
import 'package:frontend/util/validation_util.dart';
import '../theme/colors.dart';

class ManageUserPageView extends StatelessWidget {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  ManageUserPageView({
    super.key,
    required this.user,
  }) {
    nameController.text = user.name;
    emailController.text = user.email;
    passwordController.text = user.password;
  }

  final User user;
  final List<String> roles = [
    RoleEnum.admin.toString().split('.').last,
    RoleEnum.user.toString().split('.').last
  ];

  @override
  Widget build(BuildContext context) {
    ManageUserPageBloc userPageBloc =
        BlocProvider.of<ManageUserPageBloc>(context);
    UserHomePageBloc homePageBloc = BlocProvider.of<UserHomePageBloc>(context);

    void validateTextFields(bool isValid, String textField) {
      String nameError = userPageBloc.state.nameError;
      String emailError = userPageBloc.state.emailError;
      String passwordError = userPageBloc.state.passwordError;
      switch (textField) {
        case 'name':
          nameError = isValid ? '' : 'Invalid Name Ex. John Doe';
          break;
        case 'email':
          emailError = isValid ? '' : 'Invalid Email Ex. abc@xyz.com';
          break;
        case 'password':
          passwordError = isValid ? '' : 'Password is Not Strong';
          break;
      }
      userPageBloc.add(
        SetValidations(
          nameError: nameError,
          emailError: emailError,
          passwordError: passwordError,
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.mainColor,
        elevation: 4,
        title: const Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Manage User',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 22,
                color: Colors.white,
              ),
            ),
          ],
        ),
        toolbarHeight: MediaQuery.of(context).size.height * 0.1,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              homePageBloc.add(
                SignOutEvent(),
              );
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => SignInPageProvider(),
                ),
              );
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 40, 20, 40),
          child: Card(
            elevation: 4,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20.0),
            ),
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 40, 20, 40),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    user.name,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 26,
                      fontWeight: FontWeight.bold,
                      color: AppColors.mainColor,
                    ),
                  ),
                  const SizedBox(
                    height: 4,
                  ),
                  Text(
                    user.email,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 16,
                    ),
                  ),
                  const SizedBox(
                    height: 4,
                  ),
                  Text(
                    user.role.toUpperCase(),
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 12,
                      color: Colors.black54,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  TextField(
                    controller: nameController,
                    decoration: const InputDecoration(
                      border: UnderlineInputBorder(),
                      labelText: 'Name',
                      hintText: 'Enter Full Name',
                    ),
                    onChanged: (value) {
                      validateTextFields(
                        ValidationUtil.isValidExp(
                          ValidationUtil.nameRegExp,
                          value,
                        ),
                        'name',
                      );
                    },
                  ),
                  BlocBuilder<ManageUserPageBloc, ManageUserPageState>(
                    buildWhen: (previous, current) =>
                        current.nameError != previous.nameError,
                    builder: (context, state) {
                      return Text(
                        state.nameError,
                        style: const TextStyle(
                          color: AppColors.errorColor,
                        ),
                      );
                    },
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  TextField(
                    controller: emailController,
                    decoration: const InputDecoration(
                      border: UnderlineInputBorder(),
                      labelText: 'Email',
                      hintText: 'Enter Email',
                    ),
                    onChanged: (value) {
                      validateTextFields(
                        ValidationUtil.isValidExp(
                          ValidationUtil.emailRegExp,
                          value,
                        ),
                        'email',
                      );
                    },
                  ),
                  BlocBuilder<ManageUserPageBloc, ManageUserPageState>(
                    buildWhen: (previous, current) =>
                        current.emailError != previous.emailError,
                    builder: (context, state) {
                      return Text(
                        state.emailError,
                        style: const TextStyle(
                          color: AppColors.errorColor,
                        ),
                      );
                    },
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  TextField(
                    controller: passwordController,
                    obscureText: true,
                    decoration: const InputDecoration(
                      border: UnderlineInputBorder(),
                      labelText: 'Password',
                      hintText: 'Enter Password',
                    ),
                    onChanged: (value) {
                      validateTextFields(
                        ValidationUtil.isValidExp(
                          ValidationUtil.passwordRegExp,
                          value,
                        ),
                        'password',
                      );
                    },
                  ),
                  BlocBuilder<ManageUserPageBloc, ManageUserPageState>(
                    buildWhen: (previous, current) =>
                        current.passwordError != previous.passwordError,
                    builder: (context, state) {
                      return Text(
                        state.nameError,
                        style: const TextStyle(
                          color: AppColors.errorColor,
                        ),
                      );
                    },
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  BlocBuilder<ManageUserPageBloc, ManageUserPageState>(
                      buildWhen: (previous, current) =>
                          current.role != previous.role,
                      builder: (context, state) {
                        return SizedBox(
                          width: MediaQuery.of(context).size.width * 0.9,
                          child: DropdownButton<String>(
                            value: state.role,
                            onChanged: (newValue) {
                              userPageBloc.add(SetRoleEvent(role: newValue!));
                            },
                            items: roles.map((String role) {
                              return DropdownMenuItem<String>(
                                value: role,
                                child: Text(role.toUpperCase()),
                              );
                            }).toList(),
                          ),
                        );
                      }),
                  const SizedBox(
                    height: 20,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      SizedBox(
                        width: MediaQuery.of(context).size.width * 0.25,
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.errorColor,
                          ),
                          onPressed: () {
                            Navigator.of(context).pop();
                            homePageBloc.add(
                              DeleteUserEvent(
                                email: user.email,
                              ),
                            );
                          },
                          child: const Text('DELETE'),
                        ),
                      ),
                      SizedBox(
                        width: MediaQuery.of(context).size.width * 0.25,
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.successColor,
                          ),
                          onPressed: () async {
                            if (userPageBloc.state.nameError == '' &&
                                userPageBloc.state.emailError == '' &&
                                userPageBloc.state.passwordError == '') {
                              Navigator.of(context).pop();
                              homePageBloc.add(
                                UpdateUserEvent(
                                  user: User(
                                    name: nameController.text,
                                    email: emailController.text,
                                    password: passwordController.text,
                                    role: userPageBloc.state.role,
                                  ),
                                ),
                              );
                              return;
                            }
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text(
                                  'Please Check Details Again..!',
                                  textAlign: TextAlign.center,
                                ),
                                backgroundColor: AppColors.errorColor,
                              ),
                            );
                          },
                          child: const Text('UPDATE'),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
