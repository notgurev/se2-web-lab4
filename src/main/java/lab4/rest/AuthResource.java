package lab4.rest;

import lab4.rest.json.Credentials;
import lab4.services.auth.AuthResult;
import lab4.services.auth.AuthService;

import javax.ejb.EJB;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/auth")
public class AuthResource {
    @EJB
    private AuthService authService;

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(@NotNull @Valid Credentials credentials) {
        AuthResult result = authService.login(credentials.getUsername(), credentials.getPassword());
        if (result.isSuccessful()) {
            return Response.ok(result.getToken()).build();
        } else {
            return Response.status(Response.Status.FORBIDDEN).entity(result.getErrorMessage()).build();
        }
    }

    @POST
    @Path("register")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response register(@NotNull @Valid Credentials credentials) {
        AuthResult result = authService.register(credentials.getUsername(), credentials.getPassword());
        if (result.isSuccessful()) {
            return Response.ok(result.getToken()).build();
        } else {
            return Response.status(Response.Status.FORBIDDEN).entity(result.getErrorMessage()).build();
        }
    }
}