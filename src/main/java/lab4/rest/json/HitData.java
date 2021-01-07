package lab4.rest.json;

import lab4.utils.validation.InArray;
import lombok.Data;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
public class HitData {
    @InArray(array = {-5, -4, -3, -2, -1, 0, 1, 2, 3}, message = "X_VALUE_NOT_ALLOWED")
    @NotNull(message = "X_MUST_NOT_BE_NULL_OR_EMPTY")
    private int x;
    @DecimalMax(value = "5", inclusive = false, message = "Y_VALUE_NOT_ALLOWED")
    @DecimalMin(value = "-5", inclusive = false, message = "Y_VALUE_NOT_ALLOWED")
    @NotNull(message = "Y_MUST_NOT_BE_NULL_OR_EMPTY")
    private BigDecimal y;
    @InArray(array = {/* -5, -4, -3, -2, -1, */ 0, 1, 2, 3}, message = "R_VALUE_NOT_ALLOWED")
    @NotNull(message = "R_MUST_NOT_BE_NULL_OR_EMPTY")
    private int r;
}
