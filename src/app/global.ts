let global = {

    action: {
        insert: "Insert",
        update: "Update",
        delete: "Delete"
    },

    module: {
        user: "User",
        brand: "Brand",
        company: "Company",
        category: "Category",
        pagination: "Pagination",
    },

    url: 'http://185.201.9.160:8042/',
    url_api: 'http://185.201.9.160:8042/api/v1/',
    url_img: 'http://185.201.9.160:8042/upload/',
    url_dev: 'http://185.201.9.160:8042/',
    // url_prod: 'http://185.201.9.175:8042/',
    // url_api_prod: 'http://185.201.9.175:8042/api/v1',
    // url_img_prod: 'http://185.201.9.175:8042/uploads/',

    header: {
        formEncodedHeader: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        applicationJson: {'Content-Type': 'application/json'},
        noCache: {'Cache-Control': 'no-cache'}
    },
    user_db: 'SalesStar-User',
    debugMode: false,
    message: {
        ina: {
            httpStandardResponse: {
                200           : "Berhasil",
                400           : "Bad request",
                401           : "Unauthorized",
                403           : "Request tidak diizinkan",
                404           : "Content tidak ditemukan",
                500           : "Server sedang bermasalah, silahkan coba beberapa saat lagi",
                502           : "Bad gateway",
                503           : "Service unavailable",
                504           : "Gateway timeout"
            },
            httpSuccessResponse: {

            },
            httpErrorResponse: {

            }
        },
        eng: {
            httpStandardResponse: {
                200           : "OK",
                400           : "Bad request",
                401           : "Unauthorized",
                403           : "Forbidden",
                404           : "Not found",
                500           : "Internal server error",
                502           : "Bad gateway",
                503           : "Service unavailable",
                504           : "Gateway timeout"
            },
            httpSuccessResponse: {

            },
            httpErrorResponse: {

            }
        }
    },
    
}

export default global;
