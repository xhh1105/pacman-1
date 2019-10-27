package edu.rice.comp504.controller;

import com.google.gson.Gson;
import edu.rice.comp504.model.DispatcherAdapter;
import spark.QueryParamsMap;

import java.awt.*;
import java.util.Iterator;

import static spark.Spark.*;

public class PacmanGameController {
    /**
     * The main entry point into the program.
     * @param args  The program arguments normally specified on the cmd line
     */
    public static void main(String[] args) {
        staticFiles.location("/public");

        port(getHerokuAssignedPort());
        get("/hello", (req, res) -> "Hello Heroku World");

        Gson gson = new Gson();
        DispatcherAdapter dis = new DispatcherAdapter();

        get("/load", (request, response) -> {
            return gson.toJson(dis.loadGame());
        });

        get("/start", (request, response) -> {
            return "start game";
        });

        get("/update", (request, response) -> {
            return gson.toJson(dis.updateGame());
        });

        get("/move/:direction", (request, response) -> {
            int direction = Integer.parseInt(request.params(":direction"));
            return gson.toJson(dis.movePacman(direction));
        });

    }

    static int getHerokuAssignedPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 4567; //return default port if heroku-port isn't set (i.e. on localhost)
    }
}
