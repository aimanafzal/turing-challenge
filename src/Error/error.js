module.exports = {
    AuthenticationError: {
        AUT_01: "Authorization code is empty.",
        AUT_02: "Access Unauthorized."
    },
    PaginationError: {
        PAG_01: "The order is not matched 'field,(DESC|ASC)'.",
        PAG_02: "The field of order is not allow sorting."
    },
    UsersError: {
        USR_01: "Email or Password is invalid.",
        USR_02: "The field(s) are/is required.",
        USR_03: "The email is invalid.",
        USR_04: "The email already exists.",
        USR_05: "The email doesn't exist.",
        USR_06: "this is an invalid phone number.",
        USR_07: "this is too long <FIELD NAME>.",
        USR_08: "this is an invalid Credit Card.",
        USR_09: "The Shipping Region ID is not number"
    },
    CategoryError: {
        CAT_01: "Don't exist category with this ID."
    },
    DepartmentError: {
        DEP_01: "The ID is not a number.",
        DEP_02: "Don'exist department with this ID."
    }
}