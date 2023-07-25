import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/ui/student_page/student_page_bloc.dart';
import 'package:frontend/ui/student_page/student_page_event.dart';
import 'package:intl/intl.dart';

import '../theme/colors.dart';

class StudentPageView extends StatelessWidget {
  const StudentPageView({super.key});

  @override
  Widget build(BuildContext context) {
    final TextEditingController nameController = TextEditingController();
    final TextEditingController addressController = TextEditingController();
    final TextEditingController mobileController = TextEditingController();
    final TextEditingController dateController = TextEditingController();
    String gender = 'Male';

    StudentPageBloc homePageBloc = BlocProvider.of<StudentPageBloc>(context);

    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.mainColor,
        elevation: 4,
        title: const Row(
          mainAxisAlignment: MainAxisAlignment.end,
        ),
        toolbarHeight: MediaQuery.of(context).size.height * 0.1,
      ),
      body: Padding(
        padding: const EdgeInsets.fromLTRB(20, 40, 20, 40),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const Text(
              'Add New Student',
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
                labelText: 'Name',
                hintText: 'Enter First Name',
              ),
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
              },
            ),
            const SizedBox(
              height: 20,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Row(
                  children: [
                    Radio(
                      value: 'Male',
                      fillColor: MaterialStateColor.resolveWith(
                        (states) => AppColors.mainColor,
                      ),
                      groupValue: gender,
                      onChanged: (value) {
                        homePageBloc.add(
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
                      groupValue: gender,
                      onChanged: (value) {
                        homePageBloc.add(
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
                      // homePageBloc.add();
                    },
                    child: const Text('UPDATE'),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
