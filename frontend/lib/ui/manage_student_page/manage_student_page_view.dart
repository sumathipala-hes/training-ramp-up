import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/model/student.dart';
import 'package:frontend/ui/student_home_page/student_home_page_bloc.dart';
import 'package:frontend/ui/student_home_page/student_home_page_event.dart';
import 'package:frontend/ui/manage_student_page/manage_student_page_bloc.dart';
import 'package:frontend/ui/manage_student_page/manage_student_page_event.dart';
import 'package:frontend/ui/manage_student_page/manage_student_page_state.dart';
import 'package:frontend/util/validation_util.dart';
import 'package:intl/intl.dart';
import '../theme/colors.dart';

class StudentPageView extends StatelessWidget {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController addressController = TextEditingController();
  final TextEditingController mobileController = TextEditingController();
  final TextEditingController dateController = TextEditingController();

  StudentPageView({
    super.key,
    required this.student,
  }) {
    nameController.text = student.name;
    addressController.text = student.address;
    mobileController.text = student.mobile;
    dateController.text = DateFormat('EEE MMM d yyyy').format(student.dob);
  }

  final Student student;

  @override
  Widget build(BuildContext context) {
    ManageStudentPageBloc studentPageBloc =
        BlocProvider.of<ManageStudentPageBloc>(context);
    StudentHomePageBloc homePageBloc =
        BlocProvider.of<StudentHomePageBloc>(context);
    DateTime dob = student.dob;

    void validateTextFields(bool isValid, String textField) {
      String nameError = '';
      String addressError = '';
      String mobileError = '';
      switch (textField) {
        case 'name':
          nameError = isValid ? '' : 'Invalid Name Ex. John Doe';
          break;
        case 'address':
          addressError = isValid ? '' : 'Invalid Address Ex. 123, ABC';
          break;
        case 'mobile':
          mobileError = isValid ? '' : 'Invalid Mobile Ex. 0745768944';
          break;
      }
      studentPageBloc.add(
        SetValidations(
          nameError: nameError,
          addressError: addressError,
          mobileError: mobileError,
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
              'Manage Student',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 22,
                color: Colors.white,
              ),
            ),
          ],
        ),
        toolbarHeight: MediaQuery.of(context).size.height * 0.1,
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
                    student.name,
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
                    '${DateTime.now().year - student.dob.year} Years',
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 16,
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
                      hintText: 'Enter Your Name',
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
                  BlocBuilder<ManageStudentPageBloc, ManageStudentPageState>(
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
                    controller: addressController,
                    decoration: const InputDecoration(
                      border: UnderlineInputBorder(),
                      labelText: 'Address',
                      hintText: 'Enter Address',
                    ),
                    onChanged: (value) {
                      validateTextFields(
                        ValidationUtil.isValidExp(
                          ValidationUtil.addressRegExp,
                          value,
                        ),
                        'address',
                      );
                    },
                  ),
                  BlocBuilder<ManageStudentPageBloc, ManageStudentPageState>(
                    buildWhen: (
                      previous,
                      current,
                    ) =>
                        current.addressError != previous.addressError,
                    builder: (
                      context,
                      state,
                    ) {
                      return Text(
                        state.addressError,
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
                    controller: mobileController,
                    decoration: const InputDecoration(
                      border: UnderlineInputBorder(),
                      labelText: 'Mobile',
                      hintText: 'Enter Mobile',
                    ),
                    onChanged: (value) {
                      validateTextFields(
                        ValidationUtil.isValidExp(
                          ValidationUtil.mobileRegExp,
                          value,
                        ),
                        'mobile',
                      );
                    },
                  ),
                  BlocBuilder<ManageStudentPageBloc, ManageStudentPageState>(
                    buildWhen: (
                      previous,
                      current,
                    ) =>
                        current.mobileError != previous.mobileError,
                    builder: (
                      context,
                      state,
                    ) {
                      return Text(
                        state.mobileError,
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
                    controller: dateController,
                    decoration: const InputDecoration(
                      border: UnderlineInputBorder(),
                      suffixIcon: Icon(
                        Icons.calendar_today,
                      ),
                      labelText: "Date of Birth",
                    ),
                    readOnly: true,
                    onTap: () async {
                      DateTime? date = await showDatePicker(
                        context: context,
                        initialDate: DateTime.parse('2000-01-01'),
                        firstDate: DateTime(2000),
                        lastDate: DateTime(
                          DateTime.now().year - 18,
                        ),
                      );
                      dateController.text = DateFormat(
                        'EEE MMM d yyyy',
                      ).format(
                        date ?? DateTime.now(),
                      );
                      dob = date ?? DateTime.now();
                    },
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  BlocBuilder<ManageStudentPageBloc, ManageStudentPageState>(
                    buildWhen: (
                      previous,
                      current,
                    ) =>
                        current.gender != previous.gender,
                    builder: (
                      context,
                      state,
                    ) {
                      if (state.gender == '') {
                        studentPageBloc.add(
                          SetGender(
                            gender: student.gender,
                          ),
                        );
                      }
                      return Center(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Row(
                              children: [
                                Radio(
                                  value: 'Male',
                                  fillColor: MaterialStateColor.resolveWith(
                                    (states) => AppColors.mainColor,
                                  ),
                                  groupValue: studentPageBloc.state.gender,
                                  onChanged: (value) {
                                    studentPageBloc.add(
                                      SetRadioButtons(
                                        gender: value.toString(),
                                      ),
                                    );
                                  },
                                ),
                                const Text('Male'),
                              ],
                            ),
                            Row(
                              children: [
                                Radio(
                                  value: 'Female',
                                  fillColor: MaterialStateColor.resolveWith(
                                    (states) => AppColors.mainColor,
                                  ),
                                  groupValue: studentPageBloc.state.gender,
                                  onChanged: (value) {
                                    studentPageBloc.add(
                                      SetRadioButtons(
                                        gender: value.toString(),
                                      ),
                                    );
                                  },
                                ),
                                const Text('Female'),
                              ],
                            ),
                          ],
                        ),
                      );
                    },
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
                              DeleteStudentEvent(
                                id: student.id,
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
                            if (studentPageBloc.state.nameError == '' &&
                                studentPageBloc.state.addressError == '' &&
                                studentPageBloc.state.mobileError == '') {
                              Navigator.of(context).pop();
                              homePageBloc.add(
                                UpdateStudentEvent(
                                  id: student.id,
                                  name: nameController.text,
                                  address: addressController.text,
                                  mobile: mobileController.text,
                                  dob: dob,
                                  gender: studentPageBloc.state.gender,
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
