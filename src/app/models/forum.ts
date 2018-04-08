import { UserInfo } from './userInfo';

export class ForumQuestion {
    public UID?: string;
    public author: string | UserInfo;
    public dateCreated: number;
    public dateModified?: number;
    public editor?: string | UserInfo;
    public title: string;
    public text: string;
    public isPrivate: boolean;
    public isNote: boolean;
    public answers?: string[] | ForumAnswer [];

    public constructor() {
        this.title = "New Question"
        this.answers = []
        this.text = null
        this.dateCreated = Date.now()
        this.isNote = false
        this.isPrivate = false
    }
}

export class ForumAnswer {
    public UID?: string;
    public author: string | UserInfo;
    public dateCreated: number;
    public dateModified?: number;
    public editor?: string | UserInfo;
    public text: string;
}