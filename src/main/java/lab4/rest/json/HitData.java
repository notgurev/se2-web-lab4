package lab4.rest.json;

import lab4.utils.validation.InArray;
import lombok.Data;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
public class HitData {
    /*
      Координата X : Listbox {'-5','-4','-3','-2','-1','0','1','2','3'}
      Координата Y : Slider  (-5 ... 5)
          Радиус R : Listbox {'-5','-4','-3','-2','-1','0','1','2','3'}
    */
    @InArray(
            message = "Allowed X values are {-5, -4, -3, -2, -1, 0, 1, 2, 3}",
            array = {-5, -4, -3, -2, -1, 0, 1, 2, 3}
    )
    @NotNull(message = "X must not be null")
    private int x;
    @DecimalMax(value = "5", inclusive = false, message = "Y must be in range (-5 ... 5)")
    @DecimalMin(value = "-5", inclusive = false, message = "Y must be in range (-5 ... 5)")
    @NotNull(message = "Y must not be null")
    private BigDecimal y;
    @InArray(
            message = "Allowed Y values are {-5, -4, -3, -2, -1, 0, 1, 2, 3}",
            array = {-5, -4, -3, -2, -1, 0, 1, 2, 3}
    )
    @NotNull(message = "R must not be null")
    private int r;
}
