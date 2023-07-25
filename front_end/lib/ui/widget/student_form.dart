import 'package:flutter/material.dart';
import 'package:flutter_logs/flutter_logs.dart';
import 'package:intl/intl.dart';

import '../../theme/primary_theme.dart';

class PopupModel extends StatefulWidget {
  const PopupModel({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _PopupModelState createState() => _PopupModelState();
}

class _PopupModelState extends State<PopupModel> {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController addressController = TextEditingController();
  final TextEditingController mobileNoController = TextEditingController();
  final TextEditingController dateController = TextEditingController();

  String selectedGender = "Male";
  DateTime selectedDate = DateTime(2005, 1, 1);

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: selectedDate,
      firstDate: DateTime(1995),
      lastDate: DateTime(2005),
    );

    dateController.text = DateFormat('EEE MMM d yyyy').format(
      picked ?? DateTime.now(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15.0),
      ),
      title: SizedBox(
        width: 400,
        child: Center(
          child: Text(
            "ADD NEW STUDENT",
            style: headerText,
          ),
        ),
      ),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const SizedBox(height: 10),
          TextField(
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
            controller: dateController,
            onTap: () {
              _selectDate(context);
            },
            decoration: InputDecoration(
              labelText: "Date",
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
      actions: [
        ElevatedButton(
          onPressed: () {
            final name = nameController.text.trim();
            final address = addressController.text.trim();
            final mobileNo = mobileNoController.text.trim();
            final date = dateController.text.trim();
            final gender = selectedGender;

            FlutterLogs.logInfo(
              'Name : $name',
              'Address : $address',
              'Mobile NO : $mobileNo',
            );
            FlutterLogs.logInfo(
              'Date : $date',
              'Gender : $gender',
              '',
            );

            Navigator.of(context).pop();
          },
          style: saveButton,
          child: Text(
            "SAVE",
            style: textButton,
          ),
        ),
        ElevatedButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          style: cancelButton,
          child: Text(
            "CANCEL",
            style: textButton,
          ),
        ),
      ],
    );
  }
}
