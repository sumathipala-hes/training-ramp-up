import 'package:flutter/material.dart';
import 'package:front_end/model/student_model.dart';
import 'package:intl/intl.dart';

import '../../theme/primary_theme.dart';

class StudentPopupModalView extends StatefulWidget {
  const StudentPopupModalView({super.key, required this.student});
  final Student student;

  @override
  // ignore: library_private_types_in_public_api
  _StudentPopupModalViewState createState() => _StudentPopupModalViewState();
}

class _StudentPopupModalViewState extends State<StudentPopupModalView> {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController addressController = TextEditingController();
  final TextEditingController mobileNoController = TextEditingController();
  final TextEditingController dateController = TextEditingController();
  String selectedGender = "Male";
  int age = 0;

  @override
  void initState() {
    super.initState();
    nameController.text = widget.student.name;
    addressController.text = widget.student.address;
    mobileNoController.text = widget.student.mobileNumber;
    dateController.text = DateFormat('EEE MMM d yyyy').format(
      widget.student.dob,
    );
    selectedGender = widget.student.gender;
  }

  int calculateAge() {
    final DateTime birthDate = widget.student.dob;
    final currentDate = DateTime.now();
    age = currentDate.year - birthDate.year;
    if (currentDate.month < birthDate.month ||
        (currentDate.month == birthDate.month &&
            currentDate.day < birthDate.day)) {
      age--;
    }
    return age;
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15.0),
      ),
      title: SizedBox(
        width: MediaQuery.of(context).size.width * 0.8,
        child: Center(
          child: Column(
            children: [
              Text(
                "${widget.student.name} Details",
                style: headerText2,
              ),
              const SizedBox(
                height: 5,
              ),
              Text(
                age == 0 ? "Age: ${calculateAge()}" : "Age: $age",
                style: headerText3,
              ),
            ],
          ),
        ),
      ),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const SizedBox(height: 10),
          TextField(
            enabled: false,
            controller: nameController,
            decoration: InputDecoration(
              labelText: "Student Name",
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
            enabled: false,
            controller: addressController,
            decoration: InputDecoration(
              labelText: "Student Address",
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
            enabled: false,
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
          TextFormField(
            enabled: false,
            controller: dateController,
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
                  onChanged: (value) {},
                ),
                Text(
                  "Male",
                  style: textRedio,
                ),
                Radio(
                  value: "Female",
                  groupValue: selectedGender,
                  onChanged: (value) {},
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
      actions: [
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
