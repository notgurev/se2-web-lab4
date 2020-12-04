package lab4.database;

import lab4.beans.User;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Stateless
public class UserRepository {
    @PersistenceContext(name = "LabUnit")
    private EntityManager entityManager;

    @Transactional
    public void clear() {
        entityManager.createQuery("delete from Hit").executeUpdate();
    }

    public void add(User user) {
        entityManager.persist(user);
        entityManager.flush();
    }

    // todo get by username?
}
