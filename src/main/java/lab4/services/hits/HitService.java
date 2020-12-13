package lab4.services.hits;

import lab4.beans.Hit;
import lab4.beans.User;
import lab4.database.HitRepository;
import lab4.database.UserRepository;
import lab4.exceptions.UserNotFoundException;

import javax.ejb.EJB;
import javax.ejb.Stateful;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

@Stateful
@Transactional
public class HitService {
    @EJB
    private HitRepository hitRepository;
    @EJB
    private UserRepository userRepository;

    private User user;

    // lazy user load
    private User getUser(String username) {
        return user == null ? loadUser(username) : user;
    }

    public User loadUser(@NotNull String username) {
        Optional<User> optionalUser = userRepository.getByUsername(username);
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
            return user;
        } else {
            throw new UserNotFoundException("given username " + username + " not found in USERS");
        }
    }

    public void add(@NotNull Hit hit, @NotNull String username) {
        hit.setOwner(getUser(username));
        hitRepository.add(hit);
    }

    public void clear(@NotNull String username) {
        hitRepository.clear(getUser(username));
    }

    public List<Hit> getAllByOwnerUsername(@NotNull String username) {
        return hitRepository.getAllByOwner(getUser(username));
    }

    public String getAllJSON(@NotNull String username) {
        List<Hit> hits = getAllByOwnerUsername(username);
        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
        for (Hit hit : hits) {
            arrayBuilder.add(hit.toJSONObject());
        }
        return arrayBuilder.build().toString();
    }
}
