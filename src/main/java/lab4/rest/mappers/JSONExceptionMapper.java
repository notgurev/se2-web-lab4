package lab4.rest.mappers;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import static javax.ws.rs.core.Response.Status.BAD_REQUEST;

@Provider
public class JSONExceptionMapper implements ExceptionMapper<ConstraintViolationException> {
    @Override
    public Response toResponse(ConstraintViolationException exception) {
        return Response.status(BAD_REQUEST)
                .entity(violationsToJSON(exception))
                .type("application/json")
                .build();
    }

    private String violationsToJSON(ConstraintViolationException exception) {
        // actually just returns first violation
//        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();

        for (ConstraintViolation<?> violation : exception.getConstraintViolations()) {
            System.out.println(violation.toString());
//            arrayBuilder.add(JSONMessage.error(violation.getMessage()));
            return violation.getMessage();
        }

        return null;
//        return Json.createObjectBuilder().add("errors", arrayBuilder).build().toString();
    }
}
