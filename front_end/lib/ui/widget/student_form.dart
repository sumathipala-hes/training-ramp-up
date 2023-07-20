import 'package:flutter/material.dart';
import 'package:flutter_logs/flutter_logs.dart';

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

    if (picked != null && picked != selectedDate) {
      setState(() {
        selectedDate = picked;
        dateController.text = selectedDate.toString();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15.0)),
      title: const SizedBox(
        width: 400,
        child: Center(
          child: Text(
            "ADD NEW STUDENT",
            style: TextStyle(
                fontSize: 18, fontWeight: FontWeight.bold, color: Colors.blue),
          ),
        ),
      ),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextField(
            controller: nameController,
            decoration: const InputDecoration(
              labelText: "Name :",
              labelStyle: TextStyle(
                  color: Colors.black,
                  fontSize: 17,
                  fontWeight: FontWeight.bold),
            ),
          ),
          TextField(
            controller: addressController,
            decoration: const InputDecoration(
              labelText: "Address :",
              labelStyle: TextStyle(
                  color: Colors.black,
                  fontSize: 17,
                  fontWeight: FontWeight.bold),
            ),
          ),
          TextField(
            controller: mobileNoController,
            decoration: const InputDecoration(
              labelText: "Mobile :",
              labelStyle: TextStyle(
                  color: Colors.black,
                  fontSize: 17,
                  fontWeight: FontWeight.bold),
            ),
          ),
          TextFormField(
            controller: dateController,
            onTap: () {
              _selectDate(context);
            },
            decoration: const InputDecoration(
              labelText: "Date :",
              labelStyle: TextStyle(
                  color: Colors.black,
                  fontSize: 17,
                  fontWeight: FontWeight.bold),
              suffixIcon: Icon(Icons.calendar_today),
            ),
          ),
          const SizedBox(height: 16),
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
                const Text(
                  "Male",
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
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
                const Text(
                  "Female",
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
              ],
            ),
          )
        ],
      ),
      actions: [
        TextButton(
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
          child: const Text(
            "SAVE",
            style: TextStyle(
                fontSize: 16, fontWeight: FontWeight.bold, color: Colors.blue),
          ),
        ),
        TextButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: const Text(
            "CANCEL",
            style: TextStyle(
                fontSize: 16, fontWeight: FontWeight.bold, color: Colors.red),
          ),
        ),
      ],
    );
  }
}
