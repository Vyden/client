export class DialogOptions {
    public title?: string
    public message?: string
    public type: "info" | "danger" | "default" = "default"
    public buttons?: DialogButton [] = [new DialogButton()]
}

export class DialogButton {
    public text: string = "CLOSE"
    public icon?: string = 'close'
    public color?: 'primary' | 'accent' | 'warn'
    public returnValue?: any
}