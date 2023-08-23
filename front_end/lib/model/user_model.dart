class User {
  final String roleType;
  final String name;
  final String address;
  final String email;
  final String mobileNumber;
  final DateTime dob;
  final String gender;
  final String password;

  User({
    required this.roleType,
    required this.name,
    required this.address,
    required this.email,
    required this.mobileNumber,
    required this.dob,
    required this.gender,
    required this.password,
  });

  Map<String, dynamic> toJson() {
    return {
      'roleType': roleType,
      'name': name,
      'address': address,
      'email': email,
      'mobileNumber': mobileNumber,
      'dob': dob.toIso8601String(),
      'gender': gender,
      'password': password,
    };
  }

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      roleType: json['roleType'] as String,
      name: json['name'] as String,
      address: json['address'] as String,
      email: json['email'] as String,
      mobileNumber: json['mobileNumber'] as String,
      dob: DateTime.parse(json['dob'] as String).toLocal(),
      gender: json['gender'] as String,
      password: json['password'] as String,
    );
  }
}
