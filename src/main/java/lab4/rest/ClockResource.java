package lab4.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.text.SimpleDateFormat;
import java.util.Date;

@Path("/clock")
public class ClockResource {
    private final SimpleDateFormat sdfDate = new SimpleDateFormat("HH:mm:ss yyyy.MM.dd");

    @GET
    public Response getDateTime() {
        return Response.ok(sdfDate.format(new Date())).build();
    }
}
