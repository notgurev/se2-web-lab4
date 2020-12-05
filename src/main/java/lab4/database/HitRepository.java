package lab4.database;

import lab4.beans.Hit;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Stateless
public class HitRepository {
    @PersistenceContext
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

    @Transactional
    public List<Hit> getAllByOwnerUsername(String ownerUsername) {
        return entityManager
                .createQuery("Select hit from Hit hit where hit.owner.username = :ownerUsername", Hit.class)
                .setParameter("ownerUsername", ownerUsername)
                .getResultList();
    }
}
