package lab4.utils;

import static java.lang.Math.pow;

public class HitChecker {
    // todo negative radius
    public static boolean checkArea(int x, float y, int R) {
        if (x >= 0) {
            if (y >= 0) {
                // Ничего
                return false;
            } else {
                // Треугольник, над прямой y = x - R
                return y > x + R;
            }
        } else {
            if (y >= 0) {
                // Четверть круга
                return pow(x, 2) + pow(y, 2) <= pow(R, 2);
            } else {
                // Прямоугольник
                return x >= -R && y >= -((float) R) / 2;
            }
        }
    }
}