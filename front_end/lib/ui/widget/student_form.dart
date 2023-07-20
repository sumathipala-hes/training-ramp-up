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
      title: const Text("Pop-up Model"),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextField(
            controller: nameController,
            decoration: const InputDecoration(labelText: "Name :"),
          ),
          TextField(
            controller: addressController,
            decoration: const InputDecoration(labelText: "Address :"),
          ),
          TextField(
            controller: mobileNoController,
            decoration: const InputDecoration(labelText: "Mobile :"),
          ),
          TextFormField(
            controller: dateController,
            onTap: () {
              _selectDate(context);
            },
            decoration: const InputDecoration(
              labelText: "Date",
              suffixIcon: Icon(Icons.calendar_today),
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Radio(
                value: "Male",
                groupValue: selectedGender,
                onChanged: (value) {
                  setState(() {
                    selectedGender = value!;
                  });
                },
              ),
              const Text("Male"),
              Radio(
                value: "Female",
                groupValue: selectedGender,
                onChanged: (value) {
                  setState(() {
                    selectedGender = value!;
                  });
                },
              ),
              const Text("Female"),
            ],
          ),
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
            FlutterLogs.logInfo('Date : $date', 'Gender : $gender', '',);

            Navigator.of(context).pop();
          },
          child: const Text("Save"),
        ),
        TextButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: const Text("Cancel"),
        ),
      ],
    );
  }
}
