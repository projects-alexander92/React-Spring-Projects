package app.controllers;

import app.databaseSimmulation.DbSim;
import app.models.Bio;
import app.models.Episode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class MainController
{

    private final DbSim dbSim;

    @Autowired
    public MainController(DbSim dbSim)
    {
        this.dbSim = dbSim;
    }

    @GetMapping("/episodePreview/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity getMainPictures(@PathVariable int id)
    {
        String url = this.dbSim.getEpisodes()[id].getUrl();
        return new ResponseEntity<>(url, HttpStatus.OK);
    }

    @GetMapping("/episodePreview/rosters/all")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity getAllEpisodes()
    {
        Bio[] bios = this.dbSim.getBios();
        return new ResponseEntity<>(bios, HttpStatus.OK);
    }
}
