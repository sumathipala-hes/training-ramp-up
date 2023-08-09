import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/student.dart';

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

  Future<http.Response> createStudent(Student student) async {
    final response = await http.post(
      Uri.parse('$baseUrl/student'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(
        student.toJson(),
      ),
    );
    if (response.statusCode == 200) {
      return response;
    } else {
      throw Exception('Failed to create student.');
    }
  }
}
