import 'dart:async';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/ui/manage_user_page/manage_user_page_event.dart';
import 'package:frontend/ui/manage_user_page/manage_user_page_state.dart';

class ManageUserPageBloc
    extends Bloc<ManageUserPageEvent, ManageUserPageState> {
  ManageUserPageBloc() : super(ManageUserPageState.initialState) {
    on<SetRoleEvent>(_changeRole);
  }

  FutureOr<void> _changeRole(
      SetRoleEvent event, Emitter<ManageUserPageState> emit) {
    emit(
      state.clone(
        role: event.role,
      ),
    );
  }
}
