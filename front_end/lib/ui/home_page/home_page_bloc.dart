import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/ui/home_page/home_page_event.dart';
import 'package:front_end/ui/home_page/home_page_state.dart';

class RampUpHomeScreenBloc extends Bloc<RampUpHomePageEvent, RampUpHomeState> {
  RampUpHomeScreenBloc() : super(RampUpHomeState());

}
