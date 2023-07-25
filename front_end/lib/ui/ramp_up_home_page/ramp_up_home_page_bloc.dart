import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/ui/ramp_up_home_page/ramp_up_home_page_event.dart';
import 'package:front_end/ui/ramp_up_home_page/ramp_up_home_page_state.dart';

class RampUpHomeScreenBloc extends Bloc<RampUpHomePageEvent, RampUpHomeState> {
  RampUpHomeScreenBloc() : super(RampUpHomeState());

}
