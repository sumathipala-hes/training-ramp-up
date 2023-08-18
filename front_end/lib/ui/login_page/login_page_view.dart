import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:front_end/ui/home_page/home_page_view.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../theme/primary_theme.dart';

class LoginPageView extends StatelessWidget {
  const LoginPageView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/images/bg.png'),
            fit: BoxFit.cover,
          ),
        ),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 5, sigmaY: 5),
          child: Container(
            color: Colors.black.withOpacity(0.3),
            child: Center(
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      width: MediaQuery.of(context).size.width * 0.8,
                      height: MediaQuery.of(context).size.height * 0.4,
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.8),
                        borderRadius: BorderRadius.circular(20.0),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(23.0),
                        child: Column(
                          children: [
                            Text(
                              'SIGN IN ',
                              style: TextStyle(
                                fontSize: 30.0,
                                fontFamily: GoogleFonts.poppins().fontFamily,
                                fontWeight: FontWeight.bold,
                                color: Colors.black.withOpacity(0.8),
                              ),
                            ),
                            const SizedBox(height: 30.0),
                            TextField(
                              decoration: InputDecoration(
                                border: const OutlineInputBorder(
                                  borderRadius: BorderRadius.all(
                                    Radius.circular(15),
                                  ),
                                ),
                                labelText: '   Email',
                                labelStyle: labelText,
                              ),
                            ),
                            const SizedBox(height: 20.0),
                            TextField(
                              obscureText: true,
                              decoration: InputDecoration(
                                border: const OutlineInputBorder(
                                  borderRadius: BorderRadius.all(
                                    Radius.circular(15),
                                  ),
                                ),
                                labelText: '   Password',
                                labelStyle: labelText,
                              ),
                            ),
                            const SizedBox(height: 25.0),
                            SizedBox(
                              width: double.infinity,
                              height: MediaQuery.of(context).size.height * 0.05,
                              child: ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                  backgroundColor:
                                      Colors.black.withOpacity(0.8),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(15.0),
                                  ),
                                ),
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) =>
                                            const HomePageView()),
                                  );
                                },
                                child: Row(
                                  // Wrap both text and icon in a Row
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Text(
                                      'CONTINUE  ',
                                      style: textButton2,
                                    ),
                                    const Icon(
                                      Icons.arrow_forward,
                                      color: Colors.white,
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
