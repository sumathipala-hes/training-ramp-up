import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/theme/primary_theme.dart';
import 'package:front_end/ui/home_page/home_page_bloc.dart';
// import 'package:front_end/ui/home_page/home_page_provider.dart';
import 'package:front_end/ui/home_page/home_page_view.dart';

class RampUpApp extends StatelessWidget {
  const RampUpApp({super.key});

  @override
  Widget build(BuildContext context) {
    final materialApp = MaterialApp(
      title: 'RampUp App',
      theme: PrimaryTheme.generateTheme(context),
      debugShowCheckedModeBanner: false,
      home: const RampUpHomeScreen(),
    );

    return MultiBlocProvider(
      providers: [
        BlocProvider<RampUpHomeScreenBloc>(
          create: (context) => RampUpHomeScreenBloc(context),
        ),
      ],
      child: materialApp,
    );
  }
}
