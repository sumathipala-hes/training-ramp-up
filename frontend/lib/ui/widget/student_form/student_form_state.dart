class StudentFormState {
  final String maleOrFemale;

  const StudentFormState({
    required this.maleOrFemale,
  });

  static StudentFormState get initialState =>
      const StudentFormState(maleOrFemale: 'Male');

  StudentFormState clone({
    String? maleOrFemale,
  }) {
    return StudentFormState(
      maleOrFemale: maleOrFemale ?? this.maleOrFemale,
    );
  }
}
