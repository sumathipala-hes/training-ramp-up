import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/ui/sign_in_page/sign_in_page_provider.dart';
import 'package:front_end/ui/user_home_page/user_home_page_bloc.dart';
import 'package:front_end/ui/user_home_page/user_home_page_state.dart';
import 'package:front_end/ui/widget/student_card.dart';

class UserHomeScreen extends StatelessWidget {
  const UserHomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 7,
        centerTitle: true,
        title: const Text('R A M P   U P   U S E R'),
        actions: [
          IconButton(
            icon: const Icon(Icons.share),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => const SignInPageProvider()),
              );
            },
          ),
        ],
      ),
      body: Container(
        height: double.infinity,
        width: double.infinity,
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/img/background.jpg'),
            fit: BoxFit.cover,
          ),
        ),
        child: Column(
          children: [
            const SizedBox(height: 30),
            Expanded(
              child: SingleChildScrollView(
                child: BlocBuilder<UserHomeScreenBloc, UserHomeState>(
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
