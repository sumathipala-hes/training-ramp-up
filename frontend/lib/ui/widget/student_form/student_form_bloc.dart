import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/ui/widget/student_form/student_form_event.dart';
import 'package:frontend/ui/widget/student_form/student_form_state.dart';

class StudentFormBloc extends Bloc<StudentFormEvent, StudentFormState> {
  StudentFormBloc() : super(StudentFormState.initialState) {
    on<SetRadioButtons>(_setRadioButtons);
  }

  void _setRadioButtons(SetRadioButtons event, Emitter<StudentFormState> emit) {
    emit(
      state.clone(
        maleOrFemale: event.maleOrFemale,
      ),
    );
  }
}
