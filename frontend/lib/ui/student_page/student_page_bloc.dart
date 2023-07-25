import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/ui/student_page/student_page_event.dart';
import 'package:frontend/ui/student_page/student_page_state.dart';

class StudentPageBloc extends Bloc<StudentPageEvent, StudentPageState> {
  StudentPageBloc() : super(StudentPageState.initialState) {
    on<SetRadioButtons>(_setRadioButtons);
  }

  void _setRadioButtons(SetRadioButtons event, Emitter<StudentPageState> emit) {
    emit(
      state.clone(
        gender: event.gender,
      ),
    );
  }
}
