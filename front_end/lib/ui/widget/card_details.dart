import 'package:flutter/material.dart';

import '../../theme/primary_theme.dart';
import '../../theme/styled_theme.dart';

class StudentCard extends StatelessWidget {
  final String id;
  final String studentName;
  final String studentDOB;

  const StudentCard({
    super.key,
    required this.id,
    required this.studentName,
    required this.studentDOB,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      color: AppColors.cardColor,
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
              id,
              style: cardText,
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  studentName,
                  style: cardText,
                ),
                const SizedBox(height: 10),
                Text(
                  studentDOB,
                  style: cardTextSub,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
