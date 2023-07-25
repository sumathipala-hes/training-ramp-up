import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/ui/home_page/home_page_bloc.dart';
import 'package:frontend/ui/home_page/home_page_provider.dart';

class RampUpApp extends StatelessWidget {
  const RampUpApp({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final materialApp = MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Ramp Up',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const HomePageProvider(),
    );

    return MultiBlocProvider(
      providers: [
        BlocProvider<HomePageBloc>(
          create: (context) => HomePageBloc(context),
        ),
      ],
      child: materialApp,
    );
  }
}
