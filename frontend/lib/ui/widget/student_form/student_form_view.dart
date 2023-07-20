import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/ui/widget/student_form/student_form_bloc.dart';
import 'package:frontend/ui/widget/student_form/student_form_event.dart';
import 'package:frontend/ui/widget/student_form/student_form_state.dart';

class StudentFormView extends StatelessWidget {
  const StudentFormView({super.key});

  @override
  Widget build(BuildContext context) {
    TextEditingController nameController = TextEditingController();
    TextEditingController addressController = TextEditingController();
    TextEditingController mobileController = TextEditingController();
    TextEditingController dateController = TextEditingController();

    StudentFormBloc bloc = BlocProvider.of<StudentFormBloc>(context);

    return AlertDialog(
      title: const Text('Add New Student', textAlign: TextAlign.center),
      content: SizedBox(
        width: MediaQuery.of(context).size.width * 1,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            TextField(
              controller: nameController,
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
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
                border: OutlineInputBorder(),
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
                border: OutlineInputBorder(),
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
                  border: OutlineInputBorder(),
                  suffixIcon: Icon(Icons.calendar_today),
                  labelText: "Enter Date"),
              readOnly: true,
              onTap: () async {
                DateTime? date = await showDatePicker(
                    context: context,
                    initialDate: DateTime.now(),
                    firstDate: DateTime(2000),
                    lastDate: DateTime(2025));
                dateController.text = date.toString().length > 10
                    ? date.toString().substring(0, 10)
                    : DateTime(2000).toString().substring(0, 10);
              },
            ),
            BlocBuilder<StudentFormBloc, StudentFormState>(
              buildWhen: (previous, current) =>
                  current.maleOrFemale != previous.maleOrFemale,
              builder: (context, state) {
                return Row(
                  children: [
                    Radio(
                      value: 'Male',
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
                    const SizedBox(
                      width: 20,
                    ),
                    Radio(
                      value: 'Female',
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
                );
              },
            )
          ],
        ),
      ),
      actions: [
        SizedBox(
          width: MediaQuery.of(context).size.width * 0.25,
          child: ElevatedButton(
            onPressed: () {
              Navigator.of(context).pop();
            },
            child: const Text('CANCEL'),
          ),
        ),
        SizedBox(
          width: MediaQuery.of(context).size.width * 0.25,
          child: ElevatedButton(
            onPressed: () {
              Navigator.of(context).pop();
            },
            child: const Text('SAVE'),
          ),
        ),
        const SizedBox(width: 8)
      ],
    );
  }
}
