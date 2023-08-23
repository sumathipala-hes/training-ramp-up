abstract class ManageStudentPageEvent {}

class SetRadioButtons extends ManageStudentPageEvent {
  final String gender;

  SetRadioButtons({
    required this.gender,
  });
}

class SetValidations extends ManageStudentPageEvent {
  final String nameError;
  final String addressError;
  final String mobileError;

  SetValidations({
    required this.nameError,
    required this.addressError,
    required this.mobileError,
  });
}

class SetGender extends ManageStudentPageEvent {
  final String gender;

  SetGender({
    required this.gender,
  });
}
