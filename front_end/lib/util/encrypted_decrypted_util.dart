import 'dart:convert';
import 'package:encrypt/encrypt.dart' as encrypt;

class PasswordEncryption {
  static const _keyString = 'my 32 length key................';

  static final _key = encrypt.Key.fromUtf8(_keyString);
  static final _iv = encrypt.IV.fromLength(16);
  static final _encrypter = encrypt.Encrypter(encrypt.AES(_key));

  static String encryptPassword(String password) {
    final encrypted = _encrypter.encrypt(password, iv: _iv);
    return encrypted.base64;
  }

  static String decryptPassword(String encryptedPassword) {
    final decryptedBytes = _encrypter.decryptBytes(
      encrypt.Encrypted.fromBase64(encryptedPassword),
      iv: _iv,
    );

    final decrypted = utf8.decode(decryptedBytes);
    return decrypted;
  }
}
