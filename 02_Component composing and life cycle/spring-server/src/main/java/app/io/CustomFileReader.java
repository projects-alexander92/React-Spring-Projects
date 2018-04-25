package app.io;

import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

@Component
public class CustomFileReader
{
    public CustomFileReader()
    {
    }

    public String convertFileToString(String path) throws IOException
    {
        InputStream inputStream = getClass().getResourceAsStream(path);
        BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
        StringBuilder file = new StringBuilder();
        String line = br.readLine();
        while (line != null)
        {
            file.append(line);
            line = br.readLine();
        }
        return file.toString();
    }
}
