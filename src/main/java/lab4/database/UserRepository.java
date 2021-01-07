package lab4.database;

import lab4.beans.User;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.Optional;

@Stateless
@Transactional
public class UserRepository {
    @PersistenceContext
    private EntityManager entityManager;

    public void save(User user) {
        entityManager.persist(user);
        entityManager.flush();
    }

    public Optional<User> findByUsername(String username) {
        User user = entityManager.find(User.class, username);
        return Optional.ofNullable(user);
    }

    public boolean checkIfUserExists(String username) {
        return findByUsername(username).isPresent();
    }
}
