// ignore_for_file: must_be_immutable

import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/model/user_model.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';

import '../../enum/role_type_enum.dart';
import '../../theme/primary_theme.dart';
import '../../util/notification_util.dart';
import '../../util/validation_utils.dart';
import '../admin_home_page/admin_home_page_bloc.dart';
import '../admin_home_page/admin_home_page_event.dart';
import 'manage_user_page_bloc.dart';
import 'manage_user_page_event.dart';
import 'manage_user_page_state.dart';

class UserMangeView extends StatelessWidget {
  final User user;
  UserMangeView({super.key, required this.user}) {
    nameController.text = user.name;
    addressController.text = user.address;
    mobileNoController.text = user.mobileNumber;
    dateController.text = DateFormat('EEE MMM d yyyy').format(user.dob);
    dob = user.dob;
    emailController.text = user.email;
    userTypeController.text = user.roleType;
    passwordController.text = user.password;
  }

  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  final TextEditingController userTypeController = TextEditingController();
  final TextEditingController addressController = TextEditingController();
  final TextEditingController mobileNoController = TextEditingController();
  final TextEditingController dateController = TextEditingController();
  DateTime dob = DateTime(DateTime.now().year - 18);
  int age = 0;
  final List<String> roles = [
    RoleEnum.admin.toString().split('.').last.toUpperCase(),
    RoleEnum.user.toString().split('.').last.toUpperCase(),
  ];

  void clear() {
    nameController.clear();
    addressController.clear();
    mobileNoController.clear();
    dateController.clear();
  }

  int calculateAge() {
    final DateTime birthDate = user.dob;
    final currentDate = DateTime.now();
    age = currentDate.year - birthDate.year;
    if (currentDate.month < birthDate.month ||
        (currentDate.month == birthDate.month &&
            currentDate.day < birthDate.day)) {
      age--;
    }
    return age;
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? date = await showDatePicker(
      context: context,
      initialDate: DateTime(DateTime.now().year - 18),
      firstDate: DateTime(DateTime.now().year - 28),
      lastDate: DateTime(DateTime.now().year - 18),
    );

    dateController.text = DateFormat('EEE MMM d yyyy').format(
      date ?? user.dob,
    );
    dob = date ?? user.dob;
  }

