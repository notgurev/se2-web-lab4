package lab4.beans;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@Table(name = "userr")
public class User implements Serializable {
    @Id
    @Column(name = "username", unique = true, nullable = false)
    private String username;
    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "owner")
    private List<Hit> usersHits;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
