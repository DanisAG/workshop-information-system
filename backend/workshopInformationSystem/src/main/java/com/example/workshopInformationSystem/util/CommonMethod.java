package com.example.workshopInformationSystem.util;

import java.io.IOException;
import java.io.InputStream;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Properties;
import java.util.Random;

// import org.springframework.security.crypto.bcrypt.BCrypt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CommonMethod {
    private static final Logger LOGGER = LoggerFactory.getLogger(CommonMethod.class);

    // public String bcryptHash(String pass){
    //     String  originalPassword = pass;
    //     String generatedSecuredPasswordHash = BCrypt.hashpw(originalPassword, BCrypt.gensalt(12));
    //     System.out.println(generatedSecuredPasswordHash);
    //     boolean matched = BCrypt.checkpw(originalPassword, generatedSecuredPasswordHash);
    //     System.out.println(matched);
    //     return generatedSecuredPasswordHash;
    // }

    public String generateToken(){
        int length = 15;
        String symbol = "-/.&!@"; 
        String cap_letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
        String small_letter = "abcdefghijklmnopqrstuvwxyz"; 
        String numbers = "0123456789";


        String finalString = cap_letter + small_letter + 
                numbers + symbol; 


        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();
 
        for (int i = 0; i < length; i++)
        {
            int randomIndex = random.nextInt(finalString.length());
            sb.append(finalString.charAt(randomIndex));
        }
        String password = sb.toString();
        return password.toString();
    }

    public static List convertObjectToList(Object obj) {
        List list = new ArrayList<>();
        if(obj != null) {
            if (obj.getClass().isArray()) {
                list = Arrays.asList((Object[])obj);
            } else if (obj instanceof Collection) {
                list = new ArrayList<>((Collection<?>)obj);
            }
        }
        return list;
    }

    public static Properties getProperty(String filenameSource) {
        
        Properties prop = null;

        try (InputStream input = CommonMethod.class.getClassLoader().getResourceAsStream(filenameSource)) {

            prop = new Properties();

            if (input == null) {
                LOGGER.info("Sorry, unable to find {}", filenameSource);
            }

            prop.load(input);

        } catch (IOException ex) {
            ex.printStackTrace();
        } catch (Exception ex){
            ex.printStackTrace();
        }
        
        return prop;
    }
}
