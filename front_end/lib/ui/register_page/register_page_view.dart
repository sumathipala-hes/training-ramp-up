import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/ui/admin_home_page/admin_home_page_provider.dart';
import 'package:front_end/ui/admin_home_page/admin_home_page_view.dart';
import 'package:front_end/ui/register_page/register_page_bloc.dart';
import 'package:front_end/ui/register_page/register_page_event.dart';
import 'package:front_end/ui/register_page/register_page_state.dart';
import 'package:front_end/ui/sign_in_page/sign_in_page_provider.dart';
// import 'package:front_end/ui/user_home_page/user_home_page_provider.dart';
import 'package:intl/intl.dart';

// import 'package:intl/intl.dart';

// ignore: must_be_immutable
class RegisterScreen extends StatelessWidget {
  RegisterScreen({super.key});

  final TextEditingController nameController = TextEditingController();
  final TextEditingController addressController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController mobileNumberController = TextEditingController();
  final TextEditingController dateController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController =
      TextEditingController();

  DateTime dob = DateTime.now();

  @override
  Widget build(BuildContext context) {
    RegisterScreenBloc registerScreenBloc =
        BlocProvider.of<RegisterScreenBloc>(context);
    return Scaffold(
      appBar: AppBar(
        elevation: 7,
        centerTitle: true,
        title: const Text('R E G I S T E R'),
        toolbarHeight: MediaQuery.of(context).size.height * 0.1,
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
              padding: const EdgeInsets.all(20.0),
              child: Card(
                color: Colors.white.withOpacity(0.8),
                elevation: 5,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20.0),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: Column(
                    children: [
                      TextField(
                        controller: nameController,
                        decoration: const InputDecoration(
                          labelText: "User Name:",
                          prefixIcon: Icon(Icons.person),
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
                          labelText: "User Address:",
                          prefixIcon: Icon(Icons.location_on),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(
                              Radius.circular(8.0),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 15),
                      TextField(
                        controller: emailController,
                        decoration: const InputDecoration(
                          labelText: "User Email:",
                          prefixIcon: Icon(Icons.email),
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
                          prefixIcon: Icon(Icons.mobile_friendly_rounded),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(
                              Radius.circular(8.0),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 5),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            flex: 2,
                            child: TextFormField(
                              controller: dateController,
                              readOnly: true,
                              onTap: () => _selectDate(context),
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
                          ),
                          const SizedBox(width: 25),
                          Expanded(
                            flex: 3,
                            child: BlocBuilder<RegisterScreenBloc,
                                RegisterScreenState>(
                              buildWhen: (previous, current) =>
                                  current.gender != previous.gender,
                              builder: (context, state) {
                                return Row(
                                  children: [
                                    Radio(
                                      value: "Male",
                                      groupValue:
                                          registerScreenBloc.state.gender,
                                      onChanged: (value) {
                                        registerScreenBloc.add(
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
                                          registerScreenBloc.state.gender,
                                      onChanged: (value) {
                                        registerScreenBloc.add(
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
                          ),
                        ],
                      ),
                      const SizedBox(height: 15),
                      TextField(
                        controller: passwordController,
                        decoration: const InputDecoration(
                          labelText: "Create Password:",
                          prefixIcon: Icon(Icons.lock),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(
                              Radius.circular(8.0),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 15),
                      TextField(
                        controller: confirmPasswordController,
                        decoration: const InputDecoration(
                          labelText: "Confirm Password:",
                          prefixIcon: Icon(Icons.lock),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(
                              Radius.circular(8.0),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 25),
                      SizedBox(
                        width: double.infinity,
                        height: MediaQuery.of(context).size.height * 0.05,
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.deepPurple[400],
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(15.0),
                            ),
                          ),
                          onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                // builder: (context) => UserHomeScreenProvider(),
                                builder: (context) => const AdminHomeScreenProvider(),
                              ),
                            );
                          },
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                'Register '.toUpperCase(),
                                style: const TextStyle(
                                  fontWeight: FontWeight.w400,
                                ),
                              ),
                              const Icon(
                                Icons.arrow_forward,
                                color: Colors.white,
                              ),
                            ],
                          ),
                        ),
                      ),
                      const SizedBox(height: 15),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            'Already A Register ? ',
                            style: TextStyle(
                              fontSize: 15.0,
                              fontWeight: FontWeight.bold,
                              color: Colors.black.withOpacity(0.6),
                            ),
                          ),
                          TextButton(
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) =>
                                      const SignInPageProvider(),
                                ),
                              );
                            },
                            child: Text(
                              'Sign in'.toUpperCase(),
                              style: TextStyle(
                                fontSize: 16.0,
                                fontWeight: FontWeight.bold,
                                color: Colors.deepPurple[400],
                              ),
                            ),
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

  _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime(DateTime.now().year - 28),
      firstDate: DateTime(DateTime.now().year - 60),
      lastDate: DateTime(DateTime.now().year - 28),
    );

    if (picked != null) {
      dateController.text = DateFormat('EEE MMM d yyyy').format(picked);
      dob = picked;
    }
  }
}
