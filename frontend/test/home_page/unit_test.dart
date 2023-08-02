import 'package:flutter_test/flutter_test.dart';
import 'package:frontend/util/generate_id_util.dart';

void main() {
  group('GenerateIdUtil', () {
    test('generateId returns "1" when lastId is empty', () {
      String lastId = '';

      String generatedId = GenerateIdUtil.generateId(lastId);

      expect(generatedId, '1');
    });

    test('generateId increments the lastId by 1 when it is non-empty', () {
      String lastId = '5';

      String generatedId = GenerateIdUtil.generateId(lastId);

      expect(generatedId, '6');
    });

    test('generateId increments "0" to "1"', () {
      String lastId = '0';

      String generatedId = GenerateIdUtil.generateId(lastId);

      expect(generatedId, '1');
    });
  });
}
