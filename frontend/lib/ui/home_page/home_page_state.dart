class HomePageState {
  final String role;

  const HomePageState({
    required this.role,
  });

  static HomePageState get initialState => const HomePageState(
        role: '',
      );

  HomePageState clone({
    String? role,
  }) {
    return HomePageState(
      role: role ?? this.role,
    );
  }
}
