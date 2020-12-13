package lab4.utils;

import javax.crypto.KeyGenerator;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class SeededKeyGenerator {
    private KeyGenerator keyGenerator;
    private SecureRandom secureRandom;

    public SeededKeyGenerator() {
        this("HmacSHA256");
    }

    public SeededKeyGenerator(String algorithm) {
        try {
            keyGenerator = KeyGenerator.getInstance(algorithm);
            secureRandom = new SecureRandom();
            keyGenerator.init(256, secureRandom);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }

    public Key generate(long seed) {
        secureRandom.setSeed(seed);
        return keyGenerator.generateKey();
    }
}
