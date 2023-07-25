import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:intl/intl.dart';

import '../../theme/primary_theme.dart';
import '../home_page/home_page_bloc.dart';
import '../home_page/home_page_event.dart';

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
  bool isSaveButtonEnabled = false;

  static final RegExp _nameRegExp = RegExp(r'^[a-zA-Z ]+$');
  static final RegExp _telNoRegExp = RegExp(r'^(07(0|1|2|4|5|6|7|8)[0-9]{7})$');
  static final RegExp _addressRegExp = RegExp(r'^[a-zA-Z0-9 ]+$');

  String selectedGender = "Male";
  DateTime selectedDate = DateTime(2005, 1, 1);

  void clear() {
    nameController.clear();
    addressController.clear();
    mobileNoController.clear();
    dateController.clear();
  }

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

  bool isNumeric(String value) {
    // ignore: unnecessary_null_comparison
    if (value == null) {
      return false;
    }
    return double.tryParse(value) != null;
  }

  @override
  void initState() {
    super.initState();
    nameController.addListener(_updateSaveButton);
    addressController.addListener(_updateSaveButton);
    mobileNoController.addListener(_updateSaveButton);
    dateController.addListener(_updateSaveButton);
  }

  void _updateSaveButton() {
    final isAnyFieldEmpty = nameController.text.trim().isEmpty ||
        addressController.text.trim().isEmpty ||
        mobileNoController.text.trim().isEmpty ||
        dateController.text.trim().isEmpty;

    final isMobileNumberValid = isNumeric(mobileNoController.text.trim());

    setState(() {
      isSaveButtonEnabled = !isAnyFieldEmpty &&
          isMobileNumberValid &&
          _nameRegExp.hasMatch(
            nameController.text.trim(),
          ) &&
          _addressRegExp.hasMatch(
            addressController.text.trim(),
          ) &&
          _telNoRegExp.hasMatch(
            mobileNoController.text.trim(),
          );
    });
  }

  @override
  Widget build(BuildContext context) {
    HomePageBloc homePageBloc = BlocProvider.of<HomePageBloc>(context);

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
          onPressed: isSaveButtonEnabled
              ? () {
                  homePageBloc.add(SaveStudent(
                    id: '100',
                    name: nameController.text.trim(),
                    address: addressController.text.trim(),
                    mobileNo: mobileNoController.text.trim(),
                    date: dateController.text.trim(),
                    gender: selectedGender,
                  ));
                  clear();
                  Navigator.of(context).pop();
                }
              : null,
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
