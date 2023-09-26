import 'dart:convert';
import 'package:front_end/util/db_util.dart';
import 'package:http/http.dart' as http;
import '../models/student.dart';
import '../util/local_storage.dart';
import '../util/refresh_token_util.dart';

class StudentRepository {
  final localStorage = LocalStorage();

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
    await refreshToken(await localStorage.getAccessToken());
    String accessToken = await localStorage.getAccessToken();
    final response = await http.post(
      Uri.parse('$baseUrl/student'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Cookie': 'accessToken=$accessToken',
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
    await refreshToken(await localStorage.getAccessToken());
    String accessToken = await localStorage.getAccessToken();
    final response = await http.delete(
      Uri.parse('$baseUrl/student/$id'),
      headers: <String, String>{
        'Cookie': 'accessToken=$accessToken',
      },
    );
    if (response.statusCode == 200) {
      return response;
    } else {
      throw Exception('Failed to delete student');
    }
  }

  Future<http.Response> updateStudent(Student student) async {
    await refreshToken(await localStorage.getAccessToken());
    String accessToken = await localStorage.getAccessToken();
    final response = await http.put(
      Uri.parse('$baseUrl/student/${student.studentId}'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Cookie': 'accessToken=$accessToken',
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
