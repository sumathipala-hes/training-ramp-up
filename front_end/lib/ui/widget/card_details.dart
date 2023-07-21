import 'package:flutter/material.dart';

class StudentCard extends StatelessWidget {
  final String number;
  final String studentName;
  final String studentDOB;

  const StudentCard({super.key,
    required this.number,
    required this.studentName,
    required this.studentDOB,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      color: Colors.blueGrey[900],
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(40, 20, 40, 20),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              number,
              style: const TextStyle(
                fontSize: 20,
                color: Colors.white,
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  studentName,
                  style: const TextStyle(
                    fontSize: 20,
                    color: Colors.white70,
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  studentDOB,
                  style: const TextStyle(color: Colors.white60),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
