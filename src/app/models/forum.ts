export class ForumQuestion {
    public UID?: string;
    public author: string;
    public dateCreated: number;
    public dateModified?: number;
    public editorUID?: string;
    public title: string;
    public text: string;
    public isNote: boolean;
    public answers?: string [];

    public constructor() {
        this.title = "New Question"
        this.answers = []
        this.text = null
        this.dateCreated = Date.now()
        this.isNote = false
    }
}

export class ForumAnswer {
    public UID?: string;
    public author: string;
    public dateCreated: number;
    public dateModified?: number;
    public editorUID?: string;
    public text: string;
}