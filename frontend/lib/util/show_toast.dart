import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

import '../ui/theme/colors.dart';

showToast(message) {
  Fluttertoast.showToast(
    msg: message,
    toastLength: Toast.LENGTH_LONG,
    gravity: ToastGravity.CENTER,
    timeInSecForIosWeb: 1,
    backgroundColor: AppColors.successColor,
    textColor: Colors.white,
    fontSize: 16.0,
  );
}
