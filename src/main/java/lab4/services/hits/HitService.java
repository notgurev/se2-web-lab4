package lab4.services.hits;

import lab4.beans.Hit;
import lab4.beans.User;
import lab4.database.HitRepository;
import lab4.database.UserRepository;
import lab4.exceptions.UserNotFoundException;

import javax.ejb.EJB;
import javax.ejb.Stateful;
import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

@Stateful
public class HitService {
    @EJB
    private HitRepository hitRepository;
    @EJB
    private UserRepository userRepository;

    private User user;

    public void loadUser(String username) {
        Optional<User> optionalUser = userRepository.getByUsername(username);
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
        } else {
            throw new UserNotFoundException("passed username " + username + " not found in USERS");
        }
    }

    @Transactional // PROBABLY fixes org.hibernate.LazyInitializationException when getting users hits
//    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void add(@NotNull Hit hit, @NotNull String username) {
        if (user == null) {
            loadUser(username);
        }

        hit.setOwner(user);
        hitRepository.add(hit);
    }

    @Transactional // PROBABLY fixes org.hibernate.LazyInitializationException when getting users hits
    public void clear() {
        hitRepository.clear();
    }

    @Transactional // PROBABLY fixes org.hibernate.LazyInitializationException when getting users hits
    public List<Hit> getAllByOwnerUsername(String username) {
        if (user == null) {
            loadUser(username);
        }
        return hitRepository.getAllByOwner(user);
    }
}
