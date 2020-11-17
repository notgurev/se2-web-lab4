package lab3.utils;

import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;

public class FacesUtils {
    public static void addFacesMessage(FacesMessage.Severity severity, String regularText) {
        FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(severity, null, regularText));
    }
}
