class NotificationData {
  String title;
  String body;

  NotificationData({
    required this.title,
    required this.body,
  });

  factory NotificationData.fromJson(
    Map<String, dynamic> json,
  ) {
    return NotificationData(
      title: json['title'],
      body: json['body'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'title': title,
      'body': body,
    };
  }
}
