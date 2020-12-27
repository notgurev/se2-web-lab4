package lab4.rest.json;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class Credentials {
    @NotNull(message = "USERNAME_MUST_NOT_BE_NULL_OR_EMPTY")
    @NotEmpty(message = "USERNAME_MUST_NOT_BE_NULL_OR_EMPTY")
    @Min(value = 4, message = "USERNAME_TOO_SHORT")
    @Max(value = 15, message = "USERNAME_TOO_LONG")
    private String username;
    @NotNull(message = "PASSWORD_MUST_NOT_BE_NULL_OR_EMPTY")
    @NotEmpty(message = "PASSWORD_MUST_NOT_BE_NULL_OR_EMPTY")
    @Min(value = 4, message = "PASSWORD_TOO_SHORT")
    private String password;
}
