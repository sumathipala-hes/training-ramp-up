class ValidationUtils {
  static bool isValidEmail(String email) {
    return RegExp(r'^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$').hasMatch(email);
  }

  static bool isValidName(String name) {
    return RegExp(r'^[a-zA-Z ]+$').hasMatch(name);
  }

  static bool isValidPassword(String password) {
    return RegExp(r'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
        .hasMatch(password);
  }

  static bool isValidAddress(String address) {
    return RegExp(r'^[a-zA-Z0-9 ]+$').hasMatch(address);
  }

  static bool isValidMobileNumber(String mobileNo) {
    return RegExp(r'^(07(0|1|2|4|5|6|7|8)[0-9]{7})$').hasMatch(mobileNo);
  }

  static bool isFieldEmpty(String value) {
    return value.trim().isEmpty;
  }
}
