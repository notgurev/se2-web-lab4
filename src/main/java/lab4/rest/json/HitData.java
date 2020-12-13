package lab4.rest.json;

import lombok.Data;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
public class HitData {
    //  Координата X - Listbox {'-5','-4','-3','-2','-1','0','1','2','3'}
    //  Координата Y - Slider  (-5 ... 5)
    //  Радиус R - Listbox {'-5','-4','-3','-2','-1','0','1','2','3'}
    private static final int[] ALLOWED_X = {-5, -4, -3, -2, -1, 0, 1, 2, 3};
    private static final int[] ALLOWED_R = {-5, -4, -3, -2, -1, 0, 1, 2, 3};
    private static final float MIN_Y = -5;
    private static final float MAX_Y = 5;

    //    @InArray(array = {-5, -4, -3, -2, -1, 0, 1, 2, 3}) todo
    @NotNull(message = "X must not be null")
    private int x;
    @DecimalMax(value = "5", inclusive = false, message = "Y must be in range (-5 ... 5)")
    @DecimalMin(value = "-5", inclusive = false, message = "Y must be in range (-5 ... 5)")
    @NotNull(message = "Y must not be null")
    private BigDecimal y;
    //    @InArray(array = {-5, -4, -3, -2, -1, 0, 1, 2, 3}) todo
    @Max(1)
    @NotNull(message = "R must not be null")
    private int r;
}
