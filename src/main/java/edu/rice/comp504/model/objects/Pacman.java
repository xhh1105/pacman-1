package edu.rice.comp504.model.objects;

public class Pacman extends Aobject {
    private int direction;


    public Pacman() {
        direction = 0;
        setType("pacman");
    }

    public int getDirection() {
        return direction;
    }

    public void setDirection(int direction) {
        this.direction = direction;
    }

    public void nextLocation(int deltaX, int deltaY) {
        getLocation().translate(deltaX, deltaY);
    }

}
