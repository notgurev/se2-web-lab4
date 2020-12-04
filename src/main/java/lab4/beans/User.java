package lab4.beans;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class User implements Serializable {
    @Id
    @Column(name = "username", unique = true, nullable = false)
    private String username;
    @Column(name = "password")
    private String password; // todo encoded password in database
    @Column(name = "token")
    private String accessToken;

    @OneToMany(mappedBy = "owner")
    private List<Hit> usersHits;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
