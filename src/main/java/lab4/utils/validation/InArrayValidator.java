package lab4.utils.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.stream.IntStream;

public class InArrayValidator implements ConstraintValidator<InArray, Integer> {
    protected int[] array;

    @Override
    public void initialize(InArray inArray) {
        this.array = inArray.array();
    }

    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {
        return value != null && IntStream.of(array).anyMatch(x -> x == value);
    }
}