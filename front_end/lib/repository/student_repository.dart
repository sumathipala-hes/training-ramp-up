import 'package:http/http.dart' as http;

const String baseUrl = 'http://192.168.1.9:4000/api/v1';

class StudentRepository {
  Future<http.Response> getAllStudents() async {
    final response = await http.get(
      Uri.parse('$baseUrl/student'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
    );
    return response;
  }
}
