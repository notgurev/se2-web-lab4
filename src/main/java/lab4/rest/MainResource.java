package lab4.rest;

import lab4.beans.Hit;
import lab4.rest.json.HitData;
import lab4.services.auth.AuthService;
import lab4.services.hits.HitService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Optional;

import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;
import static javax.ws.rs.core.Response.Status.FORBIDDEN;

@Path("/hits")
public class MainResource {
    private static final String AUTHENTICATION_SCHEME = "Bearer";
    @EJB
    private AuthService authService;

    // todo clear()
    @EJB
    private HitService hitService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{user}")
    public Response getHitsData(@PathParam("user") String userFromPath, @Context HttpHeaders headers) {
        String token = getTokenFromHeaders(headers);
        Response response = checkAccess(token, userFromPath);
        if (response != null) return response;

        // since token is valid and usernames match we can assume that user with userFromPath exists
        return Response.ok(hitService.getAllJSON(userFromPath)).build();
    }

    @POST
    @Path("{user}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addHit(@PathParam("user") String userFromPath, @Context HttpHeaders headers, HitData hitData) {
        String token = getTokenFromHeaders(headers);
        Response response = checkAccess(token, userFromPath);
        if (response != null) return response;

        // since token is valid and usernames match we can assume that user with userFromPath exists
        hitService.add(new Hit(hitData.getX(), hitData.getY(), hitData.getR()), userFromPath);

        return Response.ok(String.format("hit added (owner is %s)", userFromPath)).build();
    }

    private String getTokenFromHeaders(HttpHeaders headers) {
        return headers.getHeaderString(AUTHORIZATION).substring(AUTHENTICATION_SCHEME.length()).trim();
    }

    private Response checkAccess(String token, String userFromPath) {
        Optional<String> usernameByToken = authService.getUsernameByToken(token);

        // validate token
        if (!usernameByToken.isPresent()) {
            return Response.status(FORBIDDEN).entity("invalid token").build();
        }

        // check if users match
        if (!usernameByToken.get().equals(userFromPath)) {
            return Response.status(FORBIDDEN).entity("you dont have access to this users data").build();
        }

        return null;
    }
}
