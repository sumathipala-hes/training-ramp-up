class StudentPageState {
  final String gender;

  const StudentPageState({
    required this.gender,
  });

  static StudentPageState get initialState => const StudentPageState(
        gender: 'Male',
      );

  StudentPageState clone({
    String? gender,
  }) {
    return StudentPageState(
      gender: gender ?? this.gender,
    );
  }
}
