// ignore_for_file: must_be_immutable

import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';

import '../../model/student_model.dart';
import '../../theme/primary_theme.dart';
import '../../util/notification.util.dart';
import '../admin_home_page/admin_home_page_bloc.dart';
import '../admin_home_page/admin_home_page_event.dart';
import 'manage_student_page_bloc.dart';
import 'manage_student_page_event.dart';
import 'manage_student_page_state.dart';

class StudentMangeView extends StatelessWidget {
  final Student student;
  StudentMangeView({super.key, required this.student}) {
    nameController.text = student.name;
    addressController.text = student.address;
    mobileNoController.text = student.mobileNumber;
    dateController.text = DateFormat('EEE MMM d yyyy').format(student.dob);
    dob = student.dob;
  }

  final TextEditingController nameController = TextEditingController();
  final TextEditingController addressController = TextEditingController();
  final TextEditingController mobileNoController = TextEditingController();
  final TextEditingController dateController = TextEditingController();
  DateTime dob = DateTime(DateTime.now().year - 18);
  int age = 0;

  void clear() {
    nameController.clear();
    addressController.clear();
    mobileNoController.clear();
    dateController.clear();
  }

  int calculateAge() {
    final DateTime birthDate = student.dob;
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
      date ?? student.dob,
    );
    dob = date ?? student.dob;
  }

  @override
  Widget build(BuildContext context) {
    StudentManageBloc studentManageBloc =
        BlocProvider.of<StudentManageBloc>(context);
    studentManageBloc.add(SelectGender(select: student.gender));

    AdminHomePageBloc homePageBloc = BlocProvider.of<AdminHomePageBloc>(context);
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Manage Student',
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
                    student.name.isEmpty
                        ? student.name
                        : student.name.isEmpty
                            ? "Student Name"
                            : student.name,
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
                  BlocBuilder<StudentManageBloc, StudentManageState>(
                    buildWhen: (previous, current) {
                      return previous.nameText != current.nameText ||
                          previous.addressText != current.addressText ||
                          previous.mobileNoText != current.mobileNoText ||
                          previous.selectedGender != current.selectedGender;
                    },
                    builder: (context, state) {
                      return Padding(
                        padding: const EdgeInsets.all(10.0),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            TextField(
                              controller: studentManageBloc
                                      .state.nameText.isEmpty
                                  ? nameController
                                  : TextEditingController(
                                      text: studentManageBloc.state.nameText),
                              onChanged: (value) {},
                              decoration: InputDecoration(
                                labelText: "Student Name",
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
                              controller: studentManageBloc
                                      .state.addressText.isEmpty
                                  ? addressController
                                  : TextEditingController(
                                      text:
                                          studentManageBloc.state.addressText),
                              onChanged: (value) {},
                              decoration: InputDecoration(
                                labelText: "Student Address",
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
                              controller: studentManageBloc
                                      .state.mobileNoText.isEmpty
                                  ? mobileNoController
                                  : TextEditingController(
                                      text:
                                          studentManageBloc.state.mobileNoText),
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
                            Center(
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Radio(
                                    value: "Male",
                                    groupValue:
                                        studentManageBloc.state.selectedGender,
                                    onChanged: (value) {
                                      studentManageBloc.add(SelectGender(
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
                                        studentManageBloc.state.selectedGender,
                                    onChanged: (value) {
                                      studentManageBloc.add(SelectGender(
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
                              onPressed: () {
                                if (nameController.text.trim().isEmpty ||
                                    addressController.text.trim().isEmpty ||
                                    mobileNoController.text.trim().isEmpty ||
                                    dateController.text.trim().isEmpty) {
                                  showFieldError(
                                      'Text Field should not be empty.');
                                } else if (!RegExp(r'^[a-zA-Z ]+$')
                                    .hasMatch(nameController.text.trim())) {
                                  showFieldError('Invalid Name.');
                                } else if (!RegExp(r'^[a-zA-Z0-9 ]+$')
                                    .hasMatch(addressController.text.trim())) {
                                  showFieldError('Invalid Address.');
                                } else if (!RegExp(
                                        r'^(07(0|1|2|4|5|6|7|8)[0-9]{7})$')
                                    .hasMatch(mobileNoController.text.trim())) {
                                  showFieldError('Invalid Mobile No.');
                                } else {
                                  homePageBloc.add(UpdateStudent(
                                    id: student.id!,
                                    name: nameController.text.trim(),
                                    address: addressController.text.trim(),
                                    mobileNo: mobileNoController.text.trim(),
                                    date: dob,
                                    gender:
                                        studentManageBloc.state.selectedGender,
                                  ));
                                  clear();

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
                                      DeleteStudent(id: student.id!),
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
