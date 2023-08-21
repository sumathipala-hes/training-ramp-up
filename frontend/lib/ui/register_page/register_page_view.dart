import 'package:flutter/material.dart';
import 'package:frontend/ui/home_page/home_page_provider.dart';
import 'package:frontend/ui/sign_in_page/sign_in_page_provider.dart';

class RegisterPageView extends StatelessWidget {
  const RegisterPageView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage(
                'assets/images/sign-in-image.jpg',
              ),
              fit: BoxFit.cover,
            ),
          ),
          alignment: Alignment.center,
          child: Center(
            child: SizedBox(
              width: MediaQuery.of(context).size.width * 0.9,
              height: MediaQuery.of(context).size.height * 1,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'REGISTER',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 40,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  const TextField(
                    decoration: InputDecoration(
                      hintText: 'Full Name',
                      hintStyle: TextStyle(
                        color: Colors.white,
                      ),
                      filled: true,
                      fillColor: Color.fromARGB(70, 0, 0, 0),
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.all(
                          Radius.circular(40),
                        ),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.all(
                          Radius.circular(40),
                        ),
                      ),
                    ),
                    style: TextStyle(
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  const TextField(
                    decoration: InputDecoration(
                      hintText: 'Email',
                      hintStyle: TextStyle(
                        color: Colors.white,
                      ),
                      filled: true,
                      fillColor: Color.fromARGB(70, 0, 0, 0),
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.all(
                          Radius.circular(40),
                        ),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.all(
                          Radius.circular(40),
                        ),
                      ),
                    ),
                    style: TextStyle(
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  const TextField(
                    obscureText: true,
                    decoration: InputDecoration(
                      hintText: 'Password',
                      hintStyle: TextStyle(
                        color: Colors.white,
                      ),
                      filled: true,
                      fillColor: Color.fromARGB(70, 0, 0, 0),
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.all(
                          Radius.circular(40),
                        ),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.all(
                          Radius.circular(40),
                        ),
                      ),
                    ),
                    style: TextStyle(
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  const TextField(
                    obscureText: true,
                    decoration: InputDecoration(
                      hintText: 'Confirm Password',
                      hintStyle: TextStyle(
                        color: Colors.white,
                      ),
                      filled: true,
                      fillColor: Color.fromARGB(70, 0, 0, 0),
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.all(
                          Radius.circular(40),
                        ),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.all(
                          Radius.circular(40),
                        ),
                      ),
                    ),
                    style: TextStyle(
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.9,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(40),
                        ),
                        backgroundColor: Colors.white,
                      ),
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const HomePageProvider(),
                          ),
                        );
                      },
                      child: const Padding(
                        padding: EdgeInsetsDirectional.fromSTEB(20, 10, 20, 10),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.person_add,
                              color: Colors.black87,
                            ),
                            SizedBox(
                              width: 10,
                            ),
                            Text(
                              'Sign Up',
                              style: TextStyle(
                                color: Colors.black87,
                                fontSize: 20,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 40,
                  ),
                  const Text(
                    'Already have an account?',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
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
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const SignInPageProvider(),
                          ),
                        );
                      },
                      child: const Padding(
                        padding: EdgeInsetsDirectional.fromSTEB(20, 10, 20, 10),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.login,
                              color: Colors.white,
                            ),
                            SizedBox(
                              width: 10,
                            ),
                            Text(
                              'Login',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 20,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
