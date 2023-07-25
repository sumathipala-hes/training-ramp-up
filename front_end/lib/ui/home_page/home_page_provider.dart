import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/ui/home_page/home_page_bloc.dart';
import 'package:front_end/ui/home_page/home_page_view.dart';

class RampUpHomeScreenProvider extends BlocProvider<RampUpHomeScreenBloc> {
  RampUpHomeScreenProvider({
    Key? key,
  }) : super(
          key: key,
          create: (context) => RampUpHomeScreenBloc(),
          child: const RampUpHomeScreen(),
        );
}
