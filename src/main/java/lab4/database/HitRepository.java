package lab4.database;

import lab4.beans.Hit;
import lab4.beans.User;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Stateless
@Transactional
public class HitRepository {
    @PersistenceContext
    private EntityManager entityManager;

    public void clear(User user) {
        entityManager.createQuery("delete from Hit hit where hit.owner = :owner")
                .setParameter("owner", user)
                .executeUpdate();
    }

    public void add(Hit hit) {
        entityManager.persist(hit);
        entityManager.flush();
    }

    public List<Hit> getAllByOwner(User user) {
        String query = "select hit from Hit hit where hit.owner = :owner";
        return entityManager.createQuery(query, Hit.class)
                .setParameter("owner", user)
                .getResultList();
    }
}
