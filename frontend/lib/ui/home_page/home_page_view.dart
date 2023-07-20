import 'package:flutter/material.dart';

class HomepageView extends StatelessWidget {
  const HomepageView({super.key});

  @override
  Widget build(BuildContext context) {
    TextEditingController nameController = TextEditingController();
    TextEditingController addressController = TextEditingController();
    TextEditingController mobileController = TextEditingController();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Ramp Up'),
      ),
      body: Container(
        alignment: Alignment.center,
        child: Column(
          children: [
            ElevatedButton(
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      return AlertDialog(
                        title: const Text('Add New Student'),
                        content: Column(
                          children: [
                            TextField(
                              controller: nameController,
                              decoration: const InputDecoration(
                                border: OutlineInputBorder(),
                                labelText: 'Name',
                                hintText: 'Enter First Name',
                              ),
                            ),
                            TextField(
                              controller: addressController,
                              decoration: const InputDecoration(
                                border: OutlineInputBorder(),
                                labelText: 'Address',
                                hintText: 'Enter Address',
                              ),
                            ),
                            TextField(
                              controller: mobileController,
                              decoration: const InputDecoration(
                                border: OutlineInputBorder(),
                                labelText: 'Mobile',
                                hintText: 'Enter Mobile',
                              ),
                            ),
                            DatePickerDialog(
                                initialDate: DateTime.now(),
                                firstDate: DateTime.now(),
                                lastDate: DateTime.now())
                          ],
                        ),
                        actions: [
                          ElevatedButton(
                            onPressed: () {
                              print(nameController.text);
                              Navigator.of(context).pop();
                            },
                            child: const Text('CANCEL'),
                          ),
                          ElevatedButton(
                            onPressed: () {
                              Navigator.of(context).pop();
                            },
                            child: const Text('SAVE'),
                          ),
                        ],
                      );
                    },
                  );
                },
                child: const Text('ADD NEW STUDENT')),
          ],
        ),
      ),
    );
  }
}
