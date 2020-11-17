package lab3.beans;

import lombok.Data;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
public class Clock implements Serializable {
    private final SimpleDateFormat sdfDate = new SimpleDateFormat("HH:mm:ss yyyy.MM.dd");
    private String time;

    public Clock() {
        time = sdfDate.format(new Date());
    }

    public void updateTime() {
        time = sdfDate.format(new Date());
    }
}
