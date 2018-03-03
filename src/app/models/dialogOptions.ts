export class DialogOptions {
    public title?: string
    public message?: string
    public type?: "info" | "danger" | "default" = "default"
    public buttons?: DialogButton = new DialogButton()
}

export class DialogButton {
    public text: string
    public icon?: string
    public returnValue?: any

    constructor() {
        this.text = "OK"
    }
}