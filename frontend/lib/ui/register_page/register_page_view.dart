import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/enum/role_enum.dart';
import 'package:frontend/model/user.dart';
import 'package:frontend/ui/register_page/register_page_bloc.dart';
import 'package:frontend/ui/register_page/register_page_event.dart';
import 'package:frontend/ui/register_page/register_page_state.dart';
import 'package:frontend/ui/sign_in_page/sign_in_page_provider.dart';
import 'package:frontend/ui/theme/colors.dart';
import 'package:frontend/util/validation_util.dart';

class RegisterPageView extends StatelessWidget {
  RegisterPageView({super.key});
  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    RegisterPageBloc registerPageBloc =
        BlocProvider.of<RegisterPageBloc>(context);

    void validateTextFields(bool isValid, String textField) {
      String nameError = '';
      String emailError = '';
      String passwordError = '';
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
      registerPageBloc.add(
        SetValidations(
          nameError: nameError,
          emailError: emailError,
          passwordError: passwordError,
        ),
      );
    }

    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage(
                'assets/images/sign-in-image.jpg',
              ),
              fit: BoxFit.cover,
            ),
          ),
          alignment: Alignment.center,
          child: Center(
            child: SizedBox(
              width: MediaQuery.of(context).size.width * 0.9,
              height: MediaQuery.of(context).size.height * 1,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'REGISTER',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 40,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  TextField(
                    controller: nameController,
                    decoration: const InputDecoration(
                      hintText: 'Full Name',
                      hintStyle: TextStyle(
                        color: Colors.white,
                      ),
                      filled: true,
                      fillColor: Color.fromARGB(70, 0, 0, 0),
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.all(
                          Radius.circular(40),
                        ),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.all(
                          Radius.circular(40),
                        ),
                      ),
                    ),
                    style: const TextStyle(
                      color: Colors.white,
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
                  const SizedBox(
                    height: 20,
                  ),
                  BlocBuilder<RegisterPageBloc, RegisterPageState>(
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
                  TextField(
                    controller: emailController,
                    decoration: const InputDecoration(
                      hintText: 'Email',
                      hintStyle: TextStyle(
                        color: Colors.white,
                      ),
                      filled: true,
                      fillColor: Color.fromARGB(70, 0, 0, 0),
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.all(
                          Radius.circular(40),
                        ),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.all(
                          Radius.circular(40),
                        ),
                      ),
                    ),
                    style: const TextStyle(
                      color: Colors.white,
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
                  BlocBuilder<RegisterPageBloc, RegisterPageState>(
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
                      hintText: 'Password',
                      hintStyle: TextStyle(
                        color: Colors.white,
                      ),
                      filled: true,
                      fillColor: Color.fromARGB(70, 0, 0, 0),
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.all(
                          Radius.circular(40),
                        ),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.all(
                          Radius.circular(40),
                        ),
                      ),
                    ),
                    style: const TextStyle(
                      color: Colors.white,
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
                  BlocBuilder<RegisterPageBloc, RegisterPageState>(
                    buildWhen: (previous, current) =>
                        current.passwordError != previous.passwordError,
                    builder: (context, state) {
                      return Text(
                        state.passwordError,
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
                    controller: confirmController,
                    obscureText: true,
                    decoration: const InputDecoration(
                      hintText: 'Confirm Password',
                      hintStyle: TextStyle(
                        color: Colors.white,
                      ),
                      filled: true,
                      fillColor: Color.fromARGB(70, 0, 0, 0),
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.all(
                          Radius.circular(40),
                        ),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.all(
                          Radius.circular(40),
                        ),
                      ),
                    ),
                    style: const TextStyle(
                      color: Colors.white,
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
                  BlocBuilder<RegisterPageBloc, RegisterPageState>(
                    buildWhen: (previous, current) =>
                        current.passwordError != previous.passwordError,
                    builder: (context, state) {
                      return Text(
                        state.passwordError,
                        style: const TextStyle(
                          color: AppColors.errorColor,
                        ),
                      );
                    },
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.9,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(40),
                        ),
                        backgroundColor: Colors.white,
                      ),
                      onPressed: () async {
                        registerPageBloc.add(
                          RegisterUserEvent(
                            user: User(
                              name: nameController.text,
                              email: emailController.text,
                              password: passwordController.text,
                              role: RoleEnum.user.toString(),
                            ),
                            confirmPassword: confirmController.text,
                          ),
                        );
                        if (registerPageBloc.state.nameError == '' &&
                            registerPageBloc.state.emailError == '' &&
                            registerPageBloc.state.passwordError == '') {
                          Navigator.of(context).pop();
                          registerPageBloc.add(
                            RegisterUserEvent(
                              user: User(
                                name: nameController.text,
                                email: emailController.text,
                                password: passwordController.text,
                                role: RoleEnum.user.toString().split('.').last,
                              ),
                              confirmPassword: confirmController.text,
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
                      child: const Padding(
                        padding: EdgeInsetsDirectional.fromSTEB(20, 10, 20, 10),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.person_add,
                              color: Colors.black87,
                            ),
                            SizedBox(
                              width: 10,
                            ),
                            Text(
                              'Sign Up',
                              style: TextStyle(
                                color: Colors.black87,
                                fontSize: 20,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 40,
                  ),
                  const Text(
                    'Already have an account?',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.9,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(40),
                        ),
                        backgroundColor: Colors.black87,
                      ),
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => SignInPageProvider(),
                          ),
                        );
                      },
                      child: const Padding(
                        padding: EdgeInsetsDirectional.fromSTEB(20, 10, 20, 10),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.login,
                              color: Colors.white,
                            ),
                            SizedBox(
                              width: 10,
                            ),
                            Text(
                              'Login',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 20,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
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
