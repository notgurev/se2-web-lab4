package lab4.database.hits;

import lab4.beans.Hit;
import lab4.database.Repository;

import javax.enterprise.inject.Default;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Default
public class HitRepository implements Repository<Hit> {
    @PersistenceContext(name = "HitsUnit")
    private EntityManager entityManager;

    @Override
    @Transactional
    public void clear() {
        entityManager.createQuery("delete from Hit").executeUpdate();
    }

    @Override
    @Transactional
    public void save(Hit hit) {
        entityManager.persist(hit);
        entityManager.flush();
    }

    @Override
    public List<Hit> getAll() {
        return entityManager.createQuery("Select hit from Hit hit", Hit.class).getResultList();
    }
}
