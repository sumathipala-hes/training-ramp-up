import 'package:bloc/bloc.dart';
import 'package:frontend/ui/widget/student_form/student_form_event.dart';
import 'package:frontend/ui/widget/student_form/student_form_state.dart';

class StudentFormBloc extends Bloc<StudentFormEvent, StudentFormState> {
  StudentFormBloc() : super(StudentFormState.initialState) {}
}
