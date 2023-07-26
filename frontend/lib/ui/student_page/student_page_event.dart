abstract class StudentPageEvent {}

class SetRadioButtons extends StudentPageEvent {
  final String gender;

  SetRadioButtons({
    required this.gender,
  });
}

class SetValidations extends StudentPageEvent {
  final String nameError;
  final String addressError;
  final String mobileError;

  SetValidations({
    required this.nameError,
    required this.addressError,
    required this.mobileError,
  });
}