  @override
  Widget build(BuildContext context) {
    UserManageBloc userManageBloc = BlocProvider.of<UserManageBloc>(context);
    userManageBloc.add(SelectGender(select: user.gender));

    AdminHomePageBloc homePageBloc =
        BlocProvider.of<AdminHomePageBloc>(context);
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Manage User',
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
                    user.name.isEmpty
                        ? user.name
                        : user.name.isEmpty
                            ? "User Name"
                            : user.name,
                    style: headerText2,
                  ),
                  const SizedBox(
                    height: 5,
                  ),
                  Text(
                    age == 0 ? "Age: ${calculateAge()}" : "Age: $age",
                    style: headerText3,
                  ),
                  const SizedBox(
                    height: 30,
                  ),
                  BlocBuilder<UserManageBloc, UserManageState>(
                    buildWhen: (previous, current) {
                      return previous.nameText != current.nameText ||
                          previous.addressText != current.addressText ||
                          previous.mobileNoText != current.mobileNoText ||
                          previous.dateText != current.dateText ||
                          previous.passwordText != current.passwordText ||
                          previous.selectedGender != current.selectedGender ||
                          previous.emailText != current.emailText;
                    },
                    builder: (context, state) {
                      return Padding(
                        padding: const EdgeInsets.all(10.0),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Container(
                              width: MediaQuery.of(context).size.width * 0.9,
                              decoration: BoxDecoration(
                                color: Colors.grey[200],
                                borderRadius: BorderRadius.circular(10),
                                border: Border.all(
                                  color: Colors.black,
                                  width: 1.0,
                                ),
                              ),
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 16.0),
                              child: DropdownButton<String>(
                                value: userTypeController.text.trim(),
                                style: const TextStyle(
                                  color: Colors.black,
                                  fontSize: 16,
                                  fontWeight: FontWeight.w600,
                                ),
                                onChanged: (newValue) {
                                  userTypeController.text = newValue!;
                                },
                                items: roles.map((String role) {
                                  return DropdownMenuItem<String>(
                                    value: role,
                                    child: Padding(
                                      padding: const EdgeInsets.symmetric(
                                          vertical: 8.0),
                                      child: Text(role),
                                    ),
                                  );
                                }).toList(),
                              ),
                            ),
                            const SizedBox(height: 20),
                            TextField(
                              controller: userManageBloc.state.nameText.isEmpty
                                  ? nameController
                                  : TextEditingController(
                                      text: userManageBloc.state.nameText),
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
                              controller: userManageBloc
                                      .state.addressText.isEmpty
                                  ? addressController
                                  : TextEditingController(
                                      text: userManageBloc.state.addressText),
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
                              enabled: false,
                              controller: userManageBloc.state.emailText.isEmpty
                                  ? emailController
                                  : TextEditingController(
                                      text: userManageBloc.state.emailText),
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
                              controller: userManageBloc
                                      .state.mobileNoText.isEmpty
                                  ? mobileNoController
                                  : TextEditingController(
                                      text: userManageBloc.state.mobileNoText),
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
                              height: 20,
                            ),
                            TextField(
                              controller: userManageBloc
                                      .state.passwordText.isEmpty
                                  ? passwordController
                                  : TextEditingController(
                                      text: userManageBloc.state.passwordText),
                              onChanged: (value) {},
                              decoration: InputDecoration(
                                labelText: "Password",
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
                            Center(
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Radio(
                                    value: "Male",
                                    groupValue:
                                        userManageBloc.state.selectedGender,
                                    onChanged: (value) {
                                      userManageBloc.add(SelectGender(
                                          select: value.toString()));
                                    },
                                  ),
                                  Text(
                                    "Male",
                                    style: textRedio2,
                                  ),
                                  Radio(
                                    value: "Female",
                                    groupValue:
                                        userManageBloc.state.selectedGender,
                                    onChanged: (value) {
                                      userManageBloc.add(
                                        SelectGender(
                                          select: value.toString(),
                                        ),
                                      );
                                    },
                                  ),
                                  Text(
                                    "Female",
                                    style: textRedio2,
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                  Column(
                    children: [
                      const SizedBox(height: 20),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          SizedBox(
                            width: 140,
                            height: 45,
                            child: ElevatedButton(
                              onPressed: () async {
                                if (ValidationUtils.isFieldEmpty(
                                        userTypeController.text) ||
                                    ValidationUtils.isFieldEmpty(
                                        nameController.text) ||
                                    ValidationUtils.isFieldEmpty(
                                        addressController.text) ||
                                    ValidationUtils.isFieldEmpty(
                                        emailController.text) ||
                                    ValidationUtils.isFieldEmpty(
                                        mobileNoController.text) ||
                                    ValidationUtils.isFieldEmpty(
                                        dateController.text) ||
                                    ValidationUtils.isFieldEmpty(
                                        passwordController.text)) {
                                  showFieldError(
                                      'Text Field should not be empty.');
                                } else if (!ValidationUtils.isValidName(
                                    nameController.text)) {
                                  showFieldError('Invalid Name.');
                                } else if (!ValidationUtils.isValidAddress(
                                    addressController.text)) {
                                  showFieldError('Invalid Address.');
                                } else if (!ValidationUtils.isValidEmail(
                                    emailController.text)) {
                                  showFieldError('Invalid Email.');
                                } else if (!ValidationUtils.isValidMobileNumber(
                                    mobileNoController.text)) {
                                  showFieldError('Invalid Mobile No.');
                                } else if (!ValidationUtils.isValidPassword(
                                    passwordController.text)) {
                                  showFieldError(
                                      'Password should be at least 8 characters.');
                                } else {
                                  homePageBloc.add(
                                    UpdateUser(
                                      user: User(
                                        roleType: userTypeController.text,
                                        name: nameController.text,
                                        address: addressController.text,
                                        email: emailController.text,
                                        mobileNumber: mobileNoController.text,
                                        dob: dob,
                                        password:
                                            passwordController.text.trim(),
                                        gender:
                                            userManageBloc.state.selectedGender,
                                      ),
                                    ),
                                  );
                                  clear();

                                  // ignore: use_build_context_synchronously
                                  Navigator.of(context).pop();
                                }
                              },
                              style: updateButton,
                              child: Text(
                                "Update",
                                style: textButton2,
                              ),
                            ),
                          ),
                          SizedBox(
                            width: 140,
                            height: 45,
                            child: ElevatedButton(
                              onPressed: () {
                                showYesNoAlert(context).then((confirmed) {
                                  if (confirmed != null && confirmed) {
                                    homePageBloc.add(
                                      DeleteUser(email: user.email),
                                    );
                                    Navigator.of(context).pop();
                                  }
                                });
                              },
                              style: deleteButton,
                              child: Text(
                                "Delete",
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