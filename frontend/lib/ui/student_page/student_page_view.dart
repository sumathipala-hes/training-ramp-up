import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/model/student.dart';
import 'package:frontend/ui/home_page/home_page_bloc.dart';
import 'package:frontend/ui/home_page/home_page_event.dart';
import 'package:frontend/ui/student_page/student_page_bloc.dart';
import 'package:frontend/ui/student_page/student_page_event.dart';
import 'package:frontend/ui/student_page/student_page_state.dart';
import 'package:intl/intl.dart';
import '../theme/colors.dart';

// ignore: must_be_immutable
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
    StudentPageBloc studentPageBloc = BlocProvider.of<StudentPageBloc>(context);
    HomePageBloc homePageBloc = BlocProvider.of<HomePageBloc>(context);
    DateTime dob = DateTime.now();
    studentPageBloc.state.gender = student.gender;

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
                  Text(
                    (student.dob.year - DateTime.now().year).toString(),
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 16,
                    ),
                  ),
                  const SizedBox(height: 20),
                  TextField(
                      controller: nameController,
                      decoration: const InputDecoration(
                        border: UnderlineInputBorder(),
                        labelText: 'Name',
                        hintText: 'Enter First Name',
                      ),
                      onChanged: (value) {
                        nameController.text = value;
                      }),
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
                        lastDate: DateTime(DateTime.now().year - 18),
                      );
                      dateController.text = DateFormat('EEE MMM d yyyy').format(
                        date ?? DateTime.now(),
                      );
                      dob = date ?? DateTime.now();
                    },
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  BlocBuilder<StudentPageBloc, StudentPageState>(
                    buildWhen: (previous, current) =>
                        current.gender != previous.gender,
                    builder: (context, state) {
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
