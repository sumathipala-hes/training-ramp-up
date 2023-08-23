import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../../theme/primary_theme.dart';
import '../../theme/styled_theme.dart';

class UserCard extends StatelessWidget {
  final String roleType;
  final String email;
  final String name;
  final DateTime dob;

  const UserCard({
    Key? key,
    required this.roleType,
    required this.email,
    required this.name,
    required this.dob,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      color: AppColors.cardColor,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 20, 20, 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              roleType,
              style: cardText,
            ),
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Name:',
                      style: TextStyle(
                        color: Colors.grey,
                        fontSize: 12,
                      ),
                    ),
                    Text(
                      name,
                      style: cardText,
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'DOB:',
                      style: TextStyle(
                        color: Colors.grey,
                        fontSize: 12,
                      ),
                    ),
                    Text(
                      DateFormat('EEE MMM d yyyy').format(dob),
                      style: cardText,
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                const Icon(
                  Icons.email,
                  size: 16,
                  color: Colors.grey,
                ),
                const SizedBox(width: 5),
                Text(
                  email,
                  style: cardText,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
