class Student {
  String studentId;
  String studentName;
  String studentAddress;
  String studentMobile;
  DateTime studentDob;
  String studentGender;

  Student({
    required this.studentId,
    required this.studentName,
    required this.studentAddress,
    required this.studentMobile,
    required this.studentDob,
    required this.studentGender,
  });

  factory Student.fromJson(Map<String, dynamic> json) {
    return Student(
      studentId: (json['studentId'] as int).toString(),
      studentName: json['studentName'] as String,
      studentAddress: json['studentAddress'] as String,
      studentMobile: json['studentMobile'] as String,
      studentDob: DateTime.parse(json['studentDob'] as String).toLocal(),
      studentGender: json['studentGender'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'studentName': studentName,
      'studentAddress': studentAddress,
      'studentMobile': studentMobile,
      'studentDob': studentDob.toIso8601String(),
      'studentGender': studentGender,
    };
  }
}
