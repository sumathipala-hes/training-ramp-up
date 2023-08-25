import 'dart:convert';

import 'package:encrypt/encrypt.dart' as encrypt;

const _encryption = 'abcdEbGhIjKlMnOpQrStUwvWxYz12345';

String encryptPassword(String password) {
  final plainText = password;
  final key = encrypt.Key.fromUtf8(_encryption);
  final iv = encrypt.IV.fromLength(16);

  final encrypter = encrypt.Encrypter(encrypt.AES(key));

  final encrypted = encrypter.encrypt(plainText, iv: iv);
  return encrypted.base64;
}

String decryptPassword(String password) {
  final key = encrypt.Key.fromUtf8(_encryption);
  final iv = encrypt.IV.fromLength(16);

  final encrypter = encrypt.Encrypter(encrypt.AES(key));

  final decryptedBytes = encrypter.decryptBytes(
    encrypt.Encrypted.fromBase64(password),
    iv: iv,
  );

  final decrypted = utf8.decode(decryptedBytes);
  return decrypted;
}
