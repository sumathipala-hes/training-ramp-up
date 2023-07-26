import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:ramp_up/theme/primary_theme.dart';

class AlertTextField {
  static void showSaveAlert(String message) {
    Fluttertoast.showToast(
        msg: message,
        toastLength: Toast.LENGTH_LONG,
        gravity: ToastGravity.TOP,
        backgroundColor: Colors.green,
        textColor: Colors.white,
        timeInSecForIosWeb: 1,
        fontSize: 16.0);
  }

  static void showFieldError(String message) {
    Fluttertoast.showToast(
        msg: message,
        toastLength: Toast.LENGTH_LONG,
        gravity: ToastGravity.TOP,
        backgroundColor: Colors.red,
        textColor: Colors.white,
        timeInSecForIosWeb: 1,
        fontSize: 16.0);
  }

  static Future<bool?> showYesNoAlert(BuildContext context) async {
    return showDialog<bool>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12.0),
          ),
          title: Text('Confirmation', style: headerText2),
          content: Text(
            'Do you want to continue ?',
            style: headerText3,
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(true);
              },
              child: Text(
                'Yes',
                style: labelText2,
              ),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(false);
              },
              child: Text(
                'No',
                style: labelText2,
              ),
            ),
          ],
        );
      },
    );
  }
}
