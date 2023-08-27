import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/ui/admin_home_page/admin_home_page_view.dart';
import 'package:front_end/ui/register_page/register_page_provider.dart';
import 'package:front_end/ui/sign_in_page/sign_in_page_bloc.dart';
import 'package:front_end/ui/sign_in_page/sign_in_page_event.dart';
import 'package:front_end/ui/sign_in_page/sign_in_page_provider.dart';
import 'package:front_end/ui/user_home_page/user_home_page_bloc.dart';
import 'package:front_end/ui/user_home_page/user_home_page_event.dart';
import 'package:front_end/ui/user_home_page/user_home_page_view.dart';
import 'package:front_end/util/encrypted_decrypted_util.dart';
import 'package:logger/logger.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SignInPageScreen extends StatelessWidget {
  SignInPageScreen({Key? key}) : super(key: key);

  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  void _signInForm(context) async {
    UserHomeScreenBloc block = BlocProvider.of<UserHomeScreenBloc>(context);

    final email = emailController.text.trim();
    final password = passwordController.text.trim();

    if (email.isEmpty || password.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Please fill all the fields"),
        ),
      );
    } else if (!RegExp(r'^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$').hasMatch(
      emailController.text.trim(),
    )) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Invalid Email."),
        ),
      );
    } else if (password.length < 8) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text(
              "Password must be at least 8 characters Or check your password."),
        ),
      );
    } else {
      Navigator.of(context).pop();
      SignInPageScreenBloc bloc =
          BlocProvider.of<SignInPageScreenBloc>(context);
      String encriptedPassword = PasswordEncryption.encryptPassword(
        passwordController.text.trim(),
      );
      bloc.add(
        Login(
          userEmail: emailController.text,
          userPassword: encriptedPassword,
        ),
      );

      final prefs = await SharedPreferences.getInstance();
      final role = prefs.getString('role');

      Logger().e(role);

      print(role);
      role == "ADMIN"
          ? Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => const AdminHomeScreen(),
              ),
            )
          : role == "USER"
              ? Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const UserHomeScreen(),
                  ),
                )
              : Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => SignInPageProvider(),
                  ),
                );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/img/background.jpg'),
            fit: BoxFit.cover,
          ),
        ),
        child: Center(
          child: SingleChildScrollView(
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 5, sigmaY: 5),
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Card(
                  color: Colors.white.withOpacity(0.8),
                  elevation: 5,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20.0),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(10.0),
                    child: Column(
                      children: [
                        const SizedBox(height: 10),
                        const Text(
                          'SIGN IN ',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 35,
                            fontWeight: FontWeight.bold,
                            color: Color.fromRGBO(137, 91, 215, 0.8),
                          ),
                        ),
                        const SizedBox(height: 35),
                        TextField(
                          controller: emailController,
                          decoration: const InputDecoration(
                            labelText: "Email :",
                            prefixIcon: Icon(Icons.email),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.all(
                                Radius.circular(8.0),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 25.0),
                        TextField(
                          controller: passwordController,
                          decoration: const InputDecoration(
                            labelText: "Password :",
                            prefixIcon: Icon(Icons.lock),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.all(
                                Radius.circular(8.0),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 25.0),
                        SizedBox(
                          width: double.infinity,
                          height: MediaQuery.of(context).size.height * 0.05,
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.deepPurple[400],
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(15.0),
                              ),
                            ),
                            onPressed: () {
                              _signInForm(context);
                            },
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Text(
                                  'Sign In '.toUpperCase(),
                                  style: const TextStyle(
                                    fontWeight: FontWeight.w400,
                                  ),
                                ),
                                const Icon(
                                  Icons.arrow_forward,
                                  color: Colors.white,
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(height: 30.0),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              'Don\'t have an account ? ',
                              style: TextStyle(
                                fontSize: 15.0,
                                fontWeight: FontWeight.bold,
                                color: Colors.black.withOpacity(0.6),
                              ),
                            ),
                            TextButton(
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) =>
                                          RegisterScreenProvider()),
                                );
                              },
                              child: Text(
                                'Sign up'.toUpperCase(),
                                style: TextStyle(
                                  fontSize: 16.0,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.deepPurple[400],
                                ),
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
          ),
        ),
      ),
    );
  }
}
