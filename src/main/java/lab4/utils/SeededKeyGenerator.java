package lab4.utils;

import javax.crypto.KeyGenerator;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class SeededKeyGenerator {
    private final KeyGenerator keyGenerator;
    private final SecureRandom secureRandom;

    public SeededKeyGenerator() throws NoSuchAlgorithmException {
        keyGenerator = KeyGenerator.getInstance("AES");
        secureRandom = new SecureRandom();
        keyGenerator.init(secureRandom);
    }

    public Key generate(long seed) {
        secureRandom.setSeed(seed);
        return keyGenerator.generateKey();
    }
}
