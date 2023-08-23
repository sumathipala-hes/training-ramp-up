import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/ui/register_page/register_page_event.dart';
import 'package:frontend/ui/register_page/register_page_state.dart';

class RegisterPageBloc extends Bloc<RegisterPageEvent, RegisterPageState> {
  RegisterPageBloc() : super(const RegisterPageState());
}
