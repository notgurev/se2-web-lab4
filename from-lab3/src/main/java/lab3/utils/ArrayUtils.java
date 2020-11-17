package lab3.utils;

public class ArrayUtils {
    public static boolean containsTrue(boolean[] booleanArray) {
        for (boolean value : booleanArray) {
            if (value) {
                return true;
            }
        }
        return false;
    }
}
