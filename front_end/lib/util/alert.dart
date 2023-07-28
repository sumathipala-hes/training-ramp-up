import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

class AlertShowToast {
  static void showToast(String message, Color? customColor) {
    Fluttertoast.showToast(
      msg: message,
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      timeInSecForIosWeb: 1,
      backgroundColor: customColor,
      textColor: Colors.white,
      fontSize: 16.0,
    );
  }
}
