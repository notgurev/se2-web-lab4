package lab4.database;

import lab4.beans.User;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Optional;

@Stateless
public class UserRepository {
    @PersistenceContext(name = "LabUnit")
    private EntityManager entityManager;

    public void add(User user) {
        entityManager.persist(user);
        entityManager.flush();
    }

    public Optional<User> getByUsername(String username) {
        User user = entityManager.find(User.class, username);
        return Optional.ofNullable(user);
    }

    public boolean checkIfUserExists(String username) {
        return getByUsername(username).isPresent();
    }
}
