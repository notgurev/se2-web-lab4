package lab4.database;

import lab4.beans.Hit;
import lab4.beans.User;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Stateless
public class HitRepository {
    @PersistenceContext(name = "LabUnit")
    private EntityManager entityManager;

    @Transactional
    public void clear() {
        entityManager.createQuery("delete from Hit").executeUpdate();
    }

    @Transactional
    public void add(Hit hit) {
        entityManager.persist(hit);
        entityManager.flush();
    }

    public List<Hit> getAllByOwner(User owner) {
        return entityManager
                .createQuery("Select hit from Hit hit where hit.owner = :owner", Hit.class)
                .setParameter("owner", owner)
                .getResultList();
    }
}
