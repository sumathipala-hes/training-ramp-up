import 'dart:convert';
import 'package:frontend/util/local_storage.dart';
import 'package:frontend/util/refresh_token_util.dart';
import 'package:frontend/util/show_toast.dart';
import 'package:http/http.dart' as http;
import '../model/student.dart';
import '../util/db_util.dart';

class StudentRepository {
  LocalStorage localStorage = LocalStorage();
  Future<List<Student>> fetchStudents() async {
    final response = await http.get(
      Uri.parse('$baseUrl/student'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
    );
    List<dynamic> responseData = jsonDecode(response.body);
    List<Student> studentList = [
      ...responseData.map((studentData) => Student.fromJson(studentData)),
    ];
    return studentList;
  }

  Future<void> addStudents(Student student) async {
    await refreshToken(await localStorage.getAccessToken());
    final res = await http.post(
      Uri.parse('$baseUrl/student'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(student.toJson()),
    );
    if (res.statusCode == 500) {
      showToast('Failed to Save Student');
    }
  }

  Future<void> updateStudents(Student student) async {
    await refreshToken(await localStorage.getAccessToken());
    final res = await http.put(
      Uri.parse('$baseUrl/student/${student.id}'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(student.toJson()),
    );
    if (res.statusCode == 500) {
      showToast('Failed to Update Student');
    }
  }

  Future<void> deleteStudents(String id) async {
    await refreshToken(await localStorage.getAccessToken());
    final res = await http.delete(
      Uri.parse('$baseUrl/student/$id'),
    );
    if (res.statusCode == 500) {
      showToast('Failed to Delete Student');
    }
  }
}
