package app;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ReactExercise01Application
{

    public static void main(String[] args)
    {
        SpringApplication.run(ReactExercise01Application.class, args);
    }

    @Bean
    public Gson getGSONBuilder()
    {
        return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().setPrettyPrinting().create();
    }
}
