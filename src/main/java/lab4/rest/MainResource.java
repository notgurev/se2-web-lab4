package lab4.rest;

import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/main")
public class MainResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("hits")
    public JsonObject getHitsData() { // todo params: token
        return Json.createObjectBuilder().add("first", 1).add("second", 2).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("hits")
    public String addHit() { // todo params: user identifier?
        return "no idea";
    }
}
