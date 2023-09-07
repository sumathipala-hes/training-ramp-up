import 'package:flutter/material.dart';
import 'package:frontend/enum/role_enum.dart';
import 'package:frontend/model/student.dart';
import 'package:frontend/ui/manage_student_page/manage_student_page_provider.dart';
import 'package:frontend/ui/theme/colors.dart';
import 'package:frontend/util/local_storage.dart';
import 'package:intl/intl.dart';

class StudentCard extends StatefulWidget {
  final Student student;
  const StudentCard({
    Key? key,
    required this.student,
  }) : super(key: key);

  @override
  State<StudentCard> createState() => _StudentCardState();
}

class _StudentCardState extends State<StudentCard> {
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: MediaQuery.of(context).size.width * 0.9,
      child: Card(
        elevation: 4,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
        child: ElevatedButton(
          onPressed: () async {
            final localStorage = LocalStorage();
            final role = await localStorage.getRole();
            if (role ==
                RoleEnum.admin.toString().split('.').last.toLowerCase()) {
              // ignore: use_build_context_synchronously
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => StudentPageProvider(
                    student: widget.student,
                  ),
                ),
              );
            }
          },
          style: ButtonStyle(
            backgroundColor: MaterialStateProperty.all<Color>(
              AppColors.mainColor,
            ),
            shape: MaterialStateProperty.all<RoundedRectangleBorder>(
              RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
            ),
          ),
          child: Padding(
            padding: const EdgeInsets.fromLTRB(40, 20, 40, 20),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  widget.student.id,
                  style: const TextStyle(
                    fontSize: 20,
                    color: Colors.white,
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      widget.student.name,
                      style: const TextStyle(
                        fontSize: 20,
                        color: Colors.white70,
                      ),
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                    Text(
                      DateFormat(
                        'EEE MMM d yyyy',
                      ).format(
                        widget.student.dob,
                      ),
                      style: const TextStyle(
                        color: Colors.white60,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
