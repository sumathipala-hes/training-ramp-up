import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/ui/manage_student_page/manage_student_page_event.dart';
import 'package:frontend/ui/manage_student_page/manage_student_page_state.dart';

class ManageStudentPageBloc
    extends Bloc<ManageStudentPageEvent, ManageStudentPageState> {
  ManageStudentPageBloc() : super(ManageStudentPageState.initialState) {
    on<SetRadioButtons>(_setRadioButtons);
    on<SetValidations>(_setIsValidate);
    on<SetGender>(_setGender);
  }

  void _setRadioButtons(
    SetRadioButtons event,
    Emitter<ManageStudentPageState> emit,
  ) {
    emit(
      state.clone(
        gender: event.gender,
      ),
    );
  }

  void _setIsValidate(
    SetValidations event,
    Emitter<ManageStudentPageState> emit,
  ) {
    emit(
      state.clone(
        nameError: event.nameError,
        addressError: event.addressError,
        mobileError: event.mobileError,
      ),
    );
  }

  void _setGender(
    SetGender event,
    Emitter<ManageStudentPageState> emit,
  ) {
    emit(
      state.clone(
        gender: event.gender,
      ),
    );
  }
}
