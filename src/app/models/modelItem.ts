import { TimelineItem } from './timelineItem';

enum RotationDirection {
    FORWARD = -1,
    BACKWARD = 1
}

enum RotationAxis {
    X = 'x',
    Y = 'y',
    Z = 'z'
}

export class ModelItem extends TimelineItem {
    public angleX: number;
    public angleY: number;
    public angleZ: number;
    public rotate: RotationDirection;
    public rotateAxis: RotationAxis = RotationAxis.X;
    public offsetX: number = 0;
    public offsetY: number = 0;
    public offsetZ: number = 0;
}