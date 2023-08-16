import 'dart:async';
import 'dart:convert';

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:logger/logger.dart';
import 'package:http/http.dart' as http;

import '../../model/student_model.dart';
import '../util/db_util.dart';

class StudentRepository {
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
        await sendNotification(
          'New Student',
          'A new student has been added to the database',
        );
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
        await sendNotification(
          'Student Updated',
          'A student has been updated in the database',
        );
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
        await sendNotification(
          'Student Deleted',
          'A student has been deleted from the database',
        );
      }
    } catch (error) {
      Logger().e('Error deleting student: $error');
    }
  }

  Future<void> sendNotification(String title, String body) async {
    final token = await FirebaseMessaging.instance.getToken();

    final notificationData = {
      "token": token,
      "title": title,
      "body": body,
    };

    try {
      final response = await http.post(
        Uri.parse('$baseUrl/send-notification'),
        headers: <String, String>{
          'Content-Type': 'application/json',
        },
        body: jsonEncode(notificationData),
      );

      if (response.statusCode == 200) {
        Logger().d('Notification sent successfully');
      } else {
        Logger().d('Failed to send notification: ${response.statusCode}');
      }
    } catch (error) {
      Logger().e('Error sending notification: $error');
    }
  }
}
