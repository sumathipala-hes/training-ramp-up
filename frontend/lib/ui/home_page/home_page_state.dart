class HomePageState {
  final bool isPicked;

  const HomePageState({
    required this.isPicked,
  });

  static HomePageState get initialState => const HomePageState(
        isPicked: false,
      );

  HomePageState clone({
    bool? isPicked,
  }) {
    return HomePageState(
      isPicked: isPicked ?? this.isPicked,
    );
  }
}
