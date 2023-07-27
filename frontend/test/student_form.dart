import 'package:flutter/cupertino.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:frontend/ui/widget/student_form.dart';

void main() {
  test('validateTextFields() should return true when the text field is valid',
      () {
    // Arrange
    TextEditingController nameController = TextEditingController();
    nameController.text = 'John Doe';

    // Act
    bool isValid = validateTextFields(true, 'name');

    // Assert
    expect(isValid, true);
  });

  test(
      'validateTextFields() should return false when the text field is invalid',
      () {
    // Arrange
    TextEditingController nameController = TextEditingController();
    nameController.text = 'invalid name';

    // Act
    bool isValid = validateTextFields(true, 'name');

    // Assert
    expect(isValid, false);
  });
}
