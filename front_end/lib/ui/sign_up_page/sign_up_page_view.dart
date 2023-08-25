// ignore_for_file: must_be_immutable

import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/model/user_model.dart';
import 'package:front_end/ui/admin_home_page/admin_home_page_event.dart';
import 'package:front_end/ui/sign_up_page/sign_up_page_bloc.dart';
import 'package:front_end/ui/sign_up_page/sign_up_page_state.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';

import '../../theme/primary_theme.dart';
import '../../util/encrypted_decrypted_util.dart';
import '../../util/notification_util.dart';
import '../admin_home_page/admin_home_page_bloc.dart';
import 'sign_up_page_event.dart';

class SignUpPageView extends StatelessWidget {
  SignUpPageView({super.key});

  final TextEditingController nameController = TextEditingController();
  final TextEditingController addressController = TextEditingController();
  final TextEditingController mobileNoController = TextEditingController();
  final TextEditingController dateController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController crPasswordController = TextEditingController();
  final TextEditingController coPasswordController = TextEditingController();
  DateTime dob = DateTime(DateTime.now().year - 28);

  void clear() {
    nameController.clear();
    addressController.clear();
    mobileNoController.clear();
    dateController.clear();
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? date = await showDatePicker(
      context: context,
      initialDate: DateTime(DateTime.now().year - 28),
      firstDate: DateTime(DateTime.now().year - 60),
      lastDate: DateTime(DateTime.now().year - 28),
    );

    dateController.text = DateFormat('EEE MMM d yyyy').format(
      date ?? dob,
    );
    dob = date ?? dob;
  }

