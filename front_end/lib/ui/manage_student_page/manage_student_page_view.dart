import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/models/student.dart';
import 'package:front_end/ui/home_page/home_page_bloc.dart';
import 'package:front_end/ui/home_page/home_page_event.dart';
import 'package:front_end/ui/manage_student_page/manage_student_page_bloc.dart';
import 'package:front_end/ui/manage_student_page/manage_student_page_event.dart';
import 'package:front_end/ui/manage_student_page/manage_student_page_state.dart';
import 'package:intl/intl.dart';

class ManageStudentScreen extends StatelessWidget {
  ManageStudentScreen({super.key, required this.student}) {
    nameController.text = student.studentName;
    addressController.text = student.studentAddress;
    mobileNumberController.text = student.studentMobile;
    dateController.text =
        DateFormat('EEE MMM d yyyy').format(student.studentDob);
  }
  final TextEditingController nameController = TextEditingController();
  final TextEditingController addressController = TextEditingController();
  final TextEditingController mobileNumberController = TextEditingController();
  final TextEditingController dateController = TextEditingController();
  final Student student;

  @override
  Widget build(BuildContext context) {
    ManageStudentScreenBloc manageStudentScreenBloc =
        BlocProvider.of<ManageStudentScreenBloc>(context);
    RampUpHomeScreenBloc rampUpHomeScreenBloc =
        BlocProvider.of<RampUpHomeScreenBloc>(context);
    return Scaffold(
      appBar: AppBar(
        elevation: 7,
        centerTitle: true,
        title: const Text('M A N A G E    S T U D E N T'),
      ),
      body: Container(
        height: double.infinity,
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/img/background.jpg'),
            fit: BoxFit.cover,
          ),
        ),
        child: Center(
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(35.0),
              child: Card(
                color: Colors.white.withOpacity(0.8),
                elevation: 5,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20.0),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: Column(
                    children: [
                      Text(
                        student.studentName.toUpperCase(),
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          fontSize: 26,
                          fontWeight: FontWeight.bold,
                          color: Color.fromARGB(255, 137, 91, 215),
                        ),
                      ),
                      const SizedBox(
                        height: 4,
                      ),
                      const Text(
                        'YEARS',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          color: Colors.grey,
                        ),
                      ),
                      const SizedBox(height: 20),
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
                        // onTap: () => _selectDate(context),
                        decoration: const InputDecoration(
                          labelText: "Date of Birth:",
                          suffixIcon: Icon(Icons.calendar_today),
                          border: InputBorder.none,
                          contentPadding: EdgeInsets.symmetric(
                            vertical: 12.0,
                            horizontal: 14.0,
                          ),
                        ),
                      ),
                      const SizedBox(height: 15),
                      BlocBuilder<ManageStudentScreenBloc,
                          ManageStudentScreenState>(
                        buildWhen: (previous, current) =>
                            current.gender != previous.gender,
                        builder: (context, state) {
                          return Row(
                            children: [
                              Radio(
                                value: "Male",
                                groupValue:
                                    manageStudentScreenBloc.state.gender,
                                onChanged: (value) {
                                  manageStudentScreenBloc.add(
                                    SelectGender(
                                      gender: value.toString(),
                                    ),
                                  );
                                },
                              ),
                              const Text("Male"),
                              Radio(
                                value: "Female",
                                groupValue:
                                    manageStudentScreenBloc.state.gender,
                                onChanged: (value) {
                                  manageStudentScreenBloc.add(
                                    SelectGender(
                                      gender: value.toString(),
                                    ),
                                  );
                                },
                              ),
                              const Text("Female"),
                            ],
                          );
                        },
                      ),
                      const SizedBox(height: 15),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          ElevatedButton(
                            onPressed: () {},
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.green,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(8.0),
                              ),
                              elevation: 4,
                            ),
                            child: const Text("Update"),
                          ),
                          const SizedBox(width: 10.0),
                          ElevatedButton(
                            onPressed: () {
                              Navigator.of(context).pop();
                              rampUpHomeScreenBloc.add(
                                DeleteStudent(
                                  id: student.studentId,
                                ),
                              );
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.red[400],
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(8.0),
                              ),
                              elevation: 4,
                            ),
                            child: const Text("Delete"),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
