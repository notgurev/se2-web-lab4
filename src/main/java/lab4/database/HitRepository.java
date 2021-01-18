package lab4.database;

import lab4.beans.Hit;
import lab4.beans.User;
import lab4.exceptions.UserNotFoundException;
import lab4.services.hits.HitService;

import javax.ejb.EJB;
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
    @EJB
    private HitService hitService;

    //  By User object

    public void clear(User user) {
        entityManager.createQuery("delete from Hit hit where hit.owner = :owner")
                .setParameter("owner", user)
                .executeUpdate();
    }

    public void save(Hit hit) {
        entityManager.persist(hit);
        entityManager.flush();
    }

    public List<Hit> findAllByOwner(User user) {
        String query = "select hit from Hit hit where hit.owner = :owner";
        return entityManager.createQuery(query, Hit.class)
                .setParameter("owner", user)
                .getResultList();
    }

    //  By username

    public void clear(String username) {
        entityManager.createQuery("delete from Hit hit where hit.owner.username = :username")
                .setParameter("username", username)
                .executeUpdate();
    }

    public void save(Hit hit, String username) throws UserNotFoundException {
        User user = hitService.loadUser(username);
        hit.setOwner(user);
        entityManager.persist(hit);
        entityManager.flush();
    }

    public List<Hit> findAllByOwner(String username) {
        return entityManager.createQuery("select hit from Hit hit where hit.owner.username = :username", Hit.class)
                .setParameter("username", username)
                .getResultList();
    }
}
