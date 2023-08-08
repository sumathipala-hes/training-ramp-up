import 'dart:convert';
import 'package:http/http.dart' as http;
import '../model/student.dart';

class StudentRepository {
  final String baseUrl = 'http://192.168.8.105:5000/api/v1';

  Future<http.Response> fetchStudents() async {
    final response = await http.get(
      Uri.parse('$baseUrl/student'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
    );

    return response;
  }

  Future<http.Response> addStudents(Student student) async {
    final response = await http.post(
      Uri.parse('$baseUrl/student'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(student.toJson()),
    );

    return response;
  }

  Future<http.Response> updateStudents(Student student) async {
    final response = await http.put(
      Uri.parse('$baseUrl/student/${student.id}'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(student.toJson()),
    );

    return response;
  }

  Future<http.Response> deleteStudents(String id) async {
    final response = await http.delete(
      Uri.parse('$baseUrl/student/$id'),
    );

    return response;
  }
}
