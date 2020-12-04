package lab4.services.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lab4.utils.SeededKeyGenerator;

import javax.ejb.Stateless;
import java.security.Key;
import java.util.Optional;

@Stateless
public class TokenService {
    private final Key key = new SeededKeyGenerator().generate(4 * 8 * 15 * 16 * 23 * 42);

    /**
     * @param username username to generate token for
     * @return generated token
     */
    public String generate(String username) { // todo more info in tokens
        return Jwts.builder()
                .setSubject(username)
                .claim("group", "user") // todo excess
                .signWith(key)
                .compact();
    }

    /**
     * @param token token to verify and extract username
     * @return an optional with the username if verified successfully
     */
    public Optional<String> verify(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .require("group", "user") // todo excess
                    .build()
                    .parseClaimsJws(token);
            return Optional.of(claimsJws.getBody().getSubject());
        } catch (JwtException e) {
            // validation failed
            return Optional.empty();
        }
    }
}
