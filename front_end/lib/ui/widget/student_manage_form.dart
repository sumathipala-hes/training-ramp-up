import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class PopupModel extends StatefulWidget {
  const PopupModel({Key? key}) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _PopupModelState createState() => _PopupModelState();
}

class _PopupModelState extends State<PopupModel> {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController addressController = TextEditingController();
  final TextEditingController mobileNumberController = TextEditingController();
  final TextEditingController dateController = TextEditingController();

  String selectedGender = "Male";

  void _saveForm() {
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0),
      ),
      title: const Center(
        child: Text("ADD NEW STUDENT"),
      ),
      content: SizedBox(
        width: MediaQuery.of(context).size.width * 0.8,
        child: SingleChildScrollView(
          child: Column(
            children: [
              TextField(
                controller: nameController,
                decoration: const InputDecoration(
                  labelText: "Name:",
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(
                      Radius.circular(8.0),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 15),
              TextField(
                controller: addressController,
                decoration: const InputDecoration(
                  labelText: "Address:",
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(
                      Radius.circular(8.0),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 15),
              TextField(
                controller: mobileNumberController,
                decoration: const InputDecoration(
                  labelText: "Mobile:",
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(
                      Radius.circular(8.0),
                    ),
                  ),
                ),
              ),
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
        ),
      ),
      actions: [
        ElevatedButton(
          onPressed: _saveForm,
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.green,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8.0),
            ),
            elevation: 4,
          ),
          child: const Text("Save"),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8.0),
          child: ElevatedButton(
            onPressed: () => Navigator.of(context).pop(),
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.grey[700],
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8.0),
              ),
              elevation: 4,
            ),
            child: const Text("Cancel"),
          ),
        )
      ],
    );
  }
}
