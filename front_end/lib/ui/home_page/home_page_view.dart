import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/ui/home_page/home_page_bloc.dart';
import 'package:front_end/ui/home_page/home_page_state.dart';
import 'package:front_end/ui/widget/student_card.dart';
import 'package:front_end/ui/widget/student_manage_form.dart';

class RampUpHomeScreen extends StatelessWidget {
  const RampUpHomeScreen({Key? key}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.deepPurple[300],
        elevation: 7,
        centerTitle: true,
        // title: const Text('R A M P   U P'),
        actions: [
          IconButton(
            icon: const Icon(Icons.share),
            onPressed: () {},
          ),
        ],
      ),
      body: Container(
        height: double.infinity,
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/img/background.jpg'),
            fit: BoxFit.cover,
          ),
        ),
        child: Column(
          children: [
            const SizedBox(height: 30),
            Center(
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.grey[700],
                  elevation: 5,
                  fixedSize: const Size(170, 40),
                  shape: const RoundedRectangleBorder(
                    borderRadius: BorderRadius.all(
                      Radius.circular(10),
                    ),
                  ),
                ),
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (context) => const PopupModel(),
                  );
                },
                child: const Text(
                  'ADD NEW STUDENT',
                  style: TextStyle(
                    fontSize: 15.0,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 30),
            Expanded(
              child: SingleChildScrollView(
                child: BlocBuilder<RampUpHomeScreenBloc, RampUpHomeState>(
                  buildWhen: (previous, current) =>
                      previous.entries != current.entries,
                  builder: (context, state) {
                    return Column(
                      children: state.entries.map(
                        (entry) {
                          return StudentCard(
                            student: entry,
                          );
                        },
                      ).toList(),
                    );
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
