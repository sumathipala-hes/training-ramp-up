abstract class StudentPageEvent {}

class SetRadioButtons extends StudentPageEvent {
  final String gender;

  SetRadioButtons({
    required this.gender,
  });
}
