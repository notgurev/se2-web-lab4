package lab4.rest;

import javax.json.Json;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.text.SimpleDateFormat;
import java.util.Date;

@Path("/clock")
public class ClockResource {
    private final SimpleDateFormat sdfDate = new SimpleDateFormat("HH:mm:ss yyyy.MM.dd");

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDateTime() {
        return Response.ok(Json.createObjectBuilder().add("date", sdfDate.format(new Date())).build()).build();
    }
}
