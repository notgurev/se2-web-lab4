package lab4.utils;

import javax.crypto.KeyGenerator;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class SeededKeyGenerator {
    private KeyGenerator keyGenerator;
    private SecureRandom secureRandom;

    public SeededKeyGenerator() {
        try {
            keyGenerator = KeyGenerator.getInstance("AES");
            secureRandom = new SecureRandom();
            keyGenerator.init(secureRandom);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }

    public Key generate(long seed) {
        secureRandom.setSeed(seed);
        return keyGenerator.generateKey();
    }
}
