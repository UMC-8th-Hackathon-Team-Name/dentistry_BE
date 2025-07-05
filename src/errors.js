export class DuplicateUserEmailError extends Error {
    errorCode = "001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}
export class NoUserEmailOrPasswd extends Error {
    errorCode = "002";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class NoUserIdOrFacility extends Error {
    errorCode = "003";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }

}
export class NoUser extends Error {
    errorCode = "004";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class EncorrectPassward extends Error{
    errorCode="005";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}
export class NoUserIdOrPasswd extends Error {
    errorCode = "006";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }

}