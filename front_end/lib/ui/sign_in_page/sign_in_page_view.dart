import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/ui/admin_home_page/admin_home_page_view.dart';
import 'package:front_end/ui/sign_in_page/sign_in_page_bloc.dart';
import 'package:front_end/ui/sign_in_page/sign_in_page_event.dart';
import 'package:front_end/ui/sign_up_page/sign_up_page_provider.dart';
import 'package:front_end/ui/user_home_page/user_home_page_provider.dart';
import 'package:front_end/util/local_storage.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../enum/role_type_enum.dart';
import '../../theme/primary_theme.dart';
import '../../util/notification_util.dart';
import '../../util/validation_utils.dart';

class SignInPageView extends StatelessWidget {
  const SignInPageView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final TextEditingController emailController = TextEditingController();
    final TextEditingController passwordController = TextEditingController();
    SignInPageBloc signInPageBloc = BlocProvider.of<SignInPageBloc>(context);

    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/images/bg.png'),
            fit: BoxFit.cover,
          ),
        ),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 5, sigmaY: 5),
          child: Container(
            color: Colors.black.withOpacity(0.3),
            child: Center(
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      width: MediaQuery.of(context).size.width * 0.8,
                      height: MediaQuery.of(context).size.height * 0.5,
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.8),
                        borderRadius: BorderRadius.circular(20.0),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(23.0),
                        child: Column(
                          children: [
                            Text(
                              'SIGN IN ',
                              style: TextStyle(
                                fontSize: 40.0,
                                fontFamily: GoogleFonts.poppins().fontFamily,
                                fontWeight: FontWeight.bold,
                                color: Colors.black.withOpacity(0.8),
                              ),
                            ),
                            const SizedBox(height: 30.0),
                            TextField(
                              controller: emailController,
                              decoration: InputDecoration(
                                border: const OutlineInputBorder(
                                  borderRadius: BorderRadius.all(
                                    Radius.circular(15),
                                  ),
                                ),
                                labelText: '   Email',
                                labelStyle: labelText2,
                              ),
                            ),
                            const SizedBox(height: 20.0),
                            TextField(
                              controller: passwordController,
                              obscureText: true,
                              decoration: InputDecoration(
                                border: const OutlineInputBorder(
                                  borderRadius: BorderRadius.all(
                                    Radius.circular(15),
                                  ),
                                ),
                                labelText: '   Password',
                                labelStyle: labelText2,
                              ),
                            ),
                            const SizedBox(height: 35.0),
                            SizedBox(
                              width: double.infinity,
                              height: MediaQuery.of(context).size.height * 0.05,
                              child: ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                  backgroundColor:
                                      Colors.black.withOpacity(0.8),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(15.0),
                                  ),
                                ),
                                onPressed: () async {
                                  if (emailController.text.trim().isEmpty ||
                                      passwordController.text.trim().isEmpty) {
                                    showFieldError(
                                        'Text Field should not be empty.');
                                  } else if (!ValidationUtils.isValidEmail(
                                      emailController.text.trim())) {
                                    showFieldError('Invalid Email.');
                                  } else if (!ValidationUtils.isValidPassword(
                                      passwordController.text.trim())) {
                                    showFieldError(
                                        'Password must contain at least 8 characters, including UPPER/lowercase and numbers.');
                                  } else {
                                    signInPageBloc.add(
                                      SubmitLoginDetails(
                                        email: emailController.text.trim(),
                                        password:
                                            passwordController.text.trim(),
                                      ),
                                    );

                                    await Future.delayed(
                                        const Duration(seconds: 2));

                                    final role = await LocalStorage()
                                        .getCurrentLoginRoleType();

                                    // ignore: unrelated_type_equality_checks
                                    role ==
                                            RoleEnum.admin
                                                .toString()
                                                .split('.')
                                                .last
                                                .toUpperCase()
                                        // ignore: use_build_context_synchronously
                                        ? Navigator.push(
                                            context,
                                            MaterialPageRoute(
                                                builder: (context) =>
                                                    const AdminHomePageView()),
                                          )

                                        // ignore: unrelated_type_equality_checks
                                        : role ==
                                                RoleEnum.user
                                                    .toString()
                                                    .split('.')
                                                    .last
                                                    .toUpperCase()
                                            // ignore: use_build_context_synchronously
                                            ? Navigator.push(
                                                context,
                                                MaterialPageRoute(
                                                    builder: (context) =>
                                                        UserHomePageProvider()),
                                              )
                                            : Container();
                                  }
                                },
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Text(
                                      'CONTINUE  ',
                                      style: textButton2,
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
                                  'Don\'t have an account ?  ',
                                  style: GoogleFonts.poppins(
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
                                              SignUpPageProvider()),
                                    );
                                  },
                                  child: Text('SIGN UP',
                                      style: GoogleFonts.poppins(
                                        fontSize: 16.0,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.black12.withOpacity(0.8),
                                      )),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}