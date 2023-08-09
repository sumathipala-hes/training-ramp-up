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

  Future<http.Response> deleteStudent(String id) async {
    final response = await http.delete(
      Uri.parse('$baseUrl/student/$id'),
    );
    if (response.statusCode == 200) {
      return response;
    } else {
      throw Exception('Failed to delete student');
    }
  }

  Future<http.Response> updateStudent(Student student) async {
    final response = await http.put(
      Uri.parse('$baseUrl/student/${student.studentId}'),
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
      throw Exception('Failed to update student');
    }
  }
}
