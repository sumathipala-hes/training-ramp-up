import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:intl/intl.dart';

import '../../model/user_model.dart';
import '../../theme/primary_theme.dart';
import '../admin_home_page/admin_home_page_bloc.dart';
import '../admin_home_page/admin_home_page_event.dart';

class UserPopupModal extends StatefulWidget {
  const UserPopupModal({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _UserPopupModalState createState() => _UserPopupModalState();
}

class _UserPopupModalState extends State<UserPopupModal> {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController userTypeController =
      TextEditingController(text: 'USER');
  final TextEditingController addressController = TextEditingController();
  final TextEditingController mobileNoController = TextEditingController();
  final TextEditingController dateController = TextEditingController();
  bool isSaveButtonEnabled = false;

  static final RegExp _nameRegExp = RegExp(r'^[a-zA-Z ]+$');
  static final RegExp _telNoRegExp = RegExp(r'^(07(0|1|2|4|5|6|7|8)[0-9]{7})$');
  static final RegExp _addressRegExp = RegExp(r'^[a-zA-Z0-9 ]+$');
  static final RegExp _emailRegExp =
      RegExp(r'^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+');
  static final RegExp _passwordRegExp =
      RegExp(r'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');

  String selectedGender = "Male";
  DateTime dob = DateTime(DateTime.now().year - 18);
  List<String> roles = ['ADMIN', 'USER'];

  void clear() {
    nameController.clear();
    addressController.clear();
    mobileNoController.clear();
    dateController.clear();
    emailController.clear();
    passwordController.clear();
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? date = await showDatePicker(
      context: context,
      initialDate: DateTime(DateTime.now().year - 18),
      firstDate: DateTime(DateTime.now().year - 28),
      lastDate: DateTime(DateTime.now().year - 18),
    );

    dateController.text = DateFormat('EEE MMM d yyyy').format(
      date ?? dob,
    );
    dob = date ?? dob;
  }

  bool isNumeric(String value) {
    // ignore: unnecessary_null_comparison
    if (value == null) {
      return false;
    }
    return double.tryParse(value) != null;
  }

  @override
  void initState() {
    super.initState();
    nameController.addListener(_updateSaveButton);
    addressController.addListener(_updateSaveButton);
    mobileNoController.addListener(_updateSaveButton);
    dateController.addListener(_updateSaveButton);
    emailController.addListener(_updateSaveButton);
    passwordController.addListener(_updateSaveButton);
  }

  void _updateSaveButton() {
    final isAnyFieldEmpty = nameController.text.trim().isEmpty ||
        addressController.text.trim().isEmpty ||
        mobileNoController.text.trim().isEmpty ||
        dateController.text.trim().isEmpty;
    emailController.text.trim().isEmpty;
    passwordController.text.trim().isEmpty;

    final isMobileNumberValid = isNumeric(mobileNoController.text.trim());

    setState(() {
      isSaveButtonEnabled = !isAnyFieldEmpty &&
          isMobileNumberValid &&
          _nameRegExp.hasMatch(
            nameController.text.trim(),
          ) &&
          _addressRegExp.hasMatch(
            addressController.text.trim(),
          ) &&
          _emailRegExp.hasMatch(
            emailController.text.trim(),
          ) &&
          _telNoRegExp.hasMatch(
            mobileNoController.text.trim(),
          );
      _passwordRegExp.hasMatch(
        passwordController.text.trim(),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    AdminHomePageBloc homePageBloc =
        BlocProvider.of<AdminHomePageBloc>(context);

    return AlertDialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15.0),
      ),
      title: SizedBox(
        width: MediaQuery.of(context).size.width * 0.8,
        child: Center(
          child: Text(
            "ADD NEW USER",
            style: headerText,
          ),
        ),
      ),
      content: SingleChildScrollView(
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
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: DropdownButton<String>(
                value: userTypeController.text.trim(),
                style: const TextStyle(
                  color: Colors.black,
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
                onChanged: (newValue) {
                  setState(() {
                    userTypeController.text = newValue!;
                  });
                },
                items: roles.map((String role) {
                  return DropdownMenuItem<String>(
                    value: role,
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                          vertical: 8.0), // Add vertical padding around text
                      child: Text(role),
                    ),
                  );
                }).toList(),
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: nameController,
              decoration: InputDecoration(
                labelText: "User Name",
                labelStyle: labelText,
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
            const SizedBox(height: 10),
            TextField(
              controller: addressController,
              decoration: InputDecoration(
                labelText: "User Address",
                labelStyle: labelText,
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
            const SizedBox(height: 10),
            TextField(
              controller: emailController,
              decoration: InputDecoration(
                labelText: "User Email",
                labelStyle: labelText,
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
            const SizedBox(height: 10),
            TextField(
              controller: mobileNoController,
              decoration: InputDecoration(
                labelText: "Mobile No",
                labelStyle: labelText,
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
              height: 10,
            ),
            TextField(
              controller: passwordController,
              decoration: InputDecoration(
                labelText: "Password",
                labelStyle: labelText,
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
              height: 10,
            ),
            TextFormField(
              controller: dateController,
              onTap: () {
                _selectDate(context);
              },
              decoration: InputDecoration(
                labelText: "DOB",
                labelStyle: labelText,
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
                    groupValue: selectedGender,
                    onChanged: (value) {
                      setState(
                        () {
                          selectedGender = value!;
                        },
                      );
                    },
                  ),
                  Text(
                    "Male",
                    style: textRedio,
                  ),
                  Radio(
                    value: "Female",
                    groupValue: selectedGender,
                    onChanged: (value) {
                      setState(
                        () {
                          selectedGender = value!;
                        },
                      );
                    },
                  ),
                  Text(
                    "Female",
                    style: textRedio,
                  ),
                ],
              ),
            )
          ],
        ),
      ),
      actions: [
        SizedBox(
          width: 120,
          height: 40,
          child: ElevatedButton(
            onPressed: isSaveButtonEnabled
                ? () {
                    homePageBloc.add(
                      SaveUser(
                        user: User(
                          roleType: userTypeController.text.trim(),
                          email: emailController.text.trim(),
                          password:  passwordController.text.trim(),
                          name: nameController.text.trim(),
                          address: addressController.text.trim(),
                          mobileNumber: mobileNoController.text.trim(),
                          dob: dob,
                          gender: selectedGender,
                        ),
                      ),
                    );
                    clear();
                    Navigator.of(context).pop();
                  }
                : null,
            style: saveButton,
            child: Text(
              "SAVE",
              style: textButton,
            ),
          ),
        ),
        SizedBox(
          width: 120,
          height: 40,
          child: ElevatedButton(
            onPressed: () {
              Navigator.of(context).pop();
            },
            style: cancelButton,
            child: Text(
              "CANCEL",
              style: textButton,
            ),
          ),
        ),
      ],
    );
  }
}
