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
      studentId: json['studentId'],
      studentName: json['studentName'],
      studentAddress: json['studentAddress'],
      studentMobile: json['studentMobile'],
      studentDob: DateTime.parse(json['studentDob']),
      studentGender: json['studentGender'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'studentId': studentId,
      'studentName': studentName,
      'studentAddress': studentAddress,
      'studentMobile': studentMobile,
      'studentDob': studentDob.toIso8601String(),
      'studentGender': studentGender,
    };
  }
}
