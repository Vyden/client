import { TimelineItem } from './timelineItem';

export enum RotationDirection {
    FORWARD = 1,
    NONE = 0,
    BACKWARD = -1
}

export enum RotationAxis {
    X = 'x',
    Y = 'y',
    Z = 'z'
}

export class ModelItem extends TimelineItem {
    public name: string;
    public duration: number;
    public angleX: number;
    public angleY: number;
    public angleZ: number;
    public rotate: RotationDirection;
    public rotateAxis: RotationAxis;
    public offsetX: number;
    public offsetY: number;
    public offsetZ: number;
    public scale: number;
    public audio?: string

    public constructor() {
        super()
        this.duration = 10
        this.angleX = 0
        this.angleY = 0
        this.angleZ = 0
        this.offsetX = 0
        this.offsetY = 0
        this.offsetZ = 0
        this.scale = 0.1
        this.rotateAxis = RotationAxis.X
        this.rotate = RotationDirection.NONE
    }
}