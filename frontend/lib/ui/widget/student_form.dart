import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/ui/home_page/home_page_bloc.dart';
import 'package:frontend/ui/theme/colors.dart';
import 'package:frontend/util/validation_util.dart';
import 'package:intl/intl.dart';
import '../home_page/home_page_event.dart';

class StudentForm extends StatefulWidget {
  const StudentForm({Key? key}) : super(key: key);

  @override
  State<StudentForm> createState() => _StudentFormState();
}

class _StudentFormState extends State<StudentForm> {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController addressController = TextEditingController();
  final TextEditingController mobileController = TextEditingController();
  final TextEditingController dateController = TextEditingController();
  bool isSaveButtonEnabled = false;
  DateTime dob = DateTime.now();
  String gender = 'Male';

  String nameError = '';
  String addressError = '';
  String mobileError = '';

  @override
  Widget build(BuildContext context) {
    HomePageBloc homePageBloc = BlocProvider.of<HomePageBloc>(context);

    void validateTextFields(bool isValid, String textField) {
      setState(
        () {
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
          isSaveButtonEnabled = nameError == '' &&
              addressError == '' &&
              mobileError == '' &&
              dateController.text.isNotEmpty;
        },
      );
    }

    return Dialog(
      backgroundColor: Colors.transparent,
      child: SingleChildScrollView(
        child: Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20.0),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
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
                Text(
                  nameError,
                  style: const TextStyle(
                    color: AppColors.errorColor,
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
                Text(
                  addressError,
                  style: const TextStyle(
                    color: AppColors.errorColor,
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
                Text(
                  mobileError,
                  style: const TextStyle(
                    color: AppColors.errorColor,
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
                      initialDate: DateTime.parse(
                        '2000-01-01',
                      ),
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
                    validateTextFields(true, 'dob');
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
                          value: "Male",
                          fillColor: MaterialStateColor.resolveWith(
                            (states) => AppColors.mainColor,
                          ),
                          groupValue: gender,
                          onChanged: (value) {
                            setState(
                              () {
                                gender = value.toString();
                              },
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
                          onChanged: (value) {
                            setState(
                              () {
                                gender = value.toString();
                              },
                            );
                          },
                          groupValue: gender,
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
                        child: const Text('CANCEL'),
                      ),
                    ),
                    SizedBox(
                      width: MediaQuery.of(context).size.width * 0.25,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.successColor,
                        ),
                        onPressed: isSaveButtonEnabled
                            ? () async {
                                Navigator.of(context).pop();
                                homePageBloc.add(
                                  SaveStudentEvent(
                                    name: nameController.text,
                                    address: addressController.text,
                                    mobile: mobileController.text,
                                    dob: dob,
                                    gender: gender,
                                  ),
                                );
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                    content: Text(
                                      'Successfully Saved..!',
                                      textAlign: TextAlign.center,
                                    ),
                                    backgroundColor: AppColors.successColor,
                                  ),
                                );
                              }
                            : null,
                        child: const Text('SAVE'),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
