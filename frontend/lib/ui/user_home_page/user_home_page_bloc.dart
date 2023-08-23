import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/ui/user_home_page/user_home_page_event.dart';
import 'package:frontend/ui/user_home_page/user_home_page_state.dart';

class UserHomePageBloc extends Bloc<UserHomePageEvent, UserHomePageState> {
  UserHomePageBloc() : super(UserHomePageState());
}
