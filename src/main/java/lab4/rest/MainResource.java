package lab4.rest;

import lab4.beans.Hit;
import lab4.exceptions.UserNotFoundException;
import lab4.rest.filters.authorization.Authorized;
import lab4.rest.json.HitData;
import lab4.services.hits.HitService;

import javax.ejb.EJB;
import javax.json.Json;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/hits")
@Authorized
@Produces(MediaType.APPLICATION_JSON)
public class MainResource {
    @EJB
    private HitService hitService;

    // since token is valid we can assume that user from token exists

    @GET
    public Response getHitsData(@Context HttpHeaders headers) {
        String username = headers.getHeaderString("username");
        return Response.ok(hitService.getAllJSON(username)).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addHit(@Context HttpHeaders headers, @Valid HitData hitData) {
        String username = headers.getHeaderString("username");
        Hit hit = new Hit(hitData.getX(), hitData.getY().floatValue(), hitData.getR());
        try {
            hitService.add(hit, username);
            return Response.ok(jsonMessage("hit added (owner is " + username + ")")).build();
        } catch (UserNotFoundException e) {
            return Response.serverError().entity("User not found despite having a valid token").build();
        }
    }

    @DELETE
    public Response clear(@Context HttpHeaders headers) {
        String username = headers.getHeaderString("username");
        hitService.clear(username);
        return Response.ok().build();
    }

    private String jsonMessage(String message) {
        return Json.createObjectBuilder().add("message", message).build().toString();
    }
}
