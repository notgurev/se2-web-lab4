package lab4.rest.json;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class Credentials {
    @NotNull(message = "USERNAME_MUST_NOT_BE_NULL_OR_EMPTY")
    @NotEmpty(message = "USERNAME_MUST_NOT_BE_NULL_OR_EMPTY")
    @Size(min = 4, message = "USERNAME_TOO_SHORT")
    @Size(max = 15, message = "USERNAME_TOO_LONG")
    private String username;
    @NotNull(message = "PASSWORD_MUST_NOT_BE_NULL_OR_EMPTY")
    @NotEmpty(message = "PASSWORD_MUST_NOT_BE_NULL_OR_EMPTY")
    @Size(min = 4, message = "PASSWORD_TOO_SHORT")
    private String password;
}
