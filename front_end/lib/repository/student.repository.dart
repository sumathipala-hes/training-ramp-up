import 'dart:async';
import 'dart:convert';

import 'package:logger/logger.dart';
import 'package:http/http.dart' as http;

import '../../model/student_model.dart';

class StudentRepository {
  final String baseUrl = 'http://192.168.209.142:4000/api/v1';

  Future<http.Response> getAllStudents() async {
    final response = await http.get(
      Uri.parse('$baseUrl/students'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
    );
    return response;
  }

  Future<void> saveStudent(Student student) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/students'),
        headers: <String, String>{
          'Content-Type': 'application/json',
        },
        body: jsonEncode(student.toJson()),
      );

      if (response.statusCode != 201) {
        Logger().d('Successfully to create Student: ${response.statusCode}');
      }
    } catch (error) {
      Logger().e('Error creating student: $error');
    }
  }

  Future<void> updateStudent(Student student) async {
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/students/${student.id}'),
        headers: <String, String>{
          'Content-Type': 'application/json',
        },
        body: jsonEncode(student.toJson()),
      );

      if (response.statusCode != 201) {
        Logger().d('Successfully to update Student: ${response.statusCode}');
      }
    } catch (error) {
      Logger().e('Error updating student: $error');
    }
  }

  Future<void> deleteStudent(String studentId) async {
    try {
      final response = await http.delete(
        Uri.parse('$baseUrl/students/$studentId'),
      );

      if (response.statusCode != 201) {
        Logger().d('Successfully to delete Student: ${response.statusCode}');
      }
    } catch (error) {
      Logger().e('Error deleting student: $error');
    }
  }
}
