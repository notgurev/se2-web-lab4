package lab4.utils;

import javax.json.Json;

public class JSONMessage {
    public static String message(String message) {
        return Json.createObjectBuilder().add("message", message).build().toString();
    }

    public static String error(String errorCode) {
        return Json.createObjectBuilder().add("error", errorCode).build().toString();
    }
}
