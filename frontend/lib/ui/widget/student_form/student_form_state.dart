class StudentPageState {
  final String maleOrFemale;

  const StudentPageState({
    required this.maleOrFemale,
  });

  static StudentPageState get initialState =>
      const StudentPageState(maleOrFemale: 'Male');

  StudentPageState clone({
    String? maleOrFemale,
  }) {
    return StudentPageState(
      maleOrFemale: maleOrFemale ?? this.maleOrFemale,
    );
  }
}
