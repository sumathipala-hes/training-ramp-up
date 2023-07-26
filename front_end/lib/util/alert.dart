import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

class AlertTextField {
  static void showSaveAlert(String message) {
    Fluttertoast.showToast(
      msg: message,
      toastLength: Toast.LENGTH_LONG,
      gravity: ToastGravity.TOP,
      backgroundColor: Colors.red,
      textColor: Colors.white,
    );
  }
}
