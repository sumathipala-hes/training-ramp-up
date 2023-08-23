import 'package:frontend/model/user.dart';

class UserHomePageState {
  final List<User> users;
  const UserHomePageState({
    required this.users,
  });

  static UserHomePageState get initialState => const UserHomePageState(
        users: [],
      );

  UserHomePageState clone({
    List<User>? users,
  }) {
    return UserHomePageState(
      users: users ?? this.users,
    );
  }
}
