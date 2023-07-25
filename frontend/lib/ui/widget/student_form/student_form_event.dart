abstract class StudentFormEvent {}

class SetRadioButtons extends StudentFormEvent {
  final String maleOrFemale;

  SetRadioButtons({
    required this.maleOrFemale,
  });
}
