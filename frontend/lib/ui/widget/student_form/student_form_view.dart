import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/ui/root_page/root_bloc.dart';
import 'package:frontend/ui/root_page/root_event.dart';
import 'package:frontend/ui/theme/colors.dart';
import 'package:frontend/ui/widget/student_form/student_form_bloc.dart';
import 'package:frontend/ui/widget/student_form/student_form_event.dart';
import 'package:frontend/ui/widget/student_form/student_form_state.dart';
import 'package:intl/intl.dart';

class StudentFormView extends StatelessWidget {
  const StudentFormView({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final TextEditingController nameController = TextEditingController();
    final TextEditingController addressController = TextEditingController();
    final TextEditingController mobileController = TextEditingController();
    final TextEditingController dateController = TextEditingController();
    DateTime dob = DateTime.now();

    StudentFormBloc bloc = BlocProvider.of<StudentFormBloc>(context);
    RootBloc rootBloc = BlocProvider.of<RootBloc>(context);

    return SingleChildScrollView(
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
                    lastDate: DateTime(2025),
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
              BlocBuilder<StudentFormBloc, StudentFormState>(
                buildWhen: (previous, current) =>
                    current.maleOrFemale != previous.maleOrFemale,
                builder: (context, state) {
                  return Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Row(
                        children: [
                          Radio(
                            value: 'Male',
                            fillColor: MaterialStateColor.resolveWith(
                              (states) => AppColors.mainColor,
                            ),
                            groupValue: bloc.state.maleOrFemale,
                            onChanged: (value) {
                              bloc.add(
                                SetRadioButtons(
                                  maleOrFemale: value.toString(),
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
                            groupValue: bloc.state.maleOrFemale,
                            onChanged: (value) {
                              bloc.add(
                                SetRadioButtons(
                                  maleOrFemale: value.toString(),
                                ),
                              );
                            },
                          ),
                          const Text('Female'),
                        ],
                      ),
                    ],
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
                      onPressed: () {
                        Navigator.of(context).pop();
                        rootBloc.add(
                          SaveStudentEvent(
                            name: nameController.text,
                            address: addressController.text,
                            mobile: mobileController.text,
                            dob: dob,
                            gender: bloc.state.maleOrFemale,
                          ),
                        );
                      },
                      child: const Text('SAVE'),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
