package lab4.beans;

import lab4.utils.HitChecker;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.json.Json;
import javax.json.JsonObject;
import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@NoArgsConstructor
public class Hit implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "x", nullable = false)
    private int x;
    @Column(name = "y", nullable = false)
    private float y;
    @Column(name = "r", nullable = false)
    private int r;
    @Column(name = "success", nullable = false)
    private boolean successful;

    @ManyToOne
    @JoinColumn(name = "owner", referencedColumnName = "username")
    private User owner;

    public Hit(int x, float y, int r) {
        this.x = x;
        this.y = y;
        this.r = r;
        successful = HitChecker.checkArea(x, y, r);
    }

    public JsonObject toJSONObject() {
        return Json.createObjectBuilder()
                .add("x", x)
                .add("y", y)
                .add("r", r)
                .add("result", successful)
                .build();
    }
}
