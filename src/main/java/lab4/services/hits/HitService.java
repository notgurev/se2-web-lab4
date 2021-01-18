package lab4.services.hits;

import lab4.beans.Hit;
import lab4.beans.User;
import lab4.database.HitRepository;
import lab4.database.UserRepository;
import lab4.exceptions.UserNotFoundException;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

@Stateless
@Transactional
public class HitService {
    @EJB
    private HitRepository hitRepository;
    @EJB
    private UserRepository userRepository;

    public User loadUser(@NotNull String username) throws UserNotFoundException {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {
            throw new UserNotFoundException("given username " + username + " not found in USERS");
        }
    }

    public void add(@NotNull Hit hit, @NotNull String username) throws UserNotFoundException {
        hitRepository.save(hit, username);
    }

    public void clear(@NotNull String username) {
        hitRepository.clear(username);
    }

    public List<Hit> getAllByOwnerUsername(@NotNull String username) {
        return hitRepository.findAllByOwner(username);
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
