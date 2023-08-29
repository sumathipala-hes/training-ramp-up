import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/enum/role_enum.dart';
import 'package:frontend/model/user.dart';
import 'package:frontend/ui/theme/colors.dart';
import 'package:frontend/ui/user_home_page/user_home_page_bloc.dart';
import 'package:frontend/ui/user_home_page/user_home_page_event.dart';
import 'package:frontend/util/validation_util.dart';

class UserForm extends StatefulWidget {
  const UserForm({Key? key}) : super(key: key);

  @override
  State<UserForm> createState() => _UserFormState();
}

class _UserFormState extends State<UserForm> {
  String selectedItem = RoleEnum.user.toString().split('.').last;
  List<String> roles = [
    RoleEnum.admin.toString().split('.').last,
    RoleEnum.user.toString().split('.').last,
  ];
  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  bool isSaveButtonEnabled = false;

  String nameError = '';
  String emailError = '';
  String passwordError = '';

  @override
  Widget build(BuildContext context) {
    UserHomePageBloc userHomePageBloc =
        BlocProvider.of<UserHomePageBloc>(context);

    void validateTextFields(bool isValid, String textField) {
      setState(
        () {
          switch (textField) {
            case 'name':
              nameError = isValid ? '' : 'Invalid Name Ex. John Doe';
              break;
            case 'email':
              emailError = isValid ? '' : 'Invalid email Ex. abc@xyz.com';
              break;
            case 'password':
              passwordError = isValid ? '' : 'Invalid Password';
              break;
          }
          isSaveButtonEnabled =
              nameError == '' && emailError == '' && passwordError == '';
        },
      );
    }

    return Dialog(
      backgroundColor: Colors.transparent,
      child: SingleChildScrollView(
        child: Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20.0),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const Text(
                  'Add New User',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 26,
                    fontWeight: FontWeight.bold,
                    color: AppColors.mainColor,
                  ),
                ),
                const SizedBox(height: 20),
                TextField(
                  controller: nameController,
                  decoration: const InputDecoration(
                    border: UnderlineInputBorder(),
                    labelText: 'Full Name',
                    hintText: 'Enter the Name',
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
                Text(
                  nameError,
                  style: const TextStyle(
                    color: AppColors.errorColor,
                  ),
                ),
                const SizedBox(
                  height: 20,
                ),
                TextField(
                  controller: emailController,
                  decoration: const InputDecoration(
                    border: UnderlineInputBorder(),
                    labelText: 'Email',
                    hintText: 'Enter the Email',
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
                Text(
                  emailError,
                  style: const TextStyle(
                    color: AppColors.errorColor,
                  ),
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
                    hintText: 'Enter the Password',
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
                Text(
                  passwordError,
                  style: const TextStyle(
                    color: AppColors.errorColor,
                  ),
                ),
                const SizedBox(
                  height: 20,
                ),
                SizedBox(
                  width: MediaQuery.of(context).size.width * 0.9,
                  child: DropdownButton<String>(
                    value: selectedItem,
                    onChanged: (newValue) {
                      setState(() {
                        selectedItem = newValue!;
                      });
                    },
                    items: roles.map((String role) {
                      return DropdownMenuItem<String>(
                        value: role,
                        child: Text(role.toUpperCase()),
                      );
                    }).toList(),
                  ),
                ),
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
                        },
                        child: const Text('CANCEL'),
                      ),
                    ),
                    SizedBox(
                      width: MediaQuery.of(context).size.width * 0.25,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.successColor,
                        ),
                        onPressed: isSaveButtonEnabled
                            ? () {
                                userHomePageBloc.add(
                                  SaveUserEvent(
                                    user: User(
                                      name: nameController.text,
                                      email: emailController.text,
                                      password: passwordController.text,
                                      role: selectedItem,
                                    ),
                                  ),
                                );
                              }
                            : null,
                        child: const Text('SAVE'),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
