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
        USR_09: "The Shipping Region ID is not number",
        USR_10: "Field is required"
    },
    CategoryError: {
        CAT_01: "Don't exist category with this ID.",
        CAT_02: "Category with this product ID does not exists "
    },
    DepartmentError: {
        DEP_01: "The ID is not a number.",
        DEP_02: "Don'exist department with this ID "
    },
    ProductError: {
        PRD_01: "Product with this ID does not exists",
        PRD_02: "Product with this category does not exists",
        PRD_03: "Product in this Department with this department ID does not exists ",
    },
    AttributeError: {
        ATR_01: "Attribute with this ID does not exists",
        ATR_02: "Attribute with this Product ID does not exists",
    },
    ReviewError: {
        REV_01: "Review of this product is not avaialble with product ID ",
    },
    CustomerError: {
        CUS_01: "Record could not be updated",
        CUS_02: "Credit Card could not be updated",
    },
    OrderError: {
        ORD_01: "Order cannot be placed",
        ORD_02: "Cannot find the order with order ID ",
    },
    CartError:{
        CRT_01:"Cant update any record with cart ID ",
        CRT_02:"No record found based on the Cart ID ",
    },
    TaxError:{
        TAX_01:"Cannot find Tax with Tax ID ",
    },
    ShippingError:{
        SHP_01:"Shipping region does not exists with Shipping Region ID ",
    },
}