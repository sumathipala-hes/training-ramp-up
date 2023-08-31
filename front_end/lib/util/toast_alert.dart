import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

toastAlert(msg) {
  Fluttertoast.showToast(
    msg: msg,
    toastLength: Toast.LENGTH_SHORT,
    gravity: ToastGravity.BOTTOM,
    timeInSecForIosWeb: 1,
    backgroundColor: Colors.red[400],
    textColor: Colors.white,
    fontSize: 16.0,
  );
}
