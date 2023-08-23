import 'package:encrypt/encrypt.dart' as encrypt;

String encryptPassword(String password) {
  final plainText = password;
  final key = encrypt.Key.fromUtf8('my 32 length key................');
  final iv = encrypt.IV.fromLength(16);

  final encrypter = encrypt.Encrypter(encrypt.AES(key));

  final encrypted = encrypter.encrypt(plainText, iv: iv);
  return encrypted.base64;
}

String decryptPassword(String password) {
  final key = encrypt.Key.fromUtf8('my 32 length key................');
  final iv = encrypt.IV.fromLength(16);

  final encrypter = encrypt.Encrypter(encrypt.AES(key));

  final decrypted = encrypter.decrypt(password as encrypt.Encrypted, iv: iv);
  return decrypted;
}
