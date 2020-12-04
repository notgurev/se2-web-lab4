package lab4.rest;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("/auth")
public class AuthResource {
    @POST
    @Path("/login")
    public Response login() {
        return Response.ok().build();
    }

    @POST
    @Path("register")
    public Response register() {
        return Response.ok().build();
    }
}