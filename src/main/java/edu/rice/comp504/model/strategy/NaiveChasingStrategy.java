package edu.rice.comp504.model.strategy;

import edu.rice.comp504.model.objects.Ghost;
import edu.rice.comp504.model.objects.Pacman;
import edu.rice.comp504.model.Map;

public class NaiveChasingStrategy implements IChasingStrategy {
    private int preDirection = 0; // right

    /**
     * Choose previous direction, which mimic going in straight line.
     */
    @Override
    public void chase(Ghost ghost, Pacman pacman, Map map) {
        boolean[] directions = map.getValidDirectionAt(ghost.getLocation());
        // System.out.println(Arrays.toString(directions));
        if (directions[preDirection]) {
            ghost.movingInDirection(preDirection);
            //System.out.println(preDirection);
            return;
        }

        for (int i = 0; i < 3; i++) {
            preDirection = (1 + preDirection) % 4;
            if (directions[preDirection]) {
                ghost.movingInDirection(preDirection);
                //System.out.println(preDirection);

                break;
            }
        }

    }
}
