import 'dart:async';
import 'dart:convert';

import 'package:logger/logger.dart';
import 'package:http/http.dart' as http;

import '../../model/student_model.dart';
import '../util/db_util.dart';
import '../util/local_storage.dart';

class StudentRepository {
  Future<http.Response> getAllStudents() async {
    final token = await LocalStorage().getAccessToken();
    final response = await http.get(
      Uri.parse('$baseUrl/students'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer:$token',
      },
    );
    return response;
  }

  Future<http.Response> getStudentByOne(String search) async {
    final token = await LocalStorage().getAccessToken();
    final response = await http.get(
      Uri.parse('$baseUrl/students/$search'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer:$token',
      },
    );
    return response;
  }

  Future<void> saveStudent(Student student) async {
    final token = await LocalStorage().getAccessToken();
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/students'),
        headers: <String, String>{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer:$token',
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
    final token = await LocalStorage().getAccessToken();
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/students/${student.id}'),
        headers: <String, String>{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer:$token',
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
    final token = await LocalStorage().getAccessToken();
    try {
      final response = await http.delete(
        Uri.parse('$baseUrl/students/$studentId'),
        headers: <String, String>{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer:$token',
        },
      );

      if (response.statusCode != 201) {
        Logger().d('Successfully to delete Student: ${response.statusCode}');
      }
    } catch (error) {
      Logger().e('Error deleting student: $error');
    }
  }
}
