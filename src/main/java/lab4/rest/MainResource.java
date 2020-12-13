package lab4.rest;

import lab4.beans.Hit;
import lab4.rest.filters.authorization.Authorized;
import lab4.rest.json.HitData;
import lab4.services.hits.HitService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/hits")
public class MainResource {
    // todo clear()
    @EJB
    private HitService hitService;

    // since token is valid we can assume that user from token exists
    // @Authorized also ensures that user exists

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Authorized
    public Response getHitsData(@Context HttpHeaders headers) {
        String username = headers.getHeaderString("username");
        return Response.ok(hitService.getAllJSON(username)).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Authorized
    public Response addHit(@Context HttpHeaders headers, HitData hitData) {
        String username = headers.getHeaderString("username");
        hitService.add(new Hit(hitData.getX(), hitData.getY(), hitData.getR()), username);
        return Response.ok(String.format("hit added (owner is %s)", username)).build();
    }

    @DELETE
    @Authorized
    public Response clear(@Context HttpHeaders headers) {
        String username = headers.getHeaderString("username");
        hitService.clear(username);
        return Response.ok(String.format("%s's hits removed", username)).build();
    }
}
