import 'dart:convert';
import 'package:front_end/util/db_util.dart';
import 'package:http/http.dart' as http;
import '../models/student.dart';

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

  Future<void> createStudent(Student student) async {
    final response = await http.post(
      Uri.parse('$baseUrl/student'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Cookie': 'role=admin',
      },
      body: jsonEncode(
        student.toJson(),
      ),
    );
    if (response.statusCode == 500) {
      throw Exception('Failed to create student.');
    }
  }

  Future<http.Response> deleteStudent(String id) async {
    final response = await http.delete(
      Uri.parse('$baseUrl/student/$id'),
      headers: <String, String>{
        'Cookie': 'role=admin',
      },
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
        'Cookie': 'role=admin',
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
