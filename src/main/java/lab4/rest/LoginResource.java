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