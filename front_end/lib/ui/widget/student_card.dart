import 'package:flutter/material.dart';
import 'package:front_end/db/model/student.dart';
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
        elevation: 6,
        color: Colors.deepPurple[300],
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
        child: Padding(
          padding: const EdgeInsets.all(15,),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Expanded(
                child: Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(
                        left: 2.0,
                        right: 70,
                      ),
                      child: Text(
                        widget.student.studentId,
                        style: const TextStyle(
                          fontSize: 20,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      widget.student.studentName,
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w400,
                        color: Colors.white70,
                      ),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      DateFormat('EEE MMM d yyyy')
                          .format(widget.student.studentDob),
                      style: const TextStyle(
                        color: Colors.white70,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
