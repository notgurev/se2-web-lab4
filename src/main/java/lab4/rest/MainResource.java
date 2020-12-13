package lab4.rest;

import lab4.beans.Hit;
import lab4.rest.filters.authorization.Authorized;
import lab4.rest.json.HitData;
import lab4.services.hits.HitService;
import lab4.utils.JSONMessage;

import javax.ejb.EJB;
import javax.json.Json;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/hits")
@Produces(MediaType.APPLICATION_JSON)
public class MainResource {
    @EJB
    private HitService hitService;

    // since token is valid we can assume that user from token exists
    // @Authorized also ensures that user exists

    @GET
    @Authorized
    public Response getHitsData(@Context HttpHeaders headers) {
        String username = headers.getHeaderString("username");
        return Response.ok(hitService.getAllJSON(username)).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Authorized
    public Response addHit(@Context HttpHeaders headers, @Valid HitData hitData) {
        String username = headers.getHeaderString("username");
        Hit hit = new Hit(hitData.getX(), hitData.getY().floatValue(), hitData.getR());
        hitService.add(hit, username);
        return Response.ok(
                Json.createObjectBuilder()
                .add("message", String.format("hit added (owner is %s)", username))
                .add("result", hit.isSuccessful())
                .build().toString()
        ).build();
    }

    @DELETE
    @Authorized
    public Response clear(@Context HttpHeaders headers) {
        String username = headers.getHeaderString("username");
        hitService.clear(username);
        return Response.ok(
                JSONMessage.message(String.format("%s's hits removed", username))
        ).build();
    }
}
