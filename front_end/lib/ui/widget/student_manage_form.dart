import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/ui/home_page/home_page_bloc.dart';
import 'package:front_end/ui/home_page/home_page_event.dart';
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
  DateTime selectedDate = DateTime.now();

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: selectedDate,
      firstDate: DateTime(1995),
      lastDate: DateTime.now(),
    );

    if (picked != null && picked != selectedDate) {
      setState(
        () {
          selectedDate = picked;
          dateController.text =
              DateFormat('EEE MMM d yyyy').format(selectedDate);
        },
      );
    }
  }

  void _saveForm() {
    final name = nameController.text.trim();
    final address = addressController.text.trim();
    final mobileNo = mobileNumberController.text.trim();
    final date = dateController.text.trim();
    final gender = selectedGender;

    if (name.isEmpty ||
        address.isEmpty ||
        mobileNo.isEmpty ||
        date.isEmpty ||
        gender.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Please fill all the fields"),
        ),
      );
    } else {
      Navigator.of(context).pop();
      RampUpHomeScreenBloc bloc =
          BlocProvider.of<RampUpHomeScreenBloc>(context);

      bloc.add(
        SaveButtonPressed(
          studentId: "1",
          studentName: nameController.text,
          studentAddress: addressController.text,
          studentMobile: mobileNumberController.text,
          studentDob: selectedDate,
          studentGender: selectedGender,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0),
      ),
      content: SingleChildScrollView(
        child: SizedBox(
          width: MediaQuery.of(context).size.width * 0.9,
          child: Column(
            children: [
              const Text(
                "ADD NEW STUDENT",
                style: TextStyle(
                  fontSize: 26,
                  fontWeight: FontWeight.bold,
                  color: Color.fromARGB(255, 137, 91, 215),
                ),
              ),
              const SizedBox(height: 25),
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
              TextFormField(
                controller: dateController,
                readOnly: true,
                onTap: () => _selectDate(context),
                decoration: const InputDecoration(
                  labelText: "Date of Birth:",
                  suffixIcon: Icon(Icons.calendar_today),
                  border: InputBorder.none,
                  contentPadding:
                      EdgeInsets.symmetric(vertical: 12.0, horizontal: 14.0),
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
              const SizedBox(height: 15),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
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
