class User {
  String userName;
  String userEmail;
  String userPassword;
  String userRole;

  User({
    required this.userName,
    required this.userEmail,
    required this.userPassword,
    required this.userRole,
  });

  Map<String, dynamic> toJson() {
    return {
      'userName': userName,
      'userEmail': userEmail,
      'userPassword': userPassword,
      'userRole': userRole,
    };
  }

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      userName: json['userName'] as String,
      userEmail: json['userEmail'] as String,
      userPassword: json['userPassword'] as String,
      userRole: json['userRole'] as String,
    );
  }
}
