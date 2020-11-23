package lab4.rest;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("/login")
public class LoginResource {
    // todo no idea what to do (yet)

    @GET
    public Response placeholder() {
        return Response.ok().build();
    }

    @POST
    @Path("/login") // todo no additional path
    public Response login() {
        return Response.ok().build();
    }

    @POST
    @Path("register") // todo no additional path
    public Response register() {
        return Response.ok().build();
    }
}