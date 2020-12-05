package lab4.database;

import lab4.beans.User;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Stateless
public class UserRepository {
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void add(User user) {
        entityManager.persist(user);
        entityManager.flush();
    }

    @Transactional
    public Optional<User> getByUsername(String username) {
        User user = entityManager.find(User.class, username);
        return Optional.ofNullable(user);
    }

    @Transactional
    public boolean checkIfUserExists(String username) {
        return getByUsername(username).isPresent();
    }

    // debug
    @Transactional
    public List<User> getListOfUsers() {
        return entityManager.createQuery("select user from User user", User.class).getResultList();
    }
}
