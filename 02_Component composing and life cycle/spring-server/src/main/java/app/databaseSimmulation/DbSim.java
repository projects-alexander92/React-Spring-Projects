package app.databaseSimmulation;

import app.io.CustomFileReader;
import app.io.FilePaths;
import app.models.Bio;
import app.models.Episode;
import com.google.gson.Gson;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class DbSim
{
    private final Gson gson;
    private final CustomFileReader customFileReader;
    private Episode[] episodes;
    private Bio[] bios;

    public DbSim(Gson gson, CustomFileReader customFileReader) throws IOException
    {
        this.gson = gson;
        this.customFileReader = customFileReader;
        this.episodes = setEpisodes();
        this.bios = setBio();
    }

    private Episode[] setEpisodes() throws IOException
    {
        String string = this.customFileReader.convertFileToString(FilePaths.EP_JSON);
        return this.gson.fromJson(string, Episode[].class);
    }


    private Bio[] setBio() throws IOException
    {
        String string = this.customFileReader.convertFileToString(FilePaths.BIO_JSON);
        return this.gson.fromJson(string, Bio[].class);
    }

    public Bio[] getBios()
    {
        return bios;
    }

    public Episode[] getEpisodes()
    {
        return episodes;
    }
}
