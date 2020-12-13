package lab4.rest.json;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class Credentials {
    @NotNull(message = "Username must not be null or empty")
    @NotEmpty(message = "Username must not be null or empty")
    private String username;
    @NotNull(message = "Password must not be null or empty")
    @NotEmpty(message = "Password must not be null or empty")
    private String password;
}
