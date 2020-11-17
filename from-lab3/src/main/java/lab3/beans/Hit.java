package lab3.beans;

import lab3.utils.HitChecker;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private Float y;
    @Column(name = "r", nullable = false)
    private float r;
    @Column(name = "success", nullable = false)
    private boolean successful;

    public Hit(int x, Float y, float r) {
        this.x = x;
        this.y = y;
        this.r = r;
        successful = HitChecker.checkArea(x, y, r);
    }

    // fake property
    public String getFancySuccessful() {
        return successful ? "hit" : "miss";
    }
}