  @override
  Widget build(BuildContext context) {
    final signUpBloc = BlocProvider.of<SignUpPageBloc>(context);
    final adminPage = BlocProvider.of<AdminHomePageBloc>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Sign Up Page',
          style: TextStyle(
              fontWeight: FontWeight.bold,
              fontFamily: GoogleFonts.ubuntu().fontFamily),
        ),
      ),
      body: Stack(
        children: [
          Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/bg.png'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 5, sigmaY: 5),
            child: Container(
              color: Colors.white.withOpacity(0.8),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(14.0),
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const SizedBox(
                    height: 20,
                  ),
                  Text(
                    "SIGN UP",
                    style: TextStyle(
                      fontSize: 30.0,
                      fontFamily: GoogleFonts.poppins().fontFamily,
                      fontWeight: FontWeight.bold,
                      color: Colors.black.withOpacity(0.8),
                    ),
                  ),
                  const SizedBox(
                    height: 5,
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  BlocBuilder<SignUpPageBloc, SignUpPageState>(
                    buildWhen: (previous, current) {
                      return previous.nameText != current.nameText ||
                          previous.addressText != current.addressText ||
                          previous.emailText != current.emailText ||
                          previous.mobileNoText != current.mobileNoText ||
                          previous.dateText != current.dateText ||
                          previous.selectedGender != current.selectedGender ||
                          previous.passwordText != current.passwordText;
                    },
                    builder: (context, state) {
                      return Padding(
                        padding: const EdgeInsets.all(10.0),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            TextField(
                              controller: nameController,
                              onChanged: (value) {},
                              decoration: InputDecoration(
                                labelText: "User Name",
                                labelStyle: labelText2,
                                border: const OutlineInputBorder(
                                  borderRadius: BorderRadius.all(
                                    Radius.circular(10),
                                  ),
                                ),
                                filled: true,
                                fillColor: Colors.grey[200],
                                contentPadding: const EdgeInsets.symmetric(
                                  vertical: 12.0,
                                  horizontal: 16.0,
                                ),
                              ),
                            ),
                            const SizedBox(height: 20),
                            TextField(
                              controller: addressController,
                              onChanged: (value) {},
                              decoration: InputDecoration(
                                labelText: "User Address",
                                labelStyle: labelText2,
                                border: const OutlineInputBorder(
                                  borderRadius: BorderRadius.all(
                                    Radius.circular(10),
                                  ),
                                ),
                                filled: true,
                                fillColor: Colors.grey[200],
                                contentPadding: const EdgeInsets.symmetric(
                                  vertical: 12.0,
                                  horizontal: 16.0,
                                ),
                              ),
                            ),
                            const SizedBox(height: 20),
                            TextField(
                              controller: emailController,
                              onChanged: (value) {},
                              decoration: InputDecoration(
                                labelText: "User Email",
                                labelStyle: labelText2,
                                border: const OutlineInputBorder(
                                  borderRadius: BorderRadius.all(
                                    Radius.circular(10),
                                  ),
                                ),
                                filled: true,
                                fillColor: Colors.grey[200],
                                contentPadding: const EdgeInsets.symmetric(
                                  vertical: 12.0,
                                  horizontal: 16.0,
                                ),
                              ),
                            ),
                            const SizedBox(height: 20),
                            TextField(
                              controller: mobileNoController,
                              onChanged: (value) {},
                              decoration: InputDecoration(
                                labelText: "Mobile No",
                                labelStyle: labelText2,
                                border: const OutlineInputBorder(
                                  borderRadius: BorderRadius.all(
                                    Radius.circular(10),
                                  ),
                                ),
                                filled: true,
                                fillColor: Colors.grey[200],
                                contentPadding: const EdgeInsets.symmetric(
                                  vertical: 12.0,
                                  horizontal: 16.0,
                                ),
                              ),
                            ),
                            const SizedBox(
                              height: 20,
                            ),
                            TextFormField(
                              controller: dateController,
                              onChanged: (value) {},
                              onTap: () {
                                _selectDate(context);
                              },
                              decoration: InputDecoration(
                                labelText: "DOB",
                                labelStyle: labelText2,
                                suffixIcon: const Icon(Icons.calendar_today),
                                border: const OutlineInputBorder(
                                  borderRadius: BorderRadius.all(
                                    Radius.circular(
                                      10,
                                    ),
                                  ),
                                ),
                                filled: true,
                                fillColor: Colors.grey[200],
                                contentPadding: const EdgeInsets.symmetric(
                                  vertical: 12.0,
                                  horizontal: 16.0,
                                ),
                              ),
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                            Center(
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Radio(
                                    value: "Male",
                                    groupValue: signUpBloc.state.selectedGender,
                                    onChanged: (value) {
                                      signUpBloc.add(SelectGender(
                                          select: value.toString()));
                                    },
                                  ),
                                  Text(
                                    "Male",
                                    style: textRedio2,
                                  ),
                                  Radio(
                                    value: "Female",
                                    groupValue: signUpBloc.state.selectedGender,
                                    onChanged: (value) {
                                      signUpBloc.add(SelectGender(
                                          select: value.toString()));
                                    },
                                  ),
                                  Text(
                                    "Female",
                                    style: textRedio2,
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(height: 10),
                            TextField(
                              controller: crPasswordController,
                              onChanged: (value) {},
                              decoration: InputDecoration(
                                labelText: "Create Password",
                                labelStyle: labelText2,
                                border: const OutlineInputBorder(
                                  borderRadius: BorderRadius.all(
                                    Radius.circular(10),
                                  ),
                                ),
                                filled: true,
                                fillColor: Colors.grey[200],
                                contentPadding: const EdgeInsets.symmetric(
                                  vertical: 12.0,
                                  horizontal: 16.0,
                                ),
                              ),
                            ),
                            const SizedBox(height: 20),
                            TextField(
                              controller: coPasswordController,
                              onChanged: (value) {},
                              decoration: InputDecoration(
                                labelText: "Confirm Password",
                                labelStyle: labelText2,
                                border: const OutlineInputBorder(
                                  borderRadius: BorderRadius.all(
                                    Radius.circular(10),
                                  ),
                                ),
                                filled: true,
                                fillColor: Colors.grey[200],
                                contentPadding: const EdgeInsets.symmetric(
                                  vertical: 12.0,
                                  horizontal: 16.0,
                                ),
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                  Column(
                    children: [
                      const SizedBox(height: 30),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          SizedBox(
                            width: 140,
                            height: 45,
                            child: ElevatedButton(
                              onPressed: () async {
                                if (nameController.text.trim().isEmpty ||
                                    addressController.text.trim().isEmpty ||
                                    mobileNoController.text.trim().isEmpty ||
                                    emailController.text.trim().isEmpty ||
                                    coPasswordController.text.trim().isEmpty ||
                                    dateController.text.trim().isEmpty) {
                                  showFieldError(
                                      'Text Field should not be empty.');
                                } else if (!RegExp(r'^[a-zA-Z ]+$').hasMatch(
                                  nameController.text.trim(),
                                )) {
                                  showFieldError('Invalid Name.');
                                } else if (!RegExp(r'^[a-zA-Z0-9 ]+$').hasMatch(
                                  addressController.text.trim(),
                                )) {
                                  showFieldError('Invalid Address.');
                                } else if (!RegExp(
                                        r'^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')
                                    .hasMatch(
                                  emailController.text.trim(),
                                )) {
                                  showFieldError('Invalid Email.');
                                } else if (!RegExp(
                                        r'^(07(0|1|2|4|5|6|7|8)[0-9]{7})$')
                                    .hasMatch(
                                  mobileNoController.text.trim(),
                                )) {
                                  showFieldError('Invalid Mobile No.');
                                } else if (!RegExp(
                                        r'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
                                    .hasMatch(
                                  crPasswordController.text.trim(),
                                )) {
                                  showFieldError(
                                      'Password must contain at least 8 characters, including UPPER/lowercase and numbers.');
                                } else if (crPasswordController.text.trim() !=
                                    coPasswordController.text.trim()) {
                                  showFieldError('Password not match.');
                                } else {
                                  final coPassword = encryptPassword(
                                    coPasswordController.text.trim(),
                                  );
                                  adminPage.add(
                                    SaveUser(
                                      user: User(
                                        roleType: 'USER',
                                        name: nameController.text.trim(),
                                        address: addressController.text.trim(),
                                        email: emailController.text.trim(),
                                        mobileNumber:
                                            mobileNoController.text.trim(),
                                        dob: dob,
                                        gender: signUpBloc.state.selectedGender,
                                        password: coPassword,
                                      ),
                                    ),
                                  );
                                  clear();

                                  Navigator.of(context).pop();
                                }
                              },
                              style: saveButton,
                              child: Text(
                                "Register",
                                style: textButton2,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  )
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
