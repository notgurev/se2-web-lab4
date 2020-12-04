package lab4.services.auth;

import io.jsonwebtoken.Jwts;
import lab4.beans.User;
import lab4.database.UserRepository;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.Optional;

@Stateless
public class AuthService {
    @EJB
    private UserRepository users;
    @EJB
    private TokenService tokenService;

    /**
     * Checks if username exists, checks password and returns token if everything is fine.
     *
     * @param username username to check
     * @param password password to check
     * @return AuthResult with token if correct / AuthResult with errorMessage if not
     */
    public AuthResult login(String username, String password) {
        final Optional<User> optionalUser = users.getByUsername(username);
        if (optionalUser.isPresent()) {
            if (optionalUser.get().getPassword().equals(password)) { // todo encoded password
                return AuthResult.token(tokenService.generate(username));
            } else {
                return AuthResult.message("Wrong password");
            }
        } else {
            return AuthResult.message("User not found");
        }
    }

    /**
     * Checks if user already exists; if not, adds them to database and returns token.
     *
     * @param username username to register
     * @param password password to register
     * @return AuthResult with token if successful / AuthResult with errorMessage if not
     */
    public AuthResult register(String username, String password) {
        if (users.checkIfUserExists(username)) {
            return AuthResult.message("User already exists"); // todo username & password limitations
        } else {
            users.add(new User(username, password));
            return AuthResult.token(tokenService.generate(username));
        }
    }

//    // todo
//    public boolean checkToken(String jwtToken) {
//        return false;
//    }
//
//    // todo
//    public User getUserByToken(String jwtToken) {
//        return null;
//    }
}
