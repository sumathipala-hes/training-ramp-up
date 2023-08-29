class ValidationUtil {
  static final RegExp nameRegExp = RegExp(r'^[A-z ]{5,20}$');
  static final RegExp addressRegExp = RegExp(r'^[0-9/A-z. ,]{5,}$');
  static final RegExp mobileRegExp = RegExp(r'^[0-9]+$');
  static final RegExp dobRegExp = RegExp(r'^[A-Za-z ]+$');
  static final RegExp emailRegExp = RegExp(r'^[A-z0-9@.]+$');
  static final RegExp passwordRegExp = RegExp(r'^[A-z0-9@.]+$');

  static bool isValidExp(
    RegExp exp,
    String textFieldValue,
  ) {
    return exp.hasMatch(
      textFieldValue,
    );
  }
}
