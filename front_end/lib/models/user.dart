class User {
  String userName;
  String userEmail;
  String userPassword;
  String role;

  User({
    required this.userName,
    required this.userEmail,
    required this.userPassword,
    required this.role,
  });

  Map<String, dynamic> toJson() {
    return {
      'userName': userName,
      'userEmail': userEmail,
      'userPassword': userPassword,
      'role': role,
    };
  }

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      userName: json['userName'] as String,
      userEmail: json['userEmail'] as String,
      userPassword: json['userPassword'] as String,
      role: json['role'] as String,
    );
  }
}
