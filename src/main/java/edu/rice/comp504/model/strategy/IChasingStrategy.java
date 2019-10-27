package edu.rice.comp504.model.strategy;

import edu.rice.comp504.model.objects.Ghost;
import edu.rice.comp504.model.objects.Pacman;
import edu.rice.comp504.model.Map;

public interface IChasingStrategy {

    void chase(Ghost ghost, Pacman pacman, Map map);

}
