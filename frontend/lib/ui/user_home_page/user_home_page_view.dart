import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/model/user.dart';
import 'package:frontend/ui/sign_in_page/sign_in_page_provider.dart';
import 'package:frontend/ui/user_home_page/user_home_page_bloc.dart';
import 'package:frontend/ui/user_home_page/user_home_page_event.dart';
import 'package:frontend/ui/user_home_page/user_home_page_state.dart';
import 'package:frontend/ui/widget/user_card.dart';
import 'package:frontend/ui/widget/user_form.dart';

class UserHomePageView extends StatelessWidget {
  const UserHomePageView({super.key});

  @override
  Widget build(BuildContext context) {
    UserHomePageBloc userHomePageBloc =
        BlocProvider.of<UserHomePageBloc>(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Users'),
        toolbarHeight: MediaQuery.of(context).size.height * 0.1,
        backgroundColor: Colors.black87,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              userHomePageBloc.add(
                SignOutEvent(),
              );
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => SignInPageProvider(),
                ),
              );
            },
          ),
          const SizedBox(
            width: 20,
          )
        ],
      ),
      body: SingleChildScrollView(
        child: Container(
          height: MediaQuery.of(context).size.height,
          width: double.infinity,
          alignment: Alignment.center,
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage(
                'assets/images/background.jpg',
              ),
              fit: BoxFit.cover,
            ),
          ),
          padding: const EdgeInsetsDirectional.fromSTEB(10, 20, 10, 20),
          child: Column(
            children: [
              SizedBox(
                width: MediaQuery.of(context).size.width * 0.9,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(40),
                    ),
                    backgroundColor: Colors.black87,
                  ),
                  onPressed: () {
                    showDialog(
                      context: context,
                      builder: (context) {
                        return const UserForm();
                      },
                    );
                  },
                  child: const Padding(
                    padding: EdgeInsetsDirectional.fromSTEB(20, 10, 20, 10),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.add,
                          color: Colors.white,
                        ),
                        SizedBox(
                          width: 10,
                        ),
                        Text(
                          "Add User",
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.normal,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(
                height: 50,
              ),
              BlocBuilder<UserHomePageBloc, UserHomePageState>(
                buildWhen: (
                  previous,
                  current,
                ) =>
                    current.users != previous.users,
                builder: (
                  context,
                  state,
                ) {
                  final List<User> userList = state.users;
                  return SizedBox(
                    height: MediaQuery.of(context).size.height * 0.58,
                    child: ListView.builder(
                      shrinkWrap: true,
                      itemCount: userList.length,
                      itemBuilder: (
                        context,
                        index,
                      ) {
                        return UserCard(
                          user: userList[index],
                        );
                      },
                    ),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
