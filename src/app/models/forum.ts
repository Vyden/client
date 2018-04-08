export class ForumQuestion {
    public UID?: string;
    public author: string;
    public dateCreated: number;
    public dateModified?: number;
    public editorUID?: string;
    public text: string;
    public isNote: boolean;
    public answers?: string [];
}

export class ForumAnswer {
    public UID?: string;
    public author: string;
    public dateCreated: number;
    public dateModified?: number;
    public editorUID?: string;
    public text: string;
}