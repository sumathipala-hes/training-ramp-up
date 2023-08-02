class GenerateIdUtil {
  static String generateId(String lastId) {
    return lastId.isEmpty ? '1' : (int.parse(lastId) + 1).toString();
  }
}
