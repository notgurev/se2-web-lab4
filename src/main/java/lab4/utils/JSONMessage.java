package lab4.utils;

import javax.json.Json;
import javax.json.JsonArrayBuilder;

public class JSONMessage {
    public static String message(String message) {
        return Json.createObjectBuilder().add("message", message).build().toString();
    }

    public static String error(String errorCode) {
        return Json.createObjectBuilder().add("error", errorCode).build().toString();
    }

    public static String errors(String...errorCode) {
        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
        for (String s : errorCode) {
            arrayBuilder.add(JSONMessage.error(s));
        }
        return Json.createObjectBuilder().add("errors", arrayBuilder).build().toString();
    }
}
