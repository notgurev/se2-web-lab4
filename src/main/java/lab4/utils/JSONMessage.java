package lab4.utils;

import javax.json.Json;

public class JSONMessage {
    public static String message(String message) {
        return Json.createObjectBuilder().add("message", message).build().toString();
    }
}
