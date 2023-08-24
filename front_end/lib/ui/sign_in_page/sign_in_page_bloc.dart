import 'package:flutter_bloc/flutter_bloc.dart';

import 'sign_in_page_event.dart';
import 'sign_in_page_state.dart';

class SignInPageScreenBloc extends Bloc<SignInPageEvent, SignInPageState> {
  SignInPageScreenBloc() : super(SignInPageState.initialState);
}
