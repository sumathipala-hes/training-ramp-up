import 'dart:convert';
import 'package:encrypt/encrypt.dart' as encrypt;
import 'package:flutter_dotenv/flutter_dotenv.dart';

Future<String> encryptPassword(String password) async {
  await dotenv.load();

  final plainText = password;
  final key = encrypt.Key.fromUtf8(dotenv.env['ENCRYPTION_KEY']!);
  final iv = encrypt.IV.fromLength(16);

  final encrypter = encrypt.Encrypter(encrypt.AES(key));

  final encrypted = encrypter.encrypt(plainText, iv: iv);
  return encrypted.base64;
}

String decryptPassword(String password) {
  final key = encrypt.Key.fromUtf8(dotenv.env['ENCRYPTION_KEY']!);
  final iv = encrypt.IV.fromLength(16);

  final encrypter = encrypt.Encrypter(encrypt.AES(key));

  final decryptedBytes = encrypter.decryptBytes(
    encrypt.Encrypted.fromBase64(password),
    iv: iv,
  );

  final decrypted = utf8.decode(decryptedBytes);
  return decrypted;
}
